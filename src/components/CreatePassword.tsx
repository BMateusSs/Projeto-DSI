import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../screens/auth/Login';

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
  const [visible, setVisible] = useState(true);
  const [confirmVisible, setConfirmVisible] = useState(true);

  return (
    <View style={styles.containerCreatePassword}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.textInput}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!visible}
        />
        <TouchableOpacity onPress={() => setVisible((v) => !v)}>
          <Icon name={visible ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.containerInput}>
        <TextInput
          style={styles.textInput}
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!confirmVisible}
        />
        <TouchableOpacity onPress={() => setConfirmVisible((v) => !v)}>
          <Icon name={confirmVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

export default CreatePassword;