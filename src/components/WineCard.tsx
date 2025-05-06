import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/StyleHome';

const WineCard = ({ wine }) => {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: wine.imagem }} 
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.nome} numberOfLines={1}>{wine.nome}</Text>
      <View style={styles.linha}>
        <Text style={styles.nota}>⭐ {wine.avaliacao.toFixed(1)}</Text>
        <Text style={styles.preco}>R$ {wine.preco.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default WineCard;