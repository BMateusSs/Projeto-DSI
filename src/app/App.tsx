import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackRoute from "../routes/StackRoute";
import { StatusBar } from "react-native";

function App() {
  return (
    <>
    <StatusBar backgroundColor="black" barStyle="light-content" />
    <NavigationContainer>
    <StackRoute/>
    </NavigationContainer>
    </>
  );
}

export default App;