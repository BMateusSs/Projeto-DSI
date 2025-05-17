import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ConfirmButton } from '../../components/ConfirmButton';
import { AccountButton } from '../../components/AccountButton';
import authStyles from '../../styles/authStyles';
import Title from '../../components/Title';

const { width } = Dimensions.get('window');

const profiles = [
  { id: 'consumer', label: 'Consumidor' },
  { id: 'business', label: 'Dono de Negócio' },
  { id: 'producer', label: 'Produtor' },
];

export default function SelectProfile() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
  };

  const handleContinue = () => {
    if (selected) {
      // Aqui você pode salvar o tipo de perfil no seu estado global ou banco de dados
      console.log('Perfil selecionado:', selected);
      navigation.navigate("Home"); // Navega para a tela principal
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
            selected={selected === profile.id}
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