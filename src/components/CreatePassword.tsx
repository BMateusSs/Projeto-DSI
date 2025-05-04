import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface CreatePasswordProps {
  password: string;
  setPassword: (text: string) => void;
  confirmPassword: string;
  setConfirmPassword: (text: string) => void;
  errorMessage?: string;
}

const CreatePassword: React.FC<CreatePasswordProps> = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  errorMessage
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  }
});

export default CreatePassword;