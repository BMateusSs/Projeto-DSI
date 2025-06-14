import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { VinicotecaTheme } from '../styles/colors';

interface ConfirmPopupProps {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({ visible, message, onConfirm, onCancel }) => {
  if (Platform.OS === 'web' && !visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>Deletar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: VinicotecaTheme.colors.white,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
    shadowColor: VinicotecaTheme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  message: {
    fontSize: 16,
    color: VinicotecaTheme.colors.black,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelButton: {
    marginRight: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: VinicotecaTheme.colors.searchBarBackground,
    borderRadius: 6,
  },
  cancelText: {
    fontSize: 16,
    color: VinicotecaTheme.colors.DisabledText,
  },
  confirmButton: {
    backgroundColor: VinicotecaTheme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  confirmText: {
    fontSize: 16,
    color: VinicotecaTheme.colors.white,
  },
});

export default ConfirmPopup;