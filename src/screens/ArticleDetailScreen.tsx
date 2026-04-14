import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { useBookmarksStore } from "../store/bookmarksStore";
import { getDomainFromUrl } from "../utils/getDomainFromUrl";
import { getRelativeTime } from "../utils/getRelativeTime";
import ArticleDetailHeader from "../components/ArticleDetailHeader";
import ArticleReaderStatsBar from "../components/ArticleReaderStatsBar";

type ArticleDetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

type Props = {
  route: ArticleDetailScreenRouteProp;
};

export default function ArticleDetailScreen({ route }: Props) {
  const { article } = route.params;
  const toggleBookmark = useBookmarksStore((state) => state.toggleBookmark);
  const isBookmarked = useBookmarksStore((state) =>
    state.bookmarkedArticles.some(
      (savedArticle) => savedArticle.id === article.id,
    ),
  );

  const handleBookmarkToggle = () => {
    toggleBookmark(article);
  };

  const sourceLabel = getDomainFromUrl(article.url);
  const relativeTimeLabel = getRelativeTime(article.time);
  const publishedLabel = new Date(article.time * 1000).toLocaleString();

  if (!article.url) {
    return (
      <View style={styles.container}>
        <ArticleDetailHeader
          article={article}
          sourceLabel={sourceLabel}
          relativeTimeLabel={relativeTimeLabel}
          publishedLabel={publishedLabel}
          isBookmarked={isBookmarked}
          onToggleBookmark={handleBookmarkToggle}
          showPublishedInMeta={false}
          showStatsRow
        />

        <View style={styles.readerCard}>
          <Text style={styles.emptyTitle}>No article URL available</Text>
          <Text style={styles.emptyText}>
            This story does not include a readable link. Published{" "}
            {publishedLabel}.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ArticleDetailHeader
        article={article}
        sourceLabel={sourceLabel}
        relativeTimeLabel={relativeTimeLabel}
        publishedLabel={publishedLabel}
        isBookmarked={isBookmarked}
        onToggleBookmark={handleBookmarkToggle}
        showPublishedInMeta
        showStatsRow={false}
      />

      <View style={styles.readerCard}>
        <ArticleReaderStatsBar
          score={article.score}
          comments={article.descendants ?? 0}
        />

        <WebView
          source={{ uri: article.url }}
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loaderContainer}>
              <ActivityIndicator />
              <Text style={styles.loaderText}>Loading article...</Text>
            </View>
          )}
          style={styles.webView}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  readerCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#64748B",
    paddingTop: 4,
    paddingHorizontal: 16,
  },
  webView: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFFFFF",
  },
  loaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },
});
