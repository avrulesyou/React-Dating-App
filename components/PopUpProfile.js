import React from "react";
import {
  ButtonOutline,
  LinearGradient,
  Surface,
  Touchable,
  withTheme,
} from "@draftbit/ui";

import { Shadow } from "react-native-shadow-2";
import { Image, StyleSheet, Text, View } from "react-native";
import Images from "../config/Images";

const PopUp = (props) => {
  const { theme } = props;
  const {
    title,
    subTitle,
    first,
    second,
    onPressFirst,
    onPressSecond,
    hasIndication,
  } = props;

  return (
    <View style={styles.Container}>
      <View style={styles.MainView}>
        {hasIndication && (
          <View style={styles.Indication}>
            <Image source={Images.IndicationArrow} resizeMode={"contain"} />
          </View>
        )}
        <Shadow
          style={styles.Viewaabce009}
          sides={{ top: false }}
          corners={{ topEnd: false, topStart: false }}
          distance={6}
        >
          <Text
            style={[
              styles.Text6353b2d8,
              { color: theme.colors["Static Purple"] },
            ]}
          >
            {title}
          </Text>

          <Text style={[styles.Texta003495d, { color: theme.colors.strong }]}>
            {subTitle}
          </Text>
          <View>
            <ButtonOutline
              onPress={onPressFirst}
              style={[
                styles.ButtonOutline138ee443,
                {
                  color: theme.colors["Static Purple"],
                  borderColor: theme.colors["Static Purple"],
                },
              ]}
              title={first}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.View059cfbad}>
              <Surface style={[styles.Surface9b87f518]}>
                <Touchable onPress={onPressSecond}>
                  <LinearGradient
                    style={[styles.LinearGradient4704f023]}
                    endY={100}
                    endX={100}
                    color2={theme.colors.color2Stop}
                    color1={theme.colors.color1Stop}
                  >
                    <Text
                      style={[
                        styles.Text8b5e265a,
                        { color: theme.colors.communialWhite },
                      ]}
                    >
                      {second}
                    </Text>
                  </LinearGradient>
                </Touchable>
              </Surface>
            </View>
          </View>
        </Shadow>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    position: "absolute",
    backgroundColor: "transparent",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  MainView: {
    // flex: 1,
    justifyContent: "center",
    marginHorizontal: 25,
  },
  Viewaabce009: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    paddingBottom: 40,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: "white",
  },
  Indication: { position: "absolute", top: 80, right: 30 },
  View39912261: {
    alignItems: "center",
  },
  Text6353b2d8: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 26,
    marginTop: 24,
    textAlign: "center",
  },
  Texta003495d: {
    fontFamily: "Poppins_400Regular",
    fontSize: 22,
    lineHeight: 33,
    marginTop: 30,
    textAlign: "center",
  },
  View059cfbad: {
    marginHorizontal: 30,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 16,
    flex: 1,
  },
  Surface9b87f518: {
    minHeight: 40,
    borderRadius: 28,
  },
  ButtonOutline138ee443: {
    backgroundColor: "transparent",
    borderRadius: 28,
    borderWidth: 1,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    lineHeight: 27,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 60,
    minHeight: 51,
    textAlign: "center",
  },
  LinearGradient4704f023: {
    height: 58,
    justifyContent: "center",
    width: "100%",
    borderRadius: 28,
  },
  Text8b5e265a: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 27,
  },
});

export default withTheme(PopUp);
