import "react-native-gesture-handler";
import AppNavigator from "./src/navigation/AppNavigator";
import AuthProvider from "./src/store/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
