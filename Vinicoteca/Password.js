import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./Login";
import { useNavigation } from "@react-navigation/native";

export default function Password(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar senha</Text>

            <Text style={styles.forget}> Informe o seu e-mail para receber o código de recuperação.</Text>
            
            <TextInput 
            placeholder="seu@email.com"
            keyboardType="email-adress"
            style={styles.containerInput}
            />

            <TouchableOpacity style={styles.containerButton}>
                <Text style={styles.textButton}>Enviar código</Text>
            </TouchableOpacity>
            
        </View>
    )
}