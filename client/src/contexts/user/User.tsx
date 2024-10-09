import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usersApi } from "../../apis";
import { useState, FC, ReactNode, useEffect } from "react";
import { UserContext } from ".";

export interface IUser {
  id: number;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await usersApi.get("/me");
        setUser(userResponse.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setUser(null);
        }
      }
    };
    fetchUser();
  }, []);

  const login = async (
    email: string,
    password: string,
    redirectURL?: string
  ) => {
    const response = await usersApi.post("/login", {
      email,
      password,
    });

    if (response.status >= 200 && response.status < 300) {
      setUser(response.data);
      if (redirectURL) navigate(redirectURL);
    }
  };

  const logout = async () => {
    await usersApi.get("/logout");
    setUser(null);
    navigate("/");
  };

  const signup = async (
    email: string,
    password: string,
    username: string,
    redirectURL?: string
  ) => {
    const response = await usersApi.post(
      "/signup",
      {
        email,
        password,
        username,
      },
      { withCredentials: true }
    );

    if (response.status >= 200 && response.status < 300) {
      setUser(response.data);
      if (redirectURL) navigate(redirectURL);
    }
  };

  const updateUser = async ({
    username,
    email,
    password,
  }: {
    username?: string;
    email?: string;
    password?: string;
  }) => {
    const response = await usersApi.put("/me", {
      username,
      email,
      password,
    });

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
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
