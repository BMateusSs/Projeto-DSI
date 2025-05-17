import React from "react";
import { TextInput, View } from "react-native";
import styles from "../styles/authStyles";

interface InputCodeProps {
  code: string;
  onChangeCode: (newCode: string) => void;
  hasError?: boolean;
}

export function InputCode({ code, onChangeCode }: InputCodeProps) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputText}
        value={code}
        onChangeText={onChangeCode}
        placeholder="Código"
        autoCapitalize="none"
        keyboardType="number-pad"
        maxLength={6} // ou outro tamanho que o código tiver
      />
    </View>
  );
}
