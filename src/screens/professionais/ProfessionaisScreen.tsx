import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import SearchBar from "../../components/SearchBar";
import AddButton from "../../components/AddButton";
import { useNavigation } from "@react-navigation/native";

const ProfessionaisScreen = () => {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

  const addProfessional = () => {
    navigation.navigate("Adicionar Profissionais");
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Pesquisar profissionais..."
        />
      </View>
      <View style={styles.content}>
        {/* Aqui você pode renderizar a lista de profissionais filtrada pelo searchText */}
      </View>
      <View style={styles.addButtonContainer}>
        <AddButton onPress={addProfessional} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchBarContainer: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default ProfessionaisScreen;