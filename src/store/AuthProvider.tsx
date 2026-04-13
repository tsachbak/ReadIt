import { ReactNode, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getAuthToken, isTokenExpired, logout } from "../services/authService";

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getAuthToken();

        if (token && !isTokenExpired(token)) {
          setIsAuthenticated(true);
        } else if (token && isTokenExpired(token)) {
          await logout();
          setIsAuthenticated(false);
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
      signOut: () => setIsAuthenticated(false),
    }),
    [isAuthenticated, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
