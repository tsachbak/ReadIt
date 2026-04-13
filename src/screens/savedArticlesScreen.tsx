import { FlatList, StyleSheet, Text, View } from "react-native";
import { useBookmarksStore } from "../store/bookmarksStore";

export default function SavedArticlesScreen() {
  const bookmarkedArticles = useBookmarksStore(
    (state) => state.bookmarkedArticles,
  );

  if (bookmarkedArticles.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No saved articles yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={bookmarkedArticles}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <View style={styles.articleRow}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  articleRow: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
});
