import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {VinicotecaTheme} from "../styles/colors";
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Obtém a largura da tela

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
    <View style={[styleInputPassword.container, { width: width * 0.8 }]}> {/* Responsividade: 80% da largura da tela */}
      <TextInput
        style={[
          styleInputPassword.input, 
          hasError && styleInputPassword.inputError
        ]}
        value={password}
        onChangeText={onChangePassword}
        placeholder="Senha"
        secureTextEntry={!visible}
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={() => setVisible((v) => !v)}>
        <Icon name={visible ? 'eye-off' : 'eye'} size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
}

const styleInputPassword = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
  },
  inputError: {
    borderColor: 'red',
  },
});