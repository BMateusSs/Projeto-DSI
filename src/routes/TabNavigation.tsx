import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

import Home from "../screens/auth/HomeScreen";
import Library from "../screens/library/LibraryScreen";
import Store from "../screens/store/StoreScreen";
import Professionals from "../screens/ProfessionalsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
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
      <Tab.Screen 
        name="Perfil" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}