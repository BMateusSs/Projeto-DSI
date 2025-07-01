import React from 'react';
import { StyleSheet, View } from 'react-native';
import Map from 'react-native-maps';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Map style={StyleSheet.absoluteFillObject} />
      </View>
      <View style={styles.restOfScreen}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
  },
  restOfScreen: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
});
