import React from "react";
import { View, StyleSheet } from "react-native";
import AddButton from "../../components/AddButton";
import { useNavigation } from "@react-navigation/native";
import StoreListScreen from "./StoreListScreen";

const Store = () => {
    const navigation = useNavigation();
    const addStore = () => {
        navigation.navigate('Adicionar Lojas');
    };
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <StoreListScreen />
            </View>
            <View style={styles.addButtonContainer}>
                <AddButton onPress={addStore} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});

export default Store;