import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Title from '../../components/Title';
import InputData from '../../components/InputData';
import { ConfirmButton } from '../../components/ConfirmButton';
import authStyles from '../../styles/authStyles';

import { useRoute, useNavigation } from '@react-navigation/native';
import { UserAuthService } from '../../firebase/UserAuthService';

const InfoProducer: React.FC = () => {
  const [vinicola, setVinicola] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');

  const route = useRoute();
  const { uid } = route.params as { uid: string };
  const navigation = useNavigation();
  const userService = new UserAuthService();
  const [loading, setLoading] = useState(false);

  const [cnpjError, setCnpjError] = useState("");
  const formatCnpj = (value: string) => {
    return value
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  };
  const handleCnpjChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '').slice(0, 14);
    setCnpj(numericText);
    setCnpjError('');
  };

  const handleConfirm = async () => {
    setLoading(true);

    if (cnpj.length !== 14) {
        setCnpjError("O CNPJ deve conter 14 dígitos");
        setLoading(false);
        return;
    }

    const producerData = {
        vinicola,
        cnpj,
        estado,
        cidade,
  };

  try {
    const cnpjExists = await userService.checkIfCnpjExists(cnpj);
    if (cnpjExists) {
        setCnpjError("CNPJ já cadastrado");
        setLoading(false);
        return;
    }
    await userService.updateProducerInfo(uid, producerData);
    console.log("Informações da vinícola salvas");
    navigation.navigate('Home');
  } catch (error) {
    console.error("Erro ao salvar as informações:", error);
    setCnpjError("Erro ao salvar as informações");
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={authStyles.container}>
      <Title text="Informações adicionais" />
      <Text>
        Dados da sua vinícola
      </Text>

      <View style={authStyles.containerForm}>
        <InputData
          placeholder="Nome da vínicola"
          value={vinicola}
          onChangeText={setVinicola}
        />
        <InputData
          placeholder="CNPJ"
          value={formatCnpj(cnpj)}
          onChangeText={handleCnpjChange}
          keyboardType="numeric"
        />
        {cnpjError !== '' && (
            <Text style={{ color: 'red', marginBottom: 10}}>{cnpjError}</Text>
        )}

        <View style={localStyles.sectionTitleContainer}>
          <Text style={localStyles.sectionTitle}>Endereço</Text>
        </View>

        <View style={localStyles.rowInputs}>
          <View style={{ flex: 1 }}>
            <InputData
              placeholder="Estado"
              value={estado}
              onChangeText={setEstado}
            />
          </View>
          <View style={{ flex: 1 }}>
            <InputData
              placeholder="Cidade"
              value={cidade}
              onChangeText={setCidade}
            />
          </View>
        </View>

        <ConfirmButton
          title="Concluir cadastro"
          onPress={handleConfirm}
          loading={loading}
          disabled={!vinicola || !cnpj || !estado || !cidade}
        />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  sectionTitleContainer: {
    alignSelf: 'flex-start',
    marginBottom: -5,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 4,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
  },
});

export default InfoProducer;