import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import FeedScreen from "../screens/FeedScreen";
import ArticleDetailScreen from "../screens/ArticleDetailScreen";
import SavedArticlesScreen from "../screens/SavedArticlesScreen";
import { RootStackParamList } from "./types";
import { useAuth } from "../hooks/useAuth";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Feed"
              component={FeedScreen}
              options={{ headerBackVisible: false }}
            />
            <Stack.Screen
              name="Detail"
              component={ArticleDetailScreen}
              options={{ title: "Article Detail" }}
            />
            <Stack.Screen
              name="SavedArticles"
              component={SavedArticlesScreen}
              options={{
                title: "Favourite Articles",
                headerBackVisible: false,
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerBackVisible: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
