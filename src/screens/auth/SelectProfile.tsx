import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { VinicotecaTheme } from '../../styles/colors';
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
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
  };

  const handleContinue = () => {
    if (selected) {
        // cont
      console.log('Perfil selecionado:', selected);
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