import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

interface ValidatedEmailInputProps {
    email: string;
  onChangeEmail: (newEmail: string) => void;
  hasError: Boolean;
}

export function InputEmail({ email, onChangeEmail, hasError }: ValidatedEmailInputProps) {

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, hasError && styles.inputError]}
                value={email}
                onChangeText={onChangeEmail}
                placeholder={"Digite seu Email"}
                autoCapitalize={"none"}
                keyboardType={"email-address"}
                />
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