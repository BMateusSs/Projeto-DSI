import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Header from "../../components/Header";
import DiscoverCard from "../../components/DiscoverCard";
import QuickActions from "../../components/QuickActions";
import MapContainer from "../../components/MapContainer";
import { RootStackParamList } from '../../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Home = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const verificarPreferencias = async () => {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;
      
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const dados = userSnap.data();
          const perfil = dados.profile;
          const preferencias = dados.preferences;
          
          if (dados.name) {
            setUserName(dados.name);
          }
          
          if (perfil === "consumer" && (!preferencias || preferencias.length === 0)) {
            navigation.navigate("Preferences");
          }
        }
      }
      setLoading(false);
    };
    
    verificarPreferencias();
  }, []);

  const handleDiscoverPress = () => {
    navigation.navigate({ name: "Lista de Vinhos", params: undefined });
  };

  const handleExplorePress = () => {
    navigation.navigate({ name: "Lista de Lojas", params: undefined });
  };

  const handleAddWine = () => {
    navigation.navigate({ name: "Adicionar Vinhos", params: { wineToEdit: undefined } });
  };

  const handleAddStore = () => {
    navigation.navigate({ name: "Adicionar Lojas", params: { storeToEdit: undefined } });
  };

  const handleAddProfessional = () => {
    Alert.alert('Em desenvolvimento', 'Funcionalidade em desenvolvimento');
  };

  const handleSearchStore = () => {
    navigation.navigate({ name: "Lista de Lojas", params: undefined });
  };

  const handleViewProfessionals = () => {
    navigation.navigate({ name: "Professionals", params: undefined });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#800000" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header name={userName} />
        <DiscoverCard onPress={handleDiscoverPress} />
        <QuickActions 
          onAddWine={handleAddWine}
          onAddStore={handleAddStore}
          onAddProfessional={handleAddProfessional}
        />
        <MapContainer />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 20,
  },
});

export default Home;