import React, { useMemo, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import LabeledInput from '../../components/LabeledInput';
import { EnologoRepository } from '../../repositories/EnologoRepository';
import { ProfessionalsRepository } from '../../repositories/ProfessionalsRepository';
import { Enologo } from '../../entities/Enologo';
import { Professional } from '../../entities/Professional';
import { RootStackParamList } from '../../types/navigation';
import ProfessionalsBasicInformation from '../../components/professionals/ProfissionaisBasicInformation';

type EnologoDetailsRouteProp = RouteProp<RootStackParamList, typeof ROUTE_NAMES.ENOLOGO_DETAILS>;

const EnologoDetailsScreen: React.FC = () => {
  const route = useRoute<EnologoDetailsRouteProp>();
  const { enologoId } = route.params; // The ID is for the Enologo entity
  console.log(enologoId)
  // State for Enologo-specific fields
  const [enologo, setEnologo] = useState<Enologo>(new Enologo('', ''));

  // Repositories
  const enologoRepository = useMemo(() => new EnologoRepository(), []);
  const professionalRepository = useMemo(() => new ProfessionalsRepository(), []);

  /**
   * Handles loading the Enologo and its associated Professional.
   * This function is passed to the generic component's `onLoad` prop.
   */
  const handleLoad = useCallback(async (id: string): Promise<Professional | null> => {
    const loadedEnologo = await enologoRepository.find(id);
    const loadedProfessional = await professionalRepository.find(loadedEnologo.professionalId);
    setEnologo(loadedEnologo); // Set the specific state here
    return loadedProfessional; // Return the common state to the child
  }, [enologoRepository, professionalRepository]);

  /**
   * Handles saving both the Professional and Enologo data.
   * This function is passed to the generic component's `onSave` prop.
   */
  const handleSave = useCallback(async (professionalData: Professional) => {
    // Basic validation for enologo-specific fields
    if (!enologo.formacaoAcademica) {
        throw new Error("Formação Acadêmica é um campo obrigatório.");
    }
    
    if (enologoId === 'new') {
      // Create new Professional, then create new Enologo with the returned ID
      const professionalId = await professionalRepository.create(professionalData);
      const newEnologo = new Enologo(professionalId, enologo.formacaoAcademica);
      await enologoRepository.create(newEnologo);
      Alert.alert('Sucesso', 'Enólogo adicionado');
    } else {
      // Update existing Professional and Enologo
      await professionalRepository.update(enologo.professionalId, professionalData);
      await enologoRepository.update(enologoId, enologo);
      Alert.alert('Sucesso', 'Enólogo atualizado com sucesso!');
    }
  }, [enologo, enologoId, enologoRepository, professionalRepository]);

  return (
    <ProfessionalsBasicInformation
      typeOfProfessionalId={enologoId}
      onLoad={handleLoad}
      onSave={handleSave}
    >
      {/* This is the Enologo-specific part of the form */}
      <LabeledInput
        title="Formação Acadêmica"
        placeholder="Digite a formação acadêmica"
        value={enologo.formacaoAcademica}
        onChange={text => setEnologo(prev => new Enologo(prev.professionalId, text))}
        containerStyle={{ marginBottom: 16 }}
      />
    </ProfessionalsBasicInformation>
  );
};

export default EnologoDetailsScreen;