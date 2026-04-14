import {
  FlatList,
  InteractionManager,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useBookmarksStore } from "../store/bookmarksStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { useAuth } from "../hooks/useAuth";
import { logout } from "../services/authService";
import ArticleCard from "../components/ArticleCard";
import ArticleCardSkeleton from "../components/ArticleCardSkeleton";
import TopBar from "../components/TopBar";
import { useCallback, useState } from "react";

type Props = NativeStackScreenProps<RootStackParamList, "SavedArticles">;

export default function SavedArticlesScreen({ navigation }: Props) {
  const [animationCycle, setAnimationCycle] = useState(0);
  const [showFocusSkeleton, setShowFocusSkeleton] = useState(false);

  const bookmarkedArticles = useBookmarksStore(
    (state) => state.bookmarkedArticles,
  );

  const isConnected = useNetworkStatus();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await logout();
    signOut();
  };

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      let hideSkeletonTimeout: ReturnType<typeof setTimeout> | null = null;

      if (bookmarkedArticles.length > 0) {
        setShowFocusSkeleton(true);
      }

      const interactionTask = InteractionManager.runAfterInteractions(() => {
        if (cancelled) return;
        setAnimationCycle((prev) => prev + 1);

        hideSkeletonTimeout = setTimeout(() => {
          if (cancelled) return;
          setShowFocusSkeleton(false);
        }, 320);
      });

      return () => {
        cancelled = true;
        interactionTask.cancel();
        if (hideSkeletonTimeout) {
          clearTimeout(hideSkeletonTimeout);
        }
      };
    }, [bookmarkedArticles.length]),
  );

  return (
    <View style={styles.container}>
      <TopBar
        title="Saved Articles"
        activeTab="saved"
        isConnected={isConnected}
        onFeedPress={() => navigation.navigate("Feed")}
        onSavedPress={() => navigation.navigate("SavedArticles")}
        onLogout={handleLogout}
      />

      {bookmarkedArticles.length === 0 ? (
        <View style={styles.centered}>
          <Text>No saved articles yet.</Text>
        </View>
      ) : showFocusSkeleton ? (
        <View style={styles.listContent}>
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
        </View>
      ) : (
        <FlatList
          key={`saved-list-${animationCycle}`}
          data={bookmarkedArticles}
          extraData={animationCycle}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <ArticleCard
              article={item}
              onPress={() => navigation.navigate("Detail", { article: item })}
              actionMode="remove"
              enableEntryAnimation
              animationDelayMs={Math.min(index * 35, 210)}
              animationTrigger={animationCycle}
            />
          )}
          contentContainerStyle={styles.listContent}
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
