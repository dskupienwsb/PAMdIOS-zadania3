import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
}

export default function Create() {
  const [loading, setLoading] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const [serverResponse, setServerResponse] = useState<Post | null>(null);

  const createPost = async (): Promise<void> => {
    if (!title || !body || !userId) {
      Alert.alert("Błąd", "Wszystkie pola muszą być uzupełnione.");
      return;
    }

    try {
      setLoading(true);

      const newPost = {
        title,
        body,
        userId: Number(userId),
      };

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        },
      );

      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`);
      }

      const data: Post = await response.json();

      setServerResponse(data);

      Alert.alert("Sukces", "Post został wysłany.");

      setTitle("");
      setBody("");
      setUserId("");
    } catch (err) {
      Alert.alert("Błąd", "Nie udało się wysłać danych.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
              <Text style={styles.header}>Dodaj nowy post</Text>

              <View style={styles.formContainer}>
                <TextInput
                  placeholder="Tytuł"
                  placeholderTextColor="#888"
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                />

                <TextInput
                  placeholder="Treść"
                  placeholderTextColor="#888"
                  style={[styles.input, styles.textArea]}
                  value={body}
                  onChangeText={setBody}
                  multiline
                />

                <TextInput
                  placeholder="User ID"
                  placeholderTextColor="#888"
                  style={styles.input}
                  value={userId}
                  onChangeText={setUserId}
                  keyboardType="numeric"
                />

                <Button
                  title={loading ? "Wysyłanie..." : "Wyślij"}
                  onPress={createPost}
                />
              </View>

              {serverResponse && (
                <View style={styles.responseBox}>
                  <Text style={styles.responseTitle}>Odpowiedź serwera:</Text>

                  <Text>{JSON.stringify(serverResponse, null, 2)}</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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

  formContainer: {
    padding: 16,
    backgroundColor: "#e8f0fe",
    borderRadius: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
    color: "#000",
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  responseBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#d4edda",
    borderRadius: 8,
  },

  responseTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
});
