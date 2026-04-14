/**
 * Mock authentication service backed by Expo SecureStore.
 *
 * Implements a simplified token lifecycle: creation, persistence, retrieval,
 * validation, and removal. Tokens are base64-encoded JSON payloads — not
 * real JWTs — intended only for this demo context.
 */
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

/** Persists the auth token securely on the device. */
export async function saveAuthToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
}

/** Retrieves the persisted auth token, or `null` if none exists. */
export async function getAuthToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
}

/** Deletes the persisted auth token, effectively clearing the stored session. */
export async function removeAuthToken(): Promise<void> {
  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
}

/**
 * Creates a base64-encoded mock token payload with a 24-hour expiry.
 *
 * @param email - The authenticated user's email address.
 */
export function createMockToken(email: string): string {
  const payload: MockTokenPayload = {
    sub: email,
    iat: Date.now(),
    exp: Date.now() + ONE_DAY_IN_MS,
  };

  return btoa(JSON.stringify(payload));
}

/**
 * Checks whether a previously issued token has passed its expiry time.
 * Malformed or unparseable tokens are treated as expired.
 */
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

/**
 * Validates credentials against the mock account and, on success,
 * mints and persists an auth token.
 *
 * @throws When credentials do not match the demo account.
 */
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

/** Removes the persisted auth token, ending the current session. */
export async function logout(): Promise<void> {
  await removeAuthToken();
}
