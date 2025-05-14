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
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  function handleLogin() {
    setHasError(false);
    setErrorMessage("");

    if (!email || !senha) {
      setErrorMessage("Preencha todos os campos!");
      setHasError(true);
      return;
    }

    if (email.trim() === "bruno@email.com" && senha.trim() === "#Brun0") {
      navigation.navigate("Home");
    } else {
      setErrorMessage("E-mail ou senha inválida!");
      setHasError(true);
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