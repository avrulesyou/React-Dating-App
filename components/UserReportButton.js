import React from "react";
import { ButtonOutline, withTheme } from "@draftbit/ui";
import { StyleSheet } from "react-native";

const UserReportButton = (props) => {
  const { theme, title, onPress } = props;
  return (
    <ButtonOutline
      onPress={onPress}
      style={[
        styles.ButtonOutline5599f2b1,
        {
          color: theme.colors.LightGrey,
          borderColor: "#000",
        },
      ]}
      title={title}
    />
  );
};

const styles = StyleSheet.create({
  ButtonOutline5599f2b1: {
    borderRadius: 28,
    borderWidth: 1,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 16,
    minHeight: 60,
    textAlign: "center",
    fontSize: 18,
    lineHeight: 27,
    marginLeft: 12,
    marginRight: 12,
  },
});

export default withTheme(UserReportButton);
