import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "../screens/auth/LoginScreen";
import SignUp from "../screens/auth/SignUpScreen";
import Home from "../screens/auth/HomeScreen";
import Password from "../screens/auth/Password";
import SelectProfile from "../screens/auth/SelectProfile";
import PasswordRecoveryCode from "../screens/auth/PasswordRecoveryCode";
import { NewPassword } from "../screens/auth/NewPassword";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" id={undefined}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="SelectProfile" component={SelectProfile}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Password" component={Password}/>
        <Stack.Screen name="RecoveryCode" component={PasswordRecoveryCode}/>
        <Stack.Screen name="NewPassword" component={NewPassword}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

/**
 * O código de inicialização do app utiliza o React Navigation para gerenciar a navegação entre telas no aplicativo.
 *
 * - **`NavigationContainer`**: É o componente que encapsula toda a navegação do aplicativo. Ele funciona como um provedor de contexto que gerencia o estado de navegação e garante que as telas sejam renderizadas corretamente. É obrigatório para usar o React Navigation.
 *
 * - **`Stack.Screen`**: Define uma tela no navegador de pilha (`Stack Navigator`). Cada `Stack.Screen` representa uma tela que pode ser acessada no fluxo de navegação. O atributo `name` identifica a tela, e o atributo `component` especifica o componente React que será renderizado para essa tela.
 *
 *  A tela inicial é definida por `initialRouteName="Login"`.
 */
export default App;
