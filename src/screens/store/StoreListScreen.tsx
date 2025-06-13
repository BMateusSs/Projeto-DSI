import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { auth } from '../../firebase/firebaseConfig';
import storeService, { StoreData } from '../../services/storeService';
import StoreList from '../../components/StoreList';
import FilterSelector from '../../components/FilterSelector';

const StoreListScreen = () => {
  const [stores, setStores] = useState<StoreData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'física' | 'online'>('all');
  const isFocused = useIsFocused();
  const fetchStores = async () => {
    if (!auth.currentUser) {
      setError('Usuário não autenticado.');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const userStores = await storeService.getStoresByUser(auth.currentUser.uid);
      setStores(userStores);
    } catch (err) {
      console.error('Erro ao buscar lojas:', err);
      setError('Erro ao carregar lojas.');
      Alert.alert('Erro', 'Não foi possível carregar suas lojas.');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isFocused) {
      fetchStores();
    }
  }, [isFocused]);
  const filteredStores = stores.filter((stores) => {
    if (filter === 'all') return true;
    return stores.type === filter;
  });
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando lojas...</Text>
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
      <FilterSelector
        options={[
            { label: 'Todos', value: 'all' },
            { label: 'Lojas Físicas', value: 'física' },
            { label: 'Online', value: 'online' },
        ]}
        initialValue={filter}
        onValueChange={(value) => setFilter(value as 'all' | 'física' | 'online')}
      />
      <StoreList stores={filteredStores} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
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

export default StoreListScreen;