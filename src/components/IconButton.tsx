import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IconButtonProps {
  iconName: string;
  buttonText: string;
  onPress: () => void;
  iconSize?: number;
  iconColor?: string;
  textColor?: string;
  iconLib?: 'FontAwesome5' | 'Ionicons';
}

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  buttonText,
  onPress,
  iconSize = 24,
  iconColor = '#6B2737',
  textColor = '#333',
  iconLib = 'FontAwesome5'
}) => {
  const renderIcon = () => {
    switch(iconLib) {
      case 'Ionicons':
        return <Ionicons name={iconName} size={iconSize} color={iconColor} />;
      case 'FontAwesome5':
      default:
        return <FontAwesome5 name={iconName} size={iconSize} color={iconColor} solid />;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <Text style={[styles.buttonText, { color: textColor }]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    width: 80,
  },
  iconContainer: {
    backgroundColor: '#f8f1e9',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default IconButton;