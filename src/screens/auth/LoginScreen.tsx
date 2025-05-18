import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/authStyles";

import { UserAuthService } from "../../firebase/UserAuthService";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const authService = new UserAuthService();

  async function handleLogin() {
    setHasError(false);
    setErrorMessage("");

    if (!email || !senha) {
      setErrorMessage("Preencha todos os campos");
      setHasError(true);
      return;
    }

    try {
      await authService.signIn(email.trim(), senha.trim());
      navigation.navigate("Home")
    } catch (error) {
      setErrorMessage("E-mail ou senha inválidos");
      setHasError(true);
      console.error(error);
    }
  }

  function handleSignUp() {
    navigation.navigate("SignUp");
  }

  return (
    <View style={styles.container}>
      <Title text="Bem-vindo"/>

      <View style={styles.containerForm}>
        {errorMessage ? (
          <Text style={{ color: 'red', fontSize: 14, marginBottom: 10 }}>
            {errorMessage}
          </Text>
        ) : null}

        <InputEmail email={email} onChangeEmail={setEmail} hasError={hasError} />
        <InputPassword password={senha} onChangePassword={setSenha} hasError={hasError} />
        
        <Link to="Password" label="Esqueceu a senha? *Clique aqui*" />
        <ConfirmButton title="Entrar" onPress={handleLogin} />
        <Text style={styles.option}>Ou</Text>
        <AccountButton title="Criar conta" onPress={handleSignUp} />
      </View>
    </View>
  );
}