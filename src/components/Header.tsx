import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

interface Props {
  name: string;
}

class Header extends React.Component<Props> {
  render() {
    return (
      <View style={styles.headerContainer}>
        <StatusBar backgroundColor="#6B2737" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text}> Olá, {this.props.name}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    zIndex: 1,
  },
  header: {
    width: '100%',
    height: 150,
    backgroundColor: '#6B2737',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    borderEndEndRadius: 40,
    borderBottomLeftRadius: 40,
    alignItems: 'center'
  },
  text: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    marginStart: 10,
  },
});

export default Header;