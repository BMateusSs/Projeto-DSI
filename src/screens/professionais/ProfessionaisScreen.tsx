import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import SearchBar from "../../components/SearchBar";
import AddButton from "../../components/AddButton";
import { CurrentRenderContext, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { ProfissionaisRepository } from "../../repositories/ProfessionalsRepository";
import { Profissional } from "../../entities/Professional";
import ProfessionalCard from "../../components/ProfessionalCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Modal } from "react-native";
import { TouchableOpacity } from "react-native";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const ProfessionaisScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const navigation = useNavigation<NavigationProps>();
  const profissionaisRepository = new ProfissionaisRepository();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchProfissionais();
  }, []);

  const handleSelectType = (type: "Sommelier" | "Enólogo") => {
    setShowDropdown(false);
    navigation.navigate('Detalhes Enologo', {
      professionalId: "new",
    });
  };
  const fetchProfissionais = async () => {
    try {
      const data = await profissionaisRepository.readAll();
      setProfissionais(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os enólogos.");
      console.error("Erro ao buscar enólogos:", error);
    }
  };

  const addEnologo = () => {
    navigation.navigate('Detalhes Enologo', {
      professionalId: "new",
    });
  };

  const deleteEnologo = async (id: string) => {
    try {
      await profissionaisRepository.delete(id);
      setProfissionais((prev) => prev.filter((enologo) => enologo.id !== id));
      Alert.alert("Sucesso", "Enólogo excluído com sucesso.");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir o enólogo.");
      console.error("Erro ao excluir enólogo:", error);
    }
  };

  const filteredEnologos = profissionais.filter((profissional) =>
    (profissional.nome || '').toLowerCase().includes(searchText.toLowerCase())
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
              name={item.nome}
              email={item.email}
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
      <Modal
      style={styles.modal}
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
        <AddButton onPress={() => { setShowDropdown(curr => !curr)}} simbol={showDropdown? "x" : "+"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    paddingBottom: 16,
    paddingTop: 16
  },
  addButtonContainer: {
    flexDirection: "column",
    position: "absolute",
    bottom: 20,
    right: 20,
    paddingBottom: 16,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 100
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
    paddingVertical: 24,
    paddingHorizontal: 48,
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