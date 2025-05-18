import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/preferenceStyles';

interface PreferenceSectionProps {
  title: string;
  subtitle?: string;
  options: string[];
  multiSelect?: boolean;
}

const PreferenceSection: React.FC<PreferenceSectionProps> = ({
  title,
  subtitle,
  options,
  multiSelect = false,
}) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  
  const toggleOption = (option: string) => {
    if (multiSelect) {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter(item => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([option]);
    }
  };
  
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
      
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOptions.includes(option) && styles.optionButtonSelected
            ]}
            onPress={() => toggleOption(option)}
          >
            <Text style={[
              styles.optionText,
              selectedOptions.includes(option) && styles.optionTextSelected
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.divider} />
    </View>
  );
};

export default PreferenceSection;