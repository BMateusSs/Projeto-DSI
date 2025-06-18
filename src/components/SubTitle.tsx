import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SubTitleProps {
    title: string;
}

const SubTitle: React.FC<SubTitleProps> = ({ title }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 8,
        marginTop: 16,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'left',
    }
});

export default SubTitle;