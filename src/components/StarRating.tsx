import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type StarRatingProps = {
  rating: number;
  onRatingChange: (rating: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity 
          key={star} 
          onPress={() => onRatingChange(star)}
          activeOpacity={0.7}
        >
          <Ionicons 
            name={star <= rating ? 'star' : 'star-outline'}
            size={32}
            color={star <= rating ? 'gold' : 'gray'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
  },
});

export default StarRating;