import AsyncStorage from "@react-native-async-storage/async-storage";
import { HackerNewsItem } from "../api/hackerNews/hackerNews.types";

const FEED_CACHE_KEY = "readit_feed_cache";

export async function saveCachedFeed(
  articles: HackerNewsItem[],
): Promise<void> {
  await AsyncStorage.setItem(FEED_CACHE_KEY, JSON.stringify(articles));
}

export async function getCachedFeed(): Promise<HackerNewsItem[]> {
  const rawValue = await AsyncStorage.getItem(FEED_CACHE_KEY);

  if (!rawValue) return [];

  try {
    return JSON.parse(rawValue) as HackerNewsItem[];
  } catch {
    return [];
  }
}
