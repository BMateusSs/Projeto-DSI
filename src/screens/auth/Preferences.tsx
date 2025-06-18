import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, Alert, View , StyleSheet} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PreferenceSection from '../../components/PreferenceSection';
import PriceRangeSection from '../../components/PriceRangeSelector';
import { globalStyles } from '../../styles/preferenceStyles';
import { auth } from '../../firebase/firebaseConfig';
import { UserAuthService } from '../../firebase/UserAuthService';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollScreen } from '../../components/ScrollScreen';
const PreferencesScreen: React.FC = () => {
  const [types, setTypes] = useState<string[]>([]);
  const [flavors, setFlavors] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [pairings, setPairings] = useState<string[]>([]);
  const [alcoholContent, setAlcoholContent] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number| null>(0);
  const [maxPrice, setMaxPrice] = useState<number | null >(1000);
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
    <View style={{ flex: 1 }}>
      <ScrollScreen>  
        <View style={globalStyles.container}>
          <View style={globalStyles.containerTitle}>
            <Text style={globalStyles.title}>Suas preferências</Text>
          </View>

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

          <PriceRangeSection
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />

          <TouchableOpacity style={globalStyles.saveButton} onPress={handleSave}>
            <Text style={globalStyles.saveButtonText}>Salvar preferências</Text>
          </TouchableOpacity>
        </View>
    </ScrollScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  screen : {
    flex: 1
  }
})

export default PreferencesScreen;