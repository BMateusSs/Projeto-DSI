import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles/recomendationStyles';
import { UserAuthService } from '../../firebase/UserAuthService';
import { auth } from '../../firebase/firebaseConfig';
import SearchBar from '../../components/SearchBar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/StackRoute';

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
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
    <TouchableOpacity 
      activeOpacity={0.9} 
      style={styles.card}
      onPress={() => navigation.navigate('Detalhes Vinho', { wine })}>
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
  const [filteredWines, setFilteredWines] = useState<WineRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<any>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchPreferencesAndRecommendations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let prefs = null;
        const user = auth.currentUser;
        if (user) {
          const userAuthService = new UserAuthService();
          prefs = await userAuthService.getUserPreferences(user.uid);
        }
        setPreferences(prefs);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erro ao buscar recomendações');
        let data = await response.json();
        if (prefs) {
          data = data.sort((a: WineRecommendation, b: WineRecommendation) => {
            let scoreA = 0;
            let scoreB = 0;
            if (prefs.types && prefs.types.includes(a.tipo)) scoreA++;
            if (prefs.flavors && prefs.flavors.some((f: string) => a.descricao?.toLowerCase().includes(f.toLowerCase()))) scoreA++;
            if (prefs.regions && prefs.regions.includes(a.regiao_vinicola)) scoreA++;
            if (prefs.pairings && a.harmonizacao && a.harmonizacao.some((h: string) => prefs.pairings.includes(h))) scoreA++;
            if (prefs.alcoholContent && a.teor_alcoolico) {
              if (
                (prefs.alcoholContent === 'Baixo (-12%)' && a.teor_alcoolico < 12) ||
                (prefs.alcoholContent === 'Médio (12-14%)' && a.teor_alcoolico >= 12 && a.teor_alcoolico <= 14) ||
                (prefs.alcoholContent === 'Alto (+14%)' && a.teor_alcoolico > 14)
              ) scoreA++;
            }
            if (prefs.types && prefs.types.includes(b.tipo)) scoreB++;
            if (prefs.flavors && prefs.flavors.some((f: string) => b.descricao?.toLowerCase().includes(f.toLowerCase()))) scoreB++;
            if (prefs.regions && prefs.regions.includes(b.regiao_vinicola)) scoreB++;
            if (prefs.pairings && b.harmonizacao && b.harmonizacao.some((h: string) => prefs.pairings.includes(h))) scoreB++;
            if (prefs.alcoholContent && b.teor_alcoolico) {
              if (
                (prefs.alcoholContent === 'Baixo (-12%)' && b.teor_alcoolico < 12) ||
                (prefs.alcoholContent === 'Médio (12-14%)' && b.teor_alcoolico >= 12 && b.teor_alcoolico <= 14) ||
                (prefs.alcoholContent === 'Alto (+14%)' && b.teor_alcoolico > 14)
              ) scoreB++;
            }
            return scoreB - scoreA;
          });
        }
        setWines(data);
        setFilteredWines(data);
      } catch (err) {
        setError('Erro ao carregar recomendações.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPreferencesAndRecommendations();
  }, []);

  useEffect(() => {
    if (searchText.trim().length > 0) {
      const filtered = wines.filter(wine =>
        (wine.nome?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
        (wine.tipo?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
        (wine.regiao_vinicola?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
        (wine.produtor?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
        (wine.pais?.toLowerCase() || '').includes(searchText.toLowerCase())
      );
      setFilteredWines(filtered);
    } else {
      setFilteredWines(wines);
    }
  }, [searchText, wines]);

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
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Pesquisar vinhos recomendados..."
        />
      </View>
      <FlatList
        data={filteredWines}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <WineRecommendationCard wine={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RecomendationsList