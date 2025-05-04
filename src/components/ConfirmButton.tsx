import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

// Botão com responsividade
interface ConfirmButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const { width, height } = Dimensions.get('window'); // Obtém a largura e altura da tela

export function ConfirmButton({
  title,
  onPress,
  loading = false,
  disabled = false,
}: ConfirmButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        (disabled || loading) && styles.buttonDisabled,
        { width: width * 0.8, height: height * 0.07 }, // Responsividade: 80% da largura da tela, altura ajustada
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6B2737', // Cor do botão
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#9E9E9E',
  },
  text: {
    color: 'white', // Cor do texto
    fontSize: 18,
    fontWeight: 'bold',
  },
});