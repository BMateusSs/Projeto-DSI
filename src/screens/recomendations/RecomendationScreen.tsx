import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RecomendationsList from './RecomendationList';

const RecommendationScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Baseado em suas preferências</Text>
            <View style={styles.listContainer}>
                <RecomendationsList/>
            </View>
        </View>
    );
};

export default RecommendationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
    },
    text: {
        fontSize: 15,
        color: '#454545',
        textAlign: 'center',
        marginVertical: 10,
    },
    listContainer: {
        flex: 1,
        width: '100%',
    }
});