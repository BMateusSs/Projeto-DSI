import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import Home from "../screens/auth/HomeScreen";
import Library from "../screens/library/LibraryScreen";
import Professionals from "../screens/ProfessionalsScreen";
import Store from "../screens/store/StoreScreen";
import ProfessionaisScreen from '../screens/profissionais/ProfissionaisScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

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
            <Ionicons name="home-outline" color={color} size={size} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Adega" 
        component={Library} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wine-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Lojas" 
        component={Store} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="storefront-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Professionais" 
        component={ProfessionaisScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}