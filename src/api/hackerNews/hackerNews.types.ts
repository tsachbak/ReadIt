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
