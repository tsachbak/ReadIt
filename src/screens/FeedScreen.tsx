import { Button, StyleSheet, Text, View } from "react-native";
import { logout } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

export default function FeedScreen() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await logout();
    signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
});
