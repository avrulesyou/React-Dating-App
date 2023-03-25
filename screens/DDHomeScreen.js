import React from "react";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import Images from "../config/Images";
import {
  ButtonOutline,
  Circle,
  CircleImage,
  Icon,
  IconButton,
  LinearGradient,
  ScreenContainer,
  Surface,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Fetch } from "react-request";
import { useChatContext } from "stream-chat-expo";
import UserContext from "../context/UserContext.js";
import {
  SlideAnimatedView,
  SlideIconAnimatedView,
  AnimatedButton,
  IconView,
  LikeDislikeSatrButton,
} from "../components";
import * as Utils from "../utils";
import UserReportButton from "../components/UserReportButton.js";
import CustomIcon from "../components/CustomIcon.js";

const DDHomeScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;
  const [{ selected_team }] = React.useContext(UserContext);

  const xanoAPIDislikeDDTeamPOST = XanoAPIApi.useDislikeDDTeamPOST();
  const xanoAPILikeDDTeamPOST = XanoAPIApi.useLikeDDTeamPOST();
  const xanoAPIDDReportTeamPOST = XanoAPIApi.useDDReportTeamPOST();

  const homeScrollViewRef = React.useRef();

  const [selectedIconType, setSelectedIconType] = React.useState("");
  const [isAnimateSlideIcon, setIsAnimateSlideIcon] = React.useState(false);
  const [hideMenuButton, setHideMenuButton] = React.useState(false);

  const { client } = useChatContext();

  const createChannelBetweenUsers = async ({
    currentUserId,
    partnerUserId,
    matchedSecondUserId,
    matchedFirstUserId,
  }) => {
    try {
      // Creating Channel
      const channel = client.channel("messaging", {
        members: [
          currentUserId,
          partnerUserId,
          matchedFirstUserId,
          matchedSecondUserId,
        ],
      });
      await channel.create();
    } catch (error) {
      console.log({ error });
    }
  };

  const handleOnScroll = ({ nativeEvent }) => {
    setHideMenuButton(
      nativeEvent?.contentSize?.height <
        nativeEvent?.contentOffset?.y +
          nativeEvent?.layoutMeasurement?.height +
          50
    );

    // 50 for Button Height
  };

  const handleOnPressReport = async ({
    double_dating_teams_id,
    double_dating_teams2_id,
  }) => {
    await xanoAPIDDReportTeamPOST.mutateAsync({
      double_dating_teams_id,
      double_dating_teams2_id,
    });
  };

  const setScrollViewAtStart = () => {
    homeScrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  return (
    <ScreenContainer scrollable={false} hasSafeArea={false}>
      <SlideAnimatedView
        value={
          isAnimateSlideIcon && selectedIconType === ""
            ? 0
            : selectedIconType != ""
            ? 1
            : 0
        }
      >
        <XanoAPIApi.FetchGetDDTeamsGET
          double_dating_teams_id={selected_team?.id ?? ""}
        >
          {({ loading, error, data, refetchGetDDTeams }) => {
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
              <>
                {fetchData?.var_1 || fetchData?.max_likes ? null : (
                  <>
                    <View style={styles.Viewf679b6fe}>
                      {!hideMenuButton && (
                        <>
                          {selectedIconType === "" ||
                          selectedIconType === Utils.ICON_TYPE.DISLIKE ? (
                            <AnimatedButton
                              style={[
                                styles.Surfaceee4c7470,
                                {
                                  borderRadius: 64,
                                  backgroundColor:
                                    theme.colors.onboardingSubtitleLettering,
                                },
                              ]}
                              elevation={3}
                              onPress={() => {
                                const handler = async () => {
                                  try {
                                    await xanoAPIDislikeDDTeamPOST.mutateAsync({
                                      double_dating_teams2_id:
                                        fetchData?.result_1?.id,
                                      double_dating_teams_id:
                                        fetchData?.Double_Dating_Teams_1?.id,
                                    });
                                    setScrollViewAtStart();
                                    setSelectedIconType(
                                      Utils.ICON_TYPE.DISLIKE
                                    );
                                    await refetchGetDDTeams();
                                  } catch (err) {
                                    console.error(err);
                                  }
                                };
                                handler();
                              }}
                            >
                              <Circle
                                bgColor={theme.colors.poppinsLightBlack}
                                size={64}
                              >
                                <Icon
                                  name={"Feather/x"}
                                  color={theme.colors.xIconColor}
                                  size={34}
                                />
                              </Circle>
                            </AnimatedButton>
                          ) : (
                            <View
                              style={[
                                styles.Surfaceee4c7470,
                                { backgroundColor: "transparent" },
                              ]}
                            />
                          )}

                          {selectedIconType === "" ||
                          selectedIconType === Utils.ICON_TYPE.LIKE ? (
                            <AnimatedButton
                              style={[
                                styles.Surfacec97fd320,
                                { borderRadius: 64 },
                              ]}
                              elevation={3}
                              onPress={() => {
                                const handler = async () => {
                                  try {
                                    const result =
                                      await xanoAPILikeDDTeamPOST.mutateAsync({
                                        double_dating_teams2_id:
                                          fetchData?.result_1?.id,
                                        double_dating_teams_id:
                                          fetchData?.Double_Dating_Teams_1?.id,
                                        user_id:
                                          fetchData?.Double_Dating_Teams_1
                                            ?.user_id,
                                      });
                                    const match_result = result.result_1;
                                    setScrollViewAtStart();
                                    setGlobalVariableValue({
                                      key: "dd_visible",
                                      value: match_result,
                                    });
                                    if (match_result === true) {
                                      await createChannelBetweenUsers({
                                        currentUserId: String(
                                          fetchData?.Double_Dating_Teams_1
                                            ?.user_id
                                        ),
                                        partnerUserId: String(
                                          fetchData?.Double_Dating_Teams_1
                                            ?.user2_id
                                        ),
                                        matchedFirstUserId: String(
                                          fetchData?.result_1?.user_id
                                        ),
                                        matchedSecondUserId: String(
                                          fetchData?.result_1?.user2_id
                                        ),
                                      });
                                      return;
                                    }
                                    setSelectedIconType(Utils.ICON_TYPE.LIKE);
                                    await refetchGetDDTeams();
                                  } catch (err) {
                                    console.error(err);
                                  }
                                };
                                handler();
                              }}
                            >
                              <LinearGradient
                                style={[
                                  styles.LinearGradientcf6b392c,
                                  { borderRadius: 64 },
                                ]}
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
                              style={[
                                styles.Surfacec97fd320,
                                { backgroundColor: "transparent" },
                              ]}
                            />
                          )}

                          {selectedIconType === "" ||
                          selectedIconType === Utils.ICON_TYPE.STAR ? (
                            <AnimatedButton
                              style={[
                                styles.Surface1c6185ff,
                                {
                                  borderRadius: 64,
                                  backgroundColor:
                                    theme.colors.onboardingSubtitleLettering,
                                },
                              ]}
                              elevation={3}
                            >
                              <Circle
                                bgColor={theme.colors.poppinsLightBlack}
                                size={64}
                              >
                                <Icon
                                  color={theme.colors.xIconColor}
                                  name={"Feather/star"}
                                  size={34}
                                />
                              </Circle>
                            </AnimatedButton>
                          ) : (
                            <View
                              style={[
                                styles.Surface1c6185ff,
                                { backgroundColor: "transparent" },
                              ]}
                            />
                          )}
                        </>
                      )}
                    </View>
                    <ScrollView
                      ref={homeScrollViewRef}
                      contentContainerStyle={styles.ScrollView072c4648Content}
                      showsVerticalScrollIndicator
                      bounces
                      onScrollEndDrag={handleOnScroll}
                      onScrollBeginDrag={handleOnScroll}
                      onScroll={handleOnScroll}
                      scrollEventThrottle={16}
                    >
                      <View style={styles.View277c1da5}>
                        <Touchable
                          onPress={() =>
                            navigation.navigate("ProfileViewScreen", {
                              user_id:
                                fetchData?.result_1 &&
                                fetchData?.result_1["_user"]?.id,
                            })
                          }
                        >
                          <Image
                            style={[styles.Imagebd6d430c, { borderRadius: 4 }]}
                            resizeMode={"cover"}
                            source={{
                              uri: `${
                                fetchData?.result_1 &&
                                fetchData?.result_1["_user"]?.featured_photo
                                  ?.url
                              }`,
                            }}
                          />
                        </Touchable>

                        <View style={styles.Viewe0ef0a95}>
                          <View>
                            <Text
                              style={[
                                styles.Text7b906734,
                                { color: theme.colors.strong },
                              ]}
                            >
                              {fetchData?.result_1 &&
                                fetchData?.result_1["_user"]?.name}
                              {", "}
                              {fetchData?.result_1 &&
                                fetchData?.result_1["_user"]?.age}
                            </Text>
                          </View>

                          <View>
                            <Text
                              style={[
                                styles.Textdd7c1ff9,
                                { color: theme.colors.grayChatLettering },
                              ]}
                            >
                              {"About Me"}
                            </Text>

                            <View style={styles.Viewc0ba6ba7}>
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
                                {fetchData?.result_1 &&
                                  fetchData?.result_1["_user"]?.user_city}
                              </Text>
                            </View>

                            <View style={styles.Viewc0ba6ba7}>
                              <CustomIcon
                                size={22}
                                color={theme.colors.grayChatLettering}
                                name={"EvilIcons/location"}
                              />
                              {/* Location */}
                              <Text
                                style={[
                                  styles.Texte36fedd3,
                                  { color: theme.colors.grayChatLettering },
                                ]}
                              >
                                {Math.ceil(fetchData?.result_1?.distance)}
                                {" mi away"}
                              </Text>
                            </View>
                            <>
                              {!(
                                fetchData?.result_1 &&
                                fetchData?.result_1["_user"]?.job_title
                              ) ? null : (
                                <View style={styles.Viewc0ba6ba7}>
                                  <CustomIcon
                                    size={22}
                                    color={theme.colors.grayChatLettering}
                                    name={"Ionicons/briefcase-outline"}
                                  />
                                  {/* Location */}
                                  <Text
                                    style={[
                                      styles.Texte36fedd3,
                                      { color: theme.colors.grayChatLettering },
                                    ]}
                                  >
                                    {fetchData?.result_1 &&
                                      fetchData?.result_1["_user"]?.job_title}
                                  </Text>
                                </View>
                              )}
                            </>
                          </View>

                          <View style={styles.View2952d12e}>
                            <Touchable
                              onPress={() => {
                                try {
                                  navigation.navigate("ProfileViewScreen", {
                                    user_id:
                                      fetchData?.result_1 &&
                                      fetchData?.result_1["_user"]?.id,
                                  });
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                style={[
                                  styles.Text683477f9,
                                  { color: theme.colors.lightGray },
                                ]}
                              >
                                {"Individual Profile"}
                              </Text>
                            </Touchable>
                          </View>
                        </View>
                      </View>

                      <View style={styles.Viewdebd3207}>
                        <Touchable
                          onPress={() =>
                            navigation.navigate("ProfileViewScreen", {
                              user_id:
                                fetchData?.result_1 &&
                                fetchData?.result_1["_user2"]?.id,
                            })
                          }
                        >
                          <Image
                            style={[styles.Imagebd6d430c, { borderRadius: 4 }]}
                            source={{
                              uri: `${
                                fetchData?.result_1 &&
                                fetchData?.result_1["_user2"]?.featured_photo
                                  ?.url
                              }`,
                            }}
                            resizeMode={"cover"}
                          />
                        </Touchable>

                        <View style={styles.View144e0db8}>
                          <View>
                            <Text
                              style={[
                                styles.Textfeb3affe,
                                { color: theme.colors.grayChatLettering },
                              ]}
                            >
                              {fetchData?.result_1 &&
                                fetchData?.result_1["_user2"]?.name}
                              {", "}
                              {fetchData?.result_1 &&
                                fetchData?.result_1["_user2"]?.age}
                            </Text>
                          </View>

                          <View>
                            <Text
                              style={[
                                styles.Text219cc37d,
                                { color: theme.colors.grayChatLettering },
                              ]}
                            >
                              {"About Me"}
                            </Text>

                            <View style={styles.Viewc0ba6ba7}>
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
                                {fetchData?.result_1 &&
                                  fetchData?.result_1["_user2"]?.user_city}
                              </Text>
                            </View>

                            <View style={styles.Viewc0ba6ba7}>
                              <CustomIcon
                                size={22}
                                color={theme.colors.grayChatLettering}
                                name={"EvilIcons/location"}
                              />
                              {/* Location */}
                              <Text
                                style={[
                                  styles.Texte36fedd3,
                                  { color: theme.colors.grayChatLettering },
                                ]}
                              >
                                {Math.ceil(fetchData?.result_1?.distance_2)}
                                {" mi away"}
                              </Text>
                            </View>
                            <>
                              {!(
                                fetchData?.result_1 &&
                                fetchData?.result_1["_user2"]?.job_title
                              ) ? null : (
                                <View style={styles.Viewc0ba6ba7}>
                                  <CustomIcon
                                    size={22}
                                    color={theme.colors.grayChatLettering}
                                    name={"Ionicons/briefcase-outline"}
                                  />
                                  {/* Location */}
                                  <Text
                                    style={[
                                      styles.Texte36fedd3,
                                      { color: theme.colors.grayChatLettering },
                                    ]}
                                  >
                                    {fetchData?.result_1 &&
                                      fetchData?.result_1["_user2"]?.job_title}
                                  </Text>
                                </View>
                              )}
                            </>
                          </View>

                          <View style={styles.View2952d12e}>
                            <Touchable
                              onPress={() => {
                                try {
                                  navigation.navigate("ProfileViewScreen", {
                                    user_id:
                                      fetchData?.result_1 &&
                                      fetchData?.result_1["_user2"]?.id,
                                  });
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                style={[
                                  styles.Text683477f9,
                                  { color: theme.colors.lightGray },
                                ]}
                              >
                                {"Individual Profile"}
                              </Text>
                            </Touchable>
                          </View>
                        </View>
                      </View>
                      {/* First Group Pic */}
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
                          resizeMode={"cover"}
                          source={{
                            uri: `${fetchData?.result_1?.group_photo1?.url}`,
                          }}
                        />
                      </View>

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
                          {fetchData?.result_1?.group_prompt1_title}
                        </Text>
                        {/* Prompt 1 Response */}
                        <Text
                          style={[
                            styles.Textcac216f4,
                            { color: theme.colors.grayChatLettering },
                          ]}
                        >
                          {fetchData?.result_1?.group_prompt1_response}
                        </Text>
                      </View>
                      {/* Second Group Pic */}
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
                          resizeMode={"cover"}
                          source={{
                            uri: `${fetchData?.result_1?.group_photo2?.url}`,
                          }}
                        />
                      </View>

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
                          {fetchData?.result_1?.group_prompt2_title}
                        </Text>
                        {/* Prompt 1 Response */}
                        <Text
                          style={[
                            styles.Textcac216f4,
                            { color: theme.colors.grayChatLettering },
                          ]}
                        >
                          {fetchData?.result_1?.group_prompt2_response}
                        </Text>
                      </View>
                      {/* Third Group Pic */}
                      <>
                        {!fetchData?.result_1?.group_photo3?.url ? null : (
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
                              resizeMode={"cover"}
                              source={{
                                uri: `${fetchData?.result_1?.group_photo3?.url}`,
                              }}
                            />
                          </View>
                        )}
                      </>
                      {/* Fourth Group Pic */}
                      <>
                        {!fetchData?.result_1?.group_photo4?.url ? null : (
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
                              resizeMode={"cover"}
                              source={{
                                uri: `${fetchData?.result_1?.group_photo4?.url}`,
                              }}
                            />
                          </View>
                        )}
                      </>
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
                          {fetchData?.result_1?.group_prompt3_title}
                        </Text>
                        {/* Prompt 1 Response */}
                        <Text
                          style={[
                            styles.Textcac216f4,
                            { color: theme.colors.grayChatLettering },
                          ]}
                        >
                          {fetchData?.result_1?.group_prompt3_response}
                        </Text>
                      </View>
                      {/* Fifth Group Pic */}
                      <>
                        {!fetchData?.result_1?.group_photo5?.url ? null : (
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
                              resizeMode={"cover"}
                              source={{
                                uri: `${fetchData?.result_1?.group_photo5?.url}`,
                              }}
                            />
                          </View>
                        )}
                      </>
                      {/* Sixth Group Pic */}
                      <>
                        {!fetchData?.result_1?.group_photo6?.url ? null : (
                          <View
                            style={[
                              styles.View493ad03d,
                              {
                                borderRadius: 20,
                                borderColor: theme.colors.lightGray,
                              },
                            ]}
                          >
                            <Image
                              style={styles.Image405d7a68}
                              resizeMode={"cover"}
                              source={{
                                uri: `${fetchData?.result_1?.group_photo6?.url}`,
                              }}
                            />
                          </View>
                        )}
                      </>
                      <View style={{ marginTop: 20 }}>
                        <UserReportButton
                          title={`Report ${
                            fetchData?.result_1
                              ? fetchData?.result_1["_user"]?.name
                              : ""
                          } & ${
                            fetchData?.result_1
                              ? fetchData?.result_1["_user2"]?.name
                              : ""
                          }`}
                          onPress={async () => {
                            await handleOnPressReport({
                              double_dating_teams2_id: fetchData?.result_1?.id,
                              double_dating_teams_id: selected_team?.id,
                            });
                            await refetchGetDDTeams();
                          }}
                        />
                      </View>
                    </ScrollView>
                  </>
                )}

                <>
                  {!(Constants["dd_visible"] === true) ? null : (
                    <Modal
                      animationType={"slide"}
                      presentationStyle={"pageSheet"}
                    >
                      <LinearGradient
                        style={styles.LinearGradienta98db7de}
                        endY={100}
                        color1={theme.colors["Color 1 Stop"]}
                        color2={theme.colors["Color 2 Stop"]}
                        endX={0}
                      >
                        <View style={styles.Viewa821d84b}>
                          <IconButton
                            onPress={() => {
                              const handler = async () => {
                                try {
                                  setGlobalVariableValue({
                                    key: "dd_visible",
                                    value: false,
                                  });
                                  await refetchGetDDTeams();
                                } catch (err) {
                                  console.error(err);
                                }
                              };
                              handler();
                            }}
                            size={32}
                            icon={"Feather/x"}
                            color={theme.colors["Light Gray"]}
                          />
                        </View>

                        <View style={styles.Viewf8304bf6}>
                          <Text
                            style={[
                              styles.Text78480581,
                              { color: theme.colors["White"] },
                            ]}
                          >
                            {"It's a Match!"}
                          </Text>
                        </View>

                        <View>
                          <View style={styles.View7680ad3e}>
                            <View style={styles.View8bd683a8}>
                              <Surface
                                style={[
                                  styles.Surface3897baf2,
                                  {
                                    backgroundColor: theme.colors.lightGray,
                                    borderRadius: 64,
                                  },
                                ]}
                              >
                                <CircleImage
                                  size={120}
                                  source={{
                                    uri: `${
                                      fetchData?.result_1 &&
                                      fetchData?.result_1["_user"]
                                        ?.featured_photo?.url
                                    }`,
                                  }}
                                />
                              </Surface>

                              <Text
                                style={[
                                  styles.Text7154ef67,
                                  { color: theme.colors["White"] },
                                ]}
                              >
                                {fetchData?.result_1 &&
                                  fetchData?.result_1["_user"]?.name}
                              </Text>
                            </View>

                            <View style={styles.Viewda2fc39f}>
                              <Surface
                                style={[
                                  styles.Surface19047dbf,
                                  {
                                    backgroundColor: theme.colors.lightGray,
                                    borderRadius: 64,
                                  },
                                ]}
                              >
                                <CircleImage
                                  size={120}
                                  source={{
                                    uri: `${
                                      fetchData?.result_1 &&
                                      fetchData?.result_1["_user2"]
                                        ?.featured_photo?.url
                                    }`,
                                  }}
                                />
                              </Surface>

                              <Text
                                style={[
                                  styles.Textd2c9f9b9,
                                  { color: theme.colors["White"] },
                                ]}
                              >
                                {fetchData?.result_1 &&
                                  fetchData?.result_1["_user2"]?.name}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.View9494aafa}>
                            <Text
                              style={[
                                styles.Textbfbbeb6a,
                                { color: theme.colors["White"] },
                              ]}
                            >
                              {"&"}
                            </Text>
                          </View>

                          <View style={styles.View2cb52a0a}>
                            <View style={styles.View8bd683a8}>
                              <Surface
                                style={[
                                  styles.Surface19047dbf,
                                  {
                                    backgroundColor: theme.colors.lightGray,
                                    borderRadius: 64,
                                  },
                                ]}
                              >
                                <CircleImage
                                  size={120}
                                  source={{
                                    uri: `${
                                      fetchData?.Double_Dating_Teams_1 &&
                                      fetchData?.Double_Dating_Teams_1["_user"]
                                        ?.featured_photo?.url
                                    }`,
                                  }}
                                />
                              </Surface>

                              <Text
                                style={[
                                  styles.Text7154ef67,
                                  { color: theme.colors["White"] },
                                ]}
                              >
                                {fetchData?.Double_Dating_Teams_1 &&
                                  fetchData?.Double_Dating_Teams_1["_user"]
                                    ?.name}
                              </Text>
                            </View>

                            <View style={styles.Viewda2fc39f}>
                              <Surface
                                style={[
                                  styles.Surface19047dbf,
                                  {
                                    backgroundColor: theme.colors.lightGray,
                                    borderRadius: 64,
                                  },
                                ]}
                              >
                                <CircleImage
                                  size={120}
                                  source={{
                                    uri: `${
                                      fetchData?.Double_Dating_Teams_1 &&
                                      fetchData?.Double_Dating_Teams_1["_user2"]
                                        ?.featured_photo?.url
                                    }`,
                                  }}
                                />
                              </Surface>

                              <Text
                                style={[
                                  styles.Textd2c9f9b9,
                                  { color: theme.colors["White"] },
                                ]}
                              >
                                {fetchData?.Double_Dating_Teams_1 &&
                                  fetchData?.Double_Dating_Teams_1["_user2"]
                                    ?.name}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.View365e3a25}>
                            <View
                              style={[
                                styles.Viewb4983a54,
                                {
                                  backgroundColor: theme.colors["White"],
                                  borderRadius: 28,
                                },
                              ]}
                            >
                              <Touchable
                                onPress={() => {
                                  try {
                                    navigation.navigate("DDBottomNavigator", {
                                      screen: "DDMatchesTabScreen",
                                    });
                                    setGlobalVariableValue({
                                      key: "dd_visible",
                                      value: false,
                                    });
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                <Text
                                  style={[
                                    styles.Texta94b2e46,
                                    {
                                      color:
                                        theme.colors["Gray Chat Lettering"],
                                    },
                                  ]}
                                >
                                  {"Start Messaging"}
                                </Text>
                              </Touchable>
                            </View>
                          </View>

                          <View style={styles.Viewc9199af4}>
                            <View>
                              <ButtonOutline
                                onPress={() => {
                                  const handler = async () => {
                                    try {
                                      setGlobalVariableValue({
                                        key: "dd_visible",
                                        value: false,
                                      });
                                      await refetchGetDDTeams();
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  };
                                  handler();
                                }}
                                style={[
                                  styles.ButtonOutline07620db8,
                                  {
                                    color: theme.colors["White"],
                                    borderColor: theme.colors["White"],
                                  },
                                ]}
                                title={"Keep Swiping"}
                              />
                            </View>
                          </View>
                        </View>
                      </LinearGradient>
                    </Modal>
                  )}
                </>
                <>
                  {!fetchData?.max_likes ? null : (
                    <View style={styles.Viewaabce009}>
                      <View style={styles.View39912261}>
                        <Image
                          style={styles.Imagea7f9e204}
                          resizeMode={"contain"}
                          source={Images.Jigsaw1}
                        />
                      </View>

                      <Text
                        style={[
                          styles.Text6353b2d8,
                          { color: theme.colors.strong },
                        ]}
                      >
                        {"You’ve reached the daily like limit."}
                      </Text>

                      <Text
                        style={[
                          styles.Texta003495d,
                          { color: theme.colors.strong },
                        ]}
                      >
                        {"Upgrade now to enjoy unlimited likes and more!"}
                      </Text>

                      <View style={styles.View059cfbad}>
                        <Surface
                          style={[styles.Surface9b87f518, { borderRadius: 28 }]}
                        >
                          <Touchable
                            onPress={() => {
                              try {
                                navigation.navigate(
                                  "SubscriptionOptionsScreen"
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
                                  { color: theme.colors.communialWhite },
                                ]}
                              >
                                {"Upgrade Now!"}
                              </Text>
                            </LinearGradient>
                          </Touchable>
                        </Surface>
                      </View>
                    </View>
                  )}
                </>
                <>
                  {!(fetchData?.var_1 === true) ? null : (
                    <View style={styles.Viewaabce009}>
                      <View style={styles.View39912261}>
                        <Image
                          style={styles.Imagea7f9e204}
                          resizeMode={"contain"}
                          source={Images.Jigsaw1}
                        />
                      </View>

                      <Text
                        style={[
                          styles.Text6353b2d8,
                          { color: theme.colors.strong },
                        ]}
                      >
                        {"You've run out of users in your area."}
                      </Text>

                      <Text
                        style={[
                          styles.Texta003495d,
                          { color: theme.colors.strong },
                        ]}
                      >
                        {
                          "Expand your search preferences to see more potential matches!"
                        }
                      </Text>

                      <View style={styles.View059cfbad}>
                        <Surface
                          style={[styles.Surface9b87f518, { borderRadius: 28 }]}
                        >
                          <Touchable
                            onPress={() => {
                              try {
                                navigation.navigate("SettingsScreen");
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
                                  { color: theme.colors.communialWhite },
                                ]}
                              >
                                {"Edit Search Preferences"}
                              </Text>
                            </LinearGradient>
                          </Touchable>
                        </Surface>
                      </View>
                    </View>
                  )}
                </>
              </>
            );
          }}
        </XanoAPIApi.FetchGetDDTeamsGET>
      </SlideAnimatedView>

      {selectedIconType != "" ? (
        <View style={styles.Viewf679b6fe}>
          <LikeDislikeSatrButton selectedIconType={selectedIconType} />
        </View>
      ) : null}

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
  ButtonOutline07620db8: {
    backgroundColor: "transparent",
    borderRadius: 28,
    borderWidth: 1,
    fontFamily: "Poppins_400Regular",
    marginTop: 4,
    minHeight: 51,
    textAlign: "center",
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  Icon4b79332f: {
    marginBottom: 1,
  },
  Image405d7a68: {
    minHeight: 375,
    width: "100%",
  },
  Imagea7f9e204: {
    height: 158,
    width: 158,
  },
  Imageb06ca8a3: {
    height: 42,
    width: 50,
  },
  Imagebd6d430c: {
    height: 255,
    width: 175,
  },
  LinearGradient4704f023: {
    height: 51,
    justifyContent: "center",
    width: "100%",
  },
  LinearGradienta98db7de: {
    height: "100%",
    width: "100%",
  },
  LinearGradientcf6b392c: {
    alignItems: "center",
    height: 90,
    justifyContent: "center",
    width: 90,
  },
  ScrollView072c4648Content: {
    paddingBottom: 80,
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
  Surface3897baf2: {
    height: 120,
    minHeight: 40,
    width: 120,
  },
  Surface9b87f518: {
    minHeight: 40,
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
  Text219cc37d: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
  },
  Text22d08ac3: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginLeft: 20,
    marginRight: 20,
  },
  Text6353b2d8: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    textAlign: "center",
  },
  Text683477f9: {
    fontFamily: "Poppins_300Light",
  },
  Text7154ef67: {
    alignSelf: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    marginTop: 3,
  },
  Text78480581: {
    fontFamily: "Pacifico_400Regular",
    fontSize: 38,
    textAlign: "center",
  },
  Text7b906734: {
    fontFamily: "Poppins_500Medium",
    fontSize: 22,
  },
  Text8b5e265a: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  Texta003495d: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 8,
    textAlign: "center",
  },
  Texta94b2e46: {
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
  Textbfbbeb6a: {
    fontFamily: "Poppins_500Medium",
    fontSize: 28,
    lineHeight: 30,
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
  Textdd7c1ff9: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
  },
  Texte36fedd3: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.89,
  },
  Textfeb3affe: {
    fontFamily: "Poppins_500Medium",
    fontSize: 22,
  },
  View059cfbad: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
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
  View144e0db8: {
    justifyContent: "space-between",
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
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
  View277c1da5: {
    flexDirection: "row",
    marginBottom: 16,
  },
  View2952d12e: {
    justifyContent: "flex-end",
    marginTop: 10,
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
  View365e3a25: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  View39912261: {
    alignItems: "center",
  },
  View493ad03d: {
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
  View7680ad3e: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 24,
  },
  View8bd683a8: {
    marginRight: 6,
  },
  View9494aafa: {
    alignItems: "center",
    justifyContent: "center",
  },
  Viewa821d84b: {
    alignItems: "flex-end",
    marginRight: 20,
    marginTop: 30,
  },
  Viewaabce009: {
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  Viewb4983a54: {
    height: 51,
    justifyContent: "center",
  },
  Viewc0ba6ba7: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 3,
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
  },
  Viewe0ef0a95: {
    justifyContent: "space-between",
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
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

export default withTheme(DDHomeScreen);
