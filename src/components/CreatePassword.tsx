import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../screens/auth/Login';

const { width } = Dimensions.get('window');

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
  errorMessage,
}) => {
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  return (
    <View style={[styles.containerCreatePassword, { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }]}>
      {}
      <View style={[styles.containerInput, { width: width * 0.8 }]}>
        <TextInput
          style={styleInputPassword.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!visible}
        />
        <TouchableOpacity onPress={() => setVisible((v) => !v)}>
          <Icon name={visible ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>
      
      {}
      <View style={[styles.containerInput, { width: width * 0.8 }]}>
        <TextInput
          style={styleInputPassword.input}
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!confirmVisible}
        />
        <TouchableOpacity onPress={() => setConfirmVisible((v) => !v)}>
          <Icon name={confirmVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}
const styleInputPassword = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 10,
    borderColor: '#fff',
  },
});

export default CreatePassword;