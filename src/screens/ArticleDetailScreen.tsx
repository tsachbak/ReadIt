import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { StyleSheet, Text, View } from "react-native";

type ArticleDetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

type Props = {
  route: ArticleDetailScreenRouteProp;
};

export default function ArticleDetailScreen({ route }: Props) {
  const { article } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.meta}>Author: {article.by}</Text>
      <Text style={styles.meta}>Score: {article.score}</Text>
      <Text style={styles.meta}>
        Date: {new Date(article.time * 1000).toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  meta: {
    fontSize: 16,
  },
});
