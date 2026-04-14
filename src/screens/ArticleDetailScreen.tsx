import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { useBookmarksStore } from "../store/bookmarksStore";
import { getDomainFromUrl } from "../utils/getDomainFromUrl";
import { getRelativeTime } from "../utils/getRelativeTime";

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
        <View style={styles.compactHeader}>
          <View style={styles.headerTopRow}>
            <View style={styles.sourcePill}>
              <Text style={styles.sourcePillText}>{sourceLabel}</Text>
            </View>

            <Pressable
              onPress={handleBookmarkToggle}
              style={[
                styles.bookmarkButton,
                isBookmarked && styles.bookmarkButtonSaved,
              ]}
            >
              <Text
                style={[
                  styles.bookmarkButtonText,
                  isBookmarked && styles.bookmarkButtonTextSaved,
                ]}
              >
                {isBookmarked ? "Saved" : "Save"}
              </Text>
            </Pressable>
          </View>

          <Text style={styles.title}>{article.title}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaItem}>by {article.by}</Text>
            <Text style={styles.metaDivider}>•</Text>
            <Text style={styles.metaItem}>{relativeTimeLabel}</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statPill}>
              <Text style={styles.statLabel}>Score</Text>
              <Text style={styles.statValue}>{article.score}</Text>
            </View>

            <View style={styles.statPill}>
              <Text style={styles.statLabel}>Comments</Text>
              <Text style={styles.statValue}>{article.descendants ?? 0}</Text>
            </View>
          </View>
        </View>

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
      <View style={styles.compactHeader}>
        <View style={styles.headerTopRow}>
          <View style={styles.sourcePill}>
            <Text style={styles.sourcePillText}>{sourceLabel}</Text>
          </View>

          <Pressable
            onPress={handleBookmarkToggle}
            style={[
              styles.bookmarkButton,
              isBookmarked && styles.bookmarkButtonSaved,
            ]}
          >
            <Text
              style={[
                styles.bookmarkButtonText,
                isBookmarked && styles.bookmarkButtonTextSaved,
              ]}
            >
              {isBookmarked ? "Saved" : "Save"}
            </Text>
          </Pressable>
        </View>

        <Text numberOfLines={2} style={styles.title}>
          {article.title}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaItem}>by {article.by}</Text>
          <Text style={styles.metaDivider}>•</Text>
          <Text style={styles.metaItem}>{relativeTimeLabel}</Text>
          <Text style={styles.metaDivider}>•</Text>
          <Text style={styles.metaItem}>{publishedLabel}</Text>
        </View>
      </View>

      <View style={styles.readerCard}>
        <View style={styles.headerInlineStats}>
          <Text style={styles.inlineStatText}>Score {article.score}</Text>
          <Text style={styles.inlineStatDivider}>•</Text>
          <Text style={styles.inlineStatText}>
            Comments {article.descendants ?? 0}
          </Text>
        </View>

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
  compactHeader: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    gap: 6,
    backgroundColor: "#F8FAFC",
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  sourcePill: {
    backgroundColor: "#EEF2FF",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    maxWidth: "68%",
  },
  sourcePillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4338CA",
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: "#0F172A",
  },
  bookmarkButton: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#FFFFFF",
  },
  bookmarkButtonSaved: {
    borderColor: "#D1FAE5",
    backgroundColor: "#ECFDF5",
  },
  bookmarkButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#334155",
  },
  bookmarkButtonTextSaved: {
    color: "#047857",
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
  },
  metaItem: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  metaDivider: {
    fontSize: 12,
    color: "#94A3B8",
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
  headerInlineStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
  },
  inlineStatText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
  },
  inlineStatDivider: {
    fontSize: 12,
    color: "#94A3B8",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F8FAFC",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
  },
  statValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
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
