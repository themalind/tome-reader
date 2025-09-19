import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNavigationContainerRef, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, StatusBar } from "react-native";
import Index from "./components";
import AddNew from "./components/addNew";
import Book from "./components/book";
import Camera from "./components/camera";
import Header from "./components/header";

type RootStackParamList = StaticParamList<typeof Stack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

const MyTabs = createBottomTabNavigator({
  screens: {
    Home: Index,
    AddNew: AddNew,
    Camera: Camera,
  },

});

export const Stack = createNativeStackNavigator({
  initialRouteName: "Index",
  screenOptions: {
    contentStyle: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      paddingBottom: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  },

  screens: {
    Index: {
      screen: MyTabs,
      options: {
        header: () => <Header headerDisplay="Tome-Reader" />,
      },
    },
    Book: {
      screen: Book,
      options: { header: () => <Header headerDisplay="Book details" /> },
    },
    AddNew: {
      screen: AddNew,
      options: { title: "Add new Book" },
    },
    Camera: {
      screen: Camera,
      options: { title: "Take picture" },
    },
  },
});

export const navigationRef = createNavigationContainerRef();

export function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

// add other navigation functions that you need and export them
// https://reactnavigation.org/docs/navigating-without-navigation-prop/?config=static
// https://reactnavigation.org/docs/typescript/
