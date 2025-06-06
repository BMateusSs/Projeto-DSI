import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "../screens/auth/LoginScreen";
import SignUp from "../screens/auth/SignUpScreen";
import Password from "../screens/auth/Password";
import SelectProfile from "../screens/auth/SelectProfile";
import PasswordRecoveryCode from "../screens/auth/PasswordRecoveryCode";
import { NewPassword } from "../screens/auth/NewPassword";
import PreferencesScreen from "../screens/auth/Preferences";
import InfoBusiness from "../screens/auth/InfoBusiness";
import InfoProducer from "../screens/auth/InfoProducer";

import TabNavigation from "./TabNavigation"; // TabNavigation já inclui Home, Library, Adega, Store

const Stack = createNativeStackNavigator();

function StackRoute() {
  return (
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SelectProfile" component={SelectProfile} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="RecoveryCode" component={PasswordRecoveryCode} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="Preferences" component={PreferencesScreen} />
        <Stack.Screen name="InfoBusiness" component={InfoBusiness} />
        <Stack.Screen name="InfoProducer" component={InfoProducer} />
        
        <Stack.Screen 
          name="Home" 
          component={TabNavigation} 
          options={{ gestureEnabled: false, headerShown: false }} // Opcional: bloqueia voltar para Login/SignUp via swipe
        />
      </Stack.Navigator>
  );
}

export default StackRoute;