import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert, FlatList, Image } from 'react-native';

const API_RECOMMENDATIONS = 'https://run.mocky.io/v3/ae6ff0fc-571b-4ba3-bbf4-57d16fd68af2';

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
  return (
    <View style={styles.card}>
      <Image source={{ uri: wine.img }} style={styles.image} resizeMode="cover" />
      <Text style={styles.name}>{wine.nome}</Text>
      <Text style={styles.type}>{wine.tipo} - {wine.pais}</Text>
      <Text style={styles.region}>{wine.regiao_vinicola}</Text>
      <Text style={styles.producer}>Produtor: {wine.produtor}</Text>
      <Text style={styles.grape}>Uva: {wine.uva} | Safra: {wine.safra}</Text>
      <Text style={styles.alcohol}>Teor alcoólico: {wine.teor_alcoolico}%</Text>
      <Text style={styles.description}>{wine.descricao}</Text>
      <Text style={styles.harmonizationTitle}>Harmonização:</Text>
      {wine.harmonizacao && wine.harmonizacao.map((item, idx) => (
        <Text key={idx} style={styles.harmonizationItem}>• {item}</Text>
      ))}
    </View>
  );
}

const WineRecommendationScreen = () => {
  const [wines, setWines] = useState<WineRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_RECOMMENDATIONS);
      if (!response.ok) throw new Error('Erro ao buscar recomendações');
      const data = await response.json();
      setWines(data);
    } catch (err) {
      setError('Erro ao carregar recomendações.');
      Alert.alert('Erro', 'Não foi possível carregar as recomendações.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6B2737" />
        <Text>Carregando recomendações...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recomendações de Vinhos</Text>
      <FlatList<WineRecommendation>
        data={wines}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <WineRecommendationCard wine={item} />}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#6B2737',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f8f1e9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B2737',
    marginBottom: 2,
  },
  type: {
    fontSize: 15,
    color: '#8B4513',
    marginBottom: 2,
  },
  region: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  producer: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  grape: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  alcohol: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginVertical: 6,
  },
  harmonizationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B2737',
    marginTop: 6,
  },
  harmonizationItem: {
    fontSize: 13,
    color: '#333',
    marginLeft: 8,
  },
});

export default WineRecommendationScreen; 