import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MapContainer = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleMapPress = () => {
    navigation.navigate('Mapa');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleMapPress}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="map" size={32} color="#6B2737" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Explorar no Mapa</Text>
          <Text style={styles.subtitle}>Encontre lojas e profissionais próximos a você</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#6B2737" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    backgroundColor: '#f8f1e9',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default MapContainer; 