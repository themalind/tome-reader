import { Book, books } from "@/data/books";
import { router } from "expo-router";
import { FlatList, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

    const bookItem = ({ item }: { item: Book }) => {
        return (

            <TouchableWithoutFeedback onPress={() => router.push({
                pathname: '/(tabs)/books/[id]',
                params: { id: item.id },
            })}>
                <View>
                    <Image
                        source={item.image}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.text}>
                        <Text>{item.title}</Text>
                        <Text>{item.author}</Text>
                        <Text>{item.review}</Text>
                        <Text>{`${item.grade}/5`}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        );
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <FlatList
                    data={books}
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
    },
    image: {
        height: 200,
        width: "100%"
    },
    text: {
        padding: 20
    }
})