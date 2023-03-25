import React from "react";
import * as GlobalVariables from "../config/GlobalVariableContext";
import Images from "../config/Images";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import {
  LinearGradient,
  ScreenContainer,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { Image, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UserContext from "../context/UserContext";

const JoinTeamScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  const xanoAPIDDAcceptInvitePOST = XanoAPIApi.useDDAcceptInvitePOST();
  const xanoAPIDeleteDDTeamDenyInvite = XanoAPIApi.useDeleteDDTeamDenyInvite();

  const [user, setUser] = React.useContext(UserContext);

  const [numberInputValue, setNumberInputValue] = React.useState("");
  const [textInputValue, setTextInputValue] = React.useState("");

  return (
    <ScreenContainer
      style={styles.screen}
      hasSafeArea={true}
      scrollable={false}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps={"never"}
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
            {"Join Team"}
          </Text>

          <Text
            style={[
              styles.Text06aff924,
              { color: theme.colors.poppinsLightBlack },
            ]}
          >
            {"You've been invited to join a double-dating team."}
          </Text>
        </View>

        <View style={styles.Viewaacf8bea}>
          <View style={styles.Viewd6eb9a0b}>
            <Touchable
              onPress={() => {
                const handler = async () => {
                  try {
                    const dDAcceptInvitePOSTID =
                      await xanoAPIDDAcceptInvitePOST.mutateAsync({
                        double_dating_teams_id:
                          props.route?.params?.team_id ?? "",
                      });
                    console.log("IDDAcceptInvitePOST", dDAcceptInvitePOSTID);
                    setGlobalVariableValue({
                      key: "invited_ddteam_id",
                      value: "",
                    });

                    // Taking Accepted Team Detail
                    const userDDTeams = await XanoAPIApi.getBothDDTeamsGET({
                      AUTHORIZATION_HEADER: user?.authToken,
                    });
                    const currentTeamDetail = userDDTeams.find(
                      (team) => dDAcceptInvitePOSTID.id == team.id
                    );

                    //Setting Context for Selected Team
                    setUser({
                      ...user,
                      selected_team: currentTeamDetail,
                      selected_team_details: null,
                    });

                    if (dDAcceptInvitePOSTID && dDAcceptInvitePOSTID.id) {
                      navigation.navigate("DDStack", {
                        screen: "DDBottomNavigator",
                        params: {
                          screen: "DDProfileTabScreen",
                          params: { team_id: props.route?.params?.team_id },
                        },
                      });
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
                  {"Accept"}
                </Text>
              </LinearGradient>
            </Touchable>
          </View>

          <View style={styles.Viewd6eb9a0b}>
            <Touchable
              onPress={() => {
                const handler = async () => {
                  try {
                    const dDDTeamDenyInvite =
                      await xanoAPIDeleteDDTeamDenyInvite.mutateAsync({
                        double_dating_teams_id:
                          props.route?.params?.team_id ?? 1,
                      });
                    console.log("dDDTeamDenyInvite", dDDTeamDenyInvite);

                    setGlobalVariableValue({
                      key: "invited_ddteam_id",
                      value: "",
                    });
                    navigation.navigate("BottomTabNavigator", {
                      screen: "ProfileTabScreen",
                    });
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
                  {"Deny"}
                </Text>
              </LinearGradient>
            </Touchable>
          </View>
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
  Viewaacf8bea: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  Viewd6eb9a0b: {
    width: "40%",
  },
  screen: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
});

export default withTheme(JoinTeamScreen);
