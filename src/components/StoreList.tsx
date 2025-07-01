import React, { useState} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Card from './Card';
import { StoreClass as StoreData } from '../services/storeClass';
import ConfirmPopup from './ConfirmPopup';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface StoreListProps {
  stores: StoreData[];
  onDelete: (id: string) => void;
}

const StoreList: React.FC<StoreListProps> = ({ stores, onDelete }) => {
  const navigation = useNavigation<NavigationProp>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [storeIdToDelete, setStoreIdToDelete] = useState<string | null>(null);

  const limitText = (text: string, wordLimit: number = 5) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const handleEditStore = (store: StoreData) => {
    navigation.navigate('Adicionar Lojas', { storeToEdit: store });
  };

  const confirmDelete = (storeId: string) => {
    setStoreIdToDelete(storeId);
    setModalVisible(true);
  };

  const executeDelete = () => {
    if (storeIdToDelete) {
      onDelete(storeIdToDelete);
      setStoreIdToDelete(null);
    }
    setModalVisible(false);
  };

  const cancelDelete = () => {
    setStoreIdToDelete(null);
    setModalVisible(false);
  };

  const renderStoreItem = ({ item }: { item: StoreData }) => (
  <View style={{ marginBottom: 10 }}>
    <Card>
      <View style={styles.cardContentColumn}>
        <TouchableOpacity
          style={styles.infoContainer}
          onPress={() => handleEditStore(item)}
        >
          <Text style={styles.storeName}>{item.name}</Text>

          <View style={styles.detailRow}>
            <Ionicons name="storefront-outline" size={18} color="#8B4513" />
            <Text style={styles.detailText}>{item.type}</Text>
          </View>

          {item.address ? (
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={18} color="#8B4513" />
              <Text style={styles.detailText}>{item.address}</Text>
            </View>
          ) : null}

          {item.contact ? (
            <View style={styles.detailRow}>
              <Ionicons name="call-outline" size={18} color="#8B4513" />
              <Text style={styles.detailText}>{item.contact}</Text>
            </View>
          ) : null}
        </TouchableOpacity>

        <View style={styles.notesContainer}>
          <Ionicons name="document-text-outline" size={18} color="#666666" />
          <Text style={styles.notesText}>{item.notes ? limitText(item.notes) : ''}</Text>
          <TouchableOpacity
            onPress={() => confirmDelete(item.id!)}
            style={styles.deleteButton}
          >
            <Ionicons name="trash-outline" size={18} color="#6B2737" />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  </View>
  );

  return (
    <>
      <FlatList
        data={stores}
        keyExtractor={(item, index) => item.id ?? `store-${index}`}
        renderItem={renderStoreItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>
              Você ainda não adicionou nenhuma loja
            </Text>
          </View>
        }
      />
      <ConfirmPopup
        visible={isModalVisible}
        message="Tem certeza que deseja deletar esta loja?"
        onConfirm={executeDelete}
        onCancel={cancelDelete}
      />
    </>
  );
};

const styles = StyleSheet.create({
  storeName: {
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
  notesContainer: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notesText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666666',
    marginLeft: 8,
    flex: 1,
  },
  deleteButton: {
    marginLeft: 8,
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
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardContentColumn: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  infoContainer: {
    flex: 1,
  },
  deleteButtonAlways: {
    padding: 8,
  },
});

export default StoreList;