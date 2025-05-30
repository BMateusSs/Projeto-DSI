import React from "react";
import { View, StyleSheet } from "react-native";
import BottomMenu from "../components/BottonMenu";
import Heard from "../components/Hearder";

const Library = () => {
    return (
        <View style={styles.container}>
            <Heard title="Biblioteca"/>
            <View style={styles.content}>
                
            </View>
            <BottomMenu/>
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
});

export default Library;