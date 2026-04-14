/**
 * Extracts the bare hostname from a URL string, stripping the `www.` prefix.
 *
 * @param url - A fully-qualified URL. Pass `undefined` for articles without a link.
 * @returns The hostname (e.g. `"github.com"`) or `"Unknown Source"` on failure.
 */
export function getDomainFromUrl(url?: string): string {
  if (!url) return "Unknown Source";

  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "Unknown Source";
  }
}
