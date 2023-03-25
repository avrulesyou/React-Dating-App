import React from "react";
import * as CustomCode from "../CustomCode.js";
import * as TwilioApi from "../apis/TwilioApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import Images from "../config/Images";
import {
  ButtonOutline,
  Icon,
  LinearGradient,
  ScreenContainer,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppWebView from "../components/WebView.js";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../config";
import firebase from "firebase/compat/app";
import { modelAuthCodeToMessage } from "../config/helper.js";
import AlertModal from "../components/AlertModal.js";

const PhoneVerificationScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const Alert = () => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    Alert.alert(
      "Alert",
      "Press OK or Cancel.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ],
      { cancelable: false }
    );

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

  const { theme } = props;
  const { navigation } = props;

  const twilioSendVerificationCodePOST =
    TwilioApi.useSendVerificationCodePOST();

  const [numberInputValue, setNumberInputValue] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [policyURL, setPolicyURL] = React.useState(null);
  const [errorAlertModal, setErrorAlertModal] = React.useState(null);
  const reCaptachaVerifier = React.useRef(null);

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, reCaptachaVerifier.current)
      .then((id) => {
        navigation.navigate("CodeVerificationScreen_kibEVzWy", {
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
      style={policyURL ? {} : styles.screen}
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
      {policyURL ? (
        <>
          <View
            style={[
              styles.View3def0fad,
              {
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.divider,
              },
            ]}
          >
            <View>
              <Touchable onPress={() => setPolicyURL(null)}>
                <Icon size={24} name={"AntDesign/close"} />
              </Touchable>
            </View>
          </View>
          <AppWebView sourceUrl={policyURL} currentUrl={() => {}} />
        </>
      ) : (
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
              resizeMode={"contain"}
              source={Images.Final03}
            />
            <Text
              style={[
                styles.Text318139b2,
                { color: theme.colors.staticPurple },
              ]}
            >
              {"Phone Verification"}
            </Text>

            <Text
              style={[
                styles.Text912a839a,
                { color: theme.colors.poppinsLightBlack },
              ]}
            >
              {"Please enter your phone number below."}
            </Text>
          </View>

          <View style={styles.View498cc563}>
            <View>
              <View style={styles.Viewce4accf0}>
                <Image
                  style={styles.Imagece457b8a}
                  source={Images.FlagIconn}
                  resizeMode={"contain"}
                />
                <Text
                  style={[
                    styles.Text6817ed15,
                    { color: theme.colors.lightGray },
                  ]}
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
              style={styles.Touchable02f8ec45}
            >
              <LinearGradient
                style={[styles.LinearGradient4704f023, { borderRadius: 28 }]}
                endX={100}
                color1={theme.colors.color1Stop}
                color2={theme.colors.color2Stop}
              >
                <Text
                  style={[
                    styles.Textb649465f,
                    { color: theme.colors.communialWhite },
                  ]}
                >
                  {"Send Code"}
                </Text>
              </LinearGradient>
            </Touchable>
          </View>

          <View>
            <Text
              style={[
                styles.Text5e90781e,
                { color: theme.colors.poppinsLightBlack },
              ]}
            >
              <Text>By creating an account, you agree to our </Text>
              <Text
                style={{ textDecorationLine: "underline" }}
                onPress={() =>
                  setPolicyURL(GlobalVariables.URL.TERM_AND_CONDITION)
                }
              >
                Terms of Use
              </Text>
              <Text> and </Text>
              <Text
                style={{ textDecorationLine: "underline" }}
                onPress={() => setPolicyURL(GlobalVariables.URL.PRIVACY_POLICY)}
              >
                Privacy Policy.{" "}
              </Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ButtonOutline41d3102b: {
    backgroundColor: "transparent",
    borderRadius: 28,
    borderWidth: 1,
    fontFamily: "Poppins_400Regular",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 16,
    minHeight: 51,
    textAlign: "center",
  },
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
  Text279daad1: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    textAlign: "center",
  },
  Text318139b2: {
    fontFamily: "Poppins_700Bold",
    fontSize: 27,
    marginTop: 16,
  },
  Text5e90781e: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    marginTop: 16,
    textAlign: "center",
  },
  Text6817ed15: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginLeft: 4,
  },
  Text8b5e265a: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  Text912a839a: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    marginTop: 0,
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
  Textb649465f: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  Touchable02f8ec45: {
    marginTop: 20,
  },
  View11bc8c5b: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 16,
  },
  View498cc563: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 4,
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
  View3def0fad: {
    alignItems: "center",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    minHeight: 50,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    position: "relative",
  },
});

export default withTheme(PhoneVerificationScreen);
