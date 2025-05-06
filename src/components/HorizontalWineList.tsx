import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import WineCard from './WineCard';
import styles from '../styles/StyleHome';

const HorizontalWineList = ({ wines, title }) => {
  return (
    <>
      <View style={styles.containerSub}>
        <Text style={styles.subtittle}>{title}</Text>
      </View>
      <ScrollView 
        style={[styles.containerCard, { marginBottom: 20, marginStart: 15 }]}
        horizontal 
        showsHorizontalScrollIndicator={false}
      >
        {wines.map(wine => (
          <WineCard key={wine.id} wine={wine} />
        ))}
      </ScrollView>
    </>
  );
};

export default HorizontalWineList;