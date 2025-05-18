import React from 'react';
import { TextInput, View, Dimensions, KeyboardTypeOptions } from 'react-native';
import authStyles from '../styles/authStyles';
import { VinicotecaTheme } from '../styles/colors';

const { width } = Dimensions.get('window');

interface InputDataProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

const InputData: React.FC<InputDataProps> = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
}) => {
  return (
    <View style={authStyles.inputContainer}>
      <TextInput
        style={[authStyles.inputText, { width: width * 0.8 }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={VinicotecaTheme.colors.textInputPlaceHolder}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default InputData;