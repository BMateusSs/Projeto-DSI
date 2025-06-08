import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

export const colors = {
  cardBackground: '#FFFFFF', 
  cardBorderTop: '#8B4513',
  shadowColor: '#000000',
};

interface WineCardProps extends ViewProps {
  children: React.ReactNode;
}

const Card: React.FC<WineCardProps> = ({ children, style, ...rest }) => {
  return (
    <View style={[styles.cardContainer, style]} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 5, 
    elevation: 5, 
    borderStartWidth: 5,
    borderStartColor: colors.cardBorderTop,
    padding: 15,
  },
});

export default Card;