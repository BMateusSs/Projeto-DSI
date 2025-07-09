import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { VinicotecaTheme } from "../styles/colors";
import { professionalType } from "../screens/professionals/Contants";
import { useNavigation } from "@react-navigation/native";

interface ProfessionalCardProps {
  typeOfProfessionalId: string;
  photoUrl?: string; // URL da foto do enólogo
  name: string;
  email: string;
  onDelete: () => void;
  professionalType: professionalType;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ photoUrl, name, email, onDelete, professionalType, typeOfProfessionalId}) => {
  const navigation = useNavigation();
  const handleDetailsScreen = () => {
    if(professionalType == "Enólogo") {
          navigation.navigate('Detalhes Enologo', {
      enologoId: typeOfProfessionalId,
    });
    } else if(professionalType == "Sommelier") {
      navigation.navigate('Detalhes Sommelier', {
      sommelierId: typeOfProfessionalId,
    });
    }
  }
  return (
    <Pressable onPress={handleDetailsScreen}>
    <View style={styles.card}>
      <View style={styles.leftBar} />
      <View style={styles.content}>
        <View style={styles.photoContainer}>
          {photoUrl ? (
            <Image source={{ uri: photoUrl }} style={styles.photo} />
          ) : (
            <Ionicons name="person-circle-outline" size={50} color={VinicotecaTheme.colors.primary} />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{professionalType}</Text>
          <Text style={styles.email}>Email: {email}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Ionicons name="trash-outline" size={24} color={VinicotecaTheme.colors.redError} />
      </TouchableOpacity>
    </View>
  </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: VinicotecaTheme.colors.white,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leftBar: {
    width: 5,
    backgroundColor: VinicotecaTheme.colors.primary,
    borderRadius: 2,
    marginRight: 10,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  photoContainer: {
    marginRight: 10,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: VinicotecaTheme.colors.primary,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#333",
  },
  deleteButton: {
    padding: 8,
  },
});

export default ProfessionalCard;