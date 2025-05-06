import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from "../../styles/StyleHome";
import BottomMenu from "../../components/BottonMenu";
import vinhosData from '../../../vinhos.json';
import SearchBar from "../../components/SearchBar";
import HorizontalWineList from "../../components/HorizontalWineList";
import RegionMap from "../../components/RegionMap";

const Home = () => {
  const insets = useSafeAreaInsets();
  const vinhosTintos = vinhosData.filter(vinho => vinho.tipo === "Tinto");
  const topAvaliados = [...vinhosData]
    .sort((a, b) => b.avaliacao - a.avaliacao)
    .slice(0, 5);

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