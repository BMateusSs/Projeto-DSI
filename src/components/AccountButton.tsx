import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { VinicotecaTheme } from '../styles/colors';
// botão branco borda vermelha
interface AccountButtonProps {
  title: string;
  onPress: () => void;
}

const { width, height } = Dimensions.get('window');

export function AccountButton({ title, onPress }: AccountButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { width: width * 0.8, height: height * 0.07 },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: VinicotecaTheme.colors.white,
    borderColor: VinicotecaTheme.colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    color: VinicotecaTheme.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});