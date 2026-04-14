import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  activeTab: "feed" | "saved";
  isConnected: boolean | null;
  onFeedPress: () => void;
  onSavedPress: () => void;
  onLogout: () => void;
};

export default function TopBar({
  title,
  activeTab,
  isConnected,
  onFeedPress,
  onSavedPress,
  onLogout,
}: Props) {
  const statusLabel =
    isConnected === null
      ? "Checking connection"
      : isConnected
        ? "Online"
        : "Offline";

  const statusColor =
    isConnected === null ? "#94A3B8" : isConnected ? "#16A34A" : "#DC2626";

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.titleBlock}>
          <Text style={styles.eyebrow}>ReadIt</Text>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.statusBadge}>
            <View
              style={[
                styles.networkIndicator,
                {
                  backgroundColor: statusColor,
                },
              ]}
            />
            <Text style={styles.statusText}>{statusLabel}</Text>
          </View>
        </View>

        <Pressable onPress={onLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.actionsRow}>
        <Pressable
          onPress={onFeedPress}
          style={[
            styles.navButton,
            activeTab === "feed" && styles.navButtonActive,
          ]}
        >
          <Text
            style={[
              styles.navButtonText,
              activeTab === "feed" && styles.navButtonTextActive,
            ]}
          >
            Feed
          </Text>
        </Pressable>

        <Pressable
          onPress={onSavedPress}
          style={[
            styles.navButton,
            activeTab === "saved" && styles.navButtonActive,
          ]}
        >
          <Text
            style={[
              styles.navButtonText,
              activeTab === "saved" && styles.navButtonTextActive,
            ]}
          >
            Saved
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  titleBlock: {
    flex: 1,
    gap: 6,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#64748B",
  },
  networkIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
    flexShrink: 1,
  },
  statusBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
  },
  logoutButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  navButton: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  navButtonActive: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
  },
  navButtonTextActive: {
    color: "#FFFFFF",
  },
});
