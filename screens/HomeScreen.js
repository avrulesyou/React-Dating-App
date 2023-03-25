import React from "react";
import * as GeocodioApi from "../apis/GeocodioApi.js";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import * as Utils from "../utils";
import Images from "../config/Images";
import {
  ButtonOutline,
  Circle,
  CircleImage,
  Divider,
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
import {
  SlideAnimatedView,
  SlideIconAnimatedView,
  AnimatedButton,
  IconView,
  LikeDislikeSatrButton,
  PopUp,
} from "../components";
import UserContext from "../context/UserContext.js";
import UserReportButton from "../components/UserReportButton.js";
import CustomIcon from "../components/CustomIcon.js";
import AlertModal from "../components/AlertModal.js";

const HomeScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const xanoAPIPostUserLocationPOST = XanoAPIApi.usePostUserLocationPOST();
  const xanoAPIUserTeamLocationPOST = XanoAPIApi.useUserTeamLocationPOST();
  const xanoAPIPostUserCityPOST = XanoAPIApi.usePostUserCityPOST();
  const xanoAPIDislikeUserPOST = XanoAPIApi.useDislikeUserPOST();
  const xanoAPILikeAUserPOST = XanoAPIApi.useLikeAUserPOST();
  const xanoAPIReportUserPOST = XanoAPIApi.useReportUserPOST();

  const { client } = useChatContext();
  const [user, setUser] = React.useContext(UserContext);
  const homeScrollViewRef = React.useRef();

  const [selectedIconType, setSelectedIconType] = React.useState("");
  const [isAnimateSlideIcon, setIsAnimateSlideIcon] = React.useState(false);
  const [hideMenuButton, setHideMenuButton] = React.useState(false);

  const createChannelBetweenUsers = async ({
    currentUserId,
    matchedUserId,
  }) => {
    try {
      // Creating Channel
      const channel = client.channel("messaging", {
        members: [String(currentUserId), String(matchedUserId)],
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

  const handleOnPressReport = async ({ user2_id }) => {
    await xanoAPIReportUserPOST.mutateAsync({
      user2_id: user2_id,
    });
  };

  const setScrollViewAtStart = () => {
    homeScrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={false}
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
            styles.View335425b6,
            {
              borderColor: theme.colors.divider,
              backgroundColor: theme.colors.background,
            },
          ]}
        >
          <View>
            <Image
              style={styles.Image8d9dc9c5}
              source={Images.Final03}
              resizeMode={"contain"}
            />
          </View>

          <View style={styles.View9494aafa}>
            <Touchable
              onPress={() => {
                try {
                  navigation.navigate("TeamsScreen");
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Circle size={50} bgColor={theme.colors.greyChatMessages}>
                <Icon
                  style={styles.Icon4b79332f}
                  size={25}
                  color={theme.colors.poppinsLightBlack}
                  name={"Ionicons/ios-people-outline"}
                />
              </Circle>
            </Touchable>
          </View>
        </View>

        {user?.is_visited_before && (
          <XanoAPIApi.FetchFeedOneAtATimeGET>
            {({ loading, error, data, refetchFeedOneAtATime }) => {
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
                                      await xanoAPIDislikeUserPOST.mutateAsync({
                                        user2_id: fetchData?.result_1?.id,
                                      });
                                      setSelectedIconType(
                                        Utils.ICON_TYPE.DISLIKE
                                      );
                                      setScrollViewAtStart();
                                      await refetchFeedOneAtATime();
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
                                        await xanoAPILikeAUserPOST.mutateAsync({
                                          user2_id: fetchData?.result_1?.id,
                                        });
                                      const match_result = result.matches_2;

                                      setScrollViewAtStart();
                                      setGlobalVariableValue({
                                        key: "visible",
                                        value: match_result,
                                      });
                                      if (match_result === true) {
                                        await createChannelBetweenUsers({
                                          matchedUserId: String(
                                            fetchData?.result_1?.id
                                          ),
                                          currentUserId: String(
                                            fetchData?.user_1?.id
                                          ),
                                        });
                                        return;
                                      }
                                      setSelectedIconType(Utils.ICON_TYPE.LIKE);
                                      await refetchFeedOneAtATime();
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
                                    style={styles.Icon7a33adf1}
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
                        contentContainerStyle={styles.ScrollView88810750Content}
                        showsVerticalScrollIndicator
                        bounces
                        onScrollEndDrag={handleOnScroll}
                        onScrollBeginDrag={handleOnScroll}
                        onScroll={handleOnScroll}
                        scrollEventThrottle={16}
                      >
                        {/* First Pic */}
                        {fetchData?.result_1?.featured_photo?.url && (
                          <View
                            style={[
                              styles.Viewb08ae359,
                              {
                                borderRadius: 20,
                                borderColor: theme.colors.lightGray,
                              },
                            ]}
                          >
                            <Image
                              style={styles.Image405d7a68}
                              source={{
                                uri: `${fetchData?.result_1?.featured_photo?.url}`,
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
                              {fetchData?.result_1?.name}
                              {", "}
                              {fetchData?.result_1?.age}
                            </Text>
                          </View>
                        </View>
                        {/* Location */}
                        <View style={styles.Viewece0b640}>
                          <View style={styles.View7d6a39b7}>
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
                              {fetchData?.result_1?.user_city}
                            </Text>
                          </View>

                          <View style={styles.Viewc0ba6ba7}>
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
                              {Math.ceil(fetchData?.result_1?.distance)}
                              {" mi away"}
                            </Text>
                          </View>
                          <>
                            {!fetchData?.result_1?.job_title ? null : (
                              <View style={styles.Viewc0ba6ba7}>
                                <CustomIcon
                                  name={"Ionicons/briefcase-outline"}
                                  size={22}
                                  color={theme.colors.grayChatLettering}
                                />
                                {/* job_title */}
                                <Text
                                  style={[
                                    styles.Text9e70dd5f,
                                    { color: theme.colors.grayChatLettering },
                                  ]}
                                >
                                  {fetchData?.result_1?.job_title}
                                </Text>
                              </View>
                            )}
                          </>
                        </View>
                        {/* About Me */}
                        <>
                          {!fetchData?.result_1?.bio ? null : (
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
                                  {fetchData?.result_1?.bio}
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
                        {fetchData?.result_1?.profilePic2?.url && (
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
                              source={{
                                uri: `${fetchData?.result_1?.profilePic2?.url}`,
                              }}
                              resizeMode={"cover"}
                            />
                          </View>
                        )}

                        {fetchData?.result_1?.prompt_1_response && (
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
                              {fetchData?.result_1?.prompt_1}
                            </Text>
                            {/* Prompt 1 Response */}
                            <Text
                              style={[
                                styles.Textcac216f4,
                                { color: theme.colors.grayChatLettering },
                              ]}
                            >
                              {fetchData?.result_1?.prompt_1_response}
                            </Text>
                          </View>
                        )}

                        {/* Third Pic */}
                        {fetchData?.result_1?.profilePic3?.url && (
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
                              source={{
                                uri: `${fetchData?.result_1?.profilePic3?.url}`,
                              }}
                              resizeMode={"cover"}
                            />
                          </View>
                        )}

                        {fetchData?.result_1?.prompt_2_response && (
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
                              {fetchData?.result_1?.prompt_2}
                            </Text>
                            {/* Prompt 2 Response */}
                            <Text
                              style={[
                                styles.Textcac216f4,
                                { color: theme.colors.grayChatLettering },
                              ]}
                            >
                              {fetchData?.result_1?.prompt_2_response}
                            </Text>
                          </View>
                        )}

                        {/* Fourth Pic */}
                        {fetchData?.result_1?.profilePic4?.url && (
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
                              source={{
                                uri: `${fetchData?.result_1?.profilePic4?.url}`,
                              }}
                              resizeMode={"cover"}
                            />
                          </View>
                        )}

                        {/* Fifth Pic */}
                        {fetchData?.result_1?.profilePic5?.url && (
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
                              source={{
                                uri: `${fetchData?.result_1?.profilePic5?.url}`,
                              }}
                              resizeMode={"cover"}
                            />
                          </View>
                        )}

                        {fetchData?.result_1?.prompt_3_response && (
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
                              {fetchData?.result_1?.prompt_3}
                            </Text>
                            {/* Prompt 3 Response */}
                            <Text
                              style={[
                                styles.Textcac216f4,
                                { color: theme.colors.grayChatLettering },
                              ]}
                            >
                              {fetchData?.result_1?.prompt_3_response}
                            </Text>
                          </View>
                        )}

                        {/* Sixth Pic */}
                        {fetchData?.result_1?.profilePic6?.url && (
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
                              source={{
                                uri: `${fetchData?.result_1?.profilePic6?.url}`,
                              }}
                              resizeMode={"cover"}
                            />
                          </View>
                        )}

                        <UserReportButton
                          title={`Report ${fetchData?.result_1?.name}`}
                          onPress={async () => {
                            await handleOnPressReport({
                              user2_id: fetchData?.result_1?.id,
                            });
                            await refetchFeedOneAtATime();
                          }}
                        />
                      </ScrollView>
                    </>
                  )}

                  <>
                    {!(Constants["visible"] === true) ? null : (
                      <Modal
                        animationType={"slide"}
                        presentationStyle={"pageSheet"}
                      >
                        <LinearGradient
                          style={styles.LinearGradienta98db7de}
                          endY={100}
                          endX={0}
                          color1={theme.colors["Color 1 Stop"]}
                          color2={theme.colors["Color 2 Stop"]}
                        >
                          <View style={styles.Viewa821d84b}>
                            <IconButton
                              onPress={() => {
                                const handler = async () => {
                                  try {
                                    setGlobalVariableValue({
                                      key: "visible",
                                      value: false,
                                    });
                                    await refetchFeedOneAtATime();
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

                          <View>
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
                                      uri: `${fetchData?.result_1?.featured_photo?.url}`,
                                    }}
                                  />
                                </Surface>

                                <Text
                                  style={[
                                    styles.Textbf97e223,
                                    { color: theme.colors["White"] },
                                  ]}
                                >
                                  {fetchData?.result_1?.name}
                                </Text>
                              </View>

                              <View style={styles.View9494aafa}>
                                <Text
                                  style={[
                                    styles.Text0eb300ad,
                                    { color: theme.colors["White"] },
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
                                      backgroundColor: theme.colors.lightGray,
                                      borderRadius: 64,
                                    },
                                  ]}
                                >
                                  <CircleImage
                                    size={120}
                                    source={{
                                      uri: `${fetchData?.user_1?.featured_photo?.url}`,
                                    }}
                                  />
                                </Surface>

                                <Text
                                  style={[
                                    styles.Text3df8b241,
                                    { color: theme.colors["White"] },
                                  ]}
                                >
                                  {fetchData?.user_1?.name}
                                </Text>
                              </View>
                            </View>

                            <View style={styles.View2d15e2d1}>
                              <Touchable
                                onPress={() => {
                                  try {
                                    navigation.navigate("BottomTabNavigator", {
                                      screen: "MatchesTabScreen",
                                    });
                                    setGlobalVariableValue({
                                      key: "visible",
                                      value: false,
                                    });
                                    // await refetchFeedOneAtATime();
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                <View
                                  style={[
                                    styles.Viewb54fc875,
                                    {
                                      borderRadius: 28,
                                      backgroundColor: theme.colors["White"],
                                    },
                                  ]}
                                >
                                  <Text
                                    style={[
                                      styles.Text6dee9b0b,
                                      {
                                        color:
                                          theme.colors["Gray Chat Lettering"],
                                      },
                                    ]}
                                  >
                                    {"Start Messaging"}
                                  </Text>
                                </View>
                              </Touchable>
                            </View>

                            <View style={styles.Viewc9199af4}>
                              <View>
                                <ButtonOutline
                                  onPress={() => {
                                    const handler = async () => {
                                      try {
                                        setGlobalVariableValue({
                                          key: "visible",
                                          value: false,
                                        });
                                        await refetchFeedOneAtATime();
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    };
                                    handler();
                                  }}
                                  style={[
                                    styles.ButtonOutlineb1224192,
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
                            style={[
                              styles.Surface9b87f518,
                              { borderRadius: 28 },
                            ]}
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
                            style={[
                              styles.Surface9b87f518,
                              { borderRadius: 28 },
                            ]}
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
          </XanoAPIApi.FetchFeedOneAtATimeGET>
        )}
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
  ButtonOutlineb1224192: {
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
  Icon4b79332f: {
    marginBottom: 1,
  },
  Icon7a33adf1: {
    opacity: 1,
  },
  Image405d7a68: {
    minHeight: 375,
    width: "100%",
  },
  Image8d9dc9c5: {
    height: 42,
    width: 50,
  },
  Imagea7f9e204: {
    height: 158,
    width: 158,
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
  ScrollView88810750Content: {
    paddingBottom: 60,
    top: 60,
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
  Text0eb300ad: {
    fontFamily: "Poppins_500Medium",
    fontSize: 28,
    lineHeight: 30,
  },
  Text22d08ac3: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginLeft: 20,
    marginRight: 20,
  },
  Text3df8b241: {
    alignSelf: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    marginTop: 3,
  },
  Text6353b2d8: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    textAlign: "center",
  },
  Text6dee9b0b: {
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
  Text6ebadddd: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    opacity: 0.89,
  },
  Text78480581: {
    fontFamily: "Pacifico_400Regular",
    fontSize: 38,
    textAlign: "center",
  },
  Text8b5e265a: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  Text9e70dd5f: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.89,
  },
  Texta003495d: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 8,
    textAlign: "center",
  },
  Texta394d165: {
    fontFamily: "Poppins_500Medium",
    fontSize: 17,
  },
  Textbf97e223: {
    alignSelf: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    marginTop: 3,
  },
  Textcac216f4: {
    fontFamily: "Poppins_400Regular",
    fontSize: 22,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 12,
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
  View059cfbad: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
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
  View2d15e2d1: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
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
  View335425b6: {
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
  View7d6a39b7: {
    alignItems: "center",
    flexDirection: "row",
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
  Viewb08ae359: {
    borderBottomWidth: 0.75,
    borderLeftWidth: 0.75,
    borderRightWidth: 0.75,
    borderTopWidth: 0.75,
    marginBottom: 16,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
    overflow: "hidden",
  },
  Viewb54fc875: {
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
  Viewece0b640: {
    justifyContent: "space-between",
    marginLeft: 14,
    marginRight: 14,
    marginTop: 3,
  },
  Viewee33c0b7: {
    justifyContent: "flex-end",
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

export default withTheme(HomeScreen);
