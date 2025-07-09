import React, { useMemo, useState, useCallback } from 'react';
import { Alert, Switch, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import LabeledInput from '../../components/LabeledInput';
import { ProfessionalsRepository } from '../../repositories/ProfessionalsRepository';
import { Professional } from '../../entities/Professional';
import { RootStackParamList } from '../../types/navigation';
import ProfessionalsBasicInformation from '../../components/professionals/ProfissionaisBasicInformation';
import { Sommelier } from '../../entities/Sommelier';
import { SommelierRepository } from '../../repositories/SommelierRepository';
import { globalStyles } from '../../styles/preferenceStyles';


export const SommelierDetailsScreen: React.FC = () => {
  const route = useRoute();
  const { sommelierId } = route.params; 
  const [sommelier, setSommelier] = useState<Sommelier>(new Sommelier('', false));
    const handleSwitch = () => {
        setSommelier((prev: Sommelier) => new Sommelier(prev.professionalId, !prev.especializacaoHarmonizacao ))
    }
  // Repositories
  const sommelierRepository = useMemo(() => new SommelierRepository(), []);
  const professionalRepository = useMemo(() => new ProfessionalsRepository(), []);

  const handleLoad = useCallback(async (id: string): Promise<Professional | null> => {
    const loadedSommelier = await sommelierRepository.find(id);
    const loadedProfessional = await professionalRepository.find(loadedSommelier.professionalId);
    setSommelier(loadedSommelier); // Set the specific state here
    return loadedProfessional; // Return the common state to the child
  }, [sommelierRepository, professionalRepository]);

  const handleSave = useCallback(async (professionalData: Professional) => {
    if (sommelierId === 'new') {
      const professionalId = await professionalRepository.create(professionalData);
      const newSommelier = new Sommelier(professionalId, sommelier.especializacaoHarmonizacao);
      await sommelierRepository.create(newSommelier);
      Alert.alert('Sucesso', 'Sommelier adicionado');
    } else {
      await professionalRepository.update(sommelier.professionalId, professionalData);
      await sommelierRepository.update(sommelierId, sommelier);
      Alert.alert('Sucesso', 'Sommelier atualizado com sucesso!');
    }
  }, [sommelier, sommelierId, sommelierRepository, professionalRepository]);

  return (
    <ProfessionalsBasicInformation
      typeOfProfessionalId={sommelierId}
      onLoad={handleLoad}
      onSave={handleSave}
    >
      <Text style={globalStyles.optionText}>Tem especialização em harmonização?</Text>
      <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={sommelier.especializacaoHarmonizacao ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleSwitch}
          value={sommelier.especializacaoHarmonizacao}
        />
    </ProfessionalsBasicInformation>
  );
};