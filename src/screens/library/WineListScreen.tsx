import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import wineService from '../../services/wineService';
import { WineClass as Wine } from '../../services/wineClass';
import { auth } from "../../firebase/firebaseConfig";
import WineList from '../../components/WineList';
import FilterSelector from '../../components/FilterSelector';
import SearchBar from '../../components/SearchBar';

const WineListScreen = () => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'experimented' | 'desired'>('all');
  const [searchText, setSearchText] = useState('');
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
      const userWines = await wineService.getWinesByUser(auth.currentUser.uid);
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

  const filteredWines = wines.filter((wine) => {
    // Filtro por status
    const matchesFilter = filter === 'all' || wine.status === filter;
    
    // Filtro por pesquisa
    const matchesSearch = searchText.trim().length === 0 || 
      wine.nome.toLowerCase().includes(searchText.toLowerCase()) ||
      wine.tipo.toLowerCase().includes(searchText.toLowerCase()) ||
      wine.regiao.toLowerCase().includes(searchText.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleDelete = async (deletedId: string) => {
    try {
      await wineService.deleteWine(deletedId);
      setWines((prevWines) => prevWines.filter(wine => wine.id !== deletedId));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deletar o vinho');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6B2737" />
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
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Pesquisar vinhos por nome, tipo ou região..."
      />
      <FilterSelector
        options={[
          { label: 'Todos', value: 'all' },
          { label: 'Experimentados', value: 'experimented' },
          { label: 'Desejados', value: 'desired' },
        ]}
        initialValue={filter}
        onValueChange={(value) => setFilter(value as 'all' | 'experimented' | 'desired')}
      />
      <WineList 
        wines={filteredWines} 
        onDelete={handleDelete} 
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