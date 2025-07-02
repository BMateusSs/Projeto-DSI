import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle, StyleSheet } from 'react-native';

interface PreferenceSectionProps {
  title: string;
  subtitle?: string;
  options: string[];
  selected: string[] | string | null;
  onChange: (value: string[] | string) => void;
  multiSelect?: boolean;
  styles?: StyleProp<ViewStyle>;
}

const PreferenceSection: React.FC<PreferenceSectionProps> = ({
  title,
  subtitle,
  options,
  selected,
  onChange,
  multiSelect = false,
  styles
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
    <View style={[localStyles.sectionContainer, styles]}>
      <Text style={localStyles.sectionTitle}>{title}</Text>
      {subtitle && <Text style={localStyles.sectionSubtitle}>{subtitle}</Text>}
      
      <View style={localStyles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              localStyles.optionButton,
              isSelected(option) && localStyles.optionButtonSelected
            ]}
            onPress={() => toggleOption(option)}
          >
            <Text style={[
              localStyles.optionText,
              isSelected(option) && localStyles.optionTextSelected
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#800020',
  },
  sectionSubtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#800020',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  optionButtonSelected: {
    backgroundColor: '#800020',
  },
  optionText: {
    color: '#800020',
  },
  optionTextSelected: {
    color: 'white',
  },
});
export default PreferenceSection;