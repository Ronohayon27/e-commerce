import { User } from "./user";
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuth: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}
