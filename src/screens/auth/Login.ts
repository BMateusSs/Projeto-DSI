import { StyleSheet } from "react-native";
import { VinicotecaTheme } from "../../styles/colors";

const baseButton = {
  width: "100%",
  height: 58,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: VinicotecaTheme.colors.white,
  },
  containerLogin: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 35,
    color: VinicotecaTheme.colors.primary,
    fontWeight: "bold",
    marginBottom: 80,
  },
  containerCreatePassword: {
    width: "90%"
  },
  containerInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%",
    height: 60,
    borderRadius: 10,
    backgroundColor: VinicotecaTheme.colors.white,
    borderColor: VinicotecaTheme.colors.primary,
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    marginLeft: 5,
  },
  containerButton: {
    ...baseButton,
    backgroundColor: VinicotecaTheme.colors.primary,
    marginBottom: 20,
  },
  containerButtonRegister: {
    ...baseButton,
    width: '100%',
    backgroundColor: VinicotecaTheme.colors.white,
    borderColor: VinicotecaTheme.colors.primary,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  textButton: {
    color: VinicotecaTheme.colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  textButtonRegister: {
    color: VinicotecaTheme.colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  forget: {
    fontSize: 15,
    color: VinicotecaTheme.colors.primary,
    marginBottom: 32,
  },
  option: {
    fontSize: 15,
    color: VinicotecaTheme.colors.primary,
    marginBottom: 20,
  },
  textBold: {
    fontSize: 15,
    color: VinicotecaTheme.colors.primary,
    marginBottom: 32,
    fontWeight: "bold",
  },
  containerFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});

export default styles;