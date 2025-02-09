"use client";
import React, { useEffect } from "react";
import AuthContext from "./authContext";
import { UserType } from "@/src/utils/validiation/auth/loginSchema";
import axios from "axios";

type Props = {
  children: React.ReactNode;
  token?: string;
};
export const AuthContextProvider = ({ children, token }: Props) => {
  const [user, setUser] = React.useState<UserType | null>(null);
  const verifyToken = async () => {
    if (token) {
      const res = await axios.get("http://localhost:3000/api/auth", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setUser(res.data.data);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      if (token && user === null) {
        verifyToken();
      }
    }, 3000);
    return () => {};
  }, [token, user, verifyToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: (email: string, password: string) => {},
      }}
    >
      {token}
      <div>{user ? "true" : "false"}</div>
      {children}
    </AuthContext.Provider>
  );
};
