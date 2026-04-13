import * as SecureStore from "expo-secure-store";

const AUTH_TOKEN_KEY = "readit_auth_token";
const VALID_EMAIL = "user@readit.dev";
const VALID_PASSWORD = "password123";
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

type MockTokenPayload = {
  sub: string;
  iat: number;
  exp: number;
};

export async function saveAuthToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
}

export async function getAuthToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
}

export async function removeAuthToken(): Promise<void> {
  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
}

export function createMockToken(email: string): string {
  const payload: MockTokenPayload = {
    sub: email,
    iat: Date.now(),
    exp: Date.now() + ONE_DAY_IN_MS,
  };

  return btoa(JSON.stringify(payload));
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = atob(token);
    const payload = JSON.parse(decoded) as MockTokenPayload;
    return Date.now() > payload.exp;
  } catch (error) {
    console.error("Invalid token format", error);
    return true; // Treat invalid tokens as expired
  }
}

export async function login(email: string, password: string): Promise<string> {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPassword = password.trim();

  if (
    normalizedEmail !== VALID_EMAIL ||
    normalizedPassword !== VALID_PASSWORD
  ) {
    throw new Error("Invalid credentials");
  }

  const token = createMockToken(normalizedEmail);
  await saveAuthToken(token);

  return token;
}

export async function logout(): Promise<void> {
  await removeAuthToken();
}
