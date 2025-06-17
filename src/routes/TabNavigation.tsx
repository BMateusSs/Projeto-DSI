import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';

import Home from "../screens/auth/HomeScreen";
import Library from "../screens/library/LibraryScreen";
import Professionals from "../screens/ProfessionalsScreen";
import Store from "../screens/store/StoreScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <>
      <StatusBar backgroundColor="#6B2737" barStyle="light-content" />
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#6B2737" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold", fontSize: 25 },
          tabBarActiveTintColor: "#6B2737",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="home" color={color} size={size} />
            ),
            headerShown: false
          }}
        />
        <Tab.Screen 
          name="Biblioteca" 
          component={Library} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="book-open" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Lojas" 
          component={Store} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="storefront" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Profissionais" 
          component={Professionals} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="users" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}