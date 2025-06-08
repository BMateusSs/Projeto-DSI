import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserAuthService } from "../../firebase/UserAuthService";
import styles from "../../styles/authStyles";
import { ConfirmButton } from "../../components/ConfirmButton";
import { InputEmail } from "../../components/InputEmail";
import Title from "../../components/Title";
import Link from "../../components/Link";

export default function Password() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();
  const authService = new UserAuthService();
  async function handleCode() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()){
      setError("Insira seu email");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Email inválido");
      return;
    }
    try {
      setError(null);
      const emailExists = await authService.checkIfEmailExists(email);
      if (emailExists) {
        const user = await authService.getUserByEmail(email);
        if (user) {
          const code = await authService.generateRecoveryCode(user.uid);
          // integrar firebase email send
          navigation.navigate("RecoveryCode");
        }
      } else {
        setError("E-mail não cadastrado");
      }
    } catch (error) {
      setError("Erro ao gerar código de recuperação");
      console.log(error);
      }
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
        { error && (
          <View>
            <Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>{error}</Text>
            {error === "E-mail não cadastrado" && (
              <Link to= "SignUp" label="Não tem cadastro? *Registre-se*"/>
            )}
          </View>
        )}
      </View>
    </View>
  );
}