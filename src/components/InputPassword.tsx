import React, { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ValidatedPasswordInputProps {
  password: string;
  onChangePassword: (newPassword: string) => void;
  hasError: boolean;
}

export function InputPassword({
  password,
  onChangePassword,
  hasError,
}: ValidatedPasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, hasError && styles.inputError]}
        value={password}
        onChangeText={onChangePassword}
        placeholder="Senha"
        secureTextEntry={!visible}
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={() => setVisible((v) => !v)}>
        <Icon
            name={visible ? 'eye-off' : 'eye'}
            size={24}
            color="gray"/>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  inputError: {
    borderColor: 'red',
  },
  toggleText: {
    marginTop: 5,
    color: 'blue',
    fontSize: 14,
    alignSelf: 'flex-end',
  },
});
