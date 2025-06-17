import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import AddInput from '../../components/AddInput';
import Anotation from '../../components/Anotations';
import { ConfirmButton } from '../../components/ConfirmButton';
import SubTitle from '../../components/SubTitle';
import DualOptionSelector from '../../components/StatusButton';
import { useNavigation } from '@react-navigation/native';
import storeService, { StoreData } from '../../services/storeService';
import { auth } from '../../firebase/firebaseConfig';
import { RouteProp, useRoute } from '@react-navigation/native';

type RouteParams = {
  storeToEdit?: StoreData;
};

const AddStoreScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const storeToEdit = route.params?.storeToEdit;
  const [name, setName] = useState('');
  const [type, setType] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [notes, setNotes] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    if (storeToEdit) {
      setName(storeToEdit.name);
      setType(storeToEdit.type);
      setAddress(storeToEdit.address ?? '');
      setContact(storeToEdit.contact ?? '');
      setNotes(storeToEdit.notes ?? '');
    }
  }, [storeToEdit]);

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
      if (storeToEdit) {
        await storeService.updateStore({
          id: storeToEdit.id,
          createdBy: user.uid,
          name,
          type,
          address,
          contact,
          notes,
          createdAt: storeToEdit.createdAt,
        });
        Alert.alert('Sucesso', 'Loja atualizada com sucesso');
      } else {
        await storeService.addStore({
          createdBy: user.uid,
          name,
          type,
          address,
          contact,
          notes,
        });
        Alert.alert('Sucesso', 'Loja adicionada com sucesso');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a loja');
      console.error('Erro ao salvar loja:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <SubTitle title="Nome da Loja" />
          <AddInput
            placeholder="Digite o nome da loja"
            value={name}
            onChange={setName}
          />

          <SubTitle title="Tipo" />
          <DualOptionSelector
            options={[
              { label: 'Física', value: 'Física' },
              { label: 'Online', value: 'Online' },
            ]}
            onValueChange={setType}
            initialValue={type}
          />

          <SubTitle title="Endereço" />
          <AddInput
            placeholder="Endereço/link do site"
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
            text="Anotações adicionais"
            value={notes}
            onChange={setNotes}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <ConfirmButton
          title={storeToEdit ? "Atualizar Loja" : "Adicionar Loja"}
          onPress={handleAddStore}
          disabled={!isFormValid()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  formContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

export default AddStoreScreen;