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
import AddStoreScreen from "../screens/store/AddStoreScreen";

export const ROUTE_NAMES = {
  LOGIN: "Login",
  SIGN_UP: "SignUp",
  PASSWORD_RECOVERY: "Password", // Matches "Password" in StackRoute
  PASSWORD_RECOVERY_CODE: "RecoveryCode", // Matches "RecoveryCode" in StackRoute
  NEW_PASSWORD: "NewPassword",
  PREFERENCES: "Preferences",
  ADD_WINE: "Adicionar Vinhos",
  ADD_STORE: "Adicionar Lojas",
  HOME_TABS: "Home", // Matches "Home" for TabNavigation in StackRoute
} as const;

export type RootStackParamList = {
  [ROUTE_NAMES.LOGIN]: undefined;
  [ROUTE_NAMES.SIGN_UP]: undefined;
  [ROUTE_NAMES.PASSWORD_RECOVERY]: undefined;
  [ROUTE_NAMES.PASSWORD_RECOVERY_CODE]: undefined;
  [ROUTE_NAMES.NEW_PASSWORD]: undefined;
  [ROUTE_NAMES.PREFERENCES]: undefined;
  [ROUTE_NAMES.ADD_WINE]: undefined;
  [ROUTE_NAMES.ADD_STORE]: undefined;
  [ROUTE_NAMES.HOME_TABS]: undefined; // For TabNavigation, no params needed to just go to it
                                  // If navigating to a specific tab inside it with params:
                                  // HOME_TABS: { screen: string; params?: { someParam: string } };
};
const Stack = createNativeStackNavigator<RootStackParamList>(); // Use the typed Stack
function StackRoute() {
  return (
      <Stack.Navigator initialRouteName={ROUTE_NAMES.LOGIN} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTE_NAMES.LOGIN} component={Login} />
        <Stack.Screen name={ROUTE_NAMES.SIGN_UP} component={SignUp} />
        <Stack.Screen name={ROUTE_NAMES.PASSWORD_RECOVERY} component={Password} />
        <Stack.Screen name={ROUTE_NAMES.PASSWORD_RECOVERY_CODE} component={PasswordRecoveryCode} />
        <Stack.Screen name={ROUTE_NAMES.NEW_PASSWORD} component={NewPassword} />
        <Stack.Screen name={ROUTE_NAMES.PREFERENCES} component={PreferencesScreen} />
        <Stack.Screen name={ROUTE_NAMES.ADD_WINE} component={AddWineScreen}/>
        <Stack.Screen name={ROUTE_NAMES.ADD_STORE} component={AddStoreScreen}/>
        <Stack.Screen
          name={ROUTE_NAMES.HOME_TABS}
          component={TabNavigation}
          options={{ gestureEnabled: false, headerShown: false }}
        />
      </Stack.Navigator>
  );
}

export default StackRoute;