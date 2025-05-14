import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PasswordValidation, passwordValidations } from '../hooks/passwordValidations';

interface PasswordRequirementsProps {
  password: string;
  validations: PasswordValidation[];
}

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
  password,
  validations,
}) => {
  return (
    <View style={{ width: '100%', marginTop: 5, marginStart: 35 }}>
      {validations.map((validation, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
          <Icon 
            name={validation.isValid(password) ? 'check-circle' : 'checkbox-blank-circle-outline'} 
            size={16} 
            color={validation.isValid(password) ? 'green' : 'gray'} 
            style={{ marginRight: 5 }}
          />
          <Text style={{ color: validation.isValid(password) ? 'green' : 'gray' }}>
            {validation.label}
          </Text>
        </View>
      ))}
    </View>
  );
};