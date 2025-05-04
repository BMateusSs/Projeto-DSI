import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
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
    <Text style={styles.forget}> {/* Aplicando o estilo para o texto normal */}
      {normalText}
      <TouchableOpacity onPress={() => navigation.navigate(to, params)}>
        <Text style={styles.textBold}> {/* Aplicando o estilo para o link em negrito */}
          {linkText}
        </Text>
      </TouchableOpacity>
    </Text>
  );
};

export default Link;