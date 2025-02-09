import { UserType } from "@/src/utils/validiation/auth/loginSchema";
import React from "react";

type AuthContext = {
  user: UserType | null;
  login: (email: string, password: string) => void;
};
const AuthContext = React.createContext<AuthContext | null>(null);
export default AuthContext;
