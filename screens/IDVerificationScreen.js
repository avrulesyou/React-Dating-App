import React from "react";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import Images from "../config/Images";
import {
  LinearGradient,
  ScreenContainer,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import * as WebBrowser from "expo-web-browser";
import { Image, StyleSheet, Text, View, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Linking from "expo-linking";

const IDVerificationScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme, navigation } = props;

  const xanoAPIIDVerificationGetURLPOST =
    XanoAPIApi.useIDVerificationGetURLPOST();

  const [numberInputValue, setNumberInputValue] = React.useState("");
  const [textInputValue, setTextInputValue] = React.useState("");

  let idVerificationLinkingEvent;

  const addLinkingListener = (event) => {
    idVerificationLinkingEvent = Linking.addEventListener(
      "url",
      handleRedirect
    );
  };

  const removeLinkingListener = () => {
    if (idVerificationLinkingEvent) {
      idVerificationLinkingEvent.remove();
    }
  };

  const handleRedirect = (event) => {
    if (Platform.OS === "ios") {
      WebBrowser.dismissBrowser();
    } else {
      removeLinkingListener();
    }
    if (event.url) {
      let urlObject = Linking.parse(event.url);
      if (urlObject) {
        // if (urlObject.path === 'first-name') {
        //    navigation.navigate('FirstNameScreen');
        // }
      }
    }
  };

  return (
    <ScreenContainer
      style={styles.screen}
      hasSafeArea={true}
      scrollable={false}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps={"always"}
        enableAutomaticScroll={true}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <View>
          <Image
            style={styles.Imageee92b18b}
            source={Images.Final03}
            resizeMode={"contain"}
          />
          <Text
            style={[styles.Text3a76ec9b, { color: theme.colors.staticPurple }]}
          >
            {"ID Verification"}
          </Text>

          <Text
            style={[
              styles.Text06aff924,
              { color: theme.colors.poppinsLightBlack },
            ]}
          >
            {
              "We use a 30-second ID verification process to eliminate fake profiles and create a better user experience."
            }
          </Text>
        </View>

        <View style={styles.View39912261}>
          <Image
            style={styles.Imagea7f9e204}
            source={Images.ID}
            resizeMode={"contain"}
          />
        </View>

        <View style={styles.View02f8ec45}>
          <Touchable
            onPress={() => {
              const handler = async () => {
                try {
                  const ID_url =
                    await xanoAPIIDVerificationGetURLPOST.mutateAsync();
                  if (ID_url) {
                    setGlobalVariableValue({
                      key: "url",
                      value: ID_url,
                    });

                    addLinkingListener();
                    await WebBrowser.openBrowserAsync(ID_url);
                    if (Platform.OS === "ios") {
                      removeLinkingListener();
                    }
                  }
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
          >
            <LinearGradient
              style={[styles.LinearGradient4704f023, { borderRadius: 28 }]}
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
                {"Start Verification"}
              </Text>
            </LinearGradient>
          </Touchable>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Imageee92b18b: {
    height: 56,
    width: 68,
  },
  LinearGradient4704f023: {
    height: 51,
    justifyContent: "center",
    width: "100%",
  },
  Text06aff924: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    marginTop: 0,
  },
  Text3a76ec9b: {
    fontFamily: "Poppins_700Bold",
    fontSize: 27,
    marginTop: 16,
  },
  Text8b5e265a: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  View02f8ec45: {
    marginTop: 20,
  },
  screen: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  View39912261: {
    paddingTop: 20,
    alignItems: "center",
  },
  Imagea7f9e204: {
    height: 192,
    width: 249,
  },
});

export default withTheme(IDVerificationScreen);
