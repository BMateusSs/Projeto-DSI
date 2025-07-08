import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from "../screens/auth/Login";
import { useWindowDimensions } from 'react-native';

interface TitleProps {
  text: string;
}
const Title: React.FC<TitleProps> = ({ text }) => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={localStyles.centeredContainer}>
      <Text style={[styles.title, {padding: height < 720? 8: 80}]}>{text}</Text>
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