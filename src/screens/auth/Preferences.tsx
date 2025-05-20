import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, Alert, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();

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
      <ScrollView 
        style={{ flex: 1, backgroundColor: "white" }}
        contentContainerStyle={{
          paddingTop: insets.top + 15,
          paddingBottom: 70 + insets.bottom 
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Suas preferências</Text>
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

          <PriceRangeSelector
            max={1000}
            selectedMax={maxPrice}
            onChangeMax={setMaxPrice}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar preferências</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </View>
  );
};

export default PreferencesScreen;