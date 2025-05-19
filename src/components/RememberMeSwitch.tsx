import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

interface RememberMeSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const RememberMeSwitch: React.FC<RememberMeSwitchProps> = ({ value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#767577', true: '#F4D9D9' }}
        thumbColor={value ? '#6B2737' : '#f4f3f4'}
      />
      <Text style={styles.label}>Lembrar de mim</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default RememberMeSwitch;