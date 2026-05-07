import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function Index() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchPosts = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );

      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`);
      }

      const data: Post[] = await response.json();

      setPosts(data);
    } catch (err) {
      setError("Nie udało się pobrać danych z serwera.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Lista postów</Text>

      {loading && (
        <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Text style={styles.postId}>ID: {item.id}</Text>

            <Text style={styles.postTitle}>{item.title}</Text>

            <Text style={styles.postBody}>{item.body}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },

  errorText: {
    color: "red",
    marginBottom: 16,
    textAlign: "center",
  },

  postCard: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },

  postId: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },

  postBody: {
    fontSize: 14,
  },
});
