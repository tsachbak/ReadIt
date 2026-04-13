import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { logout } from "../services/authService";
import { useAuth } from "../hooks/useAuth";
import { useFeed } from "../hooks/useFeed";
import { getDomainFromUrl } from "../utils/getDomainFromUrl";
import { getRelativeTime } from "../utils/getRelativeTime";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Feed">;

export default function FeedScreen({ navigation }: Props) {
  const { signOut } = useAuth();
  const {
    articles,
    isLoading,
    isLoadingMore,
    isRefreshing,
    errorMessage,
    loadMore,
    refresh,
  } = useFeed();

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
          <Pressable
            style={styles.articleRow}
            onPress={() => navigation.navigate("Detail", { article: item })}
          >
            <Text style={styles.articleTitle}>{item.title}</Text>

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>Score: {item.score}</Text>
              <Text style={styles.metaText}>
                Comments: {item.descendants ?? 0}
              </Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{getDomainFromUrl(item.url)}</Text>
              <Text style={styles.metaText}>{getRelativeTime(item.time)}</Text>
            </View>
          </Pressable>
        )}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={refresh}
        ListFooterComponent={
          isLoadingMore ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator />
            </View>
          ) : null
        }
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
    gap: 8,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  metaText: {
    fontSize: 13,
    color: "#6B7280",
    flexShrink: 1,
  },
  footerLoader: {
    paddingVertical: 16,
  },
});
