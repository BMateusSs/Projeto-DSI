import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

interface Props {
  title: string;
}

class Heard extends React.Component<Props> {
  render() {
    return (
      <View style={styles.headerContainer}>
        <StatusBar backgroundColor="#6B2737" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text}>{this.props.title}</Text>
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
    height: 100,
    backgroundColor: '#6B2737',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    marginStart: 10,
  },
});

export default Heard;