import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButton from './IconButton';
import Ionicons from '@expo/vector-icons/Ionicons';

const QuickActions: React.FC = () => {
  const actions = [
    {
      iconName: 'plus',
      buttonText: 'Adicionar vinho',
      onPress: () => console.log('Adicionar vinho pressionado'),
      iconColor: '#6B2737',
      iconLib: 'FontAwesome5'
    },
    {
      iconName: 'storefront',
      buttonText: 'Procurar loja',
      onPress: () => console.log('Procurar loja pressionado'),
      iconColor: '#6B2737',
      iconLib: 'Ionicons'
    },
    {
      iconName: 'users',
      buttonText: 'Profissionais',
      onPress: () => console.log('Profissionais pressionado'),
      iconColor: '#6B2737',
      iconLib: 'FontAwesome5'
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ações rápidas</Text>
      <View style={styles.actionsContainer}>
        {actions.map((action, index) => (
          <IconButton
            key={index}
            iconName={action.iconName}
            buttonText={action.buttonText}
            onPress={action.onPress}
            iconSize={24}
            iconColor={action.iconColor}
            textColor="#333"
            iconLib={action.iconLib}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default QuickActions;