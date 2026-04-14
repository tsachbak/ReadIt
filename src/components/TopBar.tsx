import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  isConnected: boolean | null;
  onFeedPress: () => void;
  onSavedPress: () => void;
  onLogout: () => void;
};

export default function TopBar({
  title,
  isConnected,
  onFeedPress,
  onSavedPress,
  onLogout,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.titleSection}>
          <View
            style={[
              styles.networkIndicator,
              {
                backgroundColor:
                  isConnected === null
                    ? "#9CA3AF"
                    : isConnected
                      ? "#22C55E"
                      : "#EF4444",
              },
            ]}
          />
          <Text style={styles.title}>{title}</Text>
        </View>

        <Pressable onPress={onLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.actionsRow}>
        <Pressable onPress={onFeedPress} style={styles.navButton}>
          <Text style={styles.navButtonText}>Feed</Text>
        </Pressable>

        <Pressable onPress={onSavedPress} style={styles.navButton}>
          <Text style={styles.navButtonText}>Saved</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  titleSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  networkIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    flexShrink: 1,
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F9FAFB",
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
});
