import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "./LoginScreen";
import SignUp from "./SignUpScreen";
import Home from "./HomeScreen";
import Password from "./Password";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Password" component={Password}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default App;
