import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarButton: HapticTab,
        headerStyle: { backgroundColor: '#b3c1b7ff' }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="addNew"
        options={{
          title: 'Add book',
          tabBarIcon: ({ color }) => <FontAwesome6 name="add" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="books"
        options={{
          title: 'Your collection',
          tabBarIcon: ({ color }) => <FontAwesome name="book" size={24} color={color} />,
        }}
      />
    </Tabs >
  );
}
