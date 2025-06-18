import React from "react";
import { View, StyleSheet } from "react-native";
import SubTitle from "./SubTitle";
import AddInput from "./AddInput";

interface LabeledInputProps {
  title: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
}

const LabeledInput: React.FC<LabeledInputProps> = ({ title, placeholder, value, onChange }) => {
  return (
    <View style={styles.container}>
      <SubTitle title={title} />
      <AddInput placeholder={placeholder} value={value} onChange={onChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16, // Espaçamento entre os campos
  },
});

export default LabeledInput;