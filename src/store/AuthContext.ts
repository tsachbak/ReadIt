import { createContext } from "react";

/**
 * Shape of the values and actions exposed by the authentication context.
 */
export type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => void;
  signOut: () => Promise<void>;
};

/**
 * React context providing global authentication state and action dispatchers.
 *
 * Consume via the `useAuth` hook rather than accessing this context directly.
 */
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
