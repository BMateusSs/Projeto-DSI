import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import AddInput from '../../components/AddInput';
import Anotation from '../../components/Anotations';
import { ConfirmButton } from '../../components/ConfirmButton';
import Card from '../../components/Card';
import SubTitle from '../../components/SubTitle';
import DualOptionSelector from '../../components/StatusButton';
import { useNavigation } from '@react-navigation/native';
import storeService from '../../services/storeService';
import { auth } from '../../firebase/firebaseConfig';

const AddStoreScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [notes, setNotes] = useState('');
  const navigation = useNavigation();
  const isFormValid = () => {
    return name.trim().length > 0 && !!type;
  };
  const handleAddStore = async () => {
    if (!name || !type) {
      Alert.alert('Erro', 'Preencha ao menos o nome e o tipo da loja');
      return;
    }
    const user = auth.currentUser;
    if (!user) {
        Alert.alert('Erro', 'Usuário não autenticado');
        return;
    }
    try {
      await storeService.addStore({
        uid: user.uid,
        name,
        type,
        address,
        contact,
        notes,
      });
      Alert.alert('Sucesso', 'Loja adicionada com sucesso');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar a loja');
      console.error('Erro ao adicionar loja:', error);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <SubTitle title="Nome da Loja" />
        <AddInput
          placeholder="Digite o nome"
          value={name}
          onChange={setName}
        />

        <SubTitle title="Tipo" />
        <DualOptionSelector
          options={[
            { label: 'Física', value: 'física' },
            { label: 'Online', value: 'online' },
          ]}
          onValueChange={setType}
          initialValue={type}
        />

        <SubTitle title="Endereço" />
        <AddInput
          placeholder="Digite o endereço"
          value={address}
          onChange={setAddress}
        />

        <SubTitle title="Contato" />
        <AddInput
          placeholder="Email/Telefone"
          value={contact}
          onChange={setContact}
        />

        <SubTitle title="Anotações" />
        <Anotation
          text="Digite anotações adicionais"
          value={notes}
          onChange={setNotes}
        />
      </Card>

      <ConfirmButton
        title="Adicionar Loja"
        onPress={handleAddStore}
        disabled={!isFormValid()}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 30,
    paddingTop: 20,
    backgroundColor: '#fff'
  },
});

export default AddStoreScreen;