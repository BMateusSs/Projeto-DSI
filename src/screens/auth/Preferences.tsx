import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import PreferenceSection from '../../components/PreferenceSection';
import PriceRangeSelector from '../../components/PriceRangeSelector';
import { styles } from '../../styles/preferenceStyles';
import { auth } from '../../firebase/firebaseConfig';
import { UserAuthService } from '../../firebase/UserAuthService';
import { useNavigation } from '@react-navigation/native';

const PreferencesScreen: React.FC = () => {
  const [types, setTypes] = useState<string[]>([]);
  const [flavors, setFlavors] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [pairings, setPairings] = useState<string[]>([]);
  const [alcoholContent, setAlcoholContent] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number>(50);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  const navigation = useNavigation();

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Erro", "Usuário não autenticado");
        return;
      }

      const userAuthService = new UserAuthService();
      await userAuthService.updateUserPreferences(user.uid, {
        types,
        flavors,
        regions,
        pairings,
        alcoholContent,
        minPrice,
        maxPrice,
      });

      Alert.alert("Sucesso", "Preferências salvas com sucesso!");
      navigation.navigate("Home");

    } catch (error) {
      console.error("Erro ao salvar preferências:", error);
      Alert.alert("Erro", "Não foi possível salvar as preferências.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Suas preferências</Text>

      <PreferenceSection 
        title="Tipos preferidos"
        options={['Tinto', 'Branco', 'Rosé', 'Espumante']}
        multiSelect
        selected={types}
        onChange={setTypes}
      />

      <PreferenceSection 
        title="Perfil de sabor"
        options={['Seco', 'Doce', 'Frutado', 'Terroso', 'Madeira', 'Especiado']}
        multiSelect
        selected={flavors}
        onChange={setFlavors}
      />

      <PreferenceSection 
        title="Regiões preferidas"
        options={['Rioja', 'Douro', 'Cava', 'Bordeaux', 'Toscana']}
        multiSelect
        selected={regions}
        onChange={setRegions}
      />

      <PreferenceSection 
        title="Teor alcoólico"
        options={['Baixo (-12%)', 'Médio (12-14%)', 'Alto (+14%)']}
        selected={alcoholContent}
        onChange={setAlcoholContent}
      />

      <PreferenceSection 
        title="Harmonizar com"
        options={['Carnes', 'Peixes', 'Queijos', 'Massas']}
        multiSelect
        selected={pairings}
        onChange={setPairings}
      />

      <PriceRangeSelector
        min={50}
        max={1000}
        selectedMin={minPrice}
        selectedMax={maxPrice}
        onChangeMin={setMinPrice}
        onChangeMax={setMaxPrice}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar preferências</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PreferencesScreen;
