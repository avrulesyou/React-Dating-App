import React from "react";
import * as CustomCode from "../CustomCode.js";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import {
  ButtonOutline,
  Circle,
  CircleImage,
  Divider,
  Icon,
  LinearGradient,
  ScreenContainer,
  Surface,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Fetch } from "react-request";
import {
  SlideAnimatedView,
  SlideIconAnimatedView,
  AnimatedButton,
  IconView,
} from "../components";
import * as Utils from "../utils";
import CustomIcon from "../components/CustomIcon.js";

const ProfileViewWithLikeScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const [selectedIconType, setSelectedIconType] = React.useState("");
  const [isAnimateSlideIcon, setIsAnimateSlideIcon] = React.useState(false);

  const requestLocation = async () => {
    let { status } = await CustomCode.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Access to your location is needed to complete this action");
      return null;
    }

    let location = await CustomCode.getCurrentPositionAsync({});
    return location;
  };

  const { theme } = props;
  const { navigation } = props;

  const xanoAPILikeAUserPOST = XanoAPIApi.useLikeAUserPOST();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
    >
      <SlideAnimatedView
        value={
          isAnimateSlideIcon && selectedIconType === ""
            ? 0
            : selectedIconType != ""
            ? 1
            : 0
        }
      >
        <View
          style={[
            styles.Viewf1ce9d7a,
            {
              borderColor: theme.colors.divider,
              backgroundColor: theme.colors.background,
            },
          ]}
        >
          <View>
            <Touchable
              onPress={() => {
                try {
                  navigation.goBack();
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Icon name={"AntDesign/arrowleft"} size={24} />
            </Touchable>
          </View>

          <View style={styles.View39912261}>
            <Text style={[styles.Text4dad3443, { color: theme.colors.strong }]}>
              {"View Profile"}
            </Text>
          </View>
          <View style={styles.View0cd1e7ab} />
        </View>

        <XanoAPIApi.FetchGetOtherUserGET
          user_id={props.route?.params?.user_id ?? ""}
        >
          {({ loading, error, data, refetchGetOtherUser }) => {
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

            return (
              <ScrollView showsVerticalScrollIndicator={true} bounces={true}>
                <FlatList
                  data={fetchData}
                  listKey={"Aa4LqL7a"}
                  keyExtractor={(listData) =>
                    listData?.id || listData?.uuid || JSON.stringify(listData)
                  }
                  renderItem={({ item }) => {
                    const listData = item;
                    return (
                      <>
                        {/* First Pic */}
                        {listData?.featured_photo?.url && (
                          <View
                            style={[
                              styles.Viewf3f8fc1d,
                              {
                                borderRadius: 20,
                                borderColor: theme.colors.lightGray,
                              },
                            ]}
                          >
                            <Image
                              style={styles.Image405d7a68}
                              source={{
                                uri: `${listData?.featured_photo?.url}`,
                              }}
                              resizeMode={"cover"}
                            />
                          </View>
                        )}

                        <Divider
                          style={styles.Dividereca51389}
                          color={theme.colors.lightBorderColor}
                        />
                        {/* Name and Social Icons */}
                        <View style={styles.View7e92d9ae}>
                          <View style={styles.Viewee33c0b7}>
                            {/* Name and Age */}
                            <Text
                              style={[
                                styles.Texte1113e44,
                                { color: theme.colors.grayChatLettering },
                              ]}
                            >
                              {listData?.name}
                              {", "}
                              {listData?.age}
                            </Text>
                          </View>
                        </View>
                        {/* Location */}
                        <View style={styles.Viewece0b640}>
                          <View style={styles.Viewdebd3207}>
                            <CustomIcon
                              name={"AntDesign/home"}
                              size={22}
                              color={theme.colors.grayChatLettering}
                            />
                            {/* Location */}
                            <Text
                              style={[
                                styles.Texte36fedd3,
                                { color: theme.colors.grayChatLettering },
                              ]}
                            >
                              {listData?.user_city}
                            </Text>
                          </View>

                          <View style={styles.Viewb3267adf}>
                            <CustomIcon
                              name={"EvilIcons/location"}
                              size={22}
                              color={theme.colors.grayChatLettering}
                            />
                            {/* Location */}
                            <Text
                              style={[
                                styles.Texte36fedd3,
                                { color: theme.colors.grayChatLettering },
                              ]}
                            >
                              {Math.ceil(listData?.distance)}
                              {" mi away"}
                            </Text>
                          </View>
                          <>
                            {!listData?.job_title ? null : (
                              <View style={styles.Viewb3267adf}>
                                <CustomIcon
                                  name={"Ionicons/briefcase-outline"}
                                  size={22}
                                  color={theme.colors.grayChatLettering}
                                />
                                {/* Location */}
                                <Text
                                  style={[
                                    styles.Texte36fedd3,
                                    { color: theme.colors.grayChatLettering },
                                  ]}
                                >
                                  {listData?.job_title}
                                </Text>
                              </View>
                            )}
                          </>
                        </View>
                        {/* About Me */}
                        <>
                          {!listData?.bio ? null : (
                            <View
                              style={[
                                styles.Viewa22c23ba,
                                { borderColor: theme.colors.lightGray },
                              ]}
                            >
                              {/* About Me Text */}
                              <Text
                                style={[
                                  styles.Texta394d165,
                                  { color: theme.colors.grayChatLettering },
                                ]}
                              >
                                {"About Me"}
                              </Text>

                              <View style={styles.View90ea170d}>
                                {/* Bio */}
                                <Text
                                  style={[
                                    styles.Text6ebadddd,
                                    { color: theme.colors.grayChatLettering },
                                  ]}
                                >
                                  {listData?.bio}
                                </Text>
                              </View>
                            </View>
                          )}
                        </>
                        <Divider
                          style={styles.Dividera7f3b1fe}
                          color={theme.colors.lightBorderColor}
                        />
                        {/* Second Pic */}
                        {listData?.profilePic2?.url && (
                          <View
                            style={[
                              styles.View4d2403b2,
                              {
                                borderRadius: 20,
                                borderColor: theme.colors.lightGray,
                              },
                            ]}
                          >
                            <Image
                              style={styles.Image405d7a68}
                              source={{ uri: `${listData?.profilePic2?.url}` }}
                              resizeMode={"cover"}
                            />
                          </View>
                        )}

                        {listData?.prompt_1_response && (
                          <View
                            style={[
                              styles.View104d8117,
                              {
                                borderRadius: 28,
                                borderColor: theme.colors.lightGray,
                              },
                            ]}
                          >
                            {/* Prompt1 */}
                            <Text
                              style={[
                                styles.Text22d08ac3,
                                { color: theme.colors.grayChatLettering },
                              ]}
                            >
                              {listData?.prompt_1}
                            </Text>
                            {/* Prompt 1 Response */}
                            <Text
                              style={[
                                styles.Textcac216f4,
                                { color: theme.colors.grayChatLettering },
                              ]}
                            >
                              {listData?.prompt_1_response}
                            </Text>
                          </View>
                        )}

                        {/* Third Pic */}
                        {listData?.profilePic3?.url && (
                          <View
                            style={[
                              styles.View2d7f16b5,
                              {
                                borderRadius: 20,
                                borderColor: theme.colors.lightGray,
                              },
                            ]}
                          >
                            <Image
                              style={styles.Image405d7a68}
                              source={{ uri: `${listData?.profilePic3?.url}` }}
                              resizeMode={"cover"}
                            />
                          </View>
                        )}

                        {listData?.prompt_2_response && (
                          <View
                            style={[
                              styles.View104d8117,
                              {
                                borderRadius: 28,
                                borderColor: theme.colors.lightGray,
                              },
                            ]}
                          >
                            {/* Prompt2 */}
                            <Text
                              style={[
                                styles.Text22d08ac3,
                                { color: theme.colors.grayChatLettering },
                              ]}
                            >
                              {listData?.prompt_2}
                            </Text>
                            {/* Prompt 2 Response */}
                            <Text
                              style={[
                                styles.Textcac216f4,
                                { color: theme.colors.grayChatLettering },
                              ]}
                            >
                              {listData?.prompt_2_response}
                            </Text>
                          </View>
                        )}

                        {/* Fourth Pic */}
                        {listData?.profilePic4?.url && (
                          <View
                            style={[
                              styles.View06b68028,
                              {
                                borderRadius: 20,
                                borderColor: theme.colors.lightGray,
                              },
                            ]}
                          >
                            <Image
                              style={styles.Image405d7a68}
                              source={{ uri: `${listData?.profilePic4?.url}` }}
                              resizeMode={"cover"}
                            />
                          </View>
                        )}

                        {/* Fifth Pic */}
                        {listData?.profilePic5?.url && (
                          <View
                            style={[
                              styles.View2d7f16b5,
                              {
                                borderRadius: 20,
                                borderColor: theme.colors.lightGray,
                              },
                            ]}
                          >
                            <Image
                              style={styles.Image405d7a68}
                              source={{ uri: `${listData?.profilePic5?.url}` }}
                              resizeMode={"cover"}
                            />
                          </View>
                        )}

                        {listData?.prompt_3_response && (
                          <View
                            style={[
                              styles.View104d8117,
                              {
                                borderRadius: 28,
                                borderColor: theme.colors.lightGray,
                              },
                            ]}
                          >
                            {/* Prompt3 */}
                            <Text
                              style={[
                                styles.Text22d08ac3,
                                { color: theme.colors.grayChatLettering },
                              ]}
                            >
                              {listData?.prompt_3}
                            </Text>
                            {/* Prompt 3 Response */}
                            <Text
                              style={[
                                styles.Textcac216f4,
                                { color: theme.colors.grayChatLettering },
                              ]}
                            >
                              {listData?.prompt_3_response}
                            </Text>
                          </View>
                        )}

                        {/* Sixth Pic */}
                        {listData?.profilePic6?.url && (
                          <View
                            style={[
                              styles.View4ff57960,
                              {
                                borderRadius: 20,
                                borderColor: theme.colors.lightGray,
                              },
                            ]}
                          >
                            <Image
                              style={styles.Image405d7a68}
                              source={{ uri: `${listData?.profilePic6?.url}` }}
                              resizeMode={"cover"}
                            />
                          </View>
                        )}

                        <>
                          {!(Constants["visible"] === true) ? null : (
                            <Modal
                              animationType={"none"}
                              presentationStyle={"pageSheet"}
                            >
                              <View style={styles.Viewc65acab6}>
                                <Touchable
                                  onPress={() => {
                                    try {
                                      setGlobalVariableValue({
                                        key: "visible",
                                        value: false,
                                      });
                                      navigation.navigate(
                                        "BottomTabNavigator",
                                        {
                                          screen: "LikesMeTabScreen",
                                        }
                                      );
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                >
                                  <Icon size={24} name={"Feather/x"} />
                                </Touchable>
                              </View>

                              <View>
                                <View style={styles.View2cb52a0a}>
                                  <View style={styles.View8bd683a8}>
                                    <Surface
                                      style={[
                                        styles.Surface19047dbf,
                                        {
                                          backgroundColor:
                                            theme.colors.lightGray,
                                          borderRadius: 64,
                                        },
                                      ]}
                                    >
                                      <CircleImage
                                        size={120}
                                        source={{
                                          uri: `${listData?.featured_photo?.url}`,
                                        }}
                                      />
                                    </Surface>

                                    <Text
                                      style={[
                                        styles.Text7154ef67,
                                        { color: theme.colors.strong },
                                      ]}
                                    >
                                      {listData?.name}
                                    </Text>
                                  </View>

                                  <View style={styles.View9494aafa}>
                                    <Text
                                      style={[
                                        styles.Text363772db,
                                        { color: theme.colors.strong },
                                      ]}
                                    >
                                      {"&"}
                                    </Text>
                                  </View>

                                  <View style={styles.Viewda2fc39f}>
                                    <Surface
                                      style={[
                                        styles.Surface19047dbf,
                                        {
                                          backgroundColor:
                                            theme.colors.lightGray,
                                          borderRadius: 64,
                                        },
                                      ]}
                                    >
                                      <CircleImage
                                        size={120}
                                        source={{
                                          uri: `${Constants["featured_photo"]}`,
                                        }}
                                      />
                                    </Surface>

                                    <Text
                                      style={[
                                        styles.Textd2c9f9b9,
                                        { color: theme.colors.strong },
                                      ]}
                                    >
                                      {Constants["name"]}
                                    </Text>
                                  </View>
                                </View>

                                <View style={styles.Viewf8304bf6}>
                                  <Text
                                    style={[
                                      styles.Textd772bd6f,
                                      { color: theme.colors.grayChatLettering },
                                    ]}
                                  >
                                    {"It's a Match!"}
                                  </Text>
                                </View>

                                <View style={styles.Viewc9199af4}>
                                  <View>
                                    <Touchable
                                      onPress={() => {
                                        try {
                                          navigation.navigate(
                                            "BottomTabNavigator",
                                            { screen: "MatchesTabScreen" }
                                          );
                                        } catch (err) {
                                          console.error(err);
                                        }
                                      }}
                                    >
                                      <LinearGradient
                                        style={[
                                          styles.LinearGradient4704f023,
                                          { borderRadius: 28 },
                                        ]}
                                        endY={100}
                                        endX={100}
                                        color2={theme.colors.color2Stop}
                                        color1={theme.colors.color1Stop}
                                      >
                                        <Text
                                          style={[
                                            styles.Text8b5e265a,
                                            {
                                              color:
                                                theme.colors.communialWhite,
                                            },
                                          ]}
                                        >
                                          {"Start Messaging"}
                                        </Text>
                                      </LinearGradient>
                                    </Touchable>
                                  </View>
                                </View>

                                <View style={styles.Viewc9199af4}>
                                  <View>
                                    <ButtonOutline
                                      onPress={() => {
                                        try {
                                          setGlobalVariableValue({
                                            key: "visible",
                                            value: false,
                                          });
                                          navigation.navigate(
                                            "BottomTabNavigator",
                                            { screen: "LikesMeTabScreen" }
                                          );
                                        } catch (err) {
                                          console.error(err);
                                        }
                                      }}
                                      style={[
                                        styles.ButtonOutline0b133b65,
                                        {
                                          color: theme.colors.chatMessages,
                                          borderColor:
                                            theme.colors.chatMessages,
                                        },
                                      ]}
                                      title={"View More Likes"}
                                    />
                                  </View>
                                </View>
                              </View>
                            </Modal>
                          )}
                        </>
                      </>
                    );
                  }}
                  contentContainerStyle={styles.FlatListc992f941Content}
                  numColumns={1}
                />
              </ScrollView>
            );
          }}
        </XanoAPIApi.FetchGetOtherUserGET>
      </SlideAnimatedView>

      <View style={styles.Viewf679b6fe}>
        {selectedIconType === "" ||
        selectedIconType === Utils.ICON_TYPE.DISLIKE ? (
          <AnimatedButton
            style={[
              styles.Surfaceee4c7470,
              {
                borderRadius: 64,
                backgroundColor: theme.colors.onboardingSubtitleLettering,
              },
            ]}
            elevation={3}
          >
            <Circle bgColor={theme.colors.poppinsLightBlack} size={64}>
              <Icon
                name={"Feather/x"}
                color={theme.colors.xIconColor}
                size={34}
              />
            </Circle>
          </AnimatedButton>
        ) : (
          <View
            style={[styles.Surfaceee4c7470, { backgroundColor: "transparent" }]}
          />
        )}

        {selectedIconType === "" ||
        selectedIconType === Utils.ICON_TYPE.LIKE ? (
          <AnimatedButton
            style={[styles.Surfacec97fd320, { borderRadius: 64 }]}
            elevation={3}
            onPress={() => {
              const handler = async () => {
                setSelectedIconType(Utils.ICON_TYPE.LIKE);
                try {
                  const result = await xanoAPILikeAUserPOST.mutateAsync({
                    user2_id: props.route?.params?.user_id ?? "",
                  });
                  const match_result = result.matches_2;
                  setGlobalVariableValue({
                    key: "visible",
                    value: match_result,
                  });
                  if (match_result === true) {
                    return;
                  }
                  navigation.navigate("BottomTabNavigator", {
                    screen: "LikesMeTabScreen",
                  });
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
          >
            <LinearGradient
              style={[styles.LinearGradientcf6b392c, { borderRadius: 64 }]}
              endY={100}
              color2={theme.colors.color2Stop}
              color1={theme.colors.color1Stop}
              endX={0}
            >
              <Icon
                color={theme.colors.communialWhite}
                name={"EvilIcons/heart"}
                size={74}
              />
            </LinearGradient>
          </AnimatedButton>
        ) : (
          <View
            style={[styles.Surfacec97fd320, { backgroundColor: "transparent" }]}
          />
        )}

        {selectedIconType === "" ||
        selectedIconType === Utils.ICON_TYPE.STAR ? (
          <AnimatedButton
            style={[
              styles.Surface1c6185ff,
              {
                borderRadius: 64,
                backgroundColor: theme.colors.onboardingSubtitleLettering,
              },
            ]}
            elevation={3}
          >
            <Circle bgColor={theme.colors.poppinsLightBlack} size={64}>
              <Icon
                color={theme.colors.xIconColor}
                name={"Feather/star"}
                size={34}
              />
            </Circle>
          </AnimatedButton>
        ) : (
          <View
            style={[styles.Surface1c6185ff, { backgroundColor: "transparent" }]}
          />
        )}
      </View>
      {selectedIconType != "" ? (
        <SlideIconAnimatedView
          animationEnd={() => {
            setSelectedIconType("");
            setIsAnimateSlideIcon(true);
          }}
        >
          <IconView selectedIconType={selectedIconType}></IconView>
        </SlideIconAnimatedView>
      ) : null}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ButtonOutline0b133b65: {
    backgroundColor: "transparent",
    borderRadius: 28,
    borderWidth: 1,
    fontFamily: "Poppins_400Regular",
    marginTop: 4,
    minHeight: 51,
    textAlign: "center",
  },
  Dividera7f3b1fe: {
    height: 1,
    marginBottom: 4,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 16,
  },
  Dividereca51389: {
    height: 1,
    marginBottom: 16,
    marginLeft: 14,
    marginRight: 14,
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  FlatListc992f941Content: {
    flex: 1,
  },
  Image405d7a68: {
    minHeight: 375,
    width: "100%",
  },
  LinearGradient4704f023: {
    height: 51,
    justifyContent: "center",
    width: "100%",
  },
  LinearGradientcf6b392c: {
    alignItems: "center",
    height: 90,
    justifyContent: "center",
    width: 90,
  },
  Surface19047dbf: {
    height: 120,
    minHeight: 40,
    width: 120,
  },
  Surface1c6185ff: {
    height: 64,
    marginLeft: 8,
    width: 64,
  },
  Surfacec97fd320: {
    height: 90,
    width: 90,
  },
  Surfaceee4c7470: {
    height: 64,
    marginRight: 8,
    width: 64,
  },
  Text22d08ac3: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginLeft: 20,
    marginRight: 20,
  },
  Text363772db: {
    fontFamily: "Poppins_500Medium",
    fontSize: 28,
    lineHeight: 30,
  },
  Text4dad3443: {
    fontFamily: "Poppins_500Medium",
    fontSize: 24,
    textAlign: "center",
  },
  Text6ebadddd: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    opacity: 0.89,
  },
  Text7154ef67: {
    alignSelf: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    marginTop: 3,
  },
  Text8b5e265a: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  Texta394d165: {
    fontFamily: "Poppins_500Medium",
    fontSize: 17,
  },
  Textcac216f4: {
    fontFamily: "Poppins_400Regular",
    fontSize: 22,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 12,
  },
  Textd2c9f9b9: {
    alignSelf: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    marginTop: 3,
  },
  Textd772bd6f: {
    fontFamily: "Poppins_500Medium",
    fontSize: 38,
    textAlign: "center",
  },
  Texte1113e44: {
    fontFamily: "Poppins_500Medium",
    fontSize: 26,
  },
  Texte36fedd3: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.89,
  },
  View06b68028: {
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 24,
    overflow: "hidden",
  },
  View0cd1e7ab: {
    alignItems: "center",
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  View104d8117: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    justifyContent: "center",
    marginLeft: 12,
    marginRight: 12,
    marginTop: 24,
    minHeight: 160,
  },
  View2cb52a0a: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 12,
  },
  View2d7f16b5: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 24,
    overflow: "hidden",
  },
  View39912261: {
    alignItems: "center",
  },
  View4d2403b2: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
    overflow: "hidden",
  },
  View4ff57960: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    marginBottom: 24,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 24,
    overflow: "hidden",
  },
  View7e92d9ae: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 14,
    marginRight: 14,
  },
  View8bd683a8: {
    marginRight: 6,
  },
  View90ea170d: {
    flexDirection: "row",
    marginTop: 4,
  },
  View9494aafa: {
    alignItems: "center",
    justifyContent: "center",
  },
  Viewa22c23ba: {
    marginLeft: 14,
    marginRight: 14,
    marginTop: 12,
  },
  Viewb3267adf: {
    flexDirection: "row",
    marginTop: 3,
    alignItems: "center",
  },
  Viewc65acab6: {
    alignItems: "flex-end",
  },
  Viewc9199af4: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 12,
  },
  Viewda2fc39f: {
    marginLeft: 6,
  },
  Viewdebd3207: {
    flexDirection: "row",
    alignItems: "center",
  },
  Viewece0b640: {
    justifyContent: "space-between",
    marginLeft: 14,
    marginRight: 14,
    marginTop: 3,
  },
  Viewee33c0b7: {
    justifyContent: "flex-end",
  },
  Viewf1ce9d7a: {
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
  Viewf3f8fc1d: {
    borderBottomWidth: 0.75,
    borderLeftWidth: 0.75,
    borderRightWidth: 0.75,
    borderTopWidth: 0.75,
    marginBottom: 16,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 60,
    overflow: "hidden",
  },
  Viewf679b6fe: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    opacity: 1,
    paddingLeft: 12,
    paddingRight: 12,
    position: "absolute",
    top: "85%",
    width: "100%",
    zIndex: 5,
  },
  Viewf8304bf6: {
    marginTop: 12,
  },
});

export default withTheme(ProfileViewWithLikeScreen);
