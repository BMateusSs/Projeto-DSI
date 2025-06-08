import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'

interface AddButtonProps {
    onPress: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({onPress}) => {
    return(
        <TouchableOpacity
            onPress={onPress}
            style={styles.button}
        >
            <Text style={styles.text}>+</Text>
        </TouchableOpacity>
    )
}

export default AddButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#6B2737',
        width: 70,
        height: 70,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'
    }
})