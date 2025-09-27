import { DeleteBook } from "@/components/deleteBook";
import { useBook } from "@/providers/bookContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Surface, Text } from 'react-native-paper';

import { useEffect } from 'react';

export default function Book() {
    const { books } = useBook();
    const { id } = useLocalSearchParams();
    const book = books.find((b) => b.id === id);

    useEffect(() => {
        if (!book) {
            router.replace('/(tabs)/books/');
        }
    }, [book]);

    if (!book) {
        return null;
    }

    // Stack overflow
    const imageSource = typeof book.imagePath === 'string' || book.imagePath instanceof String ? { uri: book.imagePath } : book.imagePath;

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        >
            <View style={styles.container}>
                <DeleteBook book={book} />
                <Surface style={styles.surface}>
                    <Text style={styles.title} variant="titleLarge">{book.title}</Text>
                    <Text style={styles.author} variant="bodySmall">{book.author}</Text>
                    <Image
                        source={imageSource}
                        alt={book.title}
                        style={styles.image}
                        resizeMode="center"
                    />
                    <View style={styles.text}>
                        <Text variant="titleMedium">Your Thoughts {<MaterialCommunityIcons name="thought-bubble-outline" size={20} />}</Text>
                        <Text style={styles.text} variant="bodyMedium">{book.review}</Text>
                        <Text variant="titleSmall">ISBN: </Text>
                        <Text variant="bodyMedium">{book.ISBN}</Text>
                    </View>
                    <View style={styles.gradeContainer}>
                        <Text variant="titleMedium">You liked it this much 👉 </Text>
                        <Text variant="titleMedium">{book.grade ? `${book.grade}/5` : 'No grade'}</Text>
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
    surface: {
        padding: 30
    },
    title: {
        alignSelf: "flex-start",

    },
    image: {
        height: 200,
        width: "100%",
    },
    text: {
        padding: 10,
    },
    gradeContainer: {
        justifyContent: "center",
        flexDirection: "row"
    },
    author: {
        alignSelf: "flex-start",
        paddingBottom: 15,
    }

})