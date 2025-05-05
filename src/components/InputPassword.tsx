import React, { useState } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../styles/authStyles";

interface ValidatedPasswordInputProps {
  password: string;
  onChangePassword: (newPassword: string) => void;
  hasError: boolean;
}

export function InputPassword({
  password,
  onChangePassword,
}: ValidatedPasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputText}
        value={password}
        onChangeText={onChangePassword}
        placeholder="Senha"
        secureTextEntry={!visible}
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={() => setVisible((v) => !v)}>
        <Icon name={visible ? "eye-off" : "eye"} size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
}
