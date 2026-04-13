import { useEffect, useState } from "react";
import { fetchTopStoriesPage } from "../api/hackerNews/hackerNewsApi";
import { HackerNewsItem } from "../api/hackerNews/hackerNews.types";

export function useFeed() {
  const [articles, setArticles] = useState<HackerNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const data = await fetchTopStoriesPage(0);
        setArticles(data);
      } catch {
        setErrorMessage("Failed to load articles");
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  return { articles, isLoading, errorMessage };
}
