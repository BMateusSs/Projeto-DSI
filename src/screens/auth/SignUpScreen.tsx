import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./Login";
import { ConfirmButton } from "../../components/ConfirmButton";
import { InputEmail } from "../../components/InputEmail";
import Link from "../../components/Link";

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

            <Link to="Login" label="Já tem uma conta? *Entrar*"/>

        </View>
    )
}