import { FlatList, StyleSheet, Text, View } from "react-native";
import { useBookmarksStore } from "../store/bookmarksStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { useAuth } from "../hooks/useAuth";
import { logout } from "../services/authService";
import ArticleCard from "../components/ArticleCard";
import TopBar from "../components/TopBar";

type Props = NativeStackScreenProps<RootStackParamList, "SavedArticles">;

export default function SavedArticlesScreen({ navigation }: Props) {
  const bookmarkedArticles = useBookmarksStore(
    (state) => state.bookmarkedArticles,
  );

  const isConnected = useNetworkStatus();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await logout();
    signOut();
  };

  return (
    <View style={styles.container}>
      <TopBar
        title="Saved Articles"
        isConnected={isConnected}
        onFeedPress={() => navigation.navigate("Feed")}
        onSavedPress={() => navigation.navigate("SavedArticles")}
        onLogout={handleLogout}
      />

      {bookmarkedArticles.length === 0 ? (
        <View style={styles.centered}>
          <Text>No saved articles yet.</Text>
        </View>
      ) : (
        <FlatList
          data={bookmarkedArticles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ArticleCard
              article={item}
              onPress={() => navigation.navigate("Detail", { article: item })}
              actionMode="remove"
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
});
