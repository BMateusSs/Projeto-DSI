import React from "react";
import { View, StyleSheet } from "react-native";
import BottomMenu from "../components/BottonMenu";
import Heard from "../components/Hearder";

const MinhaAdega = () => {
    return (
        <View style={styles.container}>
            <Heard title="Minha Adega"/>
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

export default MinhaAdega;