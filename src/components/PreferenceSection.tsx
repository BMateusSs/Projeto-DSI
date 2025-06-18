import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/preferenceStyles';

interface PreferenceSectionProps {
  title: string;
  subtitle?: string;
  options: string[];
  selected: string[] | string | null;
  onChange: (value: string[] | string) => void;
  multiSelect?: boolean;
}

const PreferenceSection: React.FC<PreferenceSectionProps> = ({
  title,
  subtitle,
  options,
  selected,
  onChange,
  multiSelect = false,
}) => {
  const toggleOption = (option: string) => {
    if (multiSelect) {
      if (Array.isArray(selected)) {
        if (selected.includes(option)) {
          onChange(selected.filter(item => item !== option));
        } else {
          onChange([...selected, option]);
        }
      } else {
        onChange([option]);
      }
    } else {
      onChange(option);
    }
  };

  const isSelected = (option: string) => {
    if (multiSelect && Array.isArray(selected)) {
      return selected.includes(option);
    } else {
      return selected === option;
    }
  };

  return (
    <View style={globalStyles.sectionContainer}>
      <Text style={globalStyles.sectionTitle}>{title}</Text>
      {subtitle && <Text style={globalStyles.sectionSubtitle}>{subtitle}</Text>}
      
      <View style={globalStyles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              globalStyles.optionButton,
              isSelected(option) && globalStyles.optionButtonSelected
            ]}
            onPress={() => toggleOption(option)}
          >
            <Text style={[
              globalStyles.optionText,
              isSelected(option) && globalStyles.optionTextSelected
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={globalStyles.divider} />
    </View>
  );
};

export default PreferenceSection;
