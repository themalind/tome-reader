import { useBook } from "@/providers/bookContext";
import { useFonts } from "expo-font";
import LottieView from "lottie-react-native";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function Index() {
  const { books } = useBook();
  const [fontsLoaded] = useFonts({
    MedievalSharp: require("../../assets/fonts/MedievalSharp-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#D3AF37" />
        <LottieView
          autoPlay
          style={styles.lottieAni}
          source={require("../../assets/animations/LoadingScreen.json")}
        />
      </View>
    );
  }
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.textHeader}>Tome-Reader</Text>
        <Text style={styles.text}>
          You have {books.length} tomes in your collection
        </Text>
        {/* <Image style={styles.image} source={require('../../assets/images/tomeReaderTransparent.png')} /> */}
        <LottieView
          source={require("../../assets/animations/LibraryCat.json")}
          autoPlay
          style={styles.lottieAni}
        />
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
    alignItems: "center",
  },
  image: {
    height: "80%",
    width: "80%",
    resizeMode: "contain",
  },
  textHeader: {
    paddingTop: 150,
    fontSize: 30,
    fontWeight: 700,
    fontFamily: "MedievalSharp",
    paddingBottom: 20,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "MedievalSharp",
    padding: 20,
    fontWeight: 700,
  },
  lottieAni: {
    width: 350,
    height: 350,
    marginLeft: 20,
  },
});
