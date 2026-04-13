import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { HackerNewsItem } from "../api/hackerNews/hackerNews.types";

type BookmarksState = {
  bookmarkedArticles: HackerNewsItem[];
  toggleBookmark: (article: HackerNewsItem) => void;
  isBookmarked: (articleId: number) => boolean;
  removeBookmark: (articleId: number) => void;
};

export const useBookmarksStore = create<BookmarksState>()(
  persist(
    (set, get) => ({
      bookmarkedArticles: [],

      toggleBookmark: (article) => {
        const { bookmarkedArticles } = get();
        const alreadyBookmarked = bookmarkedArticles.some(
          (savedArticle) => savedArticle.id === article.id,
        );

        if (alreadyBookmarked) {
          set({
            bookmarkedArticles: bookmarkedArticles.filter(
              (savedArticle) => savedArticle.id !== article.id,
            ),
          });
          return;
        }

        set({
          bookmarkedArticles: [article, ...bookmarkedArticles],
        });
      },

      isBookmarked: (articleId) => {
        return get().bookmarkedArticles.some(
          (savedArticle) => savedArticle.id === articleId,
        );
      },

      removeBookmark: (articleId) => {
        set({
          bookmarkedArticles: get().bookmarkedArticles.filter(
            (savedArticle) => savedArticle.id !== articleId,
          ),
        });
      },
    }),
    {
      name: "readit-bookmarks-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
