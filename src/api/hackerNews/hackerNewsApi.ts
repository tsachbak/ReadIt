import { HackerNewsItem } from "./hackerNews.types";

const BASE_URL = "https://hacker-news.firebaseio.com/v0";

export async function fetchTopStoryIds(): Promise<number[]> {
  const response = await fetch(`${BASE_URL}/topstories.json`);

  if (!response.ok) {
    throw new Error("Failed to fetch top story IDs");
  }

  return (await response.json()) as number[];
}

export async function fetchItemById(id: number): Promise<HackerNewsItem> {
  const response = await fetch(`${BASE_URL}/item/${id}.json`);

  if (!response.ok) {
    throw new Error(`Failed to fetch item with ID ${id}`);
  }

  return (await response.json()) as HackerNewsItem;
}

export async function fetchTopStoriesPage(
  page: number,
  pageSize: number = 20,
): Promise<HackerNewsItem[]> {
  const allIds = await fetchTopStoryIds();

  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const pageIds = allIds.slice(startIndex, endIndex);

  const items = await Promise.all(pageIds.map((id) => fetchItemById(id)));

  return items;
}
