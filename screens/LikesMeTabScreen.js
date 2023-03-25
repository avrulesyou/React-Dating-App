import React from "react";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import Images from "../config/Images";
import {
  Circle,
  Icon,
  LinearGradient,
  ScreenContainer,
  Surface,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { useIsFocused } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Fetch } from "react-request";
import UserContext from "../context/UserContext.js";

const LikesMeTabScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  const [user] = React.useContext(UserContext);

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.background }}
      hasBottomSafeArea={false}
      scrollable={false}
      hasSafeArea={false}
      hasTopSafeArea={true}
    >
      <View
        style={[
          styles.View1d8587d2,
          {
            borderColor: theme.colors.divider,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <View>
          <Image
            style={styles.Imageb06ca8a3}
            source={Images.Final03}
            resizeMode={"contain"}
          />
        </View>

        <View style={styles.View39912261}>
          <Text style={[styles.Text430d592a, { color: theme.colors.strong }]}>
            {"Likes"}
          </Text>
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

      <XanoAPIApi.FetchGetLikesGET method={"GET"}>
        {({ loading, error, data, refetchGetLikes }) => {
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
              {!(fetchData && fetchData[0]) ? null : (
                <View style={styles.ScrollView2b38a12cContent}>
                  <View>
                    <>
                      {!(
                        user?.subscription_product_id !==
                        "kupple_platinum_monthly"
                      ) ? null : (
                        <View style={styles.Viewc0ba4da7}>
                          <Text
                            style={[
                              styles.Text1b303628,
                              { color: theme.colors.grayChatLettering },
                            ]}
                          >
                            {
                              "Upgrade to Platinum to see who already likes you."
                            }
                          </Text>
                        </View>
                      )}
                    </>
                    <>
                      {!(
                        user?.subscription_product_id ===
                        "kupple_platinum_monthly"
                      ) ? null : (
                        <View style={styles.Viewc0ba4da7}>
                          <Text
                            style={[
                              styles.Text1e1f916a,
                              { color: theme.colors.grayChatLettering },
                            ]}
                          >
                            {
                              "Click on the profiles below to see who likes you!"
                            }
                          </Text>
                        </View>
                      )}
                    </>
                    {/* Grid */}

                    <FlatList
                      data={fetchData}
                      listKey={"eImlIrom"}
                      keyExtractor={(gridData) =>
                        gridData?.id ||
                        gridData?.uuid ||
                        JSON.stringify(gridData)
                      }
                      showsVerticalScrollIndicator
                      bounces
                      renderItem={({ item }) => {
                        const gridData = item;
                        return (
                          <View style={styles.View523a7924}>
                            <Touchable
                              onPress={() => {
                                try {
                                  if (
                                    user?.subscription_product_id !==
                                    "kupple_platinum_monthly"
                                  ) {
                                    navigation.navigate(
                                      "SubscriptionOptionsScreen"
                                    );
                                    return;
                                  }
                                  navigation.navigate(
                                    "ProfileViewWithLikeScreen",
                                    { user_id: gridData && gridData[0]?.id }
                                  );
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Surface
                                style={[
                                  styles.Surface08cb0ab8,
                                  { borderRadius: 12 },
                                ]}
                              >
                                <View
                                  style={[
                                    styles.View7a184f84,
                                    {
                                      borderRadius: 12,
                                      borderColor: theme.colors.divider,
                                      backgroundColor: theme.colors.background,
                                    },
                                  ]}
                                >
                                  <View style={styles.Viewd42e9bbc}>
                                    <ImageBackground
                                      style={styles.ImageBackgrounda98db7de}
                                      source={{
                                        uri: `${
                                          gridData &&
                                          gridData[0]?.featured_photo?.url
                                        }`,
                                      }}
                                      resizeMode={"cover"}
                                    />
                                  </View>

                                  <View style={styles.Viewa76b7c63}>
                                    <Text
                                      style={[
                                        styles.Text1bfea2cb,
                                        {
                                          color: theme.colors.grayChatLettering,
                                        },
                                      ]}
                                    >
                                      {gridData && gridData[0]?.name}
                                    </Text>
                                  </View>
                                  <>
                                    {!(
                                      user?.subscription_product_id !==
                                      "kupple_platinum_monthly"
                                    ) ? null : (
                                      <BlurView
                                        style={styles.BlurView05ba306a}
                                        tint={"default"}
                                        intensity={75}
                                      >
                                        <View style={styles.View0f73ae71} />
                                      </BlurView>
                                    )}
                                  </>
                                </View>
                              </Surface>
                            </Touchable>
                          </View>
                        );
                      }}
                      contentContainerStyle={styles.FlatList7591d95eContent}
                      numColumns={2}
                    />
                  </View>
                </View>
              )}

              <>
                {fetchData && fetchData[0] ? null : (
                  <View
                    style={[
                      styles.View91652d5a,
                      { backgroundColor: theme.colors.communialWhite },
                    ]}
                  >
                    <View style={styles.Viewc689abd8}>
                      <Image
                        style={styles.Image8c142508}
                        source={Images.Like1}
                        resizeMode={"contain"}
                      />
                    </View>

                    <View style={styles.Viewbd0a9d03}>
                      <Text
                        style={[
                          styles.Texte6e33b3d,
                          { color: theme.colors.grayChatLettering },
                        ]}
                      >
                        {"You're new here. No likes yet!"}
                      </Text>

                      <Text
                        style={[
                          styles.Text7d6303eb,
                          { color: theme.colors.grayChatLettering },
                        ]}
                      >
                        {
                          "Don't worry, the likes will appear soon. Just keep swiping!"
                        }
                      </Text>
                    </View>
                    <>
                      {!(
                        user?.subscription_product_id !==
                        "kupple_platinum_monthly"
                      ) ? null : (
                        <View style={styles.View059cfbad}>
                          <Surface
                            style={[
                              styles.Surface9b87f518,
                              { borderRadius: 28 },
                            ]}
                            elevation={3}
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
                                  {"Upgrade Now"}
                                </Text>
                              </LinearGradient>
                            </Touchable>
                          </Surface>
                        </View>
                      )}
                    </>
                  </View>
                )}
              </>
              <>
                {!(
                  user?.subscription_product_id !== "kupple_platinum_monthly"
                ) ? null : (
                  <View style={styles.View779f4589}>
                    <Surface
                      style={[styles.Surface9b87f518, { borderRadius: 28 }]}
                      elevation={3}
                    >
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
                            {"Upgrade Now"}
                          </Text>
                        </LinearGradient>
                      </Touchable>
                    </Surface>
                  </View>
                )}
              </>
            </>
          );
        }}
      </XanoAPIApi.FetchGetLikesGET>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  BlurView05ba306a: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  FlatList7591d95eContent: {
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
  },
  Icon4b79332f: {
    marginBottom: 1,
  },
  Image8c142508: {
    height: 154,
    width: 154,
  },
  ImageBackgrounda98db7de: {
    height: "100%",
    width: "100%",
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
  ScrollView2b38a12cContent: {
    marginTop: 70,
    paddingBottom: 80,
  },
  Surface08cb0ab8: {
    minHeight: 40,
    overflow: "hidden",
  },
  Surface9b87f518: {
    minHeight: 40,
  },
  Text1b303628: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    textAlign: "center",
  },
  Text1bfea2cb: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
  },
  Text1e1f916a: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    textAlign: "center",
  },
  Text430d592a: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    textAlign: "center",
  },
  Text7d6303eb: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  Text8b5e265a: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  Texte6e33b3d: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
  },
  View059cfbad: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  View0f73ae71: {
    bottom: 90,
    left: 20,
    position: "absolute",
    right: 20,
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
  View39912261: {
    alignItems: "center",
  },
  View523a7924: {
    flex: 1,
    marginTop: 12,
    maxWidth: "50%",
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
  },
  View779f4589: {
    alignSelf: "center",
    bottom: 20,
    marginBottom: 20,
    position: "absolute",
    width: "80%",
    zIndex: 2,
  },
  View7a184f84: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    overflow: "hidden",
  },
  View91652d5a: {
    height: "100%",
    justifyContent: "center",
    width: "100%",
    zIndex: 4,
  },
  View9494aafa: {
    alignItems: "center",
    justifyContent: "center",
  },
  Viewa76b7c63: {
    alignItems: "center",
    marginBottom: 4,
    marginTop: 4,
  },
  Viewbd0a9d03: {
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  Viewc0ba4da7: {
    alignSelf: "center",
    marginLeft: 20,
    marginRight: 20,
    width: "60%",
  },
  Viewc689abd8: {
    alignItems: "center",
    marginBottom: 16,
  },
  Viewd42e9bbc: {
    height: 180,
  },
});

export default withTheme(LikesMeTabScreen);
