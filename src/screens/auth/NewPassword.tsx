import React, {useState} from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import authStyles from '../../styles/authStyles'
import Title from '../../components/Title'
import CreatePassword from '../../components/CreatePassword'
import { ConfirmButton } from '../../components/ConfirmButton'

export function NewPassword(){
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigation = useNavigation()
    function handlePassword(){
        navigation.navigate("Login")
    }
    return(
        <View style={authStyles.container}>
            <View style={authStyles.containerForm}>
            <Title text='Recuperar senha'/>
            <Text>Defina sua nova senha</Text>

            <CreatePassword 
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            />

            <ConfirmButton title='Confirmar' onPress={handlePassword}/>

            </View>
        </View>
        
    )

}