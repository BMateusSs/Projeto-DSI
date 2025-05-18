import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { VinicotecaTheme } from '../../styles/colors';
import { ConfirmButton } from '../../components/ConfirmButton';
import { AccountButton } from '../../components/AccountButton';
import authStyles from '../../styles/authStyles';
import Title from '../../components/Title';

import { UserAuthService } from '../../firebase/UserAuthService';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const profiles = [
  { id: 'consumer', label: 'Consumidor' },
  { id: 'business', label: 'Dono de Negócio' },
  { id: 'producer', label: 'Produtor' },
];

export default function SelectProfile() {
  const route = useRoute();
  const { uid } = route.params as { uid: string };
  console.log("UID do usuário:", uid);

  const navigation = useNavigation()

  const [selected, setSelected] = useState<string | null>(null);
  const userService = new UserAuthService();

  const handleSelect = (id: string) => {
    setSelected(id);
  };

  const handleContinue = async () => {
  if (selected) {
    console.log('Perfil selecionado:', selected);
    try {
      await userService.updateUserProfile(uid, selected);
      console.log("Perfil atualizado no Firestore");

      if (selected === 'consumer') {
        navigation.navigate('Preferences', { uid });
      } else {
        navigation.navigate('Home');
      }

    } catch (error) {
      console.error("Erro ao atualizar o perfil", error);
    }
  }
};


  return (
    <View style={authStyles.container}>
      <Title text="Selecione seu perfil" />

      <View style={authStyles.containerForm}>
        {profiles.map((profile) => (
          <AccountButton
            key={profile.id}
            title={profile.label}
            onPress={() => handleSelect(profile.id)}
            selected={selected === profile.id}//
          />
        ))}

        <ConfirmButton
          title="Continuar"
          onPress={handleContinue}
          disabled={!selected}
        />
      </View>
    </View>
  );
}