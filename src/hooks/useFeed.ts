import { useEffect, useState } from "react";
import { fetchTopStoriesPage } from "../api/hackerNews/hackerNewsApi";
import { HackerNewsItem } from "../api/hackerNews/hackerNews.types";
import { getCachedFeed, saveCachedFeed } from "../services/feedCacheService";

export function useFeed() {
  const [articles, setArticles] = useState<HackerNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const replaceArticles = async (nextArticles: HackerNewsItem[]) => {
    setArticles(nextArticles);
    setPage(0);
    await saveCachedFeed(nextArticles);
  };

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
