import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import authStyles from '../styles/authStyles';

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
    <View style={{ gap: 10, alignItems: 'center', width: '100%' }}>

      <View style={authStyles.inputContainer}>
        <TextInput
          style={authStyles.inputText}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!visible}
        />
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <Icon name={visible ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={authStyles.inputContainer}>
        <TextInput
          style={authStyles.inputText}
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!confirmVisible}
        />
        <TouchableOpacity onPress={() => setConfirmVisible(!confirmVisible)}>
          <Icon name={confirmVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {errorMessage ? (
        <Text style={{ color: 'red', fontSize: 14, marginBottom: 10 }}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
};

export default CreatePassword;
