import BooksProvider from "@/providers/bookContext";
import { AppDarkTheme, AppDefaultTheme } from "@/theme";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === "dark" ? AppDarkTheme : AppDefaultTheme;

  return (
    // themeprovider är för header, och tabs det som är en del av react navigation.
    // PaperProvider är för designsystemet.
    <PaperProvider theme={theme}>
      <ThemeProvider value={theme}>
        <BooksProvider>
          <StatusBar style="auto" />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </BooksProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}
