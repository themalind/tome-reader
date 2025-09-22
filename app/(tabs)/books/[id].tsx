import { books } from "@/data/books";
import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Book() {
    const { id } = useLocalSearchParams();

    const book = books.find((b) => b.id === id);

    if (!book) {
        throw new Error('Something went wrong!');
    }

    return (
        <View style={styles.container}>
            <Image
                source={book.image}
                alt={book.title}
                style={styles.image}
                resizeMode="center"
            />
            <Text>This is a book detail {book.id}</Text>
            <Text>This is a book detail {book.id}</Text>
            <Text>This is a book detail {book.id}</Text>


        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        height: 200,
        width: "98%"
    },
    notFound: {
        fontSize: 20,
        fontWeight: "bold",
        color: "red",
    },
})