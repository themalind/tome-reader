import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import "react-native-reanimated";
import LottieView from "lottie-react-native";
import { useTheme } from "react-native-paper";

export default function BookLayout() {
  const theme = useTheme();

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.inversePrimary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Your Collection",
            headerLeft: () => (
              <View style={style.lottieContainer}>
                <LottieView
                  source={require("../../../assets/animations/Books.json")}
                  style={style.lottieAni}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen name="[id]" options={{ title: "Details" }} />
      </Stack>
    </>
  );
}

const style = StyleSheet.create({
  lottieContainer: {
    marginRight: 10,
    justifyContent: "space-between",
  },
  lottieAni: {
    width: 60,
    height: 60,
    alignSelf: "flex-start",
  },
});
