import { useEffect, useState } from "react";
import { fetchTopStoriesPage } from "../api/hackerNews/hackerNewsApi";
import { HackerNewsItem } from "../api/hackerNews/hackerNews.types";
import { getCachedFeed, saveCachedFeed } from "../services/feedCacheService";

/**
 * Encapsulates feed retrieval and pagination state.
 *
 * This hook is the single orchestration point for:
 * - initial load
 * - pull-to-refresh
 * - pagination
 * - offline cache fallback
 */
export function useFeed() {
  const [articles, setArticles] = useState<HackerNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * Replaces the current feed with a new first page and synchronizes the cache.
   */
  const replaceArticles = async (nextArticles: HackerNewsItem[]) => {
    setArticles(nextArticles);
    setPage(0);
    await saveCachedFeed(nextArticles);
  };

  /**
   * Appends only unseen stories to avoid duplicates when upstream ordering changes.
   */
  const appendUniqueArticles = (nextArticles: HackerNewsItem[]) => {
    setArticles((currentArticles) => {
      const existingIds = new Set(currentArticles.map((article) => article.id));

      const uniqueNewArticles = nextArticles.filter(
        (article) => !existingIds.has(article.id),
      );

      return [...currentArticles, ...uniqueNewArticles];
    });
  };

  useEffect(() => {
    const loadInitial = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const data = await fetchTopStoriesPage(0);
        await replaceArticles(data);
      } catch {
        const cachedData = await getCachedFeed();

        if (cachedData.length > 0) {
          setArticles(cachedData);
          setErrorMessage("Showing cached articles due to network error");
        } else {
          setErrorMessage("Failed to load articles");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadInitial();
  }, []);

  /**
   * Refreshes page 0 and rewrites both in-memory and cached feed state.
   */
  const refresh = async () => {
    try {
      setIsRefreshing(true);
      setErrorMessage(null);

      const data = await fetchTopStoriesPage(0);
      await replaceArticles(data);
    } catch {
      setErrorMessage("Failed to refresh articles");
    } finally {
      setIsRefreshing(false);
    }
  };

  /**
   * Loads the next page and merges unique stories into the existing feed.
   */
  const loadMore = async () => {
    if (isLoading || isLoadingMore) return;

    try {
      setIsLoadingMore(true);
      setErrorMessage(null);

      const nextPage = page + 1;
      const data = await fetchTopStoriesPage(nextPage);

      appendUniqueArticles(data);
      setPage(nextPage);
    } catch {
      setErrorMessage("Failed to load more articles");
    } finally {
      setIsLoadingMore(false);
    }
  };

  return {
    articles,
    isLoading,
    isLoadingMore,
    isRefreshing,
    errorMessage,
    loadMore,
    refresh,
  };
}
