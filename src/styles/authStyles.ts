import { StyleSheet, Dimensions } from "react-native";
import { VinicotecaTheme } from "./colors";

const { width, height } = Dimensions.get("window");
const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: height < 720? 6 : 60,
    alignItems: "center",
  },
  containerForm: {
    marginTop: 20,
    width: width * 0.85,
    gap: 16,
    alignItems: "center"
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "90%",
    height: 60,
    borderRadius: 10,
    backgroundColor: VinicotecaTheme.colors.white,
    borderColor: VinicotecaTheme.colors.primary,
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
  },
  option: {
    textAlign: "center",
    marginVertical: height < 720 ? 0 : 12,
    fontSize: 14,
    color: "#666",
  },

  containerFooter: {
    marginTop: 20,
    alignItems: "center",
    gap: 12,
  },

});

export default authStyles;
