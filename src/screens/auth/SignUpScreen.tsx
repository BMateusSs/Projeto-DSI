import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../../Login";
import { ConfirmButton } from "../../components/ConfirmButton";
import { InputEmail } from "../../components/InputEmail";

export default function SignUp(){
    const navigation = useNavigation()
    const [email, setEmail] = useState("");

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
            />

            <InputEmail
                email={email}
                onChangeEmail={setEmail}
                hasError={false}
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

            <ConfirmButton
                title="Registrar"
                onPress={() => {}}
            />

            <View style={styles.containerFlex}>
                <Text style={styles.forget}>Já tem conta?</Text>
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={styles.textBold}>Entrar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}