import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Place } from './types';
import { ConfirmButton } from '../../components/ConfirmButton';
import styles from '../../styles/mapStyles';
import { auth } from '../../firebase/firebaseConfig';
import storeService from '../../services/storeService';
import { StoreClass } from '../../services/storeClass';

interface StoreDetailModalProps {
  selectedStore: Place | null;
  selectedDistance: number | null;
  visible: boolean;
  onClose: () => void;
  onOpenGoogleMaps: () => void;
}

const StoreDetailModal: React.FC<StoreDetailModalProps> = ({ selectedStore, selectedDistance, visible, onClose, onOpenGoogleMaps }) => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function checkIfSaved() {
      setSaved(false);
      setError('');
      if (!selectedStore || !auth.currentUser) return;
      const exists = await storeService.storeExists(selectedStore.place_id, auth.currentUser.uid);
      setSaved(exists);
    }
    checkIfSaved();
  }, [selectedStore]);

  async function handleSaveStore() {
    if (!selectedStore || !auth.currentUser) return;
    setSaving(true);
    setError('');
    try {
      const store = new StoreClass(
        selectedStore.name,
        'Física',
        selectedStore.vicinity || selectedStore.formatted_address || '',
        '', // contact
        '', // notes
        auth.currentUser.uid,
        auth.currentUser.uid,
        undefined,
        selectedStore.place_id
      );
      store.coordinates = {
        latitude: selectedStore.geometry.location.lat,
        longitude: selectedStore.geometry.location.lng
      };
      await storeService.addStore(store);
      setSaved(true);
    } catch (e) {
      setError('Erro ao salvar loja.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.bottomSheet}>
          {selectedStore && (
            <>
              <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                <Ionicons name="close" size={28} color="#6B2737" />
              </TouchableOpacity>
              <Text style={styles.modalStoreName}>{selectedStore.name}</Text>
              {selectedDistance !== null && (
                <Text style={styles.modalStoreDistance}>{`Distância: ${selectedDistance.toFixed(2)} km`}</Text>
              )}
              <ConfirmButton
                title={saved ? "Loja salva!" : "Adicionar loja"}
                onPress={handleSaveStore}
                loading={saving}
                disabled={saved}
              />
              <ConfirmButton
                title="Abrir no Google"
                onPress={onOpenGoogleMaps}
              />
              {error ? <Text style={{color: 'red', marginTop: 8}}>{error}</Text> : null}
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default StoreDetailModal; 