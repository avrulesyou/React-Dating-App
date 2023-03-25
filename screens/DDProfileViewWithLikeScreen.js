import React from "react";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import {
  ButtonOutline,
  Circle,
  CircleImage,
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
import UserContext from "../context/UserContext.js";
import {
  SlideAnimatedView,
  SlideIconAnimatedView,
  AnimatedButton,
  IconView,
  LikeDislikeSatrButton,
} from "../components";
import * as Utils from "../utils";
import CustomIcon from "../components/CustomIcon.js";

const DDProfileViewWithLikeScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;
  const {
    route: {
      params: { team_id },
    },
  } = props;
  const [{ selected_team }] = React.useContext(UserContext);

  const xanoAPIDislikeDDTeamPOST = XanoAPIApi.useDislikeDDTeamPOST();
  const xanoAPILikeDDTeamPOST = XanoAPIApi.useLikeDDTeamPOST();

  const [selectedIconType, setSelectedIconType] = React.useState("");
  const [isAnimateSlideIcon, setIsAnimateSlideIcon] = React.useState(false);

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

        <XanoAPIApi.FetchGetSingleDDTeamsRecordGET
          double_dating_teams_id={team_id ?? ""}
        >
          {({ loading, error, data, refetchGetSingleDDTeamsRecord }) => {
            const listData = data;
            if (!listData || loading) {
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
                <View style={styles.Viewf679b6fe}>
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
                        setSelectedIconType(Utils.ICON_TYPE.DISLIKE);
                        const handler = async () => {
                          try {
                            await xanoAPIDislikeDDTeamPOST.mutateAsync({});
                            navigation.navigate("DDStack", {
                              screen: "DDBottomNavigator",
                              params: { screen: "DDHomeScreen" },
                            });
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
                      style={[styles.Surfacec97fd320, { borderRadius: 64 }]}
                      elevation={3}
                      onPress={() => {
                        setSelectedIconType(Utils.ICON_TYPE.LIKE);
                        const handler = async () => {
                          try {
                            const result =
                              await xanoAPILikeDDTeamPOST.mutateAsync({});
                            const match_result = result.result_1;
                            setGlobalVariableValue({
                              key: "dd_visible",
                              value: match_result,
                            });
                            if (match_result === true) {
                              return;
                            }
                            navigation.navigate("DDStack", {
                              screen: "DDBottomNavigator",
                              params: { screen: "DDHomeScreen" },
                            });
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
                </View>

                <ScrollView
                  contentContainerStyle={styles.ScrollViewec1175daContent}
                  showsVerticalScrollIndicator={true}
                  bounces={true}
                >
                  <>
                    <View style={styles.View277c1da5}>
                      <View>
                        <Image
                          style={[styles.Imagea753d75b, { borderRadius: 4 }]}
                          source={{
                            uri: `${
                              listData && listData["_user"]?.featured_photo?.url
                            }`,
                          }}
                          resizeMode={"cover"}
                        />
                      </View>

                      <View style={styles.View144e0db8}>
                        <View style={styles.View91edb4b3}>
                          <Text
                            style={[
                              styles.Text9f338706,
                              { color: theme.colors.strong },
                            ]}
                          >
                            {listData && listData["_user"]?.name}
                            {", "}
                            {listData && listData["_user"]?.age}
                          </Text>
                        </View>

                        <View>
                          <Text
                            style={[
                              styles.Text08c3b288,
                              { color: theme.colors.grayChatLettering },
                            ]}
                          >
                            {"About Me"}
                          </Text>

                          <View style={styles.Viewb3267adf}>
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
                              {listData && listData["_user"]?.user_city}
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
                            {!(
                              listData && listData["_user"]?.job_title
                            ) ? null : (
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
                                    {
                                      color: theme.colors.grayChatLettering,
                                    },
                                  ]}
                                  numberOfLines={1}
                                  ellipsizeMode={"tail"}
                                >
                                  {listData && listData["_user"]?.job_title}
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
                                  user_id: listData && listData["_user"]?.id,
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <Text
                              style={[
                                styles.Text894d0937,
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
                      <View>
                        <Image
                          style={[styles.Imagea753d75b, { borderRadius: 4 }]}
                          source={{
                            uri: `${
                              listData &&
                              listData["_user_2"]?.featured_photo?.url
                            }`,
                          }}
                          resizeMode={"cover"}
                        />
                      </View>

                      <View style={styles.View144e0db8}>
                        <View style={styles.View91edb4b3}>
                          <Text
                            style={[
                              styles.Textfb9b9b88,
                              { color: theme.colors.grayChatLettering },
                            ]}
                          >
                            {listData && listData["_user_2"]?.name}
                            {", "}
                            {listData?.user2_age}
                          </Text>
                        </View>

                        <View>
                          <Text
                            style={[
                              styles.Text5ac1841a,
                              { color: theme.colors.grayChatLettering },
                            ]}
                          >
                            {"About Me"}
                          </Text>

                          <View style={styles.Viewb3267adf}>
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
                              {listData && listData["_user_2"]?.user_city}
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
                              {Math.ceil(listData?.distance_2)}
                              {" mi away"}
                            </Text>
                          </View>
                          <>
                            {!(
                              listData && listData["_user_2"]?.job_title
                            ) ? null : (
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
                                    {
                                      color: theme.colors.grayChatLettering,
                                    },
                                  ]}
                                >
                                  {listData && listData["_user_2"]?.job_title}
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
                                  user_id: listData && listData["_user_2"]?.id,
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <Text
                              style={[
                                styles.Text894d0937,
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
                        source={{ uri: `${listData?.group_photo1?.url}` }}
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
                        {listData?.group_prompt1_title}
                      </Text>
                      {/* Prompt 1 Response */}
                      <Text
                        style={[
                          styles.Textcac216f4,
                          { color: theme.colors.grayChatLettering },
                        ]}
                      >
                        {listData?.group_prompt1_response}
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
                        source={{ uri: `${listData?.group_photo2?.url}` }}
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
                        {listData?.group_prompt2_title}
                      </Text>
                      {/* Prompt 1 Response */}
                      <Text
                        style={[
                          styles.Textcac216f4,
                          { color: theme.colors.grayChatLettering },
                        ]}
                      >
                        {listData?.group_prompt2_response}
                      </Text>
                    </View>
                    {/* Third Group Pic */}
                    <>
                      {!listData?.group_photo3?.url ? null : (
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
                              uri: `${listData?.group_photo3?.url}`,
                            }}
                          />
                        </View>
                      )}
                    </>
                    {/* Fourth Group Pic */}
                    <>
                      {!listData?.group_photo4?.url ? null : (
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
                              uri: `${listData?.group_photo4?.url}`,
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
                        {listData?.group_prompt3_title}
                      </Text>
                      {/* Prompt 1 Response */}
                      <Text
                        style={[
                          styles.Textcac216f4,
                          { color: theme.colors.grayChatLettering },
                        ]}
                      >
                        {listData?.group_prompt3_response}
                      </Text>
                    </View>
                    {/* Fifth Group Pic */}
                    <>
                      {!listData?.group_photo5?.url ? null : (
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
                              uri: `${listData?.group_photo5?.url}`,
                            }}
                          />
                        </View>
                      )}
                    </>
                    {/* Sixth Group Pic */}
                    <>
                      {!listData?.group_photo6?.url ? null : (
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
                            resizeMode={"cover"}
                            source={{
                              uri: `${listData?.group_photo6?.url}`,
                            }}
                          />
                        </View>
                      )}
                    </>
                  </>
                </ScrollView>
                <>
                  {!(Constants["dd_visible"] === true) ? null : (
                    <Modal
                      animationType={"none"}
                      presentationStyle={"pageSheet"}
                    >
                      <View style={styles.Viewc65acab6}>
                        <Touchable
                          onPress={() => {
                            try {
                              setGlobalVariableValue({
                                key: "dd_visible",
                                value: false,
                              });
                              navigation.navigate("DDStack", {
                                screen: "DDBottomNavigator",
                                params: { screen: "DDHomeScreen" },
                              });
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          <Icon size={24} name={"Feather/x"} />
                        </Touchable>
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
                                    listData &&
                                    listData["_user"]?.featured_photo?.url
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
                              {listData && listData["_user"]?.name}
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
                                    listData &&
                                    listData["_user_2"]?.featured_photo?.url
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
                              {listData && listData["_user_2"]?.name}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.View9494aafa}>
                          <Text
                            style={[
                              styles.Text363772db,
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
                                    selected_team &&
                                    selected_team["_user"]?.featured_photo?.url
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
                              {selected_team && selected_team["_user"]?.name}
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
                                    selected_team &&
                                    selected_team["_user2"]?.featured_photo?.url
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
                              {selected_team && selected_team["_user2"]?.name}
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
                                  navigation.navigate("BottomTabNavigator", {
                                    screen: "MatchesTabScreen",
                                  });
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
                                    key: "dd_visible",
                                    value: false,
                                  });
                                  navigation.navigate("DDStack", {
                                    screen: "DDBottomNavigator",
                                    params: { screen: "DDHomeScreen" },
                                  });
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              style={[
                                styles.ButtonOutline0b133b65,
                                {
                                  color: theme.colors.chatMessages,
                                  borderColor: theme.colors.chatMessages,
                                },
                              ]}
                              title={"Keep Swiping"}
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
        </XanoAPIApi.FetchGetSingleDDTeamsRecordGET>
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
  ButtonOutline0b133b65: {
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
  FlatListc992f941Content: {
    flex: 1,
  },
  Image405d7a68: {
    minHeight: 375,
    width: "100%",
  },
  Imagea753d75b: {
    height: 232,
    width: 175,
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
  ScrollViewec1175daContent: {
    paddingBottom: 150,
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
  Surface3897baf2: {
    height: 120,
    minHeight: 40,
    width: 120,
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
  Text08c3b288: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
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
  Text5ac1841a: {
    fontFamily: "Poppins_500Medium",
  },
  Text7154ef67: {
    alignSelf: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    marginTop: 3,
  },
  Text894d0937: {
    fontFamily: "Poppins_300Light",
  },
  Text8b5e265a: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  Text9f338706: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
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
  Texte36fedd3: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.89,
  },
  Textfb9b9b88: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
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
  View144e0db8: {
    justifyContent: "space-between",
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
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
  View39912261: {
    alignItems: "center",
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
  View91edb4b3: {
    marginTop: 8,
  },
  View9494aafa: {
    alignItems: "center",
    justifyContent: "center",
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

export default withTheme(DDProfileViewWithLikeScreen);
