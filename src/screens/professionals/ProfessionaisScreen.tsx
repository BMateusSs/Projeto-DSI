import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import SearchBar from "../../components/SearchBar";
import AddButton from "../../components/AddButton";
import { CurrentRenderContext, useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { ProfessionalsRepository } from "../../repositories/ProfessionalsRepository";
import { Professional } from "../../entities/Professional";
import ProfessionalCard from "../../components/ProfessionalCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Modal } from "react-native";
import { TouchableOpacity } from "react-native";
import { professionalType } from "./Contants";
import { EnologoRepository } from "../../repositories/EnologoRepository";
import { SommelierRepository } from "../../repositories/SommelierRepository";
import { Sommelier } from "../../entities/Sommelier";

interface ProfessionalItem extends Professional {
  professionalType: professionalType;
  idOfType: string
} 

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
const ProfessionalsScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [professionalsItems, setProfessionalsItems] = useState<ProfessionalItem[]>([]);
  const navigation = useNavigation<NavigationProps>();
  const professionalsRepository = useMemo(() => new ProfessionalsRepository(), [])
  const enologoRepository = useMemo(() => new EnologoRepository(), [])
  const sommelierRepository = useMemo(() => new SommelierRepository(), [])
  const [showDropdown, setShowDropdown] = useState(false);

  useFocusEffect(() => {
    fetchProfessionals();
  });
  
  const pushProfessionalItem = (professional: Professional, professionalType: professionalType, idOfType: string) => {
      if(!professionalsItems.find((item) => item.id === professional.id)) {
        if(professionalType === "Enólogo") {
          setProfessionalsItems((prev) => [...prev, {...professional, professionalType: "Enólogo", idOfType: idOfType} as ProfessionalItem])
        } else {
          setProfessionalsItems((prev) => [...prev, {...professional, professionalType: "Sommelier", idOfType: idOfType} as ProfessionalItem]);
        }
      } else {
        if(professionalType === "Enólogo") {
          setProfessionalsItems((prev) => [...prev.filter(item => item.id !== professional.id), {...professional, professionalType: "Enólogo", idOfType: idOfType} as ProfessionalItem])
        } else {
          setProfessionalsItems((prev) => [...prev.filter(item => item.id !== professional.id), {...professional, professionalType: "Sommelier", idOfType: idOfType} as ProfessionalItem]);
        }
      }
  } 
  const fetchProfessionals = async () => {
    try {
      const professionals = await professionalsRepository.readAll();
      const sommeliers = await sommelierRepository.readAll();
      const enologos = await enologoRepository.readAll();
      console.log(professionals)
      for(const professional of professionals) {
        const sommelier = sommeliers.find((item: Sommelier) => item.professionalId === professional.id);
        const enologo = enologos.find((item) => item.professionalId === professional.id);
        if(sommelier) {
          console.log(sommelier)
          pushProfessionalItem(professional, "Sommelier", sommelier.id!)
        } else if(enologo) {
          console.log(enologo)
          pushProfessionalItem(professional, "Enólogo", enologo.id!)
        } else {
          console.log("Profissional não é enologo ou sommelier")
        }
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os enólogos.");
      console.error("Erro ao buscar enólogos:", error);
    }
  };

  const addEnologo = () => {
    navigation.navigate('Detalhes Enologo', {
      enologoId: "new",
    });
    setShowDropdown(false);
  };
  const addSommelier = () => {
    navigation.navigate('Detalhes Sommelier', {
      sommelierId: "new",
    });
    setShowDropdown(false)
  };

  const deleteProfessional = async (professionalItem: ProfessionalItem) => {
    try {
      await professionalsRepository.delete(professionalItem.id!);
      if(professionalItem.professionalType === "Enólogo") {
        await enologoRepository.delete(professionalItem.idOfType);
      } else if(professionalItem.professionalType === "Sommelier") {
        await sommelierRepository.delete(professionalItem.idOfType);
      }
      setProfessionalsItems((prev) => prev.filter((item) => item.id !== professionalItem.id));
      Alert.alert("Sucesso", "Enólogo excluído com sucesso.");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir o enólogo.");
      console.error("Erro ao excluir enólogo:", error);
    }
  };

  const filteredProfessionalsItems = professionalsItems.filter((professionalItem) =>
    (professionalItem.nome || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (professionalItem.email || '').toLowerCase().includes(searchText.toLocaleLowerCase()) ||
    (professionalItem.telefone || '').includes(searchText.toLocaleLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Pesquisar professionals..."
        />
      </View>
      <View style={styles.content}>
        <FlatList
          data={filteredProfessionalsItems}
          keyExtractor={(item) => item?.id ? item.id : item.email}
          renderItem={({ item }) => (
            <ProfessionalCard
              typeOfProfessionalId={item.idOfType!}
              name={item.nome}
              email={item.email}
              onDelete={() => deleteProfessional(item)}
              professionalType={item.professionalType}/>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum profissional encontrado.</Text>
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
                onPress={addSommelier}
              >
                <Text style={styles.dropdownText}>Sommelier</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={addEnologo}
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

export default ProfessionalsScreen;