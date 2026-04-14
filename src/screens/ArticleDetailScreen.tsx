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

  if (!article.url) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.meta}>Author: {article.by}</Text>
        <Text style={styles.meta}>Score: {article.score}</Text>
        <Text style={styles.meta}>
          Date: {new Date(article.time * 1000).toLocaleString()}
        </Text>
        <Text style={styles.fallbackText}>No article URL available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>{article.title}</Text>

        <Pressable onPress={handleBookmarkToggle} style={styles.bookmarkButton}>
          <Text style={styles.bookmarkButtonText}>
            {isBookmarked ? "Saved" : "Save"}
          </Text>
        </Pressable>

        <Text style={styles.meta}>Author: {article.by}</Text>
        <Text style={styles.meta}>Score: {article.score}</Text>
        <Text style={styles.meta}>
          Date: {new Date(article.time * 1000).toLocaleString()}
        </Text>
      </View>

      <WebView
        source={{ uri: article.url }}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loaderContainer}>
            <ActivityIndicator />
          </View>
        )}
        style={styles.webView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  bookmarkButton: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  bookmarkButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  meta: {
    fontSize: 16,
  },
  fallbackText: {
    fontSize: 16,
    color: "#6B7280",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  webView: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
