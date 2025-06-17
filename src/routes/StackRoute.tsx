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
import { Wine } from "../services/wineService";
import { StoreData } from "../services/storeService";

type RootStackParamList = {
  'Login': undefined;
  'SignUp': undefined;
  'Password': undefined;
  'RecoveryCode': undefined;
  'NewPassword': undefined;
  'Preferences': undefined;
  'Home': undefined;
  'Adicionar Vinhos': { wineToEdit?: Wine };
  'Adicionar Lojas': { storeToEdit?: StoreData };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function StackRoute() {
  return (
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="RecoveryCode" component={PasswordRecoveryCode} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="Preferences" component={PreferencesScreen} />
        <Stack.Screen name="Adicionar Vinhos" component={AddWineScreen} 
        options={({ route }) => ({
          headerShown: true, 
          headerStyle: {backgroundColor: '#6B2737'},
          headerTintColor: 'white',
          headerTitleStyle: {fontWeight: 'bold'},
          title: route.params?.wineToEdit ? 'Atualizar Vinho' : 'Adicionar Vinho'
        })}/>
        <Stack.Screen name="Adicionar Lojas" component={AddStoreScreen}
        options={({ route }) => ({
          headerShown: true, 
          headerStyle: {backgroundColor: '#6B2737'},
          headerTintColor: 'white',
          headerTitleStyle: {fontWeight: 'bold'},
          title: route.params?.storeToEdit ? 'Atualizar Loja' : 'Adicionar Loja'
        })}/>
        
        <Stack.Screen 
          name="Home" 
          component={TabNavigation} 
          options={{ gestureEnabled: false, headerShown: false }}
        />


      </Stack.Navigator>
  );
}

export default StackRoute;