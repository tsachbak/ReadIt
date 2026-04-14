import { StyleSheet, Text, View } from "react-native";

type Props = {
  score: number;
  comments: number;
};

/**
 * Slim bar mounted above the WebView reader showing article score and comment count.
 */
export default function ArticleReaderStatsBar({ score, comments }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.inlineStatText}>Score {score}</Text>
      <Text style={styles.inlineStatDivider}>•</Text>
      <Text style={styles.inlineStatText}>Comments {comments}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
  },
  inlineStatText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
  },
  inlineStatDivider: {
    fontSize: 12,
    color: "#94A3B8",
  },
});
