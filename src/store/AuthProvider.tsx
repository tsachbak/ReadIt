import { ReactNode, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getAuthToken, isTokenExpired, logout } from "../services/authService";

type Props = {
  children: ReactNode;
};

/**
 * Provides global authentication state and actions.
 *
 * Responsibilities:
 * - Restore session state from persisted secure token on app boot.
 * - Validate token expiry before granting authenticated access.
 * - Expose signIn/signOut actions to the UI layer through context.
 */
export default function AuthProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Clears persisted auth state and transitions app to unauthenticated mode.
   */
  const signOut = async () => {
    await logout();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    /**
     * Bootstraps authentication state by reading and validating the persisted token.
     */
    const checkAuth = async () => {
      try {
        const token = await getAuthToken();

        if (token && !isTokenExpired(token)) {
          setIsAuthenticated(true);
        } else if (token && isTokenExpired(token)) {
          await signOut();
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      signIn: () => setIsAuthenticated(true),
      signOut,
    }),
    [isAuthenticated, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
