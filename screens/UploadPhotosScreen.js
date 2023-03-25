import React from "react";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import Images from "../config/Images";
import * as Utils from "../utils";
import {
  ButtonOutline,
  LinearGradient,
  ScreenContainer,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { CacheManager } from "expo-cached-image";
import GridView from "react-native-draggable-gridview";
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomActivityIndicator from "../components/ActivityIndicator.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Fetch } from "react-request";
import UserContext from "../context/UserContext.js";

const UploadPhotosScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const xanoAPIUploadFeaturedPhotoPOST =
    XanoAPIApi.useUploadFeaturedPhotoPOST();
  const xanoAPIPostImage2POST = XanoAPIApi.usePostImage2POST();
  const xanoAPIProfilePic3POST = XanoAPIApi.useProfilePic3POST();
  const xanoAPIProfilePic4POST = XanoAPIApi.useProfilePic4POST();
  const xanoAPIProfilePic5POST = XanoAPIApi.useProfilePic5POST();
  const xanoAPIProfilePic6POST = XanoAPIApi.useProfilePic6POST();
  const xanoAPICheckUserPhotoUploadPOST =
    XanoAPIApi.useCheckUserPhotoUploadPOST();
  const xanoAPIUserImageListPOST = XanoAPIApi.useUserImageListPOST();
  const xanoAPICompleteProfilePOST = XanoAPIApi.useCompleteProfilePOST();

  const [isImageUploading, setIsImageUploading] = React.useState(false);
  const [grid, setGrid] = React.useState([
    JSON.stringify({
      id: 1,
      uri: ``,
    }),
    JSON.stringify({
      id: 2,
      uri: ``,
    }),
    JSON.stringify({
      id: 3,
      uri: ``,
    }),
    JSON.stringify({
      id: 4,
      uri: ``,
    }),
    JSON.stringify({
      id: 5,
      uri: ``,
    }),
    JSON.stringify({
      id: 6,
      uri: ``,
    }),
  ]);

  const [user, setUser] = React.useContext(UserContext);

  const getCacheKey = (string) => {
    return string.replace(/^.*\/\/[^\/]+/, "").replaceAll("/", "-");
  };

  const setImageCatched = async ({ uri }) => {
    await CacheManager.downloadAsync({
      uri,
      key: `${getCacheKey(uri)}-thumb`,
    });
  };

  const handleRediect = async () => {
    await xanoAPICompleteProfilePOST.mutateAsync({
      isProfileComplete: true,
    });
    const userResponse = await XanoAPIApi.getSingleItemGET(
      {
        AUTHORIZATION_HEADER: user?.authToken,
      },
      {}
    );
    //setting an User Context at App Level
    //set check for 1st time loading at ProfileTabScreen
    setUser({ ...user, ...userResponse, isFirstTimeLoading: true });

    if (userResponse && userResponse.id) {
      const isUserID = userResponse.id;
      setGlobalVariableValue({
        key: "logInUserID",
        value: isUserID,
      });
      await Utils.purchasesLogin(isUserID);
    }
    if (
      Constants["invited_ddteam_id"] &&
      Constants["invited_ddteam_id"] !== ""
    ) {
      if (userResponse) {
        const isUserID = userResponse.id;
        if (isUserID) {
          if (
            userResponse &&
            userResponse.double_dating_team_ids.length > 0 &&
            userResponse.double_dating_team_ids.includes(
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
  };

  return (
    <>
      <CustomActivityIndicator visible={isImageUploading} />
      <ScreenContainer
        style={styles.screen}
        hasSafeArea={true}
        scrollable={false}
      >
        <>
          {!Constants["visible"] ? null : (
            <Modal animationType={"slide"} presentationStyle={"pageSheet"}>
              <Text
                style={[styles.Text42e4c07e, { color: theme.colors.strong }]}
              >
                {"Oops!"}
              </Text>

              <Text
                style={[styles.Text4e712a2a, { color: theme.colors.strong }]}
              >
                {"You must upload atleast four photos to continue."}
              </Text>
              <ButtonOutline
                onPress={() => {
                  try {
                    setGlobalVariableValue({
                      key: "visible",
                      value: false,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={[
                  styles.ButtonOutlinef4d3389c,
                  {
                    color: theme.colors["Static Purple"],
                    borderColor: theme.colors["Static Purple"],
                  },
                ]}
                title={"Continue"}
              />
            </Modal>
          )}
        </>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={true}
          scrollEnabled={false}
          keyboardShouldPersistTaps={"never"}
          enableAutomaticScroll={true}
          enableOnAndroid={true}
          extraScrollHeight={20}
        >
          <XanoAPIApi.FetchGetSingleItemGET>
            {({ loading, error, data, refetchGetSingleItem }) => {
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
                  <View style={styles.Viewea564e7b}>
                    <Image
                      style={styles.Imageee92b18b}
                      source={Images.Final03}
                      resizeMode={"contain"}
                    />
                    <Text
                      style={[
                        styles.Text8e60057b,
                        { color: theme.colors.staticPurple },
                      ]}
                    >
                      {"Upload Photos"}
                    </Text>

                    <Text
                      style={[
                        styles.Text06aff924,
                        { color: theme.colors.poppinsLightBlack },
                      ]}
                    >
                      {"Please upload six photos of yourself"}
                    </Text>
                  </View>
                  <View style={styles.View1324b9e2}>
                    <GridView
                      data={grid}
                      numColumns={3}
                      containerMargin={{
                        top: 0,
                        bottom: 0,
                        left: 25,
                        right: 35,
                      }}
                      onPressCell={(cell) => {
                        const parseCell = JSON.parse(cell);
                        const parseGrid = grid.map((m) => JSON.parse(m));
                        const handler = async () => {
                          try {
                            const pickerValue = await Utils.openImagePicker({
                              allowsEditing: true,
                            });

                            const updatedGrid = parseGrid.map((m) =>
                              m.id == parseCell?.id
                                ? JSON.stringify({
                                    ...m,
                                    uri: pickerValue ?? m.uri,
                                  })
                                : JSON.stringify(m)
                            );
                            setGrid(updatedGrid);
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                      renderItem={(item, idx) => {
                        const { id, uri } = JSON.parse(item);

                        return (
                          <View
                            style={[
                              styles.View1fb01fdd,
                              {
                                borderColor: theme.colors.lightGray,
                              },
                            ]}
                            key={id}
                          >
                            <Image
                              style={styles.Image65072915}
                              resizeMode={"cover"}
                              source={{ uri: uri }}
                            />
                          </View>
                        );
                      }}
                      onReleaseCell={(items) => setGrid(items)}
                    />
                  </View>

                  <View style={{ left: 25, marginBottom: 10 }}>
                    <Text
                      style={[
                        styles.Text06aff924,
                        { color: theme.colors["Studily_Slate_Gray"] },
                      ]}
                    >
                      {"Tap to edit, drag to reorder"}
                    </Text>
                  </View>

                  <View>
                    <Touchable
                      onPress={() => {
                        let parseGrid = grid.map((m) => JSON.parse(m));

                        const isImagesAreLess =
                          parseGrid.filter((m) => m.uri === "").length > 2;

                        // If  image are less we show warning popup
                        setGlobalVariableValue({
                          key: "visible",
                          value: isImagesAreLess,
                        });
                        if (isImagesAreLess) return;

                        // Filter5 Out Empty Box from List
                        parseGrid = parseGrid.filter((m) => m.uri !== "");

                        const handler = async () => {
                          try {
                            setIsImageUploading(true);
                            // Feature Image
                            const new_photos_list =
                              await xanoAPIUserImageListPOST.mutateAsync({
                                featured_photo: parseGrid[0]?.uri,
                                profilePic2: parseGrid[1]?.uri,
                                profilePic3: parseGrid[2]?.uri,
                                ProfilePic4: parseGrid[3]?.uri,
                                ProfilePic5: parseGrid[4]?.uri,
                                ProfilePic6: parseGrid[5]?.uri,
                              });

                            // Feature Image set to cache so that we dont have download at that time
                            setImageCatched({
                              uri: new_photos_list?.featured_photo?.url,
                            });

                            await handleRediect();
                          } catch (err) {
                            setIsImageUploading(false);
                            console.error(err);
                          }
                        };
                        handler();
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
                          {"Finish"}
                        </Text>
                      </LinearGradient>
                    </Touchable>
                  </View>
                </>
              );
            }}
          </XanoAPIApi.FetchGetSingleItemGET>
        </KeyboardAwareScrollView>
      </ScreenContainer>
    </>
  );
};

const styles = StyleSheet.create({
  ButtonOutlinef4d3389c: {
    backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: "Poppins_400Regular",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 16,
    minHeight: 51,
    textAlign: "center",
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  Image65072915: {
    height: 95,
    width: 95,
  },
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
  Text42e4c07e: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    marginLeft: 20,
    marginTop: 30,
  },
  Text4e712a2a: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 4,
  },
  Text8b5e265a: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  Text8e60057b: {
    fontFamily: "Poppins_700Bold",
    fontSize: 27,
    marginTop: 15,
  },
  Touchable65072915: {
    height: 95,
    width: 95,
  },
  View1324b9e2: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  View1fb01fdd: {
    height: 95,
    width: 95,
    borderRadius: 10,
    borderBottomWidth: 0.75,
    borderLeftWidth: 0.75,
    borderRightWidth: 0.75,
    borderTopWidth: 0.75,
    overflow: "hidden",
  },
  View6933503a: {
    borderBottomWidth: 0.75,
    borderLeftWidth: 0.75,
    borderRightWidth: 0.75,
    borderTopWidth: 0.75,
    overflow: "hidden",
  },
  View8db0e677: {
    borderBottomWidth: 0.75,
    borderLeftWidth: 0.75,
    borderRightWidth: 0.75,
    borderTopWidth: 0.75,
    overflow: "hidden",
  },
  Viewbaec827c: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    marginTop: 10,
  },
  Viewc0343d94: {
    borderBottomWidth: 0.75,
    borderLeftWidth: 0.75,
    borderRightWidth: 0.75,
    borderTopWidth: 0.75,
    overflow: "hidden",
  },
  Viewd575fb97: {
    borderBottomWidth: 0.75,
    borderLeftWidth: 0.75,
    borderRightWidth: 0.75,
    borderTopWidth: 0.75,
    overflow: "hidden",
  },
  Viewea564e7b: {
    marginBottom: 18,
  },
  screen: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
});

export default withTheme(UploadPhotosScreen);
