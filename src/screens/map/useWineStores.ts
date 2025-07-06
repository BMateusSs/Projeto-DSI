import { useState, useCallback } from 'react';
import { Place } from './types';
import { Alert } from 'react-native';
import { GOOGLE_PLACES_API_KEY } from '../../config/apiKeys';

export function useWineStores() {
  const [wineStores, setWineStores] = useState<Place[]>([]);
  const [loadingPlaces, setLoadingPlaces] = useState(false);

  const fetchWineStores = useCallback(async (region: { latitude: number; longitude: number }) => {
    if (!GOOGLE_PLACES_API_KEY) {
      console.error("GOOGLE_PLACES_API_KEY não definida!");
      return;
    }
    setLoadingPlaces(true);
    const radius = 15000;
    const type = 'liquor_store';
    const keyword = 'vinho|adega';
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.latitude},${region.longitude}&radius=${radius}&type=${type}&keyword=${keyword}&key=${GOOGLE_PLACES_API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results) {
        setWineStores(data.results.filter((place: Place) =>
          place.name.toLowerCase().includes('vinho') ||
          place.name.toLowerCase().includes('adega') ||
          (place.vicinity && place.vicinity.toLowerCase().includes('vinho')) ||
          (place.vicinity && place.vicinity.toLowerCase().includes('adega'))
        ));
      } else if (data.error_message) {
        Alert.alert("Erro na API Places", data.error_message);
        console.error("Erro na API Places:", data.error_message);
      }
    } catch (error) {
      Alert.alert("Erro de Rede", "Não foi possível buscar as lojas de vinho.");
      console.error("Erro ao buscar lojas de vinho:", error);
    } finally {
      setLoadingPlaces(false);
    }
  }, []);

  const fetchWineStoresByText = useCallback(async (text: string) => {
    if (!GOOGLE_PLACES_API_KEY) {
      console.error("GOOGLE_PLACES_API_KEY não definida!");
      return;
    }
    setLoadingPlaces(true);
    const type = 'liquor_store';
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(text + ' loja de vinho')}&type=${type}&key=${GOOGLE_PLACES_API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results) {
        setWineStores(data.results.map((place: any) => ({
          ...place,
          vicinity: place.vicinity || place.formatted_address || '',
          formatted_address: place.formatted_address || place.vicinity || '',
        })));
      } else if (data.error_message) {
        Alert.alert("Erro na API Places", data.error_message);
        console.error("Erro na API Places:", data.error_message);
      }
    } catch (error) {
      Alert.alert("Erro de Rede", "Não foi possível buscar as lojas de vinho.");
      console.error("Erro ao buscar lojas de vinho:", error);
    } finally {
      setLoadingPlaces(false);
    }
  }, []);

  return { wineStores, loadingPlaces, fetchWineStores, fetchWineStoresByText };
} 