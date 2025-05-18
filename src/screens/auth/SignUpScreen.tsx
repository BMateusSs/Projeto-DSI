import React, { useState } from "react";
import { View, ScrollView, Alert, Text } from "react-native";
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
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const authService = new UserAuthService();
  
  const { errorMessage, validateSignUp } = SignUpValidation();

  const handleSignUp = async () => {    
    if (!validateSignUp(password, confirmPassword)) {
      return;
    }
  
    try {
      setEmailError("");
      const user = await authService.signUp(email.trim(), password.trim(), name);
      navigation.navigate("SelectProfile", { uid: user.uid });
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/email-already-in-use"){
        setEmailError("E-mail já cadastrado");
      } else {
          Alert.alert("Erro", "Não foi possível realizar o cadastro");
      }
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
        {emailError !== "" && (
          <Text style={{ color: "red", marginBottom: 10}}>{emailError}</Text>
        )}
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