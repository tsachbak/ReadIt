import { createContext } from "react";

export type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
