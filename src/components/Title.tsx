import React from "react";
import { Text, View, StyleSheet, TextStyle } from "react-native";
import styles from "../screens/auth/Login"; // ou outro style global
type AlignOption = "left" | "center" | "right";

interface TitleProps {
  text: string;
  align?: AlignOption; // default = center
}

export default function Title({ text, align = "center" }: TitleProps) {
  const alignmentStyle: TextStyle = {
    textAlign: align,
    alignSelf:
      align === "left" ? "flex-start" :
      align === "right" ? "flex-end" : "center"
  };

  return (
    <View style={{ width: "100%", marginBottom: 24 }}>
      <Text style={[styles.title, alignmentStyle]}>{text}</Text>
    </View>
  );
}