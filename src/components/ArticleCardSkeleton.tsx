import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

/**
 * Animated shimmer skeleton rendered while articles are loading.
 *
 * Mimics the ArticleCard layout to prevent layout shift when real content arrives.
 */
export default function ArticleCardSkeleton() {
  const shimmerTranslateX = useRef(new Animated.Value(-140)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(shimmerTranslateX, {
        toValue: 380,
        duration: 1100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    loop.start();

    return () => {
      loop.stop();
    };
  }, [shimmerTranslateX]);

  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <View style={[styles.block, styles.sourcePill]} />
        <View style={[styles.block, styles.actionPill]} />
      </View>

      <View style={[styles.block, styles.titleLineOne]} />
      <View style={[styles.block, styles.titleLineTwo]} />

      <View style={[styles.block, styles.authorLine]} />

      <View style={styles.rowBetween}>
        <View style={[styles.block, styles.statChip]} />
        <View style={[styles.block, styles.statChip]} />
      </View>

      <View style={styles.rowBetween}>
        <View style={[styles.block, styles.footerLine]} />
        <View style={[styles.block, styles.footerLineShort]} />
      </View>

      <Animated.View
        pointerEvents="none"
        style={[
          styles.shimmer,
          {
            transform: [{ translateX: shimmerTranslateX }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    gap: 12,
    overflow: "hidden",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  block: {
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
  },
  sourcePill: {
    height: 24,
    width: "45%",
    borderRadius: 999,
  },
  actionPill: {
    height: 24,
    width: 64,
    borderRadius: 999,
  },
  titleLineOne: {
    height: 18,
    width: "92%",
  },
  titleLineTwo: {
    height: 18,
    width: "70%",
  },
  authorLine: {
    height: 14,
    width: "42%",
  },
  statChip: {
    height: 48,
    width: "48%",
    borderRadius: 14,
  },
  footerLine: {
    height: 14,
    width: "38%",
  },
  footerLineShort: {
    height: 14,
    width: "24%",
  },
  shimmer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 120,
    backgroundColor: "rgba(255,255,255,0.45)",
  },
});
