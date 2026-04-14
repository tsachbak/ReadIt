import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HackerNewsItem } from "../api/hackerNews/hackerNews.types";
import { getDomainFromUrl } from "../utils/getDomainFromUrl";
import { getRelativeTime } from "../utils/getRelativeTime";
import { useBookmarksStore } from "../store/bookmarksStore";

type Props = {
  article: HackerNewsItem;
  onPress: () => void;
  actionMode: "toggle" | "remove";
  enableEntryAnimation?: boolean;
  animationDelayMs?: number;
  animationTrigger?: number;
};

export default function ArticleCard({
  article,
  onPress,
  actionMode = "toggle",
  enableEntryAnimation = false,
  animationDelayMs = 0,
  animationTrigger = 0,
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

  const sourceLabel = getDomainFromUrl(article.url);
  const timeLabel = getRelativeTime(article.time);
  const actionButtonStyle =
    actionMode === "remove"
      ? styles.removeButton
      : isBookmarked
        ? styles.savedButton
        : styles.saveButton;

  const actionTextStyle =
    actionMode === "remove"
      ? styles.removeButtonText
      : isBookmarked
        ? styles.savedButtonText
        : styles.saveButtonText;

  const animatedOpacity = useRef(
    new Animated.Value(enableEntryAnimation ? 0 : 1),
  ).current;
  const animatedTranslateY = useRef(
    new Animated.Value(enableEntryAnimation ? 24 : 0),
  ).current;
  const animatedScale = useRef(
    new Animated.Value(enableEntryAnimation ? 0.97 : 1),
  ).current;

  useEffect(() => {
    if (!enableEntryAnimation) {
      animatedOpacity.setValue(1);
      animatedTranslateY.setValue(0);
      animatedScale.setValue(1);
      return;
    }

    animatedOpacity.setValue(0);
    animatedTranslateY.setValue(24);
    animatedScale.setValue(0.97);

    const animation = Animated.parallel([
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 420,
        delay: animationDelayMs,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(animatedTranslateY, {
        toValue: 0,
        duration: 420,
        delay: animationDelayMs,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(animatedScale, {
        toValue: 1,
        duration: 420,
        delay: animationDelayMs,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => {
      animation.stop();
    };
  }, [
    animatedOpacity,
    animatedScale,
    animatedTranslateY,
    animationDelayMs,
    animationTrigger,
    enableEntryAnimation,
  ]);

  return (
    <Animated.View
      style={{
        opacity: animatedOpacity,
        transform: [
          { translateY: animatedTranslateY },
          { scale: animatedScale },
        ],
      }}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.container,
          pressed && styles.containerPressed,
        ]}
      >
        <View style={styles.headerRow}>
          <View style={styles.sourcePill}>
            <Text style={styles.sourcePillText}>{sourceLabel}</Text>
          </View>

          <Pressable
            onPress={handleActionPress}
            style={[styles.actionButton, actionButtonStyle]}
          >
            <Text style={[styles.actionText, actionTextStyle]}>
              {actionLabel}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.title}>{article.title}</Text>

        <Text style={styles.authorText}>by {article.by}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statChip}>
            <Text style={styles.statLabel}>Score</Text>
            <Text style={styles.statValue}>{article.score}</Text>
          </View>

          <View style={styles.statChip}>
            <Text style={styles.statLabel}>Comments</Text>
            <Text style={styles.statValue}>{article.descendants ?? 0}</Text>
          </View>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>{timeLabel}</Text>
          <Text style={styles.footerText}>HN Story</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    gap: 12,
    shadowColor: "#0F172A",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },
  containerPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.995 }],
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  sourcePill: {
    maxWidth: "70%",
    backgroundColor: "#EEF2FF",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  sourcePillText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4338CA",
  },
  title: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "700",
    color: "#0F172A",
  },
  authorText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  actionButton: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  saveButton: {
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
  },
  savedButton: {
    borderColor: "#D1FAE5",
    backgroundColor: "#ECFDF5",
  },
  removeButton: {
    borderColor: "#FECACA",
    backgroundColor: "#FEF2F2",
  },
  actionText: {
    fontSize: 12,
    fontWeight: "700",
  },
  saveButtonText: {
    color: "#334155",
  },
  savedButtonText: {
    color: "#047857",
  },
  removeButtonText: {
    color: "#B91C1C",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statChip: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 2,
  },
  footerText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
});
