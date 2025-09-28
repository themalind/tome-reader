import React from "react";
import { Image, StyleSheet } from "react-native";


export const NoImage = () => {
    return (
        <Image source={require("../assets/images/noImage.png")} style={styles.image} />
    );
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: "100%",
        resizeMode: "contain",
    }
})