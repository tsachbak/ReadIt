import { useCallback } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HackerNewsItem } from "../api/hackerNews/hackerNews.types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../hooks/useAuth";
import { useFeed } from "../hooks/useFeed";
import { RootStackParamList } from "../navigation/types";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import TopBar from "../components/TopBar";
import ArticleCard from "../components/ArticleCard";
import ArticleCardSkeleton from "../components/ArticleCardSkeleton";

type Props = NativeStackScreenProps<RootStackParamList, "Feed">;

/**
 * Main feed screen showing Hacker News top stories with refresh and pagination.
 */
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
  const isConnected = useNetworkStatus();

  /**
   * Delegates sign-out to the auth provider, which owns token lifecycle logic.
   */
  const handleLogout = async () => {
    await signOut();
  };

  const renderItem = useCallback(
    ({ item, index }: { item: HackerNewsItem; index: number }) => (
      <ArticleCard
        article={item}
        onPress={() => navigation.navigate("Detail", { article: item })}
        actionMode="toggle"
        enableEntryAnimation
        animationDelayMs={Math.min(index * 35, 210)}
      />
    ),
    [navigation],
  );

  const showRefreshSkeleton = isRefreshing && articles.length > 0;

  if (isLoading) {
    return (
      <View style={styles.container}>
        <TopBar
          title="Top Stories"
          activeTab="feed"
          isConnected={isConnected}
          onFeedPress={() => navigation.navigate("Feed")}
          onSavedPress={() => navigation.navigate("SavedArticles")}
          onLogout={handleLogout}
        />

        <ScrollView
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.loadingLabel}>Fetching top stories...</Text>
          {Array.from({ length: 6 }).map((_, index) => (
            <ArticleCardSkeleton key={`skeleton-${index}`} />
          ))}
        </ScrollView>
      </View>
    );
  }

  if (errorMessage && articles.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Text>{errorMessage}</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopBar
        title="Top Stories"
        activeTab="feed"
        isConnected={isConnected}
        onFeedPress={() => navigation.navigate("Feed")}
        onSavedPress={() => navigation.navigate("SavedArticles")}
        onLogout={handleLogout}
      />

      <FlatList
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={refresh}
        windowSize={10}
        maxToRenderPerBatch={5}
        ListHeaderComponent={
          showRefreshSkeleton ? (
            <View style={styles.refreshSkeletonContainer}>
              <ArticleCardSkeleton />
              <ArticleCardSkeleton />
            </View>
          ) : null
        }
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
  loadingLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
    paddingBottom: 4,
  },
  refreshSkeletonContainer: {
    gap: 12,
    paddingBottom: 12,
  },
  footerLoader: {
    paddingVertical: 16,
  },
});
