import React from "react";
import * as TwilioApi from "../apis/TwilioApi.js";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
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
import StorageUtils from "../services/storage.js";
import UserContext from "../context/UserContext.js";
import { useChatContext } from "stream-chat-expo";
import * as Utils from "../utils";
import Purchases from "react-native-purchases";
import firebase from "firebase/compat/app";
import AlertModal from "../components/AlertModal.js";
import { modelAuthCodeToMessage } from "../config/helper.js";

const LoginVerificationScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const twilioVerifyLoginPOST = TwilioApi.useVerifyLoginPOST();
  const firebaseLoginPOST = TwilioApi.useLoginWithFirebasePOST();

  const xanoAPIDeleteUser$PhoneNumberOnboarding$DELETE =
    XanoAPIApi.useDeleteUser$PhoneNumberOnboarding$DELETE();

  const [numberInputValue, setNumberInputValue] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [textInputValue, setTextInputValue] = React.useState("");
  const [errorAlertModal, setErrorAlertModal] = React.useState(null);
  const [token, setToken] = React.useState("");

  const [_, setUser] = React.useContext(UserContext);
  const { client } = useChatContext();

  const connectUser = async ({
    id,
    name,
    streamToken,
    featured_photo: { url },
  }) => {
    try {
      await client.connectUser(
        {
          id: String(id),
          name: name,
          image: url,
        },
        streamToken
      );
    } catch (error) {
      console.log({ error });
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
        <View>
          <Image
            style={styles.Imageee92b18b}
            source={Images.Final03}
            resizeMode={"contain"}
          />
          <Text
            style={[styles.Text8e60057b, { color: theme.colors.staticPurple }]}
          >
            {"Phone Verification"}
          </Text>

          <Text
            style={[
              styles.Text06aff924,
              { color: theme.colors.poppinsLightBlack },
            ]}
          >
            {"Please enter the code below."}
          </Text>
        </View>
        {/* token */}
        <TextInput
          onChangeText={(newTokenValue) => {
            try {
              setToken(newTokenValue);
            } catch (err) {
              console.error(err);
            }
          }}
          style={[
            styles.TextInputdd670671,
            { borderColor: theme.colors.divider },
          ]}
          placeholder={"Enter code..."}
          placeholderTextColor={theme.colors.lightGray}
          keyboardType={"number-pad"}
          autoFocus={true}
        />
        <View>
          <Touchable
            onPress={() => {
              const handler = async () => {
                try {
                  const credential = firebase.auth.PhoneAuthProvider.credential(
                    props.route?.params?.verificationId ?? "",
                    token
                  );
                  const firebase_user = await firebase
                    .auth()
                    .signInWithCredential(credential);

                  const accessToken = await firebase_user?.user?.getIdToken();
                  const Verify = await firebaseLoginPOST.mutateAsync({
                    accessToken,
                  });
                  const streamToken = Verify.userToken;
                  const authToken = Verify.auth_token;

                  const message = undefined;

                  await setGlobalVariableValue({
                    key: "visible",
                    value: message,
                  });
                  await setGlobalVariableValue({
                    key: "AUTHORIZATION_HEADER",
                    value: authToken,
                  });
                  if (!authToken) {
                    return;
                  }

                  const response = await XanoAPIApi.getSingleItemGET(
                    Constants,
                    { authToken }
                  );

                  const user = { ...response, authToken, streamToken };

                  authToken && StorageUtils.setAccessToken(authToken);
                  streamToken && StorageUtils.setStreamToken(streamToken);

                  //Connect User to GetStream
                  await connectUser(user);

                  //setting an User Context at App Level
                  //set check for 1st time loading at ProfileTabScreen
                  setUser({ ...user, isFirstTimeLoading: true });

                  if (response && response.id) {
                    const isUserID = response.id;
                    setGlobalVariableValue({
                      key: "logInUserID",
                      value: isUserID,
                    });
                    const purchasesLogin = await Utils.purchasesLogin(isUserID);
                    if (purchasesLogin) {
                      Purchases.setPhoneNumber(
                        props.route?.params?.phoneNumber
                      );
                      Purchases.setDisplayName(`${response.name}`);
                    }
                  }

                  // if verification is incomplete redirect to IdVerificationScreen
                  // We are currently disabling IDVerification Module
                  // if (!response?.isIdVerified) {
                  //   navigation.navigate("IDVerificationScreen");
                  //   return;
                  // }

                  // if profile is incomplete redirect to OnBoardingScreens
                  if (!response?.isProfileComplete) {
                    navigation.navigate("FirstNameScreen");
                    return;
                  }

                  if (
                    Constants["invited_ddteam_id"] &&
                    Constants["invited_ddteam_id"] !== ""
                  ) {
                    if (response) {
                      const isUserID = response.id;
                      if (isUserID) {
                        if (
                          response &&
                          response.double_dating_team_ids.length > 0 &&
                          response.double_dating_team_ids.includes(
                            parseInt(Constants["invited_ddteam_id"])
                          )
                        ) {
                          navigation.reset({
                            routes: [{ name: "BottomTabNavigator" }],
                          });
                          return;
                        }
                      }
                    }
                    navigation.navigate("JoinTeamScreen", {
                      team_id: Constants["invited_ddteam_id"],
                    });
                  } else {
                    navigation.reset({
                      routes: [{ name: "BottomTabNavigator" }],
                    });
                    return;
                  }
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
                {"Verify"}
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
  Text065ea8e3: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    marginTop: 16,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  Text06aff924: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    marginTop: 0,
  },
  Text8e60057b: {
    fontFamily: "Poppins_700Bold",
    fontSize: 27,
    marginTop: 15,
  },
  TextInputdd670671: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 8,
    borderRightWidth: 1,
    borderTopWidth: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginBottom: 20,
    marginTop: 18,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
  },
  Texte50b9a94: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  screen: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
});

export default withTheme(LoginVerificationScreen);
