import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../screens/auth/LoginScreen";
import SignUp from "../screens/auth/SignUpScreen";
import Password from "../screens/auth/Password";
import PasswordRecoveryCode from "../screens/auth/PasswordRecoveryCode";
import { NewPassword } from "../screens/auth/NewPassword";
import PreferencesScreen from "../screens/auth/Preferences";
import TabNavigation from "./TabNavigation";
import AddWineScreen from "../screens/library/AddWineScreen";

const Stack = createNativeStackNavigator();

function StackRoute() {
  return (
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="RecoveryCode" component={PasswordRecoveryCode} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="Preferences" component={PreferencesScreen} />
        <Stack.Screen name="Adicionar Vinhos" component={AddWineScreen} />
        
        <Stack.Screen 
          name="Home" 
          component={TabNavigation} 
          options={{ gestureEnabled: false, headerShown: false }}
        />


      </Stack.Navigator>
  );
}

export default StackRoute;