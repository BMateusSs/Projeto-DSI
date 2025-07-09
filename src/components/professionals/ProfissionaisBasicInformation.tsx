import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LabeledInput from '../LabeledInput';
import PreferenceSection from '../PreferenceSection';
import { ConfirmButton } from '../ConfirmButton';
import CancelButton from '../CancelButtons';

import { Professional } from '../../entities/Professional';
import { CertificacaoVinho } from '../../constants/CertificacoesVinho';

/**
 * Props for the generic professional information component.
 */
interface ProfessionalsBasicInformationProps {
  // The ID of the professional being edited, or "new" for creation.
  professionalId: string;

  // The specific UI fields for the specialized professional (e.g., Enologo's academic formation).
  children: React.ReactNode;

  // Function to fetch the professional data when editing. Must return the professional object.
  onLoad: (id: string) => Promise<Professional | null>;

  // Function to handle the save logic (create or update). Receives the current professional data.
  onSave: (professional: Professional) => Promise<void>;

  // Initial state for a new professional.
  initialData?: Professional;
}

const ProfessionalsBasicInformation: React.FC<ProfessionalsBasicInformationProps> = ({
  professionalId,
  children,
  onLoad,
  onSave,
  initialData = new Professional('', '', '', []),
}) => {
  const navigation = useNavigation();
  const [professional, setProfessional] = useState<Professional>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isEditing = professionalId !== 'new';

  // Effect to load data when in "edit" mode.
  useEffect(() => {
    if (isEditing) {
      setIsLoading(true);
      onLoad(professionalId)
        .then(loadedProfessional => {
          if (loadedProfessional) {
            setProfessional(loadedProfessional);
          }
        })
        .catch(error => {
          Alert.alert('Erro ao Carregar', error.message || 'Não foi possível buscar os dados.');
          navigation.goBack();
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [professionalId, isEditing, onLoad, navigation]);

  // Centralized handler for input changes.
  const handleInputChange = (field: keyof Professional, value: any) => {
    setProfessional(prev => new Professional(
        field === 'nome' ? value : prev.nome,
        field === 'email' ? value : prev.email,
        field === 'telefone' ? value : prev.telefone,
        field === 'certificacoes' ? value : prev.certificacoes
    ));
  };

  const handleSave = async () => {
    if (!professional.nome || !professional.email) {
      Alert.alert('Erro', 'Nome e Email são campos obrigatórios.');
      return;
    }
    setIsLoading(true);
    try {
      await onSave(professional);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao Salvar', error.message || 'Não foi possível salvar os dados.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditing) {
    return (
      <View style={localStyles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={localStyles.screenContainer}>
      <ScrollView contentContainerStyle={localStyles.scrollContainer}>
        <LabeledInput
          title="Nome do Professional"
          placeholder="Digite o nome"
          value={professional.nome}
          onChange={text => handleInputChange('nome', text)}
          containerStyle={localStyles.inputContainer}
        />
        <LabeledInput
          title="Email"
          placeholder="Digite o email"
          value={professional.email}
          onChange={text => handleInputChange('email', text)}
          keyboardType="email-address"
          containerStyle={localStyles.inputContainer}
        />
        <LabeledInput
          title="Telefone"
          placeholder="Digite o telefone"
          value={professional.telefone}
          onChange={text => handleInputChange('telefone', text)}
          keyboardType="phone-pad"
          containerStyle={localStyles.inputContainer}
        />

        {/* This is where the specific fields (e.g., for Enologo) will be rendered */}
        {children}

        <PreferenceSection
          title="Certificações"
          subtitle="Selecione as certificações do professional"
          options={Object.values(CertificacaoVinho)}
          selected={professional.certificacoes}
          onChange={value => handleInputChange('certificacoes', Array.isArray(value) ? value : [value])}
          multiSelect={true}
          styles={localStyles.preferencesContainer}
        />
        <View style={localStyles.buttonContainer}>
          <ConfirmButton title="Salvar" onPress={handleSave} disabled={isLoading} />
          <CancelButton title="Cancelar" onPress={() => navigation.goBack()} disabled={isLoading} />
        </View>
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
    screenContainer: { flex: 1 },
    scrollContainer: { flexGrow: 1, padding: 14, backgroundColor: '#fff' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    inputContainer: { marginBottom: 16 },
    preferencesContainer: { paddingTop: 16, marginBottom: 24 },
    buttonContainer: { marginTop: 'auto', paddingTop: 16 },
});

export default ProfessionalsBasicInformation;