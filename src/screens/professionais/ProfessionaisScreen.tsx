import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import SearchBar from "../../components/SearchBar";
import AddButton from "../../components/AddButton";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { EnologoRepository } from "../../repositories/EnologoRepository";
import { Enologo } from "../../entities/Enologo";
import ProfessionalCard from "../../components/ProfessionalCard";
import { VinicotecaTheme } from "../../styles/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Modal } from "react-native";
import { TouchableOpacity } from "react-native";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const ProfessionaisScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [enologos, setEnologos] = useState<Enologo[]>([]);
  const navigation = useNavigation<NavigationProps>();
  const enologoRepository = new EnologoRepository();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchEnologos();
  }, []);

  const handleSelectType = (type: "Sommelier" | "Enólogo") => {
    setShowDropdown(false);
    navigation.navigate('Detalhes Enologo', {
      professionalId: "new",
    });
  };
  const fetchEnologos = async () => {
    try {
      const data = await enologoRepository.readAll();
      setEnologos(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os enólogos.");
      console.error("Erro ao buscar enólogos:", error);
    }
  };

  const addProfessional = () => {
    navigation.navigate('Detalhes Enologo', {
      professionalId: "new",
    });
  };

  const deleteEnologo = async (id: string) => {
    try {
      await enologoRepository.delete(id);
      setEnologos((prev) => prev.filter((enologo) => enologo.id !== id));
      Alert.alert("Sucesso", "Enólogo excluído com sucesso.");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir o enólogo.");
      console.error("Erro ao excluir enólogo:", error);
    }
  };

  const filteredEnologos = enologos.filter((enologo) =>
    (enologo.profissional.nome || '').toLowerCase().includes(searchText.toLowerCase())
  );

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
        <FlatList
          data={filteredEnologos}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <ProfessionalCard
              name={item.profissional.nome}
              email={item.profissional.email}
              onDelete={() => deleteEnologo(item.id!)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum enólogo encontrado.</Text>
            </View>
          }
        />
      </View>
      <View style={styles.addButtonContainer}>
        <AddButton onPress={addProfessional} />
        <Modal
          visible={showDropdown}
          transparent
          animationType="fade"
          onRequestClose={() => setShowDropdown(false)}
        >
          <TouchableOpacity style={styles.overlay} onPress={() => setShowDropdown(false)}>
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => handleSelectType("Sommelier")}
              >
                <Text style={styles.dropdownText}>Sommelier</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => handleSelectType("Enólogo")}
              >
                <Text style={styles.dropdownText}>Enólogo</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    paddingBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  dropdownContainer: {
    marginRight: 20,
    marginBottom: 80,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  dropdownButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: "#800020",
    fontWeight: "bold",
  },
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
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});

export default ProfessionaisScreen;