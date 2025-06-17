import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

interface AddInputProps{
    placeholder: string,
    value: string,
    onChange: (text: string) => void,
}

const AddInput: React.FC<AddInputProps> = ({placeholder, value, onChange}) => {
    return(
        <View style={styles.container}>
            <View style={styles.input}>
                <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                style={styles.textInput}
                />
            </View>
        </View>
    )
}

export default AddInput;

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#F2E6E6',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 5
    },
    container: {
        width: '100%'
    },
    textInput: {
        flex: 1,
        fontSize: 16,
    }
})