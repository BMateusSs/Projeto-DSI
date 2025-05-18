import React, { useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/authStyles";

import { ConfirmButton } from "../../components/ConfirmButton";
import { InputCode } from "../../components/InputCode";
import Title from "../../components/Title";

export default function PasswordRecoveryCode() {
  const [code, setCode] = useState("");

  const navigation = useNavigation()

  function handlePassword(){
        if (code === "123456"){
            navigation.navigate("NewPassword")
        }
    }

  return (
    <View style={styles.container}>
      <Title text="Recuperar senha" />

      <Text>
        Digite o código de verificação.
      </Text>

      <View style={styles.containerForm}>
        <InputCode code={code} onChangeCode={setCode} hasError={false} />
        <ConfirmButton title="Confirmar" onPress={handlePassword} />
      </View>
    </View>
  );
}