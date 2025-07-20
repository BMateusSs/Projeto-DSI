import React, { useState, useLayoutEffect } from "react";
import { View, Text, ScrollView, Keyboard, Platform, TouchableWithoutFeedback, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/authStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserAuthService } from "../../firebase/UserAuthService";
import { InputEmail } from "../../components/InputEmail";
import { InputPassword } from "../../components/InputPassword";
import { ConfirmButton } from "../../components/ConfirmButton";
import { AccountButton } from "../../components/AccountButton";
import Link from "../../components/Link";
import Title from "../../components/Title";
import RememberMeSwitch from "../../components/RememberMeSwitch";
const { height} = Dimensions.get("window");
const KeyboardDismissWrapper = ({ children }: { children: React.ReactNode }) => {
  if (Platform.OS === 'web') {
    return <View style={{ flex: 1 }}>{children}</View>;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [rememberMe, setRememberMe] = useState(true)
  const authService = new UserAuthService();
  useLayoutEffect(()=>{
    const carregarCredenciais = async () => {
      const saveEmail = await AsyncStorage.getItem('email');
      const savePassword = await AsyncStorage.getItem('password');
      const saveRemember = await AsyncStorage.getItem('remember');
      if (saveRemember === 'true'){
        setEmail(saveEmail || "")
        setSenha(savePassword || "")
        setRememberMe(true)
      }
    };
    carregarCredenciais();
  }, []);
  async function handleLogin() {
    setHasError(false);
    setErrorMessage("");
    if (!email || !senha) {
      setErrorMessage("Preencha todos os campos");
      setHasError(true);
      return;
    }
    try {
      const user = await authService.signIn(email.trim(), senha.trim());
      if (rememberMe){
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', senha);
        await AsyncStorage.setItem('remember', 'true');
      } else {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
        await AsyncStorage.setItem('remember', 'false');
      }
      navigation.navigate('TabNavigation', { screen: 'Home' });
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
    <KeyboardDismissWrapper>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Title text="Bem-vindo"/>
        <View style={styles.containerForm}>
          {errorMessage ? (
            <Text style={localStyles.errorMessage}>
              {errorMessage}
            </Text>
          ) : null}
          <InputEmail email={email} onChangeEmail={setEmail} hasError={hasError} />
          <InputPassword password={senha} onChangePassword={setSenha} hasError={hasError} />
        
          <RememberMeSwitch
          value={rememberMe}
          onValueChange={setRememberMe}
          />

          <Link to="Password" label="Esqueceu a senha? *Clique aqui*" />
          <ConfirmButton title="Entrar" onPress={handleLogin} />
          <Text style={styles.option}>Ou</Text>
          <AccountButton title="Criar conta" onPress={handleSignUp} />
        </View>
      </ScrollView>
    </KeyboardDismissWrapper>
  );
}

const localStyles = StyleSheet.create({
  errorMessage: { color: 'red', fontSize: 14, marginBottom: height < 720 ? 2 : 4 }
})