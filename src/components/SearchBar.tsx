import React from 'react';
import { TextInput, View } from 'react-native';
import styles from '../styles/StyleHome';

const SearchBar = () => {
  return (
    <View style={styles.containerSearch}>
      <TextInput 
        style={styles.textInput}
        placeholder="Buscar vinho..."
        placeholderTextColor="#6B7280"
      />
    </View>
  );
};

export default SearchBar;