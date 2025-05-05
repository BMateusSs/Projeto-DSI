// src/screens/auth/Login.tsx
import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/authStyles";

import { InputEmail } from "../../components/InputEmail";
import { InputPassword } from "../../components/InputPassword";
import { ConfirmButton } from "../../components/ConfirmButton";
import { AccountButton } from "../../components/AccountButton";
import Link from "../../components/Link";
import Title from "../../components/Title";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    if (email.trim() === "bruno@email.com" && senha.trim() === "12345") {
      navigation.navigate("Home");
    } else {
      Alert.alert("Erro", "Credenciais incorretas!");
    }
  }

  function handleSignUp() {
    navigation.navigate("SignUp");
  }

  return (
    <View style={styles.container}>
      <Title text="Bem-vindo"/>

      <View style={styles.containerForm}>
        <InputEmail email={email} onChangeEmail={setEmail} hasError={false} />
        <InputPassword password={senha} onChangePassword={setSenha} hasError={false} />
        <Link to="Password" label="Esqueceu a senha? *Clique aqui*" />
        <ConfirmButton title="Entrar" onPress={handleLogin} />
        <Text style={styles.option}>Ou</Text>
        <AccountButton title="Criar conta" onPress={handleSignUp} />
      </View>
    </View>
  );
}
