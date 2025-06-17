import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';

interface Props {
  name: string;
}

const Header: React.FC<Props> = ({ name }) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#6B2737');
    }
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Olá, {name}</Text>
          <Text style={styles.subtitle}>Sua jornada no mundo dos vinhos começa aqui</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    zIndex: 1,
  },
  header: {
    width: '100%',
    height: 130,
    backgroundColor: '#6B2737',
    borderEndEndRadius: 40,
    borderBottomLeftRadius: 40,
    paddingTop: StatusBar.currentHeight,
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 20,
  }
});

export default Header;