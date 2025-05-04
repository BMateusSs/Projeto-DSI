import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../../Login";
import {InputEmail, ValidatedEmailInput} from "../../components/InputEmail";
import { ConfirmButton } from "../../components/ConfirmButton";
import { InputPassword } from "../../components/InputPassword";
import Link from "../../components/Link";

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [senhaError, setSenhaError] = useState(false);



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

    function handlePassword() {
        navigation.navigate("Password")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo</Text>
            
            <View style={styles.containerLogin}>
                
                <InputEmail email={email} onChangeEmail={setEmail} hasError={true}/>

                <InputPassword password={senha} onChangePassword={setSenha} hasError={true}/>

                <Link to="Password" label="Esqueceu a senha? *Clique aqui*" />

                <ConfirmButton
                    title="Entrar"
                    onPress={handleLogin}
                />
                
                <Text style={styles.option}>Ou</Text>

                <TouchableOpacity 
                    style={styles.containerButtonRegister}
                    onPress={handleSignUp}
                >
                    <Text style={styles.textButtonRegister}>Criar conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}