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
        paddingStart: 5,
        margin: 5
    },
    container: {
        width: '90%'
    },

})