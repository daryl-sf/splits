import axios from "axios";
import { createContext, useState, FC, ReactNode, useEffect } from "react";

export interface IUser {
  id: number;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserContext {
  user: IUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (email: string, password: string, username: string) => void;
}

export const UserContext = createContext<IUserContext | null>(null);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get(
          "http://localhost:3000/api/users/me",
          {
            withCredentials: true,
          }
        );
        setUser(userResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post(
      "http://localhost:3000/api/users/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    if (response.status >= 200 && response.status < 300) {
      setUser(response.data);
    }
  };

  const logout = async () => {
    await axios.get("http://localhost:3000/api/users/logout");
    setUser(null);
  };

  const signup = async (email: string, password: string, username: string) => {
    const response = await axios.post(
      "http://localhost:3000/api/users/signup",
      {
        email,
        password,
        username,
      },
      { withCredentials: true }
    );

    if (response.status >= 200 && response.status < 300) {
      setUser(response.data);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
