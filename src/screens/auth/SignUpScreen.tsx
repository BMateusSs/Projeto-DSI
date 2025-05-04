import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./Login";
import { ConfirmButton } from "../../components/ConfirmButton";
import { InputEmail } from "../../components/InputEmail";
import CreatePassword from "../../components/CreatePassword";
import Link from "../../components/Link";

export default function SignUp(){
    const navigation = useNavigation()
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = () => {
        if (password !== confirmPassword) {
          setErrorMessage('As senhas não coincidem');
        } else if (password.length < 6) {
          setErrorMessage('A senha deve ter pelo menos 6 caracteres');
        } else {
          setErrorMessage('');
          
          console.log('Usuário cadastrado');
        }
      };

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Cadastrar</Text>
            </View>

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
    )
}