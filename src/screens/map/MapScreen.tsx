import React, { Suspense} from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';

const Map = Platform.OS !== 'web' ? React.lazy(() => import('react-native-maps')) : null;

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {Platform.OS === 'web' ? (
          <View style={styles.webFallback}>
            <Text>Mapa não disponível na web.</Text>
          </View>
        ) : (
          <Suspense fallback={<Text>Carregando mapa...</Text>}>
            <Map style={StyleSheet.absoluteFillObject} />
          </Suspense>
        )}
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
  webFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});