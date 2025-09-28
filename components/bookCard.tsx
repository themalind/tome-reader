import { Book } from "@/data/books";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { NoImage } from "./noImage";
import { BookImage } from "./bookImage";

export const BookCard = React.memo(({ item, onPress }: { item: Book, onPress: () => void }) => {

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <Surface style={styles.surface}>
                    <BookImage item={item} style={styles.image} />
                    <Text style={styles.title} variant="titleMedium">{item.title}</Text>
                    <Text variant="bodySmall">{item.author}</Text>
                    <Text variant="bodyMedium" style={styles.grade}>
                        {item.grade ? (
                            <>
                                {`${item.grade}/5`} <FontAwesome name="star" size={15} />
                            </>
                        ) : (
                            <>
                                {'No grade yet'} <FontAwesome6 name="face-sad-tear" size={20} />
                            </>
                        )}
                    </Text>
                </Surface>
            </View>
        </TouchableWithoutFeedback>
    );
});

BookCard.displayName = 'BookCard';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        padding: 10,
    },
    surface: {
        padding: 20,
    },
    image: {
        height: 200,
        width: "100%",
        resizeMode: "contain",
    },
    grade: {
        alignSelf: "flex-end"
    },
    title: {
        paddingTop: 15,
        textDecorationLine: "underline"
    }

})