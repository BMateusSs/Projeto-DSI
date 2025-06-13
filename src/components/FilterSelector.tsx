import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Option {
  label: string;
  value: string;
}

interface FilterSelectorProps {
  options: Option[];
  initialValue?: string;
  onValueChange: (value: string) => void;
}

const FilterSelector: React.FC<FilterSelectorProps> = ({
  options,
  initialValue,
  onValueChange,
}) => {
  return (
    <View style={styles.container}>
      {options.map(option => {
        const isSelected = initialValue === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            style={[styles.button, isSelected && styles.buttonSelected]}
            onPress={() => onValueChange(option.value)}
          >
            <Text style={[styles.text, isSelected && styles.textSelected]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    gap: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  buttonSelected: {
    backgroundColor: '#6B2737',
  },
  text: {
    color: '#333',
    fontWeight: '500',
  },
  textSelected: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default FilterSelector;