import React from "react";
import * as TwilioApi from "../apis/TwilioApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import Images from "../config/Images";
import {
  LinearGradient,
  ScreenContainer,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../config";
import firebase from "firebase/compat/app";
import { modelAuthCodeToMessage } from "../config/helper.js";
import AlertModal from "../components/AlertModal.js";

const LoginScreen_o3IxayGE = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  const twilioLoginSendCodePOST = TwilioApi.useLoginSendCodePOST();

  const [numberInputValue, setNumberInputValue] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [textInputValue, setTextInputValue] = React.useState("");
  const [errorAlertModal, setErrorAlertModal] = React.useState(null);
  const reCaptachaVerifier = React.useRef(null);

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, reCaptachaVerifier.current)
      .then((id) => {
        navigation.navigate("LoginVerificationScreen", {
          phoneNumber: phoneNumber,
          verificationId: id,
        });
      })
      .catch((err) => {
        console.log({ err });
        setErrorAlertModal(modelAuthCodeToMessage(err?.code));
      });
  };

  return (
    <ScreenContainer
      style={styles.screen}
      hasSafeArea={true}
      scrollable={false}
    >
      <FirebaseRecaptchaVerifierModal
        ref={reCaptachaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <AlertModal
        isVisible={!!errorAlertModal}
        icon={Images.WarningIcon}
        title={errorAlertModal?.title}
        subTitle={errorAlertModal?.subTitle}
        onPressClose={() => setErrorAlertModal(null)}
        primary={"Sure"}
        secondary={"Cancel"}
        onPressPrimary={() => setErrorAlertModal(null)}
        onPressSecondary={() => setErrorAlertModal(null)}
      />
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
            style={[styles.Text8e60057b, { color: theme.colors.staticPurple }]}
          >
            {"Welcome Back"}
          </Text>

          <Text
            style={[
              styles.Text06aff924,
              { color: theme.colors.poppinsLightBlack },
            ]}
          >
            {
              "We're glad to have you back. Please enter your phone number below."
            }
          </Text>
        </View>

        <View style={styles.View9204617a}>
          <View>
            <View style={styles.Viewce4accf0}>
              <Image
                style={styles.Imagece457b8a}
                source={Images.FlagIconn}
                resizeMode={"contain"}
              />
              <Text
                style={[styles.Text6817ed15, { color: theme.colors.lightGray }]}
              >
                {"+1"}
              </Text>
            </View>
          </View>

          <View style={styles.Viewd2a3be4a}>
            {/* Phone Input */}
            <TextInput
              onChangeText={(newPhoneInputValue) => {
                try {
                  // setPhoneNumber(newPhoneInputValue);
                  setPhoneNumber("+1" + newPhoneInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.TextInput6fefe6b8,
                { borderColor: theme.colors.divider },
              ]}
              placeholder={"(123)-456-7890"}
              placeholderTextColor={theme.colors.lightGray}
              maxLength={10}
              keyboardType={"number-pad"}
              autoFocus={true}
            />
          </View>
        </View>

        <View>
          <Touchable
            onPress={() => {
              const handler = async () => {
                try {
                  sendVerification();
                } catch (err) {
                  console.error(err);
                  setErrorAlertModal(modelAuthCodeToMessage(err?.code));
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
                  styles.Texte50b9a94,
                  { color: theme.colors.communialWhite },
                ]}
              >
                {"Login"}
              </Text>
            </LinearGradient>
          </Touchable>
        </View>

        <View>
          <Touchable
            onPress={() => {
              try {
                navigation.navigate("PhoneVerificationScreen");
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <Text
              style={[
                styles.Textb8e6b46b,
                {
                  color: theme.colors.poppinsLightBlack,
                  textDecorationColor: theme.colors.light,
                },
              ]}
            >
              {"Don't have an account? Sign up!"}
            </Text>
          </Touchable>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Imagece457b8a: {
    height: 30,
    width: 30,
  },
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
  Text6817ed15: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginLeft: 4,
  },
  Text8e60057b: {
    fontFamily: "Poppins_700Bold",
    fontSize: 27,
    marginTop: 15,
  },
  TextInput6fefe6b8: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 8,
    borderRightWidth: 1,
    borderTopWidth: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
  },
  Textb8e6b46b: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    marginTop: 16,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  Texte50b9a94: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  View9204617a: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 12,
  },
  Viewce4accf0: {
    alignItems: "center",
    flexDirection: "row",
  },
  Viewd2a3be4a: {
    marginLeft: 8,
    width: "80%",
  },
  screen: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
});

export default withTheme(LoginScreen_o3IxayGE);
