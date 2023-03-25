import React from "react";
import { useChatContext } from "stream-chat-expo";

import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import * as SplashScreen from "expo-splash-screen";
import Images from "../config/Images";
import {
  ButtonOutline,
  LinearGradient,
  ScreenContainer,
  Touchable,
  withTheme,
  Icon,
} from "@draftbit/ui";
import { useIsFocused } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";
import * as Linking from "expo-linking";
import EXPO_CONTSANTS from "expo-constants";
import StorageUtils from "../services/storage.js";
import UserContext from "../context/UserContext.js";
import * as Utils from "../utils";
import Purchases from "react-native-purchases";
import AppWebView from "../components/WebView.js";

const SignUpScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  const isFocused = useIsFocused();

  const [screenFromDeeplink, setScreenFromDeeplink] = React.useState("");
  const [idFromDeeplink, setIDFromDeeplink] = React.useState("");
  const [isInvitationLink, setIsInvitationLink] = React.useState(true);
  const [policyURL, setPolicyURL] = React.useState(null);
  const [_, setUser] = React.useContext(UserContext);
  const { client } = useChatContext();

  const getPurchasesUserDetails = async (isUserID) => {
    try {
      await Utils.getPurchasesCustomerDetails(
        isUserID,
        Constants,
        setGlobalVariableValue
      );
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    // Subscribe to purchaser updates
    Purchases.addCustomerInfoUpdateListener(getPurchasesUserDetails);
    return () => {
      Purchases.removeCustomerInfoUpdateListener(getPurchasesUserDetails);
    };
  });

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

  React.useEffect(() => {
    StorageUtils.getAccessToken()
      .then(async (token) => {
        if (token) {
          const response = await XanoAPIApi.getSingleItemGET(Constants, {
            authToken: token,
          });

          //If we dont come from link this will get disable
          if (isInvitationLink) return;

          //If we don't get response we terminate progam here
          if (!response) return;

          const stream_token = await StorageUtils.getStreamToken();
          const user = {
            ...response,
            authToken: token,
            streamToken: stream_token,
          };
          await setGlobalVariableValue({
            key: "visible",
            value: false,
          });
          await setGlobalVariableValue({
            key: "AUTHORIZATION_HEADER",
            value: token,
          });

          //Connect User to GetStream
          await connectUser(user);

          //setting an User Context at App Level
          //set check for 1st time loading at ProfileTabScreen
          setUser({ ...user, isFirstTimeLoading: true });

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
          }
        }
      })
      .finally(() => {
        setTimeout(async () => {
          await SplashScreen.hideAsync();
        }, 300);
      });
  }, [isInvitationLink]);

  React.useEffect(() => {
    Linking.getInitialURL().then((url) => {
      navigate(url, false);
    });
    const deepLinkingEvent = Linking.addEventListener("url", handleOpenURL);
    return () => {
      // deepLinkingEvent.remove();
    };
  }, []);

  handleOpenURL = (event) => {
    if (event) {
      navigate(event.url, true);
    }
  };

  navigate = (url, isLinkingEvent) => {
    if (url) {
      let urlObject = Linking.parse(url);
      if (urlObject) {
        if (urlObject.path === "first-name") {
          navigation.navigate("FirstNameScreen");
        } else if (
          urlObject.path === "join-team" ||
          urlObject.path === "signup"
        ) {
          const doubleDatingTeamID = urlObject?.queryParams[
            "double_dating_teams_id"
          ]
            ? urlObject?.queryParams["double_dating_teams_id"]
            : "";
          setGlobalVariableValue({
            key: "invited_ddteam_id",
            value: doubleDatingTeamID,
          });
          setScreenFromDeeplink(urlObject?.path ? urlObject?.path : "");
          setIDFromDeeplink(doubleDatingTeamID);
          if (isLinkingEvent) {
            checkUserIsLoginForBackgroud(doubleDatingTeamID);
          }
        } else {
          //This will rerender useEffect for Asysc Storage(allow user to Redirect to HomeScreen)
          setIsInvitationLink(false);
          setGlobalVariableValue({
            key: "invited_ddteam_id",
            value: "",
          });
        }
      }
    } else {
      //This will rerender useEffect for Asysc Storage(allow user to Redirect to HomeScreen)
      setIsInvitationLink(false);
      setGlobalVariableValue({
        key: "invited_ddteam_id",
        value: "",
      });
    }
  };

  const checkUserIsLoginForBackgroud = async (double_dating_teams_id) => {
    try {
      const userToken = await StorageUtils.getAccessToken();
      const response = await XanoAPIApi.getSingleItemGET(Constants, {
        authToken: userToken,
      });
      // console.log(' Constants invited_ddteam_id1',  Constants['invited_ddteam_id'],'double_dating_teams_id', double_dating_teams_id);
      // const complete = response.isProfileComplete;
      // console.log('complete', complete);
      // if (complete !== true) {
      //   return;
      // }
      const isUserID = response?.id;
      if (isUserID) {
        setUser({ ...response, authToken: userToken });
        await getPurchasesUserDetails(isUserID);
        if (double_dating_teams_id && double_dating_teams_id !== "") {
          if (
            response &&
            response.double_dating_team_ids.length > 0 &&
            response.double_dating_team_ids.includes(
              parseInt(double_dating_teams_id)
            )
          ) {
            return;
          }
          navigation.navigate("JoinTeamScreen", {
            team_id: double_dating_teams_id,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const userToken = await StorageUtils.getAccessToken();
        const response = await XanoAPIApi.getSingleItemGET(Constants, {
          authToken: userToken,
        });
        const isUserID = response?.id;
        if (isUserID) {
          setUser({ ...response, authToken: userToken });
          setGlobalVariableValue({
            key: "logInUserID",
            value: isUserID,
          });
          const userDetail = await getPurchasesUserDetails(isUserID);
          if (userDetail) {
            Purchases.setPhoneNumber(`${response.phoneNumber}`);
            Purchases.setDisplayName(`${response.name}`);
          }
        }
        const complete = response?.isProfileComplete;
        if (complete !== true) {
          setGlobalVariableValue({
            key: "AUTHORIZATION_HEADER",
            value: "",
          });
          return;
        }
        if (idFromDeeplink && idFromDeeplink !== "") {
          if (
            response &&
            response.double_dating_team_ids.length > 0 &&
            response.double_dating_team_ids.includes(parseInt(idFromDeeplink))
          ) {
            navigation.navigate("BottomTabNavigator", { screen: "HomeScreen" });
            return;
          }
          navigation.navigate("JoinTeamScreen", { team_id: idFromDeeplink });
        }
        // else {
        //   navigation.navigate("BottomTabNavigator", { screen: "HomeScreen" });
        // }
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused, idFromDeeplink]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <LinearGradient
        style={[{ flex: 1, justifyContent: "space-between", borderRadius: 28 }]}
        endY={100}
        endX={100}
        color1={theme.colors.color1Stop}
        color2={theme.colors.color2Stop}
      >
        {policyURL ? (
          <>
            <View
              style={[
                styles.View3def0fad,
                {
                  paddingTop: EXPO_CONTSANTS.statusBarHeight,
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
          <>
            <View style={styles.View5ab358a7}>
              <Image
                style={styles.Image25a9f1e9}
                resizeMode={"contain"}
                source={Images.LogoOutline}
              />
              <Text
                style={[styles.Text7bad6a68, { color: theme.colors.White }]}
              >
                {"Kupple"}
              </Text>
            </View>

            <View>
              <View style={styles.View750dd79b}>
                <Text
                  style={[styles.Textd8463a06, { color: theme.colors.White }]}
                >
                  {"Experience"}
                </Text>

                <Text
                  style={[styles.Text7bad6a67, { color: theme.colors.White }]}
                >
                  {"Double Dating"}
                </Text>
                <Text
                  style={[styles.Textfdb487a4, { color: theme.colors.White }]}
                >
                  {"The fun & safe way to date"}
                </Text>
              </View>

              <View style={styles.Viewbe27fc5b}>
                <View style={styles.Viewbe27fc5c}>
                  <ButtonOutline
                    onPress={() => {
                      try {
                        navigation.navigate("LoginScreen_o3IxayGE");
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={[
                      styles.ButtonOutline5599f2b1,
                      styles.ButtonShadow,
                      {
                        color: theme.colors.staticPurple,
                        borderColor: theme.colors.White,
                        backgroundColor: theme.colors.White,
                      },
                    ]}
                    title={"Login"}
                  />
                  <Touchable
                    onPress={() => {
                      try {
                        navigation.navigate("PhoneVerificationScreen");
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={styles.ButtonShadow}
                  >
                    <LinearGradient
                      style={[
                        styles.LinearGradient4704f023,

                        { borderRadius: 28 },
                      ]}
                      endY={100}
                      endX={100}
                      color1={theme.colors.color1Stop}
                      color2={theme.colors.color2Stop}
                    >
                      <Text
                        style={[
                          styles.Texte50b9a94,
                          { color: theme.colors.communialWhite },
                        ]}
                      >
                        {"Create an Account"}
                      </Text>
                    </LinearGradient>
                  </Touchable>
                </View>
                <Text
                  style={[styles.Textfdb487a5, { color: theme.colors.White }]}
                >
                  <Text>By signing up for Kupple, you agree to our </Text>
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
                    onPress={() =>
                      setPolicyURL(GlobalVariables.URL.PRIVACY_POLICY)
                    }
                  >
                    Privacy Policy.{" "}
                  </Text>
                </Text>
              </View>
            </View>
          </>
        )}
      </LinearGradient>
    </ScreenContainer>
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
  },
  ButtonShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
  },
  Image25a9f1e9: {
    height: 135,
    width: 145,
  },
  Image7ee6e033: {
    height: 194,
    width: 57,
  },
  Imagee64018af: {
    height: 194,
    width: 80,
  },
  LinearGradient4704f023: {
    height: 60,
    justifyContent: "center",
    width: "100%",
  },
  Text7bad6a67: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 40,
    lineHeight: 50,
  },
  Text7bad6a68: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 55,
    lineHeight: 44,
    paddingTop: 40,
  },
  Textd8463a06: {
    fontFamily: "Poppins_300Light",
    fontSize: 26,
    lineHeight: 44,
  },
  Texte50b9a94: {
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
    fontSize: 18,
    lineHeight: 27,
  },
  Textfdb487a4: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 27,
    marginTop: 8,
  },
  Textfdb487a5: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 31,
    marginHorizontal: 17,
    textAlign: "center",
  },
  View36526123: {
    marginBottom: -50,
  },
  View5ab358a7: {
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: EXPO_CONTSANTS.statusBarHeight + 50,
  },
  View750dd79b: {
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    // marginTop: -70,
  },
  Viewbe27fc5b: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 80,
    marginBottom: 45,
  },
  Viewbe27fc5c: {
    // height: 150,
    display: "flex",
    justifyContent: "space-between",
  },
  Viewcb5f7420: {
    alignItems: "flex-end",
    marginTop: -60,
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

export default withTheme(SignUpScreen);
