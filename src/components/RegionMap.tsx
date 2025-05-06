import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/StyleHome';

const RegionMap = () => {
  return (
    <View style={styles.containerMap}>
      <Text style={{ textAlign: 'center', marginTop: 60, color: '#666' }}>
        Mapa das regiões vinícolas
      </Text>
    </View>
  );
};

export default RegionMap;