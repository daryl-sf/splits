import { createContext } from "react";
import { IUser } from ".";

export interface IUserContext {
  user: IUser | null;
  login: (email: string, password: string, redirectURL?: string) => void;
  logout: () => void;
  signup: (email: string, password: string, username: string, redirectURL?: string) => void;
  updateUser: ({ username, email, password }: { username?: string, email?: string, password?: string }) => void;
}

export const UserContext = createContext<IUserContext | null>(null);
