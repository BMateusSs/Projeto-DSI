import React from 'react';
import { View, Text, Alert } from 'react-native';
import { globalStyles } from '../styles/preferenceStyles';
import MoneyInput from './MoneySelector';

interface PriceRangeSelectorProps {
  minPrice: number | null;
  setMinPrice: (value: number | null) => void;
  maxPrice: number | null;
  setMaxPrice: (value: number | null) => void;
}

const PriceRangeSection: React.FC<PriceRangeSelectorProps> = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) => {
  // Handler para validar o preço mínimo
  const handleMinPriceChange = (value: number | null) => {
    // Não permitir valores negativos
    if (value !== null && value < 0) {
      Alert.alert("Valor inválido", "O preço mínimo não pode ser negativo.");
      return;
    }
    
    // Verificar se o preço mínimo é maior que o máximo
    if (value !== null && maxPrice !== null && value > maxPrice) {
      Alert.alert("Valor inválido", "O preço mínimo não pode ser maior que o preço máximo.");
      return;
    }
    
    // Se todas as validações passarem, atualiza o valor
    setMinPrice(value);
  };

  // Handler para validar o preço máximo
  const handleMaxPriceChange = (value: number | null) => {
    // Não permitir valores negativos
    if (value !== null && value < 0) {
      Alert.alert("Valor inválido", "O preço máximo não pode ser negativo.");
      return;
    }
    
    // Verificar se o preço máximo é menor que o mínimo
    if (value !== null && minPrice !== null && value < minPrice) {
      Alert.alert("Valor inválido", "O preço máximo não pode ser menor que o preço mínimo.");
      return;
    }
    
    // Se todas as validações passarem, atualiza o valor
    setMaxPrice(value);
  };

  return (
    <View style={globalStyles.sectionContainer}>
      <Text style={globalStyles.sectionTitle}>Faixa de preço</Text>
      
      <View style={globalStyles.rangeContainer}>
        <Text style={globalStyles.rangeText}>
          R$ {minPrice !== null ? minPrice : "---"} - R$ {maxPrice !== null ? maxPrice : "---"}
        </Text>
        <View style={preferenceStyles.moneyRangeContainer}>
          <MoneyInput
            title="Valor mínimo"
            value={minPrice}
            onChangeValue={handleMinPriceChange}
          />
                    <MoneyInput
            title="Valor máximo"
            value={maxPrice}
            onChangeValue={handleMaxPriceChange}
          />
        </View>
      </View>
      
      <View style={globalStyles.divider} />
    </View>
  );
};

export default PriceRangeSection;

import { StyleSheet } from 'react-native';

const preferenceStyles = StyleSheet.create({
  moneyRangeContainer: {
    flexDirection: 'row',
    justifyContent: "center"
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
});