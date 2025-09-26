import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme,
} from "@react-navigation/native";
import merge from "deepmerge";
import { MD3DarkTheme, MD3LightTheme, MD3Theme, adaptNavigationTheme } from "react-native-paper";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

type appTheme = MD3Theme & Theme;

export const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
export const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);
