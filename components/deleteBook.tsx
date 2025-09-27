import { Book } from "@/data/books";
import { useBook } from "@/providers/bookContext";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Alert, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

interface DeleteBookProps {
    book: Book
}

export const DeleteBook: React.FC<DeleteBookProps> = ({ book }) => {
    const { deleteBook } = useBook();
    const theme = useTheme();

    const handleDelete = () => {
        Alert.alert(
            'Ta bort',
            `Är du säker på att du vill ta bort ${book.title}?`,
            [
                {
                    text: 'Nej',
                    style: 'cancel'
                },
                {
                    text: 'Ja',
                    style: 'destructive',
                    onPress: async () => {
                        deleteBook(book.id);
                        if (router.canGoBack()) {
                            router.back();
                        } else {
                            router.replace('/(tabs)/books/');
                        }
                    }
                }
            ]
        );
    };

    return (
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <MaterialIcons name="delete-outline" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    deleteButton: {
        alignSelf: "flex-end",
        padding: 8,
    },
})