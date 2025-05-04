import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

interface ValidatedEmailInputProps {
  email: string;
  onChangeEmail: (newEmail: string) => void;
}

export function ValidatedEmailInput({ email, onChangeEmail}: ValidatedEmailInputProps) {
  const [isValid, setIsValid] = React.useState(true);

  function handleEmailChange(text: string) {
    onChangeEmail(text);
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    setIsValid(regex.test(text));
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, !isValid && styles.inputError]}
        value={email}
        onChangeText={handleEmailChange}
        placeholder={"Digite seu Email"}
        autoCapitalize={"none"}
        keyboardType={"email-address"}
      />
      {!isValid && <Text style={styles.errorText}>Tem algo de errado com o email</Text>}
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
    errorText: {
        marginTop: 5,
        color: 'red',
        fontSize: 12,
    },
});