import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { fetchTopStoriesPage } from "../api/hackerNews/hackerNewsApi";
import { HackerNewsItem } from "../api/hackerNews/hackerNews.types";
import { logout } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

export default function FeedScreen() {
  const { signOut } = useAuth();

  const [articles, setArticles] = useState<HackerNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const data = await fetchTopStoriesPage(0);
        setArticles(data);
      } catch {
        setErrorMessage("Failed to load articles");
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  const handleLogout = async () => {
    await logout();
    signOut();
  };

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator />
        <Text>Loading feed...</Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.centeredContainer}>
        <Text>{errorMessage}</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />

      <FlatList
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.articleRow}>
            <Text style={styles.articleTitle}>{item.title}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 24,
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
  articleTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
});
