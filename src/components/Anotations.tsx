import React from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'

interface AnotationProps{
    text: string,
    value: string,
    onChange: (text: string) => void;
}

const Anotation: React.FC<AnotationProps> = ({text, value, onChange}) => {
    return(
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            placeholder={text}
            value={value}
            onChangeText={onChange}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#666"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff',
    }
})

export default Anotation;