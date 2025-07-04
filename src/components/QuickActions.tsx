import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButton from './IconButton';
import Ionicons from '@expo/vector-icons/Ionicons';

interface QuickActionsProps {
  onAddWine: () => void;
  onAddStore: () => void;
  onAddProfessional: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onAddWine,
  onAddStore,
  onAddProfessional
}) => {
  const actions = [
    {
      iconName: 'wine',
      buttonText: 'Adicionar vinho',
      onPress: onAddWine,
      iconColor: '#6B2737',
      iconLib: 'Ionicons'
    },
    {
      iconName: 'storefront',
      buttonText: 'Adicionar loja',
      onPress: onAddStore,
      iconColor: '#6B2737',
      iconLib: 'Ionicons'
    },
    {
      iconName: 'users',
      buttonText: 'Adicionar profissional',
      onPress: onAddProfessional,
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