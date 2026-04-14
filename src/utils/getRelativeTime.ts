/**
 * Formats a Unix timestamp as a human-readable relative time string.
 *
 * @param unixTime - Seconds since the Unix epoch (as returned by the HN API).
 * @returns A short label such as `"Just now"`, `"5m ago"`, `"2h ago"`, or `"3d ago"`.
 */
export function getRelativeTime(unixTime: number): string {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  const diffInSeconds = nowInSeconds - unixTime;

  if (diffInSeconds < 60) return "Just now";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}
