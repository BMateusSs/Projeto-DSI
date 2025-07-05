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
    backgroundColor: VinicotecaTheme.colors.secondaryButtonBackground,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 12,
    borderColor: VinicotecaTheme.colors.primary,
    borderWidth:2,
  },
  buttonDisabled: {
    backgroundColor: "#9E9E9E",
  },
  text: {
    color: VinicotecaTheme.colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CancelButton;