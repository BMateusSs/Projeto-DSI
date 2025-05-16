import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { UserAuthService } from "../../firebase/UserAuthService";

import { ConfirmButton } from "../../components/ConfirmButton";
import { InputEmail } from "../../components/InputEmail";
import CreatePassword from "../../components/CreatePassword";
import Link from "../../components/Link";
import { SignUpValidation } from "../../hooks/SignUpValidation";
import Title from "../../components/Title";
import { InputName } from "../../components/InputName";
import styles from "../../styles/authStyles";

export default function SignUp() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const authService = new UserAuthService();
  
  const { errorMessage, validateSignUp } = SignUpValidation();

  const handleSignUp = async () => {
    if (validateSignUp(password, confirmPassword)) {
      return;
    }
  
    try {
      const user = await authService(email.trim(), password.trim(), name);
      navigation.navigate("SelectProfile", { uid: user.uid });
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível realizar o cadastro");
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Title text="Cadastrar" />

      <View style={styles.containerForm}>
        <InputName
          value={name}
          onChangeName={setName}
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
      </View>

      <View style={styles.containerFooter}>
        <ConfirmButton title="Registrar" onPress={handleSignUp} />
        <Link to="Login" label="Já tem uma conta? *Entrar*" />
      </View>
    </ScrollView>
  );
}