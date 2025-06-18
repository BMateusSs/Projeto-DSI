import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { VinicotecaTheme } from "../styles/colors";

interface CancelButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const { width, height } = Dimensions.get("window");

const CancelButton: React.FC<CancelButtonProps> = ({
  title,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        { width: width * 0.8, height: height * 0.07 },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: VinicotecaTheme.colors.disabledButton,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: "#9E9E9E",
  },
  text: {
    color: VinicotecaTheme.colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CancelButton;