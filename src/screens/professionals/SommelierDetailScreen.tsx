import React, { useMemo, useState, useCallback } from 'react';
import { Alert, Switch, Text, StyleSheet, View} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import LabeledInput from '../../components/LabeledInput';
import { ProfessionalsRepository } from '../../repositories/ProfessionalsRepository';
import { Professional } from '../../entities/Professional';
import { RootStackParamList } from '../../types/navigation';
import ProfessionalsBasicInformation from '../../components/professionals/ProfissionaisBasicInformation';
import { Sommelier } from '../../entities/Sommelier';
import { SommelierRepository } from '../../repositories/SommelierRepository';
import { globalStyles } from '../../styles/preferenceStyles';
import { VinicotecaTheme } from '../../styles/colors';


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
      <View style={localStyle.switchContainer}>
      <Switch
          trackColor={{false: VinicotecaTheme.colors.disabledButton, true: VinicotecaTheme.colors.primary}}
          thumbColor={sommelier.especializacaoHarmonizacao ? VinicotecaTheme.colors.searchBarBackground : VinicotecaTheme.colors.secondaryButtonBackground}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleSwitch}
          value={sommelier.especializacaoHarmonizacao}
        />
      </View>
    </ProfessionalsBasicInformation>
  );
};

const localStyle = StyleSheet.create({
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
})