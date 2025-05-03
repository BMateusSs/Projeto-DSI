import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from "./StyleHome";

export default function BottomMenu() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[
            styles.bottomMenu,
            { 
                paddingBottom: insets.bottom,
                height: 60 + insets.bottom 
            }
        ]}>
            <TouchableOpacity style={styles.menuItem}>
                <MaterialCommunityIcons name="home" size={26} color="#6B2737" />
                <Text style={styles.menuText}>Início</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
                <MaterialCommunityIcons name="glass-wine" size={26} color="#6B2737" />
                <Text style={styles.menuText}>Biblioteca</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
                <MaterialCommunityIcons name="bottle-wine" size={26} color="#6B2737" />
                <Text style={styles.menuText}>Minha Adega</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
                <MaterialCommunityIcons name="store" size={26} color="#6B2737" />
                <Text style={styles.menuText}>Loja</Text>
            </TouchableOpacity>
        </View>
    );
}
