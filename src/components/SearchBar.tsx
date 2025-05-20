import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/StyleHome';

const SearchBar = () => {
  return (
    <View style={styles.containerSearch}>
      <Icon name="search" size={24} color="#6B7280" style={{ marginRight: 8 }} />
      <TextInput 
        style={styles.textInput}
        placeholder="Buscar vinho..."
        placeholderTextColor="#6B7280"
      />
    </View>
  );
};

export default SearchBar;
