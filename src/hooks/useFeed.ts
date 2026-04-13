import { useEffect, useState } from "react";
import { fetchTopStoriesPage } from "../api/hackerNews/hackerNewsApi";
import { HackerNewsItem } from "../api/hackerNews/hackerNews.types";

export function useFeed() {
  const [articles, setArticles] = useState<HackerNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const loadInitial = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const data = await fetchTopStoriesPage(0);
        setArticles(data);
        setPage(0);
      } catch {
        setErrorMessage("Failed to load articles");
      } finally {
        setIsLoading(false);
      }
    };

    loadInitial();
  }, []);

  const refresh = async () => {
    try {
      setIsRefreshing(true);

      const data = await fetchTopStoriesPage(0);
      setArticles(data);
      setPage(0);
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

      const nextPage = page + 1;
      const data = await fetchTopStoriesPage(nextPage);

      setArticles((prev) => {
        const existingIds = new Set(prev.map((article) => article.id));
        const uniqueNewArticles = data.filter(
          (article) => !existingIds.has(article.id),
        );

        return [...prev, ...uniqueNewArticles];
      });
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
