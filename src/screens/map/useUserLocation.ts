import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { LocationCoords } from './types';
import { Alert } from 'react-native';

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * (window.innerWidth / window.innerHeight || 1);

export function useUserLocation() {
  const [initialRegion, setInitialRegion] = useState<LocationCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada.');
        Alert.alert(
          'Permissão Necessária',
          'Por favor, conceda permissão de localização para usar o mapa.',
          [{ text: 'OK' }]
        );
        return;
      }
      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setInitialRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      } catch (err) {
        setErrorMsg('Não foi possível obter a localização atual. Verifique as configurações do dispositivo.');
        Alert.alert(
          'Erro de Localização',
          'Não foi possível obter sua localização. Certifique-se de que o GPS está ativado.'
        );
      }
    })();
  }, []);

  return { initialRegion, errorMsg };
} 