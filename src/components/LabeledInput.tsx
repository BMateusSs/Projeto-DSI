import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle, KeyboardTypeOptions } from "react-native";
import SubTitle from "./SubTitle";
import AddInput from "./AddInput";

interface LabeledInputProps {
  title: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  keyboardType?: KeyboardTypeOptions 
}

const LabeledInput: React.FC<LabeledInputProps> = ({ title, placeholder, value, onChange, containerStyle, keyboardType }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <SubTitle title={title} />
      <AddInput placeholder={placeholder} value={value} onChange={onChange} keyboardType={keyboardType} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default LabeledInput;