import React from 'react';
import { TextInput, View, StyleSheet, Dimensions } from 'react-native';
import styles from "../screens/auth/Login";

const { width } = Dimensions.get('window'); // Obtém a largura da tela

interface ValidatedEmailInputProps {
  email: string;
  onChangeEmail: (newEmail: string) => void;
  hasError: boolean;
}

export function InputEmail({ email, onChangeEmail, hasError }: ValidatedEmailInputProps) {
  return (
    <View>
      <TextInput
        style={[
          styles.containerInput, 
          
          { width: width * 0.8 } // Responsividade: 80% da largura da tela
        ]}
        value={email}
        onChangeText={onChangeEmail}
        placeholder={"Digite seu Email"}
        autoCapitalize={"none"}
        keyboardType={"email-address"}
      />
    </View>
  );
}