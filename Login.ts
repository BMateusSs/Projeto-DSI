import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"

    },
    containerLogin: {
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 35,
        color: "#6B2737",
        fontWeight: "bold",
        marginBottom: 150
    },
    containerInput: {
        minWidth: "80%",
        height: 58,
        borderRadius: 10,
        backgroundColor: "#F9FAFB",
        borderColor: "#D1D5DB",
        borderWidth: 1,
        padding: 20,
        marginBottom: 20
    },
    textInput: {
        color: "#6B7280",
        fontSize: 18
    },
    containerButton: {
        backgroundColor: "#6B2737",
        minWidth: "80%",
        height: 58,
        borderRadius: 10, // Sugestão para arredondar o botão
        justifyContent: "center", // Centraliza o texto verticalmente
        alignItems: "center", // Centraliza o texto horizontalmente
        marginBottom: 20
    },
    containerButtonRegister: {
        backgroundColor: "white",
        minWidth: "80%",
        height: 58,
        borderRadius: 10, // Sugestão para arredondar o botão
        borderColor: "#6B2737",
        borderWidth: 1,
        justifyContent: "center", // Centraliza o texto verticalmente
        alignItems: "center", // Centraliza o texto horizontalmente
        marginTop: 20,
        marginBottom: 20
    },
    textButton: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    textButtonRegister: {
        color: "#6B2737",
        fontSize: 18,
        fontWeight: "bold"
    },
    forget: {
        fontSize: 15,
        color: "#6B2737",
        marginBottom: 40
    },
    option: {
        fontSize: 15,
        color: "#6B2737",
        marginBottom: 20
    },
    textBold: {
        fontSize: 15,
        color: "#6B2737",
        marginBottom: 40,
        fontWeight: 'bold'
    },
    containerFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8, 
    },
});

export default styles;