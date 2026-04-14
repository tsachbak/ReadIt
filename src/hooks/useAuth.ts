import { useContext } from "react";
import { AuthContext, AuthContextValue } from "../store/AuthContext";

/**
 * Convenience hook for reading auth state and dispatching auth actions.
 *
 * Must be called within a component tree wrapped by `AuthProvider`.
 * Throws if used outside that tree to surface misconfigured component trees early.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
