import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import this

import { auth } from "../../firebase/firebaseConfig"; // Adjust path if necessary
// Adjust the path to your routeNames.ts file
import { VinicotecaTheme } from "../../styles/colors";
import { RootStackParamList, ROUTE_NAMES } from "../../routes/ProfessionalDetailsScreen";

// Define the type for the navigation prop.
// Since UserProfileScreen is likely part of TabNavigation, which is nested in the Stack,
// the navigation prop here will be for the RootStack.
// The "current screen" context for the StackNavigator is ROUTE_NAMES.HOME_TABS.
type UserProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof ROUTE_NAMES.HOME_TABS // Or the specific tab name if you have it in RootStackParamList
                               // and are navigating from a tab to a stack screen.
                               // For logging out and going to Login, HOME_TABS is appropriate.
>;

export function UserProfileScreen() {
    // Use the typed navigation
    const navigation = useNavigation<UserProfileScreenNavigationProp>();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            // Navigate to the Login screen using the constant
            // Using replace is often better after logout to prevent the user from going back.
            navigation.replace(ROUTE_NAMES.LOGIN);
        } catch (error) {
            console.error("Erro ao fazer logout: ", error);
            Alert.alert("Erro", "Não foi possível sair. Tente novamente.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil do Usuário</Text>
            {/* Add other profile information here */}

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff', // Added a background color
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333', // Darker text color
    },
    logoutButton: {
        marginTop: 50,
        backgroundColor: VinicotecaTheme.colors.redError, // Changed to your theme color
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000", // Added some shadow for depth
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});