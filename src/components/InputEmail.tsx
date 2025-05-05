import React from 'react';
import { TextInput, View, Dimensions } from 'react-native';
import styles from "../screens/auth/Login";

const { width } = Dimensions.get('window');

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
          
          { width: width * 0.8 }
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