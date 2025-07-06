import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/mapStyles';
import { Place, LocationCoords } from '../screens/map/types';

interface NearbyStoreCardProps {
  store: Place;
  initialRegion: LocationCoords | null;
  onPress: (store: Place) => void;
  GOOGLE_PLACES_API_KEY: string;
}

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const NearbyStoreCard: React.FC<NearbyStoreCardProps> = ({ store, initialRegion, onPress, GOOGLE_PLACES_API_KEY }) => {
  let distance = null;
  if (initialRegion) {
    distance = getDistanceFromLatLonInKm(
      initialRegion.latitude,
      initialRegion.longitude,
      store.geometry.location.lat,
      store.geometry.location.lng
    );
  }
  
  const hasPhoto = Array.isArray(store.photos) && store.photos.length > 0 && store.photos[0].photo_reference;
  const canLoadPhoto = hasPhoto && GOOGLE_PLACES_API_KEY;
  
  return (
    <TouchableOpacity key={store.place_id} style={styles.storeCardVertical} onPress={() => onPress(store)} activeOpacity={0.85}>
      {canLoadPhoto ? (
        <Image
          source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${store.photos && store.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}` }}
          style={styles.storeImage}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.storeImage, {backgroundColor: '#e0e0e0', alignItems: 'center', justifyContent: 'center'}]}>
          <Ionicons name="storefront" size={48} color="#888" />
        </View>
      )}
      <View style={{paddingHorizontal: 18, paddingBottom: 18, width: '100%'}}>
        <Text style={styles.storeName}>{store.name}</Text>
        <View style={styles.rowInfo}>
          <Ionicons name="location-outline" size={18} color="#6B2737" style={{marginRight: 4}} />
          <Text style={styles.storeAddress}>{(() => {
            const address = store.vicinity || store.formatted_address || '';
            if (!address) return 'Endereço não disponível';
            const parts = address.split(',').map(p => p.trim());
            if (parts.length >= 2) {
              return parts[0] + ', ' + parts[1];
            }
            return parts[0];
          })()}</Text>
        </View>
        {distance !== null && !isNaN(distance) && (
          <View style={styles.rowInfo}>
            <Ionicons name="navigate" size={16} color="#6B2737" style={{marginRight: 4}} />
            <Text style={styles.storeDistance}>Distância: {distance.toFixed(2)} km</Text>
          </View>
        )}
      </View>
      <View style={styles.cardBottomBar} />
    </TouchableOpacity>
  );
};

export default NearbyStoreCard; 