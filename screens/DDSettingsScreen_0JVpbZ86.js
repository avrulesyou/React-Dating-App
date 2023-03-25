import React, { useCallback } from "react";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import {
  ButtonOutline,
  Icon,
  LinearGradient,
  Picker,
  ScreenContainer,
  Slider,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import DistanceSlider from "@react-native-community/slider";
import { StreamChat } from "stream-chat";
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  View,
  Linking,
} from "react-native";
import { Fetch } from "react-request";
import DualSlider from "rn-range-slider";
import UserContext from "../context/UserContext.js";
import AppWebView from "../components/WebView.js";

import { Rail, RailSelected, Thumb } from "../components/DualSlider";
import StorageUtils from "../services/storage.js";

const client = StreamChat.getInstance(GlobalVariables.GETSTREAM_API_KEY);

const DDSettingsScreen_0JVpbZ86 = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;
  const [{ selected_team, selected_team_details }] =
    React.useContext(UserContext);
  const [user, setUser] = React.useContext(UserContext);

  const distanceSliderRef = React.useRef();

  const xanoAPIEditDDSettingsPOST = XanoAPIApi.useEditDDSettingsPOST();
  const xanoAPIDeleteTeamDELETE = XanoAPIApi.useDeleteTeamDELETE();
  const xanoAPIDeleteUserDELETE = XanoAPIApi.useDeleteUserDELETE();

  const [maximum_age, setMaximum_age] = React.useState(null);
  const [minimum_age, setMinimum_age] = React.useState(null);
  const [sliderValue, setSliderValue] = React.useState(0);
  const [policyURL, setPolicyURL] = React.useState(null);
  const [userChannelIds, setUserChannelIds] = React.useState([]);
  const [userDDChannelIds, setUserDDChannelIds] = React.useState([]);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const handleValueChange = useCallback((low, high) => {
    setMinimum_age(low);
    setMaximum_age(high);
  }, []);

  React.useEffect(() => {
    const getAllChannel = async () => {
      const filter = {
        type: "messaging",
        members: { $in: [String(user?.id)] },
      };
      const sort = [{ last_message_at: -1 }];
      const channels = await client.queryChannels(filter, sort, {
        watch: true,
        state: true,
      });

      const allUserChannelsID = channels.map((channel) => channel.cid);
      const allUserDDChannelsID = channels
        .filter((channel) => channel.data.member_count == 4)
        .map((channel) => channel.cid);

      setUserChannelIds(allUserChannelsID);
      setUserDDChannelIds(allUserDDChannelsID);
    };
    getAllChannel();
  }, []);

  React.useEffect(() => {
    setMaximum_age(
      selected_team_details?.group_maximum_age ??
        GlobalVariables.AGE_PREFENRENCE.MAXIMUM_AGE
    );
    setMinimum_age(
      selected_team_details?.group_minimum_age ??
        GlobalVariables.AGE_PREFENRENCE.MINIMUM_AGE
    );

    // Update State and Ref of Distance Slider
    setSliderValue(selected_team_details?.group_distance_preference ?? 0);
    distanceSliderRef.current.setNativeProps({
      value: selected_team_details?.group_distance_preference ?? 0,
    });
  }, []);

  const handleOnSave = async () => {
    try {
      const updatedUser = await xanoAPIEditDDSettingsPOST.mutateAsync({
        double_dating_teams_id: selected_team_details?.id ?? "",
        group_distance_preference: sliderValue,
        group_maximum_age: maximum_age,
        group_minimum_age: minimum_age,
      });
      setUser({
        ...user,
        selected_team_details: {
          ...user?.selected_team_details,
          ...updatedUser,
        },
      });
      navigation.navigate("DDStack", {
        screen: "DDBottomNavigator",
        params: { screen: "DDProfileTabScreen" },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignOff = () => {
    setGlobalVariableValue({
      key: "AUTHORIZATION_HEADER",
      value: "",
    });
    StorageUtils.removeAccessToken();
    StorageUtils.removeStreamToken();
    navigation.navigate("SignUpScreen");
  };

  const handleDeleteChannels = async (ids) => {
    if (Array.isArray(ids) && ids.length) await client.deleteChannels(ids);
  };

  return (
    <ScreenContainer
      scrollable={true}
      hasSafeArea={false}
      hasTopSafeArea={true}
    >
      {policyURL ? (
        <>
          <View
            style={[
              styles.View3def0fad,
              {
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.divider,
                position: "relative",
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
              <Touchable
                onPress={() => {
                  try {
                    navigation.navigate("DDStack", {
                      screen: "DDBottomNavigator",
                      params: { screen: "DDProfileTabScreen" },
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <Icon size={24} name={"AntDesign/arrowleft"} />
              </Touchable>
            </View>

            <View style={styles.View39912261}>
              <Text
                style={[styles.Textf0c9b4c4, { color: theme.colors.strong }]}
              >
                {"Settings"}
              </Text>
            </View>
            <View style={styles.View0cd1e7ab} />
          </View>

          <View style={styles.Viewdea22bb2}>
            <Text style={[styles.Text0b7b2509, { color: theme.colors.strong }]}>
              {"Preferences"}
            </Text>
          </View>

          <>
            <View style={styles.Viewc19fcf73}>
              <Text
                style={[styles.Text41375a3f, { color: theme.colors.strong }]}
              >
                {"Distance Preference"}
              </Text>
              <DistanceSlider
                style={styles.Slidere30805ee}
                ref={distanceSliderRef}
                minimumValue={1}
                maximumValue={100}
                onValueChange={(value) => setSliderValue(value)}
                step={1}
                minimumTrackTintColor={theme.colors.chatMessages}
                maximumTrackTintColor={theme.colors.LightGrey}
                thumbTintColor={theme.colors.chatMessages}
              />
              <Text
                style={[styles.Text17f29f67, { color: theme.colors.lightGray }]}
              >
                {sliderValue}
                {" mi"}
              </Text>
            </View>

            <View style={styles.Viewaf777fb6}>
              <Text
                style={[styles.Text41375a3f, { color: theme.colors.strong }]}
              >
                {"Age Preference"}
              </Text>

              <DualSlider
                style={{ marginHorizontal: 12 }}
                min={GlobalVariables.AGE_PREFENRENCE.MINIMUM_AGE}
                max={GlobalVariables.AGE_PREFENRENCE.MAXIMUM_AGE}
                step={1}
                low={minimum_age}
                high={maximum_age}
                floatingLabel
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                onValueChanged={handleValueChange}
              />

              <View style={styles.Viewdbe83d8f}>
                <View>
                  <Text style={{ color: theme.colors.strong }}>
                    {"Minimum Age"}
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.strong,
                      textAlign: "center",
                    }}
                  >
                    {minimum_age}
                  </Text>
                </View>

                <View>
                  <Text style={{ color: theme.colors.strong }}>
                    {"Maximum Age"}
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.strong,
                      textAlign: "center",
                    }}
                  >
                    {maximum_age}
                  </Text>
                </View>
              </View>
            </View>
          </>

          <View style={styles.Viewedb0fb72}>
            <Text style={[styles.Text32e80972, { color: theme.colors.strong }]}>
              {"Contact Us"}
            </Text>

            <Touchable
              onPress={() => {
                try {
                  Linking.openURL("mailto:support@kuppleapp.com");
                } catch (error) {
                  console.log({ error });
                }
              }}
              title="support@kuppleapp.com"
            >
              <Text
                style={[styles.Text4064dc85, { color: theme.colors.strong }]}
              >
                {"Help & Support"}
              </Text>
            </Touchable>

            <Text style={[styles.Text32e80972, { color: theme.colors.strong }]}>
              {"Legal"}
            </Text>

            <Touchable
              onPress={() =>
                setPolicyURL(GlobalVariables.URL.TERM_AND_CONDITION)
              }
            >
              <Text
                style={[
                  styles.Text179138d4,
                  {
                    color: theme.colors.strong,
                    textDecorationLine: "underline",
                  },
                ]}
              >
                {"Terms of Use"}
              </Text>
            </Touchable>
            <Touchable
              onPress={() => setPolicyURL(GlobalVariables.URL.PRIVACY_POLICY)}
            >
              <Text
                style={[
                  styles.Text179138d5,
                  {
                    color: theme.colors.strong,
                    textDecorationLine: "underline",
                  },
                ]}
              >
                {"Privacy Policy"}
              </Text>
            </Touchable>
          </View>

          <View style={styles.View5942f196}>
            <Touchable onPress={handleOnSave}>
              <LinearGradient
                style={[styles.LinearGradient29beb386, { borderRadius: 28 }]}
                endY={100}
                endX={100}
                color2={theme.colors.color2Stop}
                color1={theme.colors.color1Stop}
              >
                <Text
                  style={[
                    styles.Textd5df39eb,
                    { color: theme.colors.communialWhite },
                  ]}
                >
                  {"Save"}
                </Text>
              </LinearGradient>
            </Touchable>
          </View>

          <View>
            <ButtonOutline
              onPress={() => {
                try {
                  setGlobalVariableValue({
                    key: "visible2",
                    value: true,
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.ButtonOutline3d86a6cf,
                {
                  borderColor: theme.colors["Static Purple"],
                  color: theme.colors["Static Purple"],
                },
              ]}
              title={"Delete Team"}
            />
          </View>

          <View>
            <ButtonOutline
              onPress={() => {
                try {
                  setGlobalVariableValue({
                    key: "visible",
                    value: true,
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.ButtonOutline138ee443,
                {
                  borderColor: theme.colors["Static Purple"],
                  color: theme.colors["Static Purple"],
                },
              ]}
              title={"Delete Account"}
            />
          </View>
          <>
            {!(Constants["visible2"] === true) ? null : (
              <Modal animationType={"slide"} presentationStyle={"pageSheet"}>
                <Text
                  style={[styles.Textfae17694, { color: theme.colors.strong }]}
                >
                  {"Delete Team"}
                </Text>

                <Text
                  style={[styles.Textcb760a31, { color: theme.colors.strong }]}
                >
                  {
                    "Are you sure you want to delete your team? This action cannot be undone, and all matches will be lost."
                  }
                </Text>
                <ButtonOutline
                  onPress={() => {
                    const handler = async () => {
                      try {
                        setGlobalVariableValue({
                          key: "visible2",
                          value: false,
                        });

                        await handleDeleteChannels(userDDChannelIds);

                        await xanoAPIDeleteTeamDELETE.mutateAsync({
                          double_dating_teams_id: selected_team?.id ?? "",
                        });
                        navigation.navigate("TeamsScreen");
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={[
                    styles.ButtonOutline21d367fd,
                    {
                      borderColor: theme.colors["Static Purple"],
                      color: theme.colors["Static Purple"],
                    },
                  ]}
                  title={"Delete Team"}
                />
              </Modal>
            )}
          </>
          <>
            {!(Constants["visible"] === true) ? null : (
              <Modal animationType={"slide"} presentationStyle={"pageSheet"}>
                <Text
                  style={[styles.Textfae17694, { color: theme.colors.strong }]}
                >
                  {"Delete Account"}
                </Text>

                <Text
                  style={[styles.Textcb760a31, { color: theme.colors.strong }]}
                >
                  {
                    "Are you sure you want to delete your account? This action cannot be undone, and all matches will be lost."
                  }
                </Text>
                <ButtonOutline
                  onPress={() => {
                    const handler = async () => {
                      try {
                        await handleDeleteChannels(userChannelIds);

                        await xanoAPIDeleteUserDELETE.mutateAsync();
                        setGlobalVariableValue({
                          key: "visible",
                          value: false,
                        });
                        handleSignOff();
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={[
                    styles.ButtonOutline21d367fd,
                    {
                      borderColor: theme.colors["Static Purple"],
                      color: theme.colors["Static Purple"],
                    },
                  ]}
                  title={"Delete Account"}
                />
              </Modal>
            )}
          </>
        </>
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ButtonOutline138ee443: {
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
  ButtonOutline21d367fd: {
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
  ButtonOutline3d86a6cf: {
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
  Fetch431eb058: { minHeight: 40 },
  LinearGradient29beb386: {
    height: 51,
    justifyContent: "center",
    width: "100%",
  },
  Picker179b000c: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 17,
    marginTop: 3,
    maxHeight: 25,
    maxWidth: 50,
  },
  Picker1e60a7df: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 19,
    marginTop: 3,
    maxHeight: 25,
    maxWidth: 50,
  },
  Slidere30805ee: { marginLeft: 12, marginRight: 22 },
  Text0b7b2509: { fontFamily: "Poppins_300Light", fontSize: 12 },
  Text179138d4: { fontFamily: "Poppins_400Regular", marginBottom: 5 },
  Text179138d5: { fontFamily: "Poppins_400Regular", marginBottom: 15 },
  Text17f29f67: { alignSelf: "flex-end", marginLeft: 12, marginRight: 28 },
  Text32e80972: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    marginBottom: 3,
  },
  Text4064dc85: { fontFamily: "Poppins_400Regular", marginBottom: 10 },
  Text41375a3f: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginBottom: 3,
  },
  Textcb760a31: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 4,
  },
  Textd5df39eb: { fontFamily: "Poppins_400Regular", textAlign: "center" },
  Textf0c9b4c4: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    textAlign: "center",
  },
  Textfae17694: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    marginLeft: 20,
    marginTop: 30,
  },
  View0cd1e7ab: {
    alignItems: "center",
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  View39912261: { alignItems: "center" },
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
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 5,
  },
  View5942f196: { marginLeft: 20, marginRight: 20 },
  Viewaf777fb6: { marginLeft: 10, marginRight: 10, marginTop: 8 },
  Viewc19fcf73: { marginLeft: 10, marginRight: 10, marginTop: 3 },
  Viewdbe83d8f: { flexDirection: "row", justifyContent: "space-around" },
  Viewdea22bb2: { marginLeft: 10, marginRight: 10, marginTop: 70 },
  Viewedb0fb72: { marginLeft: 10, marginRight: 10, marginTop: 8 },
});

export default withTheme(DDSettingsScreen_0JVpbZ86);
