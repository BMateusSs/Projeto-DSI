import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { auth } from '../../firebase/firebaseConfig';
import storeService from '../../services/storeService';
import { StoreClass as StoreData } from '../../services/storeClass';
import StoreList from '../../components/StoreList';
import FilterSelector from '../../components/FilterSelector';
import SearchBar from '../../components/SearchBar';

const StoreListScreen = () => {
  const [stores, setStores] = useState<StoreData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'Física' | 'Online'>('all');
  const [searchText, setSearchText] = useState('');
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
  const filteredStores = stores.filter((store) => {
    const matchesFilter = filter === 'all' || store.type === filter;
    const matchesSearch = store.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6B2737" />
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
  const handleDelete = async (deletedId: string) => {
    try {
        await storeService.deleteStore(deletedId);
        setStores((prevStores) => prevStores.filter(store => store.id !== deletedId));
    } catch (error) {
        Alert.alert('Erro', 'Não foi possível deletar a loja');
    }
  };
  return (
    <View style={styles.container}>
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        placeholder='Pesquisar por nome da loja'
        autoCapitalize='none'
      />
      <FilterSelector
        options={[
            { label: 'Todas', value: 'all' },
            { label: 'Lojas Físicas', value: 'Física' },
            { label: 'Online', value: 'Online' },
        ]}
        initialValue={filter}
        onValueChange={(value) => setFilter(value as 'all' | 'Física' | 'Online')}
      />
      <StoreList
        stores={filteredStores}
        onDelete={handleDelete} />
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