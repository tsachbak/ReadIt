/**
 * Domain type representing a single Hacker News story item
 * as returned by the Firebase REST API.
 */
export type HackerNewsItem = {
  id: number;
  title: string;
  by: string;
  score: number;
  descendants: number;
  time: number;
  url?: string;
  type: string;
};
