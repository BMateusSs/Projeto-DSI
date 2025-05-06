import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../screens/auth/Login'; // Importando estilos de Login.ts

type LinkProps = {
  to: string;
  label: string;
  params?: object;
};

const Link: React.FC<LinkProps> = ({ to, label, params }) => {
  const navigation = useNavigation<any>();

  const [normalText, linkText] = label.split('*');

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={styles.forget}>{normalText}</Text>
      <TouchableOpacity onPress={() => navigation.navigate(to, params)}>
        <Text style={styles.textBold}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Link;