import React from "react";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import Images from "../config/Images";
import {
  Circle,
  CircleImage,
  Icon,
  LinearGradient,
  ScreenContainer,
  Surface,
  Touchable,
  withTheme,
  ButtonOutline,
} from "@draftbit/ui";
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Fetch } from "react-request";
import UserContext from "../context/UserContext.js";
import CachedImage from "../components/CachedImage.js";
import MembershipSlider from "../components/MembershipSlider.js";
import CustomIcon from "../components/CustomIcon.js";
import PopUp from "../components/PopUp.js";
import PopUpProfile from "../components/PopUpProfile.js";
import AlertModal from "../components/AlertModal.js";

const DDProfileTabScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  const [availableMemberShip, setAvailableMemberShip] = React.useState([]);
  const [isIncompleteModalActive, setIsIncompleteModalActive] =
    React.useState(false);

  const [{ selected_team, selected_team_details }] =
    React.useContext(UserContext);
  const [user, setUser] = React.useContext(UserContext);

  React.useEffect(() => {
    if (user?.subscription_product_id == GlobalVariables.MEMBERSHIP.BASIC) {
      setAvailableMemberShip([
        {
          id: 1,
          title: "Kupple Plus",
          subTitle: "Get unlimited swipes & more!",
          titleColor: "#CC9900",
        },
        {
          id: 2,
          title: "Kupple Platinum",
          subTitle: "See who likes your profile!",
          titleColor: "#222222",
        },
      ]);
    }

    if (
      user?.subscription_product_id ==
      GlobalVariables.MEMBERSHIP.KUPPLE_PLUS_MONTHLY
    ) {
      setAvailableMemberShip([
        {
          id: 2,
          title: "Kupple Platinum",
          subTitle: "See who likes your profile!",
          titleColor: "#222222",
        },
      ]);
    }
  }, [user]);

  const handleOnPressEditProfile = () => {
    try {
      setIsIncompleteModalActive(false);
      navigation.navigate("DDEditProfileScreen", {
        team_id: selected_team?.id ?? "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnPressCancelProfile = () => {
    setIsIncompleteModalActive(false);
  };

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={false}
      style={{ opacity: isIncompleteModalActive ? 0.6 : 1 }}
    >
      <AlertModal
        isCentered
        isVisible={isIncompleteModalActive}
        icon={Images.WarningIcon}
        title={"Incomplete Profile"}
        subTitle={
          "You must upload at least two team photos and complete three team prompts before this profile will be shown to others."
        }
        onPressClose={handleOnPressCancelProfile}
        primary={"Edit Profile"}
        secondary={"Cancel"}
        onPressPrimary={handleOnPressEditProfile}
        onPressSecondary={handleOnPressCancelProfile}
      />
      <XanoAPIApi.FetchGetSingleDDTeamsRecordGET
        double_dating_teams_id={selected_team?.id ?? ""}
      >
        {({ loading, error, data, refetchGetSingleDDTeamsRecord }) => {
          const fetchData = data;
          if (!fetchData || loading) {
            return <ActivityIndicator />;
          }

          if (error) {
            return (
              <Text style={{ textAlign: "center" }}>
                There was a problem fetching this data
              </Text>
            );
          }

          if (!selected_team_details) {
            setUser({ ...user, selected_team_details: fetchData });
          }

          return (
            <>
              {!user?.selected_team_details?.isProfileComplete && (
                <Touchable
                  style={[styles.ButtonOutline138ee443]}
                  onPress={() => setIsIncompleteModalActive(true)}
                >
                  <Text
                    style={{
                      color: theme.colors["white"],
                    }}
                  >
                    <CustomIcon
                      name={"AntDesign/warning"}
                      size={14}
                      color={theme.colors["white"]}
                    />
                    <Text>{` `}</Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Poppins_500Medium",
                        lineHeight: 15,
                      }}
                    >
                      Incomplete Profile
                    </Text>
                  </Text>
                </Touchable>
              )}

              <FlatList
                data={[fetchData]}
                listKey={"czDGNpaH"}
                keyExtractor={(listData) =>
                  listData?.id || listData?.uuid || JSON.stringify(listData)
                }
                renderItem={({ item }) => {
                  const listData = item;
                  return (
                    <Touchable
                      onPress={() => {
                        try {
                          navigation.navigate("DDProfileViewScreen", {
                            team_id: listData?.id,
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={styles.Touchablef8155f9a}
                    >
                      <View>
                        <View style={styles.View296e3350}>
                          <View style={styles.View1354d5ec}>
                            <CachedImage
                              style={styles.CircleImageef886cd2}
                              size={120}
                              source={{
                                uri: `${
                                  listData &&
                                  listData["_user"]?.featured_photo?.url
                                }`,
                              }}
                            />
                          </View>

                          <View style={styles.Viewf4cb8276}>
                            <CachedImage
                              style={styles.CircleImageef886cd2}
                              size={120}
                              source={{
                                uri: `${
                                  listData &&
                                  listData["_user_2"]?.featured_photo?.url
                                }`,
                              }}
                            />
                          </View>
                        </View>

                        <View style={styles.View91edb4b3}>
                          <Text
                            style={[
                              styles.Texte0be7460,
                              { color: theme.colors.strong },
                            ]}
                          >
                            {listData && listData["_user"]?.name}
                            {" & "}
                            {listData && listData["_user_2"]?.name}
                          </Text>
                        </View>
                      </View>
                    </Touchable>
                  );
                }}
                style={styles.FlatList490205c2}
                numColumns={1}
              />
            </>
          );
        }}
      </XanoAPIApi.FetchGetSingleDDTeamsRecordGET>

      <View style={styles.View1e62a6e5}>
        <View style={styles.View9cb3eccb}>
          <Surface
            style={[
              styles.Surface015bf641,
              {
                borderRadius: 64,
                backgroundColor: theme.colors.background,
              },
            ]}
            elevation={1}
          >
            <Touchable
              onPress={() => {
                try {
                  navigation.navigate("DDSettingsScreen_0JVpbZ86", {
                    team_id: selected_team?.id ?? "",
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Circle size={60} bgColor={theme.colors.greyChatMessages}>
                <Icon
                  style={styles.Icon4b79332f}
                  name={"Ionicons/md-settings-outline"}
                  size={30}
                  color={theme.colors.poppinsLightBlack}
                />
              </Circle>
            </Touchable>
          </Surface>

          <View style={styles.Viewbfbcf0ca}>
            <Text style={[styles.Texte517bed5, { color: theme.colors.strong }]}>
              {"Settings"}
            </Text>
          </View>
        </View>

        <View style={styles.View508d110b}>
          <Surface
            style={[
              styles.Surface015bf641,
              {
                borderRadius: 64,
                backgroundColor: theme.colors.background,
              },
            ]}
            elevation={1}
          >
            <Touchable
              onPress={() => {
                try {
                  navigation.navigate("TeamsScreen");
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Circle size={60} bgColor={theme.colors.greyChatMessages}>
                <Icon
                  style={styles.Icon4b79332f}
                  name={"Ionicons/ios-people-outline"}
                  size={30}
                  color={theme.colors.poppinsLightBlack}
                />
              </Circle>
            </Touchable>
          </Surface>

          <View style={styles.Viewbfbcf0ca}>
            <Text style={[styles.Texte517bed5, { color: theme.colors.strong }]}>
              {"Teams"}
            </Text>
          </View>
        </View>

        <View style={styles.View508d110b}>
          <Surface
            style={[
              styles.Surface015bf641,
              {
                borderRadius: 64,
                backgroundColor: theme.colors.background,
              },
            ]}
            elevation={1}
          >
            <Touchable
              onPress={() => {
                try {
                  navigation.navigate("DDEditProfileScreen", {
                    team_id: selected_team?.id ?? "",
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Circle size={60} bgColor={theme.colors.greyChatMessages}>
                <Icon
                  size={30}
                  color={theme.colors.poppinsLightBlack}
                  name={"AntDesign/edit"}
                />
              </Circle>
            </Touchable>
          </Surface>

          <View style={styles.Viewbfbcf0ca}>
            <Text style={[styles.Texte517bed5, { color: theme.colors.strong }]}>
              {"Edit Profile"}
            </Text>
          </View>
        </View>
      </View>

      {user?.subscription_product_id !=
        GlobalVariables.MEMBERSHIP.KUPPLE_PLATINUM_MONTHLY && (
        <>
          <MembershipSlider content={availableMemberShip} />

          <View style={styles.View5942f196}>
            <Touchable
              onPress={() => {
                try {
                  navigation.navigate("SubscriptionOptionsScreen");
                } catch (err) {
                  console.error(err);
                }
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
                  {"Upgrade Now"}
                </Text>
              </LinearGradient>
            </Touchable>
          </View>
        </>
      )}

      <Text
        style={[styles.Text2681466e, { color: theme.colors.poppinsLightBlack }]}
      >
        {
          "Premium members are seen up to 6x more and go on up to 4x more dates!"
        }
      </Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ViewPopUpContact: {
    position: "absolute",
    backgroundColor: "transparent",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  ButtonOutline138ee443: {
    backgroundColor: "#D21404",
    alignSelf: "center",
    width: 155,
    borderRadius: 28,
    fontFamily: "Poppins_400Regular",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 16,
    minHeight: 28,
    textAlign: "center",
  },
  CircleImageef886cd2: {
    height: 120,
    width: 120,
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  FlatList490205c2: {
    flexGrow: 0,
  },
  Icon4b79332f: {
    marginBottom: 1,
  },
  Imageb06ca8a3: {
    height: 42,
    width: 50,
  },
  LinearGradient4704f023: {
    height: 51,
    justifyContent: "center",
    width: "100%",
  },
  Surface015bf641: {
    height: 60,
    width: 60,
  },
  Text2681466e: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    textAlign: "center",
  },
  Text430d592a: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    textAlign: "center",
  },
  Text8b5e265a: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  Texte0be7460: {
    fontFamily: "Poppins_500Medium",
    fontSize: 28,
    textAlign: "center",
  },
  Texte517bed5: {
    fontFamily: "Poppins_400Regular",
  },
  Touchablef8155f9a: {
    margin: 20,
  },
  View1354d5ec: {
    justifyContent: "flex-end",
    marginTop: 30,
    zIndex: 3,
  },
  View1d8587d2: {
    alignItems: "center",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 5,
  },
  View1e62a6e5: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  View296e3350: {
    flexDirection: "row",
    justifyContent: "center",
  },
  View39912261: {
    alignItems: "center",
  },
  View508d110b: {
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "25%",
    minWidth: "25%",
  },
  View5942f196: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  View91edb4b3: {
    marginTop: 8,
  },
  View9494aafa: {
    alignItems: "center",
    justifyContent: "center",
  },
  View9cb3eccb: {
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "25%",
    minWidth: "25%",
  },
  Viewbfbcf0ca: {
    marginTop: 4,
  },
  Viewf4cb8276: {
    marginLeft: -60,
  },
});

export default withTheme(DDProfileTabScreen);
