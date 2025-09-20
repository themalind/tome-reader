import { useFonts } from "expo-font";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
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
                <Image style={styles.image} source={require('../../assets/images/tomeReaderOld.png')} />
                <Text style={styles.text}>Tome-Reader</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: "black",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        height: "80%",
        width: "80%",
        resizeMode: "contain"
    },
    text: {
        color: "#D3AF37",
        fontSize: 30,
        fontFamily: "MedievalSharp-Regular"
    }

})