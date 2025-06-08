import React from "react";
import { View, StyleSheet } from "react-native";
import AddButton from "../../components/AddButton";
import { useNavigation } from "@react-navigation/native";
import WineListScreen from './WineListScreen';

const Library = () => {
    const navigation = useNavigation()

    function addWine(){
        navigation.navigate('Adicionar Vinhos')
    }

    return (
        <View style={styles.container}>
            <WineListScreen />
            <View style={styles.addButtonContainer}>
                <AddButton onPress={addWine}>
                </AddButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});

export default Library;