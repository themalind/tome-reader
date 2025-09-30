import { HapticTab } from "@/components/haptic-tab";
import { FontAwesome, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useTheme } from "react-native-paper";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.inversePrimary,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="house-chimney" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="books"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="book" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="addNew"
        options={{
          title: "Add new book",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="add" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="searchApi"
        options={{
          title: "Api",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="api" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
