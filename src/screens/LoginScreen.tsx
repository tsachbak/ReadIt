import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { login } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

export default function LoginScreen() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("user@readit.dev");
  const [password, setPassword] = useState("password123");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    try {
      setIsSubmitting(true);

      await login(email, password);
      signIn();
    } catch {
      Alert.alert("Login failed", "Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.heroSection}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>R</Text>
        </View>

        <Text style={styles.eyebrow}>SQLink Assignment</Text>
        <Text style={styles.title}>Welcome to ReadIt</Text>
        <Text style={styles.subtitle}>
          Catch up with top Hacker News stories in a clean, offline-friendly
          reading experience.
        </Text>
      </View>

      <View style={styles.formCard}>
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>Sign in</Text>
          <Text style={styles.formDescription}>
            Use the mock credentials below to enter the app.
          </Text>
        </View>

        <View style={styles.credentialsHint}>
          <Text style={styles.hintLabel}>Demo account</Text>
          <Text style={styles.hintText}>user@readit.dev / password123</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="user@readit.dev"
            placeholderTextColor="#94A3B8"
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordInputWrapper}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!isPasswordVisible}
              style={[styles.input, styles.passwordInput]}
            />

            <Pressable
              onPress={() => setIsPasswordVisible((current) => !current)}
              style={styles.passwordToggleButton}
            >
              <Text style={styles.passwordToggleText}>
                {isPasswordVisible ? "Hide" : "Show"}
              </Text>
            </Pressable>
          </View>
        </View>

        <Pressable
          onPress={handleLogin}
          disabled={isSubmitting}
          style={({ pressed }) => [
            styles.loginButton,
            isSubmitting && styles.loginButtonDisabled,
            pressed && !isSubmitting && styles.loginButtonPressed,
          ]}
        >
          <Text style={styles.loginButtonText}>
            {isSubmitting ? "Logging in..." : "Continue to Feed"}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 24,
  },
  heroSection: {
    gap: 10,
  },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#64748B",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: "#475569",
    maxWidth: 320,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOpacity: 0.07,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 3,
  },
  formHeader: {
    gap: 6,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },
  formDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: "#64748B",
  },
  credentialsHint: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 4,
  },
  hintLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  hintText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: "#0F172A",
    backgroundColor: "#FFFFFF",
  },
  passwordInputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  passwordInput: {
    paddingRight: 72,
  },
  passwordToggleButton: {
    position: "absolute",
    right: 14,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  passwordToggleText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4338CA",
  },
  loginButton: {
    marginTop: 4,
    backgroundColor: "#111827",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonPressed: {
    opacity: 0.94,
  },
  loginButtonDisabled: {
    backgroundColor: "#475569",
  },
  loginButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
