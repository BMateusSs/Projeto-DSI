import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../styles/preferenceStyles';
import MoneyInput from './MoneySelector';

interface PriceRangeSelectorProps {
  minPrice: number;
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
  return (
    <View style={globalStyles.sectionContainer}>
      <Text style={globalStyles.sectionTitle}>Faixa de preço</Text>
      
      <View style={globalStyles.rangeContainer}>
        <Text style={globalStyles.rangeText}>
          R$ {minPrice} - R$ {maxPrice !== null ? maxPrice : "---"}
        </Text>
        
        <MoneyInput
          title="Valor máximo"
          value={maxPrice}
          onChangeValue={setMaxPrice}
        />
      </View>
      
      <View style={globalStyles.divider} />
    </View>
  );
};

export default PriceRangeSection;

import { StyleSheet } from 'react-native';

 const preferenceStyles = StyleSheet.create({
  // ...existing styles...
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