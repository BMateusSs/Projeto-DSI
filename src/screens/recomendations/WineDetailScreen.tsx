import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import wineDetailStyle from '../../styles/wineDetailStyle';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

type Wine = {
  id: string;
  nome: string;
  tipo: string;
  pais: string;
  regiao_vinicola: string;
  descricao: string;
  uva: string;
  safra: number;
  teor_alcoolico: number;
  harmonizacao: string[];
  img: string;
  produtor: string;
};

type RouteParams = {
  wine: Wine;
};

export default function WineDetailScreen() {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { wine } = route.params;

  const styles = wineDetailStyle; // 👈 Define alias para legibilidade

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Produto</Text>

      <Image source={{ uri: wine.img }} style={styles.image} resizeMode="contain" />

      <Text style={styles.name}>{wine.nome}</Text>
      <Text style={styles.region}>{wine.regiao_vinicola}</Text>

      <View style={styles.ratingRow}>
        <Ionicons name="star" size={18} color="#F4B400" />
        <Text style={styles.rating}>4.5</Text>
      </View>

      <View style={styles.tagsRow}>
        <View style={styles.tag}>
          <FontAwesome5 name="wine-bottle" size={14} color="#61142b" />
          <Text style={styles.tagText}>{wine.tipo}</Text>
        </View>
        <View style={styles.tag}>
          <MaterialIcons name="place" size={14} color="#61142b" />
          <Text style={styles.tagText}>{wine.pais}</Text>
        </View>
        <View style={styles.tag}>
          <FontAwesome5 name="grapes" size={14} color="#61142b" />
          <Text style={styles.tagText}>{wine.uva}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.sectionText}>{wine.descricao}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Região e Produtor</Text>
        <Text style={styles.sectionText}>Região: {wine.regiao_vinicola}, {wine.pais}</Text>
        <Text style={styles.sectionText}>Produtor: {wine.produtor}</Text>
      </View>
    </ScrollView>
  );
}