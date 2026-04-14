import { HackerNewsItem } from "./hackerNews.types";

/** Base URL for the public Hacker News Firebase REST API. */
const BASE_URL = "https://hacker-news.firebaseio.com/v0";

/**
 * Fetches the ordered list of current top story IDs from Hacker News.
 *
 * @returns Array of story IDs in ranked order.
 */
export async function fetchTopStoryIds(): Promise<number[]> {
  const response = await fetch(`${BASE_URL}/topstories.json`);

  if (!response.ok) {
    throw new Error("Failed to fetch top story IDs");
  }

  return (await response.json()) as number[];
}

/**
 * Fetches a single story item by its numeric ID.
 *
 * @param id - The unique Hacker News item ID.
 */
export async function fetchItemById(id: number): Promise<HackerNewsItem> {
  const response = await fetch(`${BASE_URL}/item/${id}.json`);

  if (!response.ok) {
    throw new Error(`Failed to fetch item with ID ${id}`);
  }

  return (await response.json()) as HackerNewsItem;
}

/**
 * Fetches a paginated slice of top stories, resolving full item details for each.
 *
 * @param page - Zero-based page index.
 * @param pageSize - Number of items per page (default 20).
 */
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
