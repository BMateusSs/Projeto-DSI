import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from "../screens/auth/Login";

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <View style={localStyles.centeredContainer}>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

const localStyles = StyleSheet.create({
  centeredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Title;