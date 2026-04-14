import { Pressable, StyleSheet, Text, View } from "react-native";
import { HackerNewsItem } from "../api/hackerNews/hackerNews.types";

type Props = {
  article: HackerNewsItem;
  sourceLabel: string;
  relativeTimeLabel: string;
  publishedLabel: string;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  showPublishedInMeta: boolean;
  showStatsRow: boolean;
};

/**
 * Compact header for the article detail screen.
 *
 * Renders the source label, title, metadata row, optional published date,
 * and an optional stats row. The bookmark toggle is inlined for immediate access.
 */
export default function ArticleDetailHeader({
  article,
  sourceLabel,
  relativeTimeLabel,
  publishedLabel,
  isBookmarked,
  onToggleBookmark,
  showPublishedInMeta,
  showStatsRow,
}: Props) {
  return (
    <View style={styles.compactHeader}>
      <View style={styles.headerTopRow}>
        <View style={styles.sourcePill}>
          <Text style={styles.sourcePillText}>{sourceLabel}</Text>
        </View>

        <Pressable
          onPress={onToggleBookmark}
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
        {showPublishedInMeta ? (
          <>
            <Text style={styles.metaDivider}>•</Text>
            <Text style={styles.metaItem}>{publishedLabel}</Text>
          </>
        ) : null}
      </View>

      {showStatsRow ? (
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
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
