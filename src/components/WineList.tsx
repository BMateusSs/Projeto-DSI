import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { WineClass as Wine } from '../services/wineClass';
import Card from './Card';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ConfirmPopup from './ConfirmPopup';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../routes/StackRoute';

interface WineListProps {
  wines: Wine[];
  onDelete: (id: string) => void;
}

const WineList: React.FC<WineListProps> = ({ wines, onDelete }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [wineIdToDelete, setWineIdToDelete] = useState<string | null>(null);

  const limitText = (text: string, wordLimit: number = 5) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const handleEditWine = (wine: Wine) => {
    navigation.navigate('Adicionar Vinhos', { wineToEdit: wine });
  };

  const confirmDelete = (wineId: string) => {
    setWineIdToDelete(wineId);
    setModalVisible(true);
  };

  const executeDelete = () => {
    if (wineIdToDelete) {
      onDelete(wineIdToDelete);
      setWineIdToDelete(null);
    }
    setModalVisible(false);
  };

  const cancelDelete = () => {
    setWineIdToDelete(null);
    setModalVisible(false);
  };

  const renderWineItem = ({ item }: { item: Wine }) => (
    <View style={{ marginBottom: 10 }}>
      <Card>
        <View style={{ position: 'relative' }}>
          <TouchableOpacity onPress={() => handleEditWine(item)}>
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

            <View style={styles.anotationContainer}>
              <Ionicons name="document-text-outline" size={18} color="#666666" />
              <Text style={styles.anotationText}>{item.anotation ? limitText(item.anotation) : ''}</Text>
              <TouchableOpacity
                onPress={() => confirmDelete(item.id!)}
                style={styles.deleteButton}
              >
                <Ionicons name="trash-outline" size={18} color="#6B2737" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );

  return (
    <>
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
      <ConfirmPopup
        visible={isModalVisible}
        message="Tem certeza que deseja deletar este vinho?"
        onConfirm={executeDelete}
        onCancel={cancelDelete}
      />
    </>
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
    alignItems: 'center',
  },
  anotationText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666666',
    marginLeft: 8,
    flex: 1,
  },
  deleteButton: {
    marginLeft: 8,
  },
  deleteButtonAbsolute: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    elevation: 2,
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