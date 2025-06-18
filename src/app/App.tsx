import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackRoute from "../routes/RouteNames";

function App() {
  return (
    <NavigationContainer>
      <StackRoute/>
    </NavigationContainer>
  );
}

export default App;