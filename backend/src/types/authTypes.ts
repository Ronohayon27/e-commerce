import { Role } from "@prisma/client";

export type UserTokenPayload = {
  id: string;
  role: Role;
};
