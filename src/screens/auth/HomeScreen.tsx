import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import styles from "../../styles/StyleHome";
import vinhosData from '../../../vinhos.json';
import Header from "../../components/Header";

const Home = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
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
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#800000" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header name={userName} />
    </View>
  );
};

export default Home;
