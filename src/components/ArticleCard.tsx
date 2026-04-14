import { Pressable, StyleSheet, Text, View } from "react-native";
import { HackerNewsItem } from "../api/hackerNews/hackerNews.types";
import { getDomainFromUrl } from "../utils/getDomainFromUrl";
import { getRelativeTime } from "../utils/getRelativeTime";
import { useBookmarksStore } from "../store/bookmarksStore";

type Props = {
  article: HackerNewsItem;
  onPress: () => void;
  actionMode: "toggle" | "remove";
};

export default function ArticleCard({
  article,
  onPress,
  actionMode = "toggle",
}: Props) {
  const toggleBookmark = useBookmarksStore((state) => state.toggleBookmark);
  const removeBookmark = useBookmarksStore((state) => state.removeBookmark);
  const bookmarkedArticles = useBookmarksStore(
    (state) => state.bookmarkedArticles,
  );

  const isBookmarked = bookmarkedArticles.some(
    (saved) => saved.id === article.id,
  );

  const handleActionPress = () => {
    if (actionMode === "remove") {
      removeBookmark(article.id);
      return;
    }

    toggleBookmark(article);
  };

  const actionLabel =
    actionMode === "remove" ? "Remove" : isBookmarked ? "Saved" : "Save";

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{article.title}</Text>

        <Pressable onPress={handleActionPress} style={styles.actionButton}>
          <Text style={styles.actionText}>{actionLabel}</Text>
        </Pressable>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>Score: {article.score}</Text>
        <Text style={styles.metaText}>
          Comments: {article.descendants ?? 0}
        </Text>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>{getDomainFromUrl(article.url)}</Text>
        <Text style={styles.metaText}>{getRelativeTime(article.time)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    gap: 8,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
  },
  actionButton: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  actionText: {
    fontSize: 12,
    fontWeight: "600",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaText: {
    fontSize: 13,
    color: "#6B7280",
  },
});
