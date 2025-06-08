import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

interface AnotationProps{
    text: string,
    value: string,
    onChange: (text: string) => void;
}

const Anotation: React.FC<AnotationProps> = ({text, value, onChange}) => {
    return(
        <View style={styles.container}>
            <TextInput
            placeholder={text}
            value={value}
            onChangeText={onChange}
            />
        </View>
    )
}

export default Anotation;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 150,
        backgroundColor: '#F2E6E6',
        borderRadius: 8,
        marginBottom: 10
    }
})