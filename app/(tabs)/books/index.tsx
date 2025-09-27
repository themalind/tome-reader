import { Book } from "@/data/books";
import { useBook } from "@/providers/bookContext";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback } from "react";
import { FlatList, Image, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    const { books } = useBook();
    console.log(books);

    const bookItem = useCallback(({ item }: { item: Book }) => {
        const imageSource = typeof item.imagePath === 'string' || item.imagePath instanceof String ? { uri: item.imagePath } : item.imagePath;
        return (
            <TouchableWithoutFeedback onPress={() => router.push({
                pathname: '/(tabs)/books/[id]',
                params: { id: item.id },
            })}>
                <View style={styles.container}>
                    <Surface style={styles.surface}>
                        <Image
                            source={imageSource}
                            alt={item.title}
                            style={styles.image}
                            resizeMode="center"
                        />
                        <Text style={styles.title} variant="titleMedium">{item.title}</Text>
                        <Text variant="bodySmall">{item.author}</Text>
                        <Text variant="bodyMedium" style={styles.grade}>
                            {item.grade ? (
                                <>
                                    {`${item.grade}/5`} <FontAwesome name="star" size={15} />
                                </>
                            ) : (
                                <>
                                    {'No grade yet'} <FontAwesome6 name="sad-tear" size={20} />
                                </>
                            )}
                        </Text>
                    </Surface>
                </View>
            </TouchableWithoutFeedback>

        );
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <FlatList
                    data={books.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime())}
                    renderItem={bookItem}
                    keyExtractor={(bookItem: Book) => bookItem.id}
                    showsVerticalScrollIndicator={true}
                />
            </View>
        </SafeAreaView>
    );
}

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