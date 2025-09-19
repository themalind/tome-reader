import { Image, StyleSheet, Text, View } from "react-native";

interface Props {
    headerDisplay: string
}

export default function Header(props: Props) {
    return (
        <View style={styles.header}>
            <Image style={styles.logo} source={require("../assets/images/tomeReaderTransparent.png")} />
            <Text style={styles.text}>{props.headerDisplay}</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#b3c1b7ff",
        height: 70,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 60,
        height: 60,
    },
    text: {
        fontWeight: 700,
        fontSize: 20
    }
});