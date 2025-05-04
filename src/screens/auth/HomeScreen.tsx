import React from "react";
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  Image} from "react-native";

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from "../../../StyleHome";
import BottomMenu from "../../components/BottonMenu";
import vinhosData from '../../../vinhos.json';

const Home = () => {
  const insets = useSafeAreaInsets();
  const vinhosTintos = vinhosData.filter(vinho => vinho.tipo === "Tinto");
  const topAvaliados = [...vinhosData]
    .sort((a, b) => b.avaliacao - a.avaliacao)
    .slice(0, 5);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView 
        style={{ 
          flex: 1, 
          backgroundColor: "white",
        }}
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


          
        <View style={styles.containerSearch}>

        <TextInput 
            style={styles.textInput}
            placeholder="Buscar vinho..."
            placeholderTextColor="#6B7280"
        />
        </View>

          
          <View style={styles.containerSub}>
            <Text style={styles.subtittle}>Para você</Text>
          </View>

          <ScrollView 
            style={[styles.containerCard, { marginBottom: 20, marginStart: 15 }]}
            horizontal 
            showsHorizontalScrollIndicator={false}
          >
            {vinhosTintos.map(vinho => (
              <View key={vinho.id} style={styles.card}>
                <Image 
                  source={{ uri: vinho.imagem }} 
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={styles.nome} numberOfLines={1}>{vinho.nome}</Text>
                <View style={styles.linha}>
                  <Text style={styles.nota}>⭐ {vinho.avaliacao.toFixed(1)}</Text>
                  <Text style={styles.preco}>R$ {vinho.preco.toFixed(2)}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          
          <View style={[styles.containerSub, { marginTop: 10 }]}>
            <Text style={styles.subtittle}>Vinhos por região</Text>
          </View>

          <View style={styles.containerMap}>
            <Text style={{ textAlign: 'center', marginTop: 60, color: '#666' }}>
              Mapa das regiões vinícolas
            </Text>
          </View>

          
          <View style={[styles.containerSub, { marginTop: 15 }]}>
            <Text style={styles.subtittle}>Top bem avaliados</Text>
          </View>

          <ScrollView 
            style={[styles.containerCard, { marginBottom: 20, marginStart: 15 }]}
            horizontal 
            showsHorizontalScrollIndicator={false}
          >
            {topAvaliados.map(vinho => (
              <View key={vinho.id} style={styles.card}>
                <Image 
                  source={{ uri: vinho.imagem }} 
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={styles.nome} numberOfLines={1}>{vinho.nome}</Text>
                <View style={styles.linha}>
                  <Text style={styles.nota}>⭐ {vinho.avaliacao.toFixed(1)}</Text>
                  <Text style={styles.preco}>R$ {vinho.preco.toFixed(2)}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <BottomMenu/>
    </View>
  );
};

export default Home;