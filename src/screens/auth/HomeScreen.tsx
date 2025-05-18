import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import styles from "../../styles/StyleHome";
import BottomMenu from "../../components/BottonMenu";
import vinhosData from '../../../vinhos.json';
import SearchBar from "../../components/SearchBar";
import HorizontalWineList from "../../components/HorizontalWineList";
import RegionMap from "../../components/RegionMap";

const Home = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); // Enquanto verifica as preferências

  const vinhosTintos = vinhosData.filter(vinho => vinho.tipo === "Tinto");
  const topAvaliados = [...vinhosData]
    .sort((a, b) => b.avaliacao - a.avaliacao)
    .slice(0, 5);

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

          if (perfil === "consumer" && (!preferencias || preferencias.length === 0)) {
            navigation.navigate("Preferences");
          }
        }
      }

      setLoading(false);
    };

    verificarPreferencias();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#800000" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView 
        style={{ flex: 1, backgroundColor: "white" }}
        contentContainerStyle={{
          paddingTop: insets.top + 15,
          paddingBottom: 70 + insets.bottom 
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Vinicoteca</Text>
          </View>

          <SearchBar />

          <HorizontalWineList 
            wines={vinhosTintos} 
            title="Para você" 
          />

          <View style={[styles.containerSub, { marginTop: 10 }]}>
            <Text style={styles.subtittle}>Vinhos por região</Text>
          </View>
          <RegionMap />

          <HorizontalWineList 
            wines={topAvaliados} 
            title="Top bem avaliados" 
          />
        </View>
      </ScrollView>

      <BottomMenu/>
    </View>
  );
};

export default Home;
