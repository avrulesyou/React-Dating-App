import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Select2 from "react-native-select-two";

// import colors from "../config/colors";
// import Font from "../theme/Font";

function AppSelect2({ loading = false, styleContainer = [{}], ...props }) {
  return (
    <View
      pointerEvents={loading ? "none" : "auto"}
      style={styles.mainContainer}
    >
      <Select2
        style={styleContainer}
        colorTheme={"#BD2494"}
        buttonStyle={styles.button}
        buttonTextStyle={styles.buttonText}
        modalStyle={styles.modal}
        selectedTitleStyle={styles.selectedTitle}
        selectButtonText={"Choose"}
        cancelButtonText={"Cancel"}
        defaultFontName={"Poppins_400Regular"}
        {...props}
      />
      {loading && (
        <View style={styles.loader}>
          {/* <Image source={require("../assets/images/gif-loader.gif")} /> */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flexDirection: "row" },
  loader: { position: "absolute", right: 10, top: 20 },
  container: {
    backgroundColor: "grey",
    flexDirection: "row",
    justifyContent: "flex-start",
    minHeight: 60,
    paddingHorizontal: 15,
    marginVertical: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
  },
  button: {
    borderRadius: 8,
    height: 45,
  },
  buttonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
  },
  modal: {
    paddingVertical: 10,
  },
  selectedTitle: {},
});
export default AppSelect2;
