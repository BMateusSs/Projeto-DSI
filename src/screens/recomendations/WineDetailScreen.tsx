import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import wineDetailStyle from '../../styles/wineDetailStyle';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import wineService from '../../services/wineService';
import { WineClass } from '../../services/wineClass';
import { auth } from '../../firebase/firebaseConfig';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
  rating?: number;
};

type RouteParams = {
  wine: Wine;
};

export default function WineDetailScreen() {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { wine } = route.params;
  const styles = wineDetailStyle;
  const [isAdding, setIsAdding] = useState(false);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [isLoadingRating, setIsLoadingRating] = useState(true);
  const [ratingsCount, setRatingsCount] = useState<number>(0);
  const [isAlreadyInCellar, setIsAlreadyInCellar] = useState(false);

  useEffect(() => {
    async function fetchAverageRating() {
      setIsLoadingRating(true);
      try {
        const ratings = await wineService.getRatingsByRecommendationId(wine.id);
        if (ratings.length > 0) {
          const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
          setAverageRating(Number(avg.toFixed(1)));
          setRatingsCount(ratings.length);
        } else {
          setAverageRating(0.0);
          setRatingsCount(0);
        }
      } catch (e) {
        setAverageRating(0.0);
        setRatingsCount(0);
      } finally {
        setIsLoadingRating(false);
      }
    }
    fetchAverageRating();

    async function checkIfAlreadyInCellar() {
      if (!auth.currentUser) return;
      const wineInCellar = await wineService.getWineByUserAndRecommendationId(auth.currentUser.uid, wine.id);
      setIsAlreadyInCellar(!!wineInCellar);
    }
    checkIfAlreadyInCellar();
  }, [wine.id]);

  const handleAddWine = async () => {
    if (!auth.currentUser) {
      Alert.alert('Erro', 'Você precisa estar logado para adicionar vinhos à sua adega.');
      return;
    }
    setIsAdding(true);
    try {
      const newWine = new WineClass(
        wine.nome,
        wine.tipo,
        wine.regiao_vinicola,
        'desired', // status padrão ao adicionar recomendado
        auth.currentUser.uid,
        null, // rating
        null, // anotation
        undefined, // id
        undefined, // createdAt
        wine.id // wineRecommendationId
      );
      await wineService.addWine(newWine);
      Alert.alert('Sucesso', 'Vinho adicionado à sua adega!');
      // Atualiza a média após adicionar
      const ratings = await wineService.getRatingsByRecommendationId(wine.id);
      if (ratings.length > 0) {
        const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
        setAverageRating(Number(avg.toFixed(1)));
      } else {
        setAverageRating(0.0);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o vinho.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <View style={styles.mainBackground}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        {/* Área da imagem com fundo colorido */}
        <View style={{ width: '100%', backgroundColor: '#f8f1e9', alignItems: 'center', paddingTop: 32, paddingBottom: 24 }}>
          <Image source={{ uri: wine.img }} style={[styles.image, { width: SCREEN_WIDTH * 0.55, height: 320, marginTop: 0 }]} resizeMode="contain" />
        </View>
        {/* Card branco ocupa 100% da largura */}
        <View style={[styles.card, { width: '100%', alignSelf: 'center', marginTop: 0, borderTopLeftRadius: 24, borderTopRightRadius: 24 }]}> 
          {/* Avaliação estilo Vivino */}
          <View style={styles.ratingCircleContainer}>
            <View style={styles.ratingCircle}>
              <Text style={styles.ratingValue}>
                {isLoadingRating ? '--' : averageRating.toFixed(1)}
              </Text>
              <View style={styles.starsRow}>
                {[1,2,3,4,5].map(i => (
                  <Ionicons
                    key={i}
                    name={
                      !isLoadingRating && averageRating >= i
                        ? 'star'
                        : !isLoadingRating && averageRating >= i - 0.5
                          ? 'star-half'
                          : 'star-outline'
                    }
                    size={18}
                    color="#F4B400"
                  />
                ))}
              </View>
            </View>
            <Text style={styles.ratingCount}>
              {!isLoadingRating && `${ratingsCount} classificação${ratingsCount === 1 ? '' : 's'}`}
            </Text>
          </View>
          <Text style={styles.name}>{wine.nome}</Text>
          <Text style={styles.region}>{wine.regiao_vinicola}</Text>
          <Text style={styles.producer}>{wine.produtor}</Text>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descrição</Text>
            <Text style={styles.sectionText}>{wine.descricao}</Text>
          </View>

          <View style={styles.divider} />

          <View style={[styles.section, styles.harmonizationSection]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <MaterialCommunityIcons name="food" size={18} color="#61142b" style={{ marginRight: 6 }} />
              <Text style={styles.sectionTitle}>Harmonização</Text>
            </View>
            {wine.harmonizacao && wine.harmonizacao.length > 0 ? (
              wine.harmonizacao.map((item, idx) => (
                <Text key={idx} style={styles.harmonizationItem}>• {item}</Text>
              ))
            ) : (
              <Text style={styles.sectionText}>Nenhuma sugestão de harmonização disponível.</Text>
            )}
          </View>

          <TouchableOpacity style={styles.actionButton} onPress={handleAddWine} disabled={isAdding || isAlreadyInCellar}>
            <Text style={styles.actionButtonText}>
              {isAlreadyInCellar ? 'Já está na sua adega' : (isAdding ? 'Adicionando...' : 'Adicionar à minha adega')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}