/**
 * Thin AsyncStorage cache layer for the article feed.
 *
 * Persists the last known feed so the app can render content immediately
 * on startup or while the device is offline.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HackerNewsItem } from "../api/hackerNews/hackerNews.types";

const FEED_CACHE_KEY = "readit_feed_cache";

/**
 * Writes the current feed snapshot to AsyncStorage.
 * Replaces any previously cached feed on each call.
 */
export async function saveCachedFeed(
  articles: HackerNewsItem[],
): Promise<void> {
  await AsyncStorage.setItem(FEED_CACHE_KEY, JSON.stringify(articles));
}

/**
 * Reads and parses the cached feed from AsyncStorage.
 * Returns an empty array if no cache exists or the stored value is malformed.
 */
export async function getCachedFeed(): Promise<HackerNewsItem[]> {
  const rawValue = await AsyncStorage.getItem(FEED_CACHE_KEY);

  if (!rawValue) return [];

  try {
    return JSON.parse(rawValue) as HackerNewsItem[];
  } catch {
    return [];
  }
}
