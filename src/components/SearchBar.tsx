import React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { VinicotecaTheme } from "../styles/colors";

interface SearchBarProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, ...props }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="search" size={20} color={VinicotecaTheme.colors.white} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar..."
        placeholderTextColor={VinicotecaTheme.colors.textInputPlaceHolder}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: VinicotecaTheme.colors.searchBarBackground,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  iconContainer: {
    backgroundColor: VinicotecaTheme.colors.primary,
    borderRadius: 20,
    padding: 5,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: VinicotecaTheme.colors.black,
  },
});

export default SearchBar;