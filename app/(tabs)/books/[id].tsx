import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Book() {
    const { id } = useLocalSearchParams();
    return (
        <View style={styles.container}>
            <Text>This is a book detail {id}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    }
})