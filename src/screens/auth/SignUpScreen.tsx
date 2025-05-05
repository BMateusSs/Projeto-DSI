import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./Login";
import { ConfirmButton } from "../../components/ConfirmButton";
import { InputEmail } from "../../components/InputEmail";
import CreatePassword from "../../components/CreatePassword";
import Link from "../../components/Link";
import { SignUpValidation } from "../../hooks/SignUpValidation";
import Title from "../../components/Title";

export default function SignUp() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { errorMessage, validateSignUp } = SignUpValidation();

  const handleSignUp = () => {
    if (validateSignUp(password, confirmPassword)) {
      console.log('Usuário cadastrado com sucesso!');
    }
  };

  return (
    <View style={styles.container}>
      <Title text="Cadastrar" align="center" />

      <TextInput
        style={styles.containerInput}
        placeholder="Informe seu nome" 
      />

      <InputEmail
        email={email}
        onChangeEmail={setEmail}
        hasError={false}
      />
      
      <CreatePassword 
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        errorMessage={errorMessage}
      />

      <ConfirmButton
        title="Registrar"
        onPress={handleSignUp}
      />

      <Link to="Login" label="Já tem uma conta? *Entrar*"/>
    </View>
  );
}