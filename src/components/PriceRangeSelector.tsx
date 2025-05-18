import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { styles } from '../styles/preferenceStyles';

interface PriceRangeSelectorProps {
  min: number;
  max: number;
}

const PriceRangeSelector: React.FC<PriceRangeSelectorProps> = ({ min, max }) => {
  const [range, setRange] = React.useState<[number, number]>([min, max]);
  
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Faixa de preço (R$)</Text>
      
      <View style={styles.rangeContainer}>
        <Text style={styles.rangeText}>R$ {range[0]} - R$ {range[1]}</Text>
        
        <Slider
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          minimumTrackTintColor="#800020"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#800020"
          value={range[1]}
          onValueChange={(value) => setRange([range[0], value])}
        />
      </View>
      
      <View style={styles.divider} />
    </View>
  );
};

export default PriceRangeSelector;