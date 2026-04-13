import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useBookmarksStore } from "../store/bookmarksStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "SavedArticles">;

export default function SavedArticlesScreen({ navigation }: Props) {
  const bookmarkedArticles = useBookmarksStore(
    (state) => state.bookmarkedArticles,
  );

  const removeBookmark = useBookmarksStore((state) => state.removeBookmark);

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
        <Pressable
          onPress={() => navigation.navigate("Detail", { article: item })}
          style={styles.articleRow}
        >
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.actionsRow}>
            <Button title="Remove" onPress={() => removeBookmark(item.id)} />
          </View>
        </Pressable>
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
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  actionsRow: {
    alignItems: "flex-start",
  },
});
