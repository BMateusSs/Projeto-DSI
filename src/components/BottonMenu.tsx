import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from "../styles/StyleHome";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function BottomMenu() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute();

    const [activeItem, setActiveItem] = useState('Home');

    useEffect(() => {
        if (route.name) {
            setActiveItem(route.name);
        }
    }, [route.name]);

    function handlePress(itemName, screenName) {
        setActiveItem(itemName);
        navigation.navigate(screenName);
    }

    const getItemColor = (itemName) => {
        return activeItem === itemName ? "#6B2737" : "#808080";
    };

    return (
        <View style={[
            styles.bottomMenu,
            {
                paddingBottom: insets.bottom,
                height: 60 + insets.bottom
            }
        ]}>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handlePress('Home', 'Home')}
            >
                <MaterialCommunityIcons
                    name="home"
                    size={26}
                    color={getItemColor('Home')}
                />
                <Text style={[styles.menuText, { color: getItemColor('Home') }]}>Início</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handlePress('Library', 'Library')}
            >
                <MaterialCommunityIcons
                    name="glass-wine"
                    size={26}
                    color={getItemColor('Library')}
                />
                <Text style={[styles.menuText, { color: getItemColor('Library') }]}>Biblioteca</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handlePress('Adega', 'Adega')}
            >
                <MaterialCommunityIcons
                    name="bottle-wine"
                    size={26}
                    color={getItemColor('Adega')}
                />
                <Text style={[styles.menuText, { color: getItemColor('Adega') }]}>Minha Adega</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handlePress('Store', 'Store')}
            >
                <MaterialCommunityIcons
                    name="store"
                    size={26}
                    color={getItemColor('Store')}
                />
                <Text style={[styles.menuText, { color: getItemColor('Store') }]}>Loja</Text>
            </TouchableOpacity>
        </View>
    );
}