import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

interface ConfirmButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  styles?: StyleProp<ViewStyle>;
}

const { width, height } = Dimensions.get('window');

export function ConfirmButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  styles,
}: ConfirmButtonProps) {
  return (
    <TouchableOpacity
      style={[
        localStyles.button,
        (disabled || loading) && localStyles.buttonDisabled,
        styles
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={localStyles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const localStyles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#6B2737',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonDisabled: {
    backgroundColor: '#9E9E9E',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});