import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackRoute from "../routes/ProfessionalDetailsScreen";

function App() {
  return (
    <NavigationContainer>
      <StackRoute/>
    </NavigationContainer>
  );
}

export default App;