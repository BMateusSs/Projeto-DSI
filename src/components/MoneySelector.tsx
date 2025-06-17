import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface MoneyInputProps {
  title: string;
  value: number | null;
  onChangeValue: (value: number | null) => void;
  placeholder?: string;
  maxValue?: number;
}

const MoneyInput: React.FC<MoneyInputProps> = ({
  title,
  value,
  onChangeValue,
  placeholder = "Digite um valor",
  maxValue = 10000,
}) => {
  const handleValueChange = (text: string) => {
    // Remove qualquer caractere não numérico (exceto números)
    const numericValue = text.replace(/[^0-9]/g, '');
    
    if (numericValue === '') {
      onChangeValue(null);
      return;
    }
    
    const parsedValue = parseInt(numericValue, 10);
    if (!isNaN(parsedValue) && parsedValue <= maxValue) {
      onChangeValue(parsedValue);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={value ? value.toString() : ''}
          onChangeText={handleValueChange}
          placeholder={placeholder}
          placeholderTextColor="#999"
        />
        <Text style={styles.currencySymbol}>R$</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 5,
    position: 'relative',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 4,
    paddingLeft: 30, // Espaço para o símbolo R$
    color: '#000',
  },
  currencySymbol: {
    position: 'absolute',
    left: 8,
    fontSize: 16,
    color: '#666',
  },
});

export default MoneyInput;