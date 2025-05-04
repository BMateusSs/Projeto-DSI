import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CreatePasswordProps {
  password: string;
  setPassword: (text: string) => void;
  confirmPassword: string;
  setConfirmPassword: (text: string) => void;
  errorMessage?: string;
}

const CreatePassword: React.FC<CreatePasswordProps> = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  errorMessage
}) => {

    const [visible, setVisible] = useState(true)

  return (
    <View >
        <View style={styleInputPassword.container}>
            <TextInput
            style={styleInputPassword.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!visible}/>

            <TouchableOpacity onPress={() => setVisible((v) => !v)}>
                <Icon name={visible ? 'eye-off' : 'eye'} size={24} color="gray" />
            </TouchableOpacity>
        </View>
      
        <View style={styleInputPassword.container}>
            <TextInput
            style={styleInputPassword.input}
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry/>

            <TouchableOpacity onPress={() => setVisible((v) => !v)}>
                <Icon name={visible ? 'eye-off' : 'eye'} size={24} color="gray" />
            </TouchableOpacity>
            
        </View>
      

      {errorMessage && <Text>{errorMessage}</Text>}
    </View>
  );
};

const styleInputPassword = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
      minWidth: '90%',
    },
    input: {
      flex: 1,
      
      height: 40,
      marginRight: 10,
      borderColor: '#fff',
    },
  });



export default CreatePassword;