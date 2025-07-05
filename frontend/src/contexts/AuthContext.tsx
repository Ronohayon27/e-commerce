import { createContext, useState, useEffect } from "react";
import { AuthContextType } from "@/types/auth";
import { User } from "@/types/user";
import { getToken, getUser, setAuth, clearAuth } from "@/lib/auth";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuth: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUser();
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

  const login = (token: string, user: User) => {
    setAuth(token, user);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    clearAuth();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuth: !!token && !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
