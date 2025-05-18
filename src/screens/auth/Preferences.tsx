import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import PreferenceSection from '../../components/PreferenceSection';
import PriceRangeSelector from '../../components/PriceRangeSelector';
import { styles } from '../../styles/preferenceStyles';

const PreferencesScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Suas preferências</Text>
      
      <PreferenceSection 
        title="Tipos preferidos"
        options={['Tinto', 'Branco', 'Rosé', 'Espumante']}
        multiSelect
      />
      
      <PreferenceSection 
        title="Perfil de sabor"
        options={['Seco', 'Doce', 'Frutado', 'Terroso', 'Madeira', 'Especiado']}
        multiSelect
      />
      
      <PreferenceSection 
        title="Regiões preferidas"
        options={['Rioja', 'Douro', 'Cava', 'Bordeaux', 'Toscana']}
        multiSelect
      />
      
      <PreferenceSection 
        title="Harmonizar com"
        options={['Baixo (-12%)', 'Médio (12-14%)', 'Alto (-14%)']}
      />
      
      <PreferenceSection 
        title="Teor alcoólico"
        options={['Carnes', 'Peixes', 'Queijos', 'Massas', 'Bordeaux']}
        multiSelect
      />
      
      <PriceRangeSelector min={50} max={1000} />
      
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar preferências</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PreferencesScreen;