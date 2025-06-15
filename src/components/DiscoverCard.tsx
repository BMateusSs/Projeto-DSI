import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface DiscoverCardProps {
  onPress: () => void;
}

const DiscoverCard: React.FC<DiscoverCardProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Descubra vinhos</Text>
      <Text style={styles.description}>
        Explore nossas recomendações com base em suas preferências
      </Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Ver vinhos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f1e9',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B2737',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#6B2737',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DiscoverCard;