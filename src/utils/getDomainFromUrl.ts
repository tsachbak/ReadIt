export function getDomainFromUrl(url?: string): string {
  if (!url) return "Unknown Source";

  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "Unknown Source";
  }
}
