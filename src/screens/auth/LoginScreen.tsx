import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../../Login";
import {InputEmail, ValidatedEmailInput} from "../../components/InputEmail";

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState(""); // Renomeado para manter consistência

    function handleLogin() {
        // Verifica campos vazios
        if (!email || !senha) {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }

        // Validação (compare com trim() para remover espaços acidentais)
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
                {/* Campo de E-mail (CORRIGIDO: onChangeText em vez de onChange) */}
                <InputEmail email={email} onChangeEmail={setEmail} hasError={true}/>

                {/* Campo de Senha */}
                <TextInput
                    style={styles.containerInput}
                    placeholder="Senha"
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha} 
                />

                <TouchableOpacity onPress={handlePassword}>
                    <Text style={styles.forget}>Esqueceu a senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.containerButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.textButton}>Entrar</Text>
                </TouchableOpacity>
                
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