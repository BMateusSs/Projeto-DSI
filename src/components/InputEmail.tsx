import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import styles from "../screens/auth/Login";

interface ValidatedEmailInputProps {
    email: string;
  onChangeEmail: (newEmail: string) => void;
  hasError: Boolean;
}

export function InputEmail({ email, onChangeEmail, hasError }: ValidatedEmailInputProps) {

    return (
        <View>
            <TextInput
                style={[styles.containerInput, hasError && styles.inputError]}
                value={email}
                onChangeText={onChangeEmail}
                placeholder={"Digite seu Email"}
                autoCapitalize={"none"}
                keyboardType={"email-address"}
                />
        </View>
    );
}