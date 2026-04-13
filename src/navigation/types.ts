import { HackerNewsItem } from "../api/hackerNews/hackerNews.types";

export type RootStackParamList = {
  Login: undefined;
  Feed: undefined;
  Detail: {
    article: HackerNewsItem;
  };
};
