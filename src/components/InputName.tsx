import React from 'react';
import { TextInput, View, Dimensions } from 'react-native';
import styles from "../screens/auth/Login";

const { width } = Dimensions.get('window');

interface InputNameProps {
  value: string;
  onChangeName: (newName: string) => void;
  placeholder?: string;
}

export function InputName({ value, onChangeName, placeholder = "Digite seu nome" }: InputNameProps) {
  return (
    <View>
      <TextInput
        style={[
          styles.containerInput,
          { width: width * 0.8 },
        ]}
        value={value}
        onChangeText={onChangeName}
        placeholder={placeholder}
        autoCapitalize="words"
        returnKeyType="next"
      />
    </View>
  );
}