import { HapticTab } from "@/components/haptic-tab";
import { FontAwesome, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
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
        name="add-new"
        options={{
          title: "Add new book",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="add" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search-api"
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
