import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import AddInput from '../../components/AddInput';
import DualOptionSelector from '../../components/StatusButton';
import Anotation from '../../components/Anotations';
import StarRating from '../../components/StarRating';
import SubTitle from '../../components/SubTitle';
import { ConfirmButton } from '../../components/ConfirmButton';
import { WineService, Wine } from '../../services/wineService';

type AddWineScreenRouteParams = {
  wineToEdit?: Wine;
};

type AddWineScreenRouteProp = RouteProp<{ AddWineScreen: AddWineScreenRouteParams }, 'AddWineScreen'>;

const AddWineScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<AddWineScreenRouteProp>();
  const wineToEdit = route.params?.wineToEdit;

  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [regiao, setRegiao] = useState('');
  const [status, setStatus] = useState<'experimented' | 'desired'>('desired');
  const [rating, setRating] = useState<number | null>(null);
  const [anotation, setAnotation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (wineToEdit) {
      setNome(wineToEdit.nome);
      setTipo(wineToEdit.tipo);
      setRegiao(wineToEdit.regiao);
      setStatus(wineToEdit.status);
      setRating(wineToEdit.rating);
      setAnotation(wineToEdit.anotation || '');
    }
  }, [wineToEdit]);

  const handleSaveWine = async () => {
    if (!nome.trim() || !tipo.trim() || !regiao.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios');
      return;
    }

    setIsLoading(true);

    try {
      const wineData = {
        nome: nome.trim(),
        tipo: tipo.trim(),
        regiao: regiao.trim(),
        status,
        rating: status === 'experimented' ? rating || 0 : null,
        anotation: anotation.trim() || null,
      };

      if (wineToEdit && wineToEdit.id) {
        await WineService.updateWine(wineToEdit.id, wineData);
        Alert.alert('Sucesso', 'Vinho atualizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        await WineService.addWine(wineData);
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
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
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

      <ConfirmButton
        title={wineToEdit ? 'Atualizar Vinho' : 'Adicionar Vinho'}
        onPress={handleSaveWine}
        loading={isLoading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  ratingContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 15,
  },
});

export default AddWineScreen;