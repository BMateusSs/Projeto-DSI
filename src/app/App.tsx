import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../screens/auth/LoginScreen";
import SignUp from "../screens/auth/SignUpScreen";
import Password from "../screens/auth/Password";
import PasswordRecoveryCode from "../screens/auth/PasswordRecoveryCode";
import { NewPassword } from "../screens/auth/NewPassword";
import PreferencesScreen from "../screens/auth/Preferences";
import TabNavigation from "../routes/TabNavigation"; // TabNavigation já inclui Home, Library, Adega, Store

import StackRoute from "../routes/StackRoute";
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StackRoute/>
    </NavigationContainer>
  );
}

export default App;