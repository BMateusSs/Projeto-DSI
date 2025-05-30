import { StyleSheet } from "react-native";
import {VinicotecaTheme} from "./colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "white",
        paddingTop: 10,
    },
    containerTitle: {
        width: '90%',
        marginBottom: 15
    },
    title: {
        color: VinicotecaTheme.colors.primary,
        fontSize: 25,
        fontWeight: 'bold'
    },
    containerSearch: {
        width: '90%',
        height: 40,
        backgroundColor: "#F2E6E6",
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12
    },
    searchIcon: {
        marginRight: 8,
        color: VinicotecaTheme.colors.primary
    },
    textInput: {
        flex: 1,
        color: "#6B7280",
        fontSize: 16,
        paddingVertical: 8,
        includeFontPadding: false,
        paddingHorizontal: 0,
        margin: 0
    },
    containerSub: {
        width: '90%',
        marginBottom: 10
    },
    subtittle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: VinicotecaTheme.colors.primary
    },
    containerCard: {
        height: 220,
        marginBottom: 15,
        marginLeft: 15
    },
    card: {
        width: 160,
        height: 200,
        marginRight: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 5,
        resizeMode: 'contain',
        backgroundColor: '#F9F9F9'
    },
    nome: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#333'
    },
    linha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        alignItems: 'center'
    },
    nota: {
        fontSize: 12,
        color: '#888'
    },
    preco: {
        fontSize: 14,
        fontWeight: 'bold',
        color: VinicotecaTheme.colors.primary
    },
    containerMap: {
        width: '90%',
        height: 150,
        borderRadius: 10,
        backgroundColor: "#EEEEEE",
        marginBottom: 20,
        justifyContent: 'center'
    },
    bottomMenu: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    menuItem: {
        alignItems: 'center',
        paddingHorizontal: 10,
        minWidth: 70
    },
    menuText: {
        fontSize: 12,
        color: VinicotecaTheme.colors.primary,
        marginTop: 5,
        fontWeight: '500'
    },
    mapPlaceholderText: {
        textAlign: 'center',
        color: '#666'
    }
});

export default styles;