import { HackerNewsItem } from "../api/hackerNews/hackerNews.types";

/**
 * Type map for the root navigation stack.
 *
 * Each key is a screen name paired with its route parameters.
 * `undefined` means the screen accepts no navigation params.
 */
export type RootStackParamList = {
  Login: undefined;
  Feed: undefined;
  Detail: {
    article: HackerNewsItem;
  };
  SavedArticles: undefined;
};
