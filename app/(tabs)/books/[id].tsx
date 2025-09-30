import { DeleteBook } from "@/components/deleteBook";
import { useBook } from "@/providers/bookContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";

import { BookImage } from "@/components/bookImage";
import { useEffect } from "react";

export default function Book() {
  const { books } = useBook();
  const { id } = useLocalSearchParams();
  const book = books.find((b) => b.id === id);

  useEffect(() => {
    if (!book) {
      router.replace("/(tabs)/books/");
    }
  }, [book]);

  if (!book) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
    >
      <View style={styles.container}>
        <Surface style={styles.surface}>
          <View style={styles.top}>
            <Text style={styles.title} variant="titleLarge">
              {book.title}
            </Text>
            <DeleteBook book={book} />
          </View>
          <Text style={styles.author} variant="bodySmall">
            {book.author}
          </Text>
          <BookImage item={book} style={styles.image} />
          <View style={styles.text}>
            <Text variant="titleMedium">
              Your Thoughts{" "}
              {
                <MaterialCommunityIcons
                  name="thought-bubble-outline"
                  size={20}
                />
              }
            </Text>
            <Text style={styles.text} variant="bodyMedium">
              {book.review}
            </Text>
          </View>
          <View style={styles.gradeContainer}>
            <Text variant="titleMedium">You graded this 👉 </Text>
            <Text variant="titleMedium">
              {book.grade ? `${book.grade}/5` : "No grade"}
            </Text>
          </View>
          <View style={styles.isbn}>
            <Text variant="titleSmall">ISBN: </Text>
            <Text variant="bodyMedium">{book.ISBN}</Text>
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  surface: {
    padding: 30,
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 20,
  },
  image: {
    height: 200,
    width: "100%",
    resizeMode: "contain",
  },
  text: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  gradeContainer: {
    flexDirection: "row",
  },
  author: {
    alignSelf: "flex-start",
    paddingBottom: 15,
  },
  isbn: {
    paddingTop: 20,
    flexDirection: "row",
  },
});
