import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddInput from '../../components/AddInput';
import DualOptionSelector from '../../components/StatusButton';
import Anotation from '../../components/Anotations';
import StarRating from '../../components/StarRating';
import SubTitle from '../../components/SubTitle';
import { ConfirmButton } from '../../components/ConfirmButton';
import wineService from '../../services/wineService';
import { WineClass } from '../../services/wineClass';
import { auth } from '../../firebase/firebaseConfig';

type AddWineScreenRouteParams = {
  wineToEdit?: WineClass;
};

type AddWineScreenRouteProp = RouteProp<{ AddWineScreen: AddWineScreenRouteParams }, 'AddWineScreen'>;

const AddWineScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<AddWineScreenRouteProp>();
  const wineToEdit = route.params?.wineToEdit;
  const wineToEditFixed = wineToEdit
    ? { ...wineToEdit, createdAt: wineToEdit.createdAt ? new Date(wineToEdit.createdAt) : undefined }
    : undefined;
  const insets = useSafeAreaInsets();

  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [regiao, setRegiao] = useState('');
  const [status, setStatus] = useState<'experimented' | 'desired'>('desired');
  const [rating, setRating] = useState<number | null>(null);
  const [anotation, setAnotation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (wineToEditFixed) {
      setNome(wineToEditFixed.nome);
      setTipo(wineToEditFixed.tipo);
      setRegiao(wineToEditFixed.regiao);
      setStatus(wineToEditFixed.status);
      setRating(wineToEditFixed.rating);
      setAnotation(wineToEditFixed.anotation || '');
    }
  }, [wineToEdit]);

  const isFormValid = () => {
    return nome.trim().length > 0 && tipo.trim().length > 0 && regiao.trim().length > 0;
  };

  const handleSaveWine = async () => {
    if (!nome.trim() || !tipo.trim() || !regiao.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios');
      return;
    }
    
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Erro', 'Usuário não autenticado');
      return;
    }

    setIsLoading(true);

    const wine = new WineClass(
      nome.trim(),
      tipo.trim(),
      regiao.trim(),
      status,
      user.uid,
      status === 'experimented' ? (rating ?? 0) : null,
      anotation.trim() || null,
      wineToEditFixed?.id,
      wineToEditFixed?.createdAt
    );

    try {
      if (wineToEdit && wineToEdit.id) {
        await wineService.updateWine(wine);
        Alert.alert('Sucesso', 'Vinho atualizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        await wineService.addWine(wine);
        Alert.alert('Sucesso', 'Vinho adicionado com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }

      setNome('');
      setTipo('');
      setRegiao('');
      setStatus('desired');
      setRating(null);
      setAnotation('');
    } catch (error) {
      console.error("Erro ao salvar vinho:", error);
      Alert.alert('Erro', 'Não foi possível salvar o vinho');
    } finally {
      setIsLoading(false);
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
          <SubTitle title="Nome do Vinho" />
          <AddInput
            placeholder='Ex: Chânteau Margaux 2015'
            value={nome}
            onChange={setNome}
          />

          <SubTitle title="Tipo do Vinho" />
          <AddInput
            placeholder='Ex: Tinto'
            value={tipo}
            onChange={setTipo}
          />

          <SubTitle title="Origem do Vinho" />
          <AddInput
            placeholder='Ex: Bordeaux, França'
            value={regiao}
            onChange={setRegiao}
          />

          <SubTitle title="Status do Vinho" />
          <DualOptionSelector
            options={[
              { value: 'experimented', label: 'Experimentado' },
              { value: 'desired', label: 'Desejado' }
            ]}
            onValueChange={(value: string | null) => {
              if (value === 'experimented' || value === 'desired') {
                setStatus(value);
              } else {
                setStatus('desired');
              }
            }}
            initialValue={status}
          />

          {status === 'experimented' && (
            <>
              <SubTitle title="Avaliação do Vinho" />
              <View style={styles.ratingContainer}>
                <StarRating
                  rating={rating || 0}
                  onRatingChange={setRating}
                />
              </View>
            </>
          )}

          <SubTitle title="Anotações Pessoais" />
          <Anotation
            text='Digite suas observações sobre o vinho'
            value={anotation}
            onChange={setAnotation}
          />
        </View>
      </ScrollView>
      <View style={[styles.buttonContainer, { paddingBottom: Math.max(16, insets.bottom) }]}>
        <ConfirmButton
          title={wineToEdit ? 'Atualizar Vinho' : 'Adicionar Vinho'}
          onPress={handleSaveWine}
          loading={isLoading}
          disabled={!isFormValid()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  formContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  ratingContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 15,
  },
  buttonContainer: {
    padding: 16,
    paddingTop: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
});

export default AddWineScreen;