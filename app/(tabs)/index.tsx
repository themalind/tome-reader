import { useBook } from "@/providers/bookContext";
import { useFonts } from "expo-font";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { Text } from 'react-native-paper'

export default function Index() {
    const { books } = useBook();
    const [fontsLoaded] = useFonts({
        MedievalSharp: require("../../assets/fonts/MedievalSharp-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#D3AF37" />
                <Text>Loading fonts...</Text>
            </View>
        );
    }
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.textHeader}>Tome-Reader</Text>
                <Image style={styles.image} source={require('../../assets/images/tomeReaderTransparent.png')} />
                <Text style={styles.text}>You have {books.length} tomes in your collection</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        height: "80%",
        width: "80%",
        resizeMode: "contain"
    },
    textHeader: {
        fontSize: 30,
        fontWeight: 500,
        fontFamily: "MedievalSharp"
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "MedievalSharp"
    }
})