import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { styles } from '../styles/preferenceStyles';

interface PriceRangeSelectorProps {
  max: number;
  selectedMax: number;
  onChangeMax: (value: number) => void;
}

const PriceRangeSelector: React.FC<PriceRangeSelectorProps> = ({
  max,
  selectedMax,
  onChangeMax,
}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Faixa de preço (R$)</Text>
      
      <View style={styles.rangeContainer}>
        <Text style={styles.rangeText}>R$ 0 - R$ {selectedMax}</Text>
        
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={max}
          minimumTrackTintColor="#800020"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#800020"
          value={selectedMax}
          onValueChange={onChangeMax}
        />
      </View>
      
      <View style={styles.divider} />
    </View>
  );
};

export default PriceRangeSelector;