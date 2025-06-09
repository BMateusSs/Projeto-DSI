import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Wine } from '../services/wineService';
import Card from './Card';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface WineListProps {
  wines: Wine[];
}

const WineList: React.FC<WineListProps> = ({ wines }) => {
  const navigation = useNavigation();

  const handleEditWine = (wine: Wine) => {
    navigation.navigate('Adicionar Vinhos', { wineToEdit: wine });
  };

  const renderWineItem = ({ item }: { item: Wine }) => (
    <TouchableOpacity onPress={() => handleEditWine(item)}>
      <Card>
        <Text style={styles.wineName}>{item.nome}</Text>

        <View style={styles.detailRow}>
          <Ionicons name="wine-outline" size={18} color="#8B4513" />
          <Text style={styles.detailText}>{item.tipo}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="map-outline" size={18} color="#8B4513" />
          <Text style={styles.detailText}>{item.regiao}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="bookmark-outline" size={18} color="#8B4513" />
          <Text style={[
            styles.detailText,
            item.status === 'experimented' ? styles.statusExperimented : styles.statusDesired
          ]}>
            {item.status === 'experimented' ? 'Experimentado' : 'Desejado'}
          </Text>
        </View>

        {item.status === 'experimented' && item.rating !== null && (
          <View style={styles.detailRow}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={[styles.detailText, styles.ratingText]}>
              {item.rating} estrelas
            </Text>
          </View>
        )}

        {item.anotation && (
          <View style={styles.anotationContainer}>
            <Ionicons name="document-text-outline" size={18} color="#666666" />
            <Text style={styles.anotationText}>{item.anotation}</Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={wines}
      keyExtractor={(item) => item.id || Math.random().toString()}
      renderItem={renderWineItem}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>Você ainda não adicionou nenhum vinho.</Text>
          <Text style={styles.emptyListText}>Comece adicionando um!</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  wineName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 8,
    flexShrink: 1,
  },
  statusExperimented: {
    fontWeight: 'bold',
    color: '#28A745',
  },
  statusDesired: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
  ratingText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  anotationContainer: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  anotationText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666666',
    marginLeft: 8,
    flex: 1,
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyListText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default WineList;