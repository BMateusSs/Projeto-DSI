import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type OptionValue = string | null;

interface Option {
  value: string;
  label: string;
}

interface DualOptionSelectorProps {
  options: [Option, Option];
  initialValue?: OptionValue;
  onValueChange?: (value: OptionValue) => void;
  buttonStyle?: object;
  selectedButtonStyle?: object;
  textStyle?: object;
  selectedTextStyle?: object;
}

const DualOptionSelector: React.FC<DualOptionSelectorProps> = ({
  options,
  initialValue = null,
  onValueChange,
  buttonStyle = {},
  selectedButtonStyle = {},
  textStyle = {},
  selectedTextStyle = {},
}) => {
  const [selectedValue, setSelectedValue] = useState<OptionValue>(initialValue);

  const handlePress = (value: string) => {
    const newValue = selectedValue === value ? null : value;
    setSelectedValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.button,
            buttonStyle,
            selectedValue === option.value && [styles.selectedButton, selectedButtonStyle],
          ]}
          onPress={() => handlePress(option.value)}
        >
          <Text
            style={[
              styles.buttonText,
              textStyle,
              selectedValue === option.value && [styles.selectedText, selectedTextStyle],
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
    width: '90%',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    padding: 5,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#F2E6E6',
    height: 40,
    justifyContent: 'center',
    width: '50%',
  },
  selectedButton: {
    backgroundColor: '#fff',
    borderColor: '#6B2737',
  },
  buttonText: {
    color: '#333',
  },
  selectedText: {
    color: '#6B2737',
  },
});

export default DualOptionSelector;