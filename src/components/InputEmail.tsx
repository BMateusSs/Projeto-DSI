import React from "react";
import { TextInput, View } from "react-native";
import styles from "../styles/authStyles";

interface ValidatedEmailInputProps {
  email: string;
  onChangeEmail: (newEmail: string) => void;
  hasError: boolean;
}

export function InputEmail({ email, onChangeEmail }: ValidatedEmailInputProps) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputText}
        value={email}
        onChangeText={onChangeEmail}
        placeholder="Digite seu Email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
    </View>
  );
}
