import React, { useState } from 'react';
import { View, ActivityIndicator, Text, Dimensions, ScrollView, Linking } from 'react-native';
import MapView from 'react-native-maps';
import { useUserLocation } from './useUserLocation';
import { useWineStores } from './useWineStores';
import MapMarkers from './MapMarkers';
import { LocationCoords, Place } from './types';
import SearchBar from '../../components/SearchBar';
import styles from '../../styles/mapStyles';
import NearbyStoreCard from '../../components/NearbyStoreCard';
import StoreDetailModal from './StoreDetailModal';
import GOOGLE_PLACES_API_KEY from '../../config/googleApiKey';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function MapScreen() {
  const { initialRegion, errorMsg } = useUserLocation();
  const { wineStores, loadingPlaces, fetchWineStores, fetchWineStoresByText } = useWineStores();
  const [selectedStore, setSelectedStore] = useState<Place | null>(null);
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  React.useEffect(() => {
    if (initialRegion) {
      fetchWineStores(initialRegion);
    }
  }, [initialRegion, fetchWineStores]);

  React.useEffect(() => {
    if (search.trim().length > 0) {
      fetchWineStoresByText(search);
    } else if (initialRegion) {
      fetchWineStores(initialRegion);
    }
  }, [search, fetchWineStoresByText, fetchWineStores, initialRegion]);

  const onRegionChangeComplete = (region: LocationCoords) => {
    
  };

  const handleStoreSelect = (store: Place) => {
    if (initialRegion) {
      const distance = getDistanceFromLatLonInKm(
        initialRegion.latitude,
        initialRegion.longitude,
        store.geometry.location.lat,
        store.geometry.location.lng
      );
      setSelectedDistance(distance);
    }
    setSelectedStore(store);
  };

  const handleOpenGoogleMaps = () => {
    if (!selectedStore) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${selectedStore.geometry.location.lat},${selectedStore.geometry.location.lng}`;
    Linking.openURL(url);
  };

  let sortedWineStores = wineStores;
  if (initialRegion) {
    sortedWineStores = [...wineStores].sort((a, b) => {
      const distA = getDistanceFromLatLonInKm(
        initialRegion.latitude,
        initialRegion.longitude,
        a.geometry.location.lat,
        a.geometry.location.lng
      );
      const distB = getDistanceFromLatLonInKm(
        initialRegion.latitude,
        initialRegion.longitude,
        b.geometry.location.lat,
        b.geometry.location.lng
      );
      return distA - distB;
    });
  }

  if (errorMsg) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  if (!initialRegion) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#6B2737" />
        <Text>Carregando mapa e sua localização...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
      <View style={{alignItems: 'center', width: '100%', marginTop: 10}}>
        <SearchBar text="Pesquisar loja de vinhos" value={search} onChangeText={setSearch} />
      </View>
      <View style={styles.mapContainerHalf}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
          followsUserLocation={true}
          provider="google"
          onRegionChangeComplete={onRegionChangeComplete}
        >
          <MapMarkers initialRegion={initialRegion} wineStores={sortedWineStores} onMarkerPress={handleStoreSelect} />
        </MapView>
        {loadingPlaces && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="small" color="#6B2737" />
            <Text style={styles.loadingText}>Buscando lojas de vinho...</Text>
          </View>
        )}
      </View>
      <Text style={styles.sectionTitle}>Lojas próximas</Text>
      <ScrollView style={styles.cardList} contentContainerStyle={{paddingTop: 0, paddingHorizontal: 16, paddingBottom: 16, alignItems: 'flex-start'}} horizontal showsHorizontalScrollIndicator={false}>
        {sortedWineStores.length === 0 ? (
          <Text style={{textAlign: 'center', color: '#666', marginTop: 16}}>Nenhuma loja encontrada próxima.</Text>
        ) : (
          sortedWineStores.slice(0, 5).map((store) => (
            <NearbyStoreCard
              key={store.place_id}
              store={store}
              initialRegion={initialRegion}
              onPress={() => handleStoreSelect(store)}
              GOOGLE_PLACES_API_KEY={GOOGLE_PLACES_API_KEY}
            />
          ))
        )}
      </ScrollView>
      <StoreDetailModal
        selectedStore={selectedStore}
        selectedDistance={selectedDistance}
        visible={!!selectedStore}
        onClose={() => setSelectedStore(null)}
        onOpenGoogleMaps={handleOpenGoogleMaps}
      />
    </ScrollView>
  );
}