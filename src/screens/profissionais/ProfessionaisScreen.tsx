import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator } from "react-native";
import SearchBar from "../../components/SearchBar";
import AddButton from "../../components/AddButton";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList, ROUTE_NAMES } from "../../routes/StackRoute";
import { ProfissionaisRepository } from "../../repositories/ProfissionaisRepository";
import { Enologo } from "../../entities/Enologo";
import ProfessionalCard from "../../components/ProfessionalCard";
import { VinicotecaTheme } from "../../styles/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FirebaseError } from "firebase/app";
import { Profissional } from "../../entities/Professional";
import { EnologoRepository } from "../../repositories/EnologoRepository";
import { SommelierRepository } from "../../repositories/SommelierRepository";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
type professionaisType = "Enologo" | "Sommelier";

const ProfessionaisScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [profissional, setProfissional] = useState<Profissional[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const profissionalRepository = new ProfissionaisRepository();
  const enologoRepository = new EnologoRepository();
  const sommelierRepository = new SommelierRepository();
  
  useEffect(() => {
    fetchProfissionais();
  }, []);

  const fetchProfissionais = async () => {
    setLoading(true);
    try {
      const data = await profissionalRepository.readAll();
      setProfissional(data);
    } catch (error) {
      let errorMessage = "Não foi possível carregar os enólogos.";
      if (error instanceof FirebaseError) {
        if (error.code === "permission-denied") {
          errorMessage = "Você não tem permissão para acessar esses dados. Verifique seu login ou contate o administrador.";
        } else {
          errorMessage = `Erro no Firebase: ${error.message}`;
        }
      }
      
      Alert.alert("Erro", errorMessage);
      console.error("Erro ao buscar enólogos:", error);
    } finally {
      setLoading(false);
    }
  };

  const addProfessional = (type: "Enologo" | "Sommelier") => {
    if(type === "Sommelier") {
      navigation.navigate(ROUTE_NAMES.SOMMELIER_DETAILS, {
        professionalId: "new"
      })
    } else if(type === "Enologo") {
      navigation.navigate(ROUTE_NAMES.ENOLOGO_DETAILS, {
        professionalId: "new"
      });
    }
  };

  const deleteProfessional = async (id: string, type: professionaisType) => {
    try {
      await profissionalRepository.delete(id);
      setProfissional((prev) => prev.filter((professional) => professional.id !== id));
      if (type === "Enologo") {
        enologoRepository.delete(id);
      } else if(type === "Sommelier"){
        sommelierRepository.delete(id);
      }
      Alert.alert("Sucesso", "Enólogo excluído com sucesso.");
    } catch (error) {
      let errorMessage = "Não foi possível excluir o enólogo.";
      
      if (error instanceof FirebaseError && error.code === "permission-denied") {
        errorMessage = "Você não tem permissão para excluir este enólogo.";
      }
      
      Alert.alert("Erro", errorMessage);
      console.error("Erro ao excluir enólogo:", error);
    }
  };

  const filteredEnologos = profissional.filter((enologo) =>
    enologo.profissional.nome.toLowerCase().includes(searchText.toLowerCase())
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
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={VinicotecaTheme.primaryColor} />
            <Text style={styles.loadingText}>Carregando enólogos...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredEnologos}
            keyExtractor={(item) => item.id!}
            renderItem={({ item }) => (
              <ProfessionalCard
                name={item.profissional.nome}
                email={item.profissional.email}
                onDelete={() => deleteProfessional(item.id!)}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nenhum enólogo encontrado.</Text>
              </View>
            }
            onRefresh={fetchProfissionais}
            refreshing={loading}
          />
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
});

export default ProfessionaisScreen;