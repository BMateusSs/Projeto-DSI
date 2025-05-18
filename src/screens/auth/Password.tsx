// src/screens/auth/Password.tsx
import React, { useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/authStyles";

import { ConfirmButton } from "../../components/ConfirmButton";
import { InputEmail } from "../../components/InputEmail";
import Title from "../../components/Title";

export default function Password() {
  const [email, setEmail] = useState("");

  const navigation = useNavigation()

  function handleCode(){
    navigation.navigate("RecoveryCode")
  }

  return (
    <View style={styles.container}>
      <Title text="Recuperar senha" />

      <Text>
        Informe o seu e-mail para receber o código de recuperação.
      </Text>

      <View style={styles.containerForm}>
        <InputEmail email={email} onChangeEmail={setEmail} hasError={false} />
        <ConfirmButton title="Enviar código" onPress={handleCode} />
      </View>
    </View>
  );
}