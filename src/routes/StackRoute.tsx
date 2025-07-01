import React, { useEffect, useState } from "react";
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
import MapScreen from "../screens/map/MapScreen";
import { Wine } from "../services/wineService";
import { StoreData } from "../services/storeService";
import RecommendationScreen from "../screens/recomendations/RecomendationScreen";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { ActivityIndicator, View } from 'react-native';
import ProfessionaisScreen from "../screens/professionais/ProfessionaisScreen";
import ProfessionalDetailsScreen from "../screens/professionais/ProfessionalDetailsScreen";

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
  'Mapa': undefined;
  'Recomendados': undefined;
  'Profissionais': undefined;
  'Detalhes Profissional': { professionalId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function StackRoute() {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPreferences = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          setInitialRoute('Login');
          setLoading(false);
          return;
        }
        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const dados = userSnap.data();
          const perfil = dados.profile;
          const preferencias = dados.preferences;
          if (perfil === 'consumer' && (!preferencias || Object.keys(preferencias).length === 0)) {
            setInitialRoute('Preferences');
          } else {
            setInitialRoute('Home');
          }
        } else {
          setInitialRoute('Preferences');
        }
        setLoading(false);
      });
    };
    checkPreferences();
  }, []);

  if (loading || !initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#800000" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute ?? 'Login'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="RecoveryCode" component={PasswordRecoveryCode} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="Preferences" component={PreferencesScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: '#6B2737'},
          headerTintColor: 'white',
          headerTitleStyle: {fontWeight: 'bold'},
          title: 'Suas Preferências'
        }}
      />
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
        name="Recomendados" 
        component={RecommendationScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: '#6B2737'},
          headerTintColor: 'white',
          headerTitleStyle: {fontWeight: 'bold'},
          title: 'Recomendações'
        }}
      />
      <Stack.Screen 
        name="Mapa" 
        component={MapScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: '#6B2737'},
          headerTintColor: 'white',
          headerTitleStyle: {fontWeight: 'bold'},
          title: 'Explorar Lojas'
        }}
      />
      <Stack.Screen 
        name="Home" 
        component={TabNavigation} 
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <Stack.Screen 
        name="Profissionais" 
        component={ProfessionaisScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: '#6B2737'},
          headerTintColor: 'white',
          headerTitleStyle: {fontWeight: 'bold'},
          title: 'Profissionais'
        }}
      />
      <Stack.Screen 
        name="Detalhes Profissional" 
        component={ProfessionalDetailsScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: '#6B2737'},
          headerTintColor: 'white',
          headerTitleStyle: {fontWeight: 'bold'},
          title: 'Detalhes do Profissional'
        }}
      />
    </Stack.Navigator>
  );
}

export default StackRoute;