import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { WineService, Wine } from '../../services/wineService';
import { auth } from '../../firebase/firebaseConfig';
import WineList from '../../components/WineList';

const WineListScreen = () => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isFocused = useIsFocused();

  const fetchWines = async () => {
    if (!auth.currentUser) {
      setError('Usuário não autenticado.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const userWines = await WineService.getWinesByUser(auth.currentUser.uid);
      setWines(userWines);
    } catch (err) {
      console.error("Erro ao buscar vinhos do usuário:", err);
      setError('Erro ao carregar seus vinhos.');
      Alert.alert('Erro', 'Não foi possível carregar seus vinhos.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchWines();
    }
  }, [isFocused]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando vinhos...</Text>
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
      <WineList wines={wines} />
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
});

export default WineListScreen;