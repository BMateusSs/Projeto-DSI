import React from 'react';
import { Marker } from 'react-native-maps';
import { LocationCoords, Place } from './types';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MapMarkersProps {
  initialRegion: LocationCoords;
  wineStores: Place[];
  onMarkerPress?: (store: Place) => void;
}

const MapMarkers: React.FC<MapMarkersProps> = ({ initialRegion, wineStores, onMarkerPress }) => (
  <>
    <Marker
      coordinate={{ latitude: initialRegion.latitude, longitude: initialRegion.longitude }}
      title="Sua Posição Atual"
      description="Você está aqui!"
      pinColor="blue"
    />
    {wineStores.map((store) => (
      <Marker
        key={store.place_id}
        coordinate={{ latitude: store.geometry.location.lat, longitude: store.geometry.location.lng }}
        title={store.name}
        description={store.vicinity}
        anchor={{ x: 0.5, y: 1 }}
        onPress={() => onMarkerPress && onMarkerPress(store)}
      >
        <Ionicons name="wine" size={32} color="#6B2737" />
      </Marker>
    ))}
  </>
);

export default MapMarkers; 