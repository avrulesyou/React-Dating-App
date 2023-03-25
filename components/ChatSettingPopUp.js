import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ChatSettingPopUp = ({ onPressUnmatch, onPressBlock }) => {
  return (
    <View style={styles.mainView}>
      <Text style={styles.unmatched} onPress={onPressUnmatch}>
        Unmatch
      </Text>
      <Text style={styles.block} onPress={onPressBlock}>
        Block
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "#F1F1F1",
    zIndex: 100,
    position: "absolute",
    top: 50,
    right: 12,
    padding: 15,
  },
  unmatched: {
    marginBottom: 20,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },
  block: {
    marginBottom: 10,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },
});
export default ChatSettingPopUp;
