import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserSafeDTO } from "@shared/user";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    throw new Error("Email already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, {
    expiresIn: "7d",
  });
  const userSafeDTO: UserSafeDTO = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };

  return { user: userSafeDTO, token };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });

  const safeUser: UserSafeDTO = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return { user: safeUser, token };
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
