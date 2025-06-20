import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles/recomendationStyles';

const API_URL = 'https://68547dca6a6ef0ed662f3b6b.mockapi.io/api/v1/wines';

type WineRecommendation = {
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

function WineRecommendationCard({ wine }: { wine: WineRecommendation }) {
  const getFlagEmoji = (country: string) => {
    const countryFlags: Record<string, string> = {
      'Brasil': '🇧🇷',
      'Portugal': '🇵🇹',
      'França': '🇫🇷',
      'Itália': '🇮🇹',
      'Argentina': '🇦🇷',
      'Chile': '🇨🇱',
      'Espanha': '🇪🇸',
    };
    return countryFlags[country] || '🌍';
  };

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card}>
      <Image source={{ uri: wine.img }} style={styles.image} resizeMode='contain' />
      
      <View style={styles.infoContainer}>
        <Text style={styles.wineName}>{wine.nome}</Text>
        <Text style={styles.wineType}>{wine.tipo}</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Safra:</Text>
          <Text style={styles.detailValue}>{wine.safra}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Produtor:</Text>
          <Text style={styles.detailValue}>{wine.produtor}</Text>
        </View>
        
        <View style={styles.locationContainer}>
          <Text style={styles.region}>{wine.regiao_vinicola}</Text>
          <View style={styles.countryContainer}>
            <Text style={styles.countryFlag}>{getFlagEmoji(wine.pais)}</Text>
            <Text style={styles.countryName}>{wine.pais}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const RecomendationsList = () => {
  const [wines, setWines] = useState<WineRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erro ao buscar recomendações');
        const data = await response.json();
        setWines(data);
      } catch (err) {
        setError('Erro ao carregar recomendações.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B2D3E" />
        <Text style={styles.loadingText}>Carregando recomendações...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={wines}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <WineRecommendationCard wine={item} />}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default RecomendationsList