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
  const [nameError, setNameError] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const authService = new UserAuthService();
  const [loading, setLoading] = useState(false);
  const { errorMessage, validateSignUp } = SignUpValidation();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isFormValid = (): boolean => {
    return(
      name.trim().length > 0 &&
      emailRegex.test(email) &&
      password.length > 0 &&
      confirmPassword.length > 0
    );
  };
  const handleSignUp = async () => {  
    setNameError("");
    setEmailError("");
    if (!name.trim()) {
      setNameError("Nome não preenchido");
      return;
    }
    if (!email.trim()) {
      setEmailError("E-mail não preenchido");
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError("E-mail inválido");
      return;
    }  
    const valid = validateSignUp(password, confirmPassword);
    if (!valid) {
      return;
    }
    try {
      setLoading(true);
      setEmailError("");
      const user = await authService.signUp(email.trim(), password.trim(), name);
      navigation.navigate("Preferences", { uid: user.uid });
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/email-already-in-use"){
        setEmailError("E-mail já cadastrado");
      } else {
          Alert.alert("Erro", "Não foi possível realizar o cadastro");
      }
    } finally {
      setLoading(false);
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
          onChangeName={(text) => {
            setName(text);
            if (nameError) setNameError("");
          }}
          placeholder="Informe seu nome"
        />
        {nameError !== "" && <Text style={{ color: 'red', marginBottom: 10 }}>{nameError}</Text>}
        <InputEmail
          email={email}
          onChangeEmail={(text) => {
            setEmail(text);
            if (emailError) setEmailError("");
          }}
          hasError={!!emailError}
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
        <ConfirmButton 
        title="Registrar" 
        onPress={handleSignUp}
        loading={loading}
        disabled={!isFormValid()} 
        />
        <Link to="Login" label="Já tem uma conta? *Entrar*" />
      </View>
    </ScrollView>
  );
}