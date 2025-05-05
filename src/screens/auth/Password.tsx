import React, { useState } from "react";
import { View, Text } from "react-native";
import styles from "./Login";
import { useNavigation } from "@react-navigation/native";
import { ConfirmButton } from "../../components/ConfirmButton";
import { InputEmail } from "../../components/InputEmail";
import Title from "../../components/Title";

export default function Password(){
    const [email, setEmail] = useState("");

    return(
        <View style={styles.container}>
            <Title text="Recuperar senha" align="center" />

            <Text style={styles.forget}> Informe o seu e-mail para receber o código de recuperação.</Text>
            
            <InputEmail
                email={email}
                onChangeEmail={setEmail}
                hasError={false}
            />

            <ConfirmButton
                title="Enviar código"
                onPress={() => {}}
            />
            
        </View>
    )
}