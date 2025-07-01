import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/StyleHome';

interface SearchBarProps {
  text: string;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ text, value, onChangeText }) => {
  return (
    <View style={styles.containerSearch}>
      <Icon name="search" size={24} color="#6B7280" style={{ marginRight: 8 }} />
      <TextInput 
        style={styles.textInput}
        placeholder={text}
        placeholderTextColor="#6B7280"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;
