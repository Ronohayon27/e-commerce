// lib/auth.ts

import { User } from "@/types/user";

export function setAuth(token: string, user: User) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function getUser(): User | null {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
