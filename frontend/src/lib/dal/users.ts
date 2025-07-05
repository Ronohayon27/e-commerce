// lib/dal/users.ts

import axios from "@/lib/axios"; // your custom instance
import { User } from "@/types/user";

export async function loginApi(
  email: string,
  password: string
): Promise<{ token: string; user: User }> {
  const res = await axios.post("/login", { email, password });
  return res.data;
}

export async function signupApi(
  name: string,
  email: string,
  password: string
): Promise<{ token: string; user: User }> {
  const res = await axios.post("/signup", { name, email, password });
  return res.data;
}
