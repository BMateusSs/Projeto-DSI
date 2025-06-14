import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Card from './Card';
import storeService, { StoreData } from '../services/storeService';

interface StoreListProps {
  stores: StoreData[];
  onDelete: (id: string) => void;
}

const StoreList: React.FC<StoreListProps> = ({ stores, onDelete }) => {
  const navigation = useNavigation();

  const handleEditStore = (store: StoreData) => {
    navigation.navigate('Adicionar Lojas', { storeToEdit: store });
  };
  const handleDeleteStore = (storeId: string) => {
    Alert.alert(
        'Confirmação',
        'Tem certeza que deseja deletar essa loja?',
        [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Deletar',
                style: 'destructive',
                onPress: () => onDelete(storeId),
            },
        ]
    );
  };

    const renderStoreItem = ({ item }: { item: StoreData }) => (
    <View style={{ marginBottom: 10 }}>
        <Card>
            <TouchableOpacity onPress={() => handleEditStore(item)}>
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

            {item.notes ? (
            <View style={styles.notesContainer}>
                <Ionicons name="document-text-outline" size={18} color="#666666" />
                <Text style={styles.notesText}>{item.notes}</Text>
            </View>
            ) : null}
            </TouchableOpacity>
            <TouchableOpacity
                style={{ marginTop: 10, alignSelf: 'flex-end' }}
                onPress={() => handleDeleteStore(item.id!)}
            >
                <Ionicons name="trash-outline" size={24} color="#6B2737" />
            </TouchableOpacity>
        </Card>
    </View>
    );
  return (
    <FlatList
      data={stores}
      keyExtractor={(item, index) => item.id ?? `store-${index}`}
      renderItem={renderStoreItem}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>Você ainda não adicionou nenhuma loja</Text>
        </View>
      }
    />
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
    alignItems: 'flex-start',
  },
  notesText: {
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

export default StoreList;