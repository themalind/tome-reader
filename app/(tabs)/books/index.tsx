import { Book, books } from "@/data/books";
import { router } from "expo-router";
import { FlatList, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

    const bookItem = ({ item }: { item: Book }) => {
        return (
            <SafeAreaView>
                <TouchableWithoutFeedback onPress={() => router.push({
                    pathname: '/(tabs)/books/[id]',
                    params: { id: item.id },
                })}>
                    <View>
                        <Image
                            source={item.image}
                            alt={item.title}
                            style={styles.image}
                            resizeMode="center"
                        />
                        <View style={styles.text}>
                            <Text>{item.title}</Text>
                            <Text>{item.author}</Text>
                            <Text>{item.review}</Text>
                            <Text>{`${item.grade}/5`}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        );
    }
    return (
        <>
            <View style={styles.container}>
                <FlatList data={books} renderItem={bookItem} keyExtractor={(bookItem: Book) => bookItem.id} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        height: 200,
        width: "98%"
    },
    text: {
        padding: 20
    }

})