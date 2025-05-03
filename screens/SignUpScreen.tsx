import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../Login";

export default function SignUp(){
    const navigation = useNavigation()

    function handleLogin(){
        navigation.navigate('Login')
    }

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Cadastrar</Text>
            </View>

            <TextInput
            style={styles.containerInput}
            placeholder="Informe seu nome" 
            secureTextEntry
            />

            <TextInput
            style={styles.containerInput}
            placeholder="seu@email.com" 
            keyboardType="email-adress"
            />

            <TextInput
            style={styles.containerInput}
            placeholder="Senha" 
            secureTextEntry
            />

            <TextInput
            style={styles.containerInput}
            placeholder="Confirmar senha" 
            secureTextEntry
            />

            <TouchableOpacity
            style={styles.containerButton}
            >
                <Text style={styles.textButton}>Registrar</Text>
            </TouchableOpacity>

            <View style={styles.containerFlex}>
                <Text style={styles.forget}>Já tem conta?</Text>
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={styles.textBold}>Entrar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}