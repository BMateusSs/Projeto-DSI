import React, { useState } from "react";
import { View, Text } from "react-native";
import styles from "../../../Login";
import { useNavigation } from "@react-navigation/native";
import { ConfirmButton } from "../../components/ConfirmButton";
import { InputEmail } from "../../components/InputEmail";

export default function Password(){
    const [email, setEmail] = useState("");

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar senha</Text>

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