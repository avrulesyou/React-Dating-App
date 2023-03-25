import React from "react";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import * as Utils from "../utils";
import {
  Icon,
  LinearGradient,
  ScreenContainer,
  TextField,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { CacheManager } from "expo-cached-image";
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Fetch } from "react-request";
import UserContext from "../context/UserContext.js";
import Image from "../components/CachedImage.js";
import AppSelect2 from "../components/AppSelect2.js";
import CustomActivityIndicator from "../components/ActivityIndicator.js";
import GridView from "react-native-draggable-gridview";

const DDEditProfileScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  const xanoAPIUploadDDPhotosPOST = XanoAPIApi.useUploadDDPhotosPOST();
  const xanoAPIUploadDDGroupPic2POST = XanoAPIApi.useDDGroupPic2POST();
  const xanoAPIUploadDDGroupPic3POST = XanoAPIApi.useDDGroupPic3POST();
  const xanoAPIUploadDDGroupPic4POST = XanoAPIApi.useDDGroupPic4POST();
  const xanoAPIUploadDDGroupPic5POST = XanoAPIApi.useDDGroupPic5POST();
  const xanoAPIUploadDDGroupPic6POST = XanoAPIApi.useDDGroupPic6POST();
  const xanoAPIEditDDPromptsPOST = XanoAPIApi.useEditDDPromptsPOST();
  const xanoAPIDDEditProfileUpdatePOST =
    XanoAPIApi.useDDEditProfileUpdatePOST();
  const xanoAPITeamCompleteProfilePOST =
    XanoAPIApi.useDDTeamCompleteProfilePOST();
  const xanoAPIDDUserImageListPOST = XanoAPIApi.useDDUserImageListPOST();

  const [ddPromptList, setDDPromptList] = React.useState({
    group_prompt1: [],
    group_prompt2: [],
    group_prompt3: [],
  });
  const [groupBio, setGroupBio] = React.useState("");
  const [isImageOrderChanged, setIsImageOrderChanged] = React.useState(false);
  const [hasScroll, setHasScroll] = React.useState(true);
  const [isImageUploading, setIsImageUploading] = React.useState(false);
  const [{ selected_team, selected_team_details }] =
    React.useContext(UserContext);
  const [user, setUser] = React.useContext(UserContext);

  const [grid, setGrid] = React.useState([
    JSON.stringify({
      id: 1,
      uri: selected_team_details?.group_photo1?.url ?? ``,
    }),
    JSON.stringify({
      id: 2,
      uri: selected_team_details?.group_photo2?.url ?? ``,
    }),
    JSON.stringify({
      id: 3,
      uri: selected_team_details?.group_photo3?.url ?? ``,
    }),
    JSON.stringify({
      id: 4,
      uri: selected_team_details?.group_photo4?.url ?? ``,
    }),
    JSON.stringify({
      id: 5,
      uri: selected_team_details?.group_photo5?.url ?? ``,
    }),
    JSON.stringify({
      id: 6,
      uri: selected_team_details?.group_photo6?.url ?? ``,
    }),
  ]);

  React.useEffect(() => {
    const dd_prompt_list_1 = GlobalVariables.DD_PROMPT_LIST.map(
      (prompt, idx) => ({
        id: idx + 1,
        name: prompt,
        value: prompt,
        checked: selected_team_details?.group_prompt1_title == prompt,
      })
    );
    const dd_prompt_list_2 = GlobalVariables.DD_PROMPT_LIST.map(
      (prompt, idx) => ({
        id: idx + 1,
        name: prompt,
        value: prompt,
        checked: selected_team_details?.group_prompt2_title == prompt,
      })
    );
    const dd_prompt_list_3 = GlobalVariables.DD_PROMPT_LIST.map(
      (prompt, idx) => ({
        id: idx + 1,
        name: prompt,
        value: prompt,
        checked: selected_team_details?.group_prompt3_title == prompt,
      })
    );
    setDDPromptList({
      ...ddPromptList,
      group_prompt1: dd_prompt_list_1,
      group_prompt2: dd_prompt_list_2,
      group_prompt3: dd_prompt_list_3,
    });
  }, []);

  React.useLayoutEffect(() => {
    const dd_prompts = {
      double_dating_teams_id: selected_team?.id ?? "",
      group_prompt1: selected_team_details?.group_prompt1_title,
      group_prompt1_response: selected_team_details?.group_prompt1_response,
      group_prompt2: selected_team_details?.group_prompt2_title,
      group_prompt2_response: selected_team_details?.group_prompt2_response,
      group_prompt3: selected_team_details?.group_prompt3_title,
      group_prompt3_response: selected_team_details?.group_prompt3_response,
    };
    setUser({
      ...user,
      selected_team_details: { ...user.selected_team_details, dd_prompts },
    });
  }, []);

  const updateDDPromptForContext = ({ key, value }) => {
    //Updating User Context because we are updating DD Prompts on this Screen
    setUser({
      ...user,
      selected_team_details: {
        ...user.selected_team_details,
        dd_prompts: {
          ...user.selected_team_details.dd_prompts,
          [key]: value,
        },
      },
    });
  };

  const updateDDGroupImageForContext = ({ key, value }) => {
    //Updating User Context because we are updating DD Group Image on this Screen
    setUser({
      ...user,
      selected_team_details: {
        ...user.selected_team_details,
        [key]: { ...user.selected_team_details[key], url: value },
      },
    });
  };

  const setImageCatched = async ({ uri }) => {
    await CacheManager.downloadAsync({
      uri,
      key: `${getCacheKey(uri)}-thumb`,
    });
  };

  const handleSelectedDDPrompt = ({ id, key }) => {
    let value = id.length
      ? ddPromptList[key].find(({ id: promptId }) => promptId == id[0]).value
      : null;
    value = value ?? user?.selected_team_details.dd_prompts[key];
    updateDDPromptForContext({ key, value });
  };

  const handleUploadImages = async () => {
    if (isImageOrderChanged) {
      let parseGrid = grid.map((m) => JSON.parse(m));

      // Filter5 Out Empty Box from List
      parseGrid = parseGrid.filter((m) => m.uri !== "");

      const new_photos_list = await xanoAPIDDUserImageListPOST.mutateAsync({
        double_dating_teams_id: selected_team_details?.id,
        group_photo1: parseGrid[0]?.uri,
        group_photo2: parseGrid[1]?.uri,
        group_photo3: parseGrid[2]?.uri,
        group_photo4: parseGrid[3]?.uri,
        group_photo5: parseGrid[4]?.uri,
        group_photo6: parseGrid[5]?.uri,
      });
    }
  };

  return (
    <>
      <CustomActivityIndicator visible={isImageUploading} />
      <ScreenContainer
        hasSafeArea={false}
        scrollable={false}
        hasTopSafeArea={true}
      >
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
                    params: {
                      screen: "DDProfileTabScreen",
                      params: { team_id: selected_team?.id ?? "" },
                    },
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Icon name={"AntDesign/arrowleft"} size={24} />
            </Touchable>
          </View>

          <View style={styles.View39912261}>
            <Text style={[styles.Textda110b1a, { color: theme.colors.strong }]}>
              {"Edit Profile"}
            </Text>
          </View>
          <View style={styles.View0cd1e7ab} />
        </View>

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps={"never"}
          scrollEnabled={hasScroll}
          style={{ marginBottom: 80 }}
        >
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

              return (
                <>
                  <GridView
                    data={grid}
                    numColumns={3}
                    containerMargin={{
                      top: 80,
                      bottom: -40,
                      left: 50,
                      right: 35,
                    }}
                    onBeginDragging={() => {
                      //Disable Scrolling When Dragging Start
                      setHasScroll(false);
                    }}
                    onPressCell={(cell) => {
                      const parseCell = JSON.parse(cell);
                      const parseGrid = grid.map((m) => JSON.parse(m));

                      const handler = async () => {
                        try {
                          const pickerValue = await Utils.openImagePicker({
                            allowsEditing: true,
                          });

                          //we will upload new images only if we pick new images or change the order
                          pickerValue && setIsImageOrderChanged(true);

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
                            styles.DragView,
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
                    onReleaseCell={(items) => {
                      setGrid(items);
                      //we will upload new images only if we pick new images or change the order
                      setIsImageOrderChanged(true);
                      //Enable Scroll When User release Drag
                      setHasScroll(true);
                    }}
                  />

                  <View style={{ left: 45, marginBottom: 10 }}>
                    <Text
                      style={[
                        styles.Text06aff924,
                        { color: theme.colors.lightGray },
                      ]}
                    >
                      {"Tap to edit, drag to reorder"}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={[
                        styles.Text72738327,
                        { color: theme.colors.grayChatLettering },
                      ]}
                    >
                      {"Prompts"}
                    </Text>

                    <View
                      style={[
                        styles.Viewd23a4abf,
                        {
                          borderColor: theme.colors.lightGray,
                          borderRadius: 28,
                        },
                      ]}
                    >
                      {/* Picker1 */}
                      <AppSelect2
                        isSelectSingle
                        data={ddPromptList.group_prompt1}
                        popupTitle="Select Prompt"
                        title="Select Prompt"
                        showSearchBox={false}
                        listEmptyTitle={"Couldn't find prompt"}
                        onSelect={(id) => {
                          handleSelectedDDPrompt({ id, key: "group_prompt1" });
                        }}
                        styleContainer={[
                          styles.Picker4cb2edf4,
                          {
                            borderRadius: 8,
                            color: theme.colors.poppinsLightBlack,
                          },
                        ]}
                      />
                      <TextInput
                        onChangeText={(newTextInputValue) => {
                          updateDDPromptForContext({
                            key: "group_prompt1_response",
                            value: newTextInputValue,
                          });
                        }}
                        style={[
                          styles.TextInputc818658c,
                          {
                            borderColor: theme.colors.divider,
                            color: theme.colors["Gray Chat Lettering"],
                          },
                        ]}
                        placeholder={"Enter response here..."}
                        autoCorrect={true}
                        defaultValue={
                          selected_team_details?.dd_prompts
                            ?.group_prompt1_response
                        }
                      />
                    </View>

                    <View
                      style={[
                        styles.Viewd23a4abf,
                        {
                          borderColor: theme.colors.lightGray,
                          borderRadius: 28,
                        },
                      ]}
                    >
                      {/* Picker2 */}
                      <AppSelect2
                        isSelectSingle
                        data={ddPromptList.group_prompt2}
                        popupTitle="Select Prompt"
                        title="Select Prompt"
                        showSearchBox={false}
                        listEmptyTitle={"Couldn't find prompt"}
                        onSelect={(id) => {
                          handleSelectedDDPrompt({ id, key: "group_prompt2" });
                        }}
                        styleContainer={[
                          styles.Picker4cb2edf4,
                          {
                            borderRadius: 8,
                            color: theme.colors.poppinsLightBlack,
                          },
                        ]}
                      />
                      <TextInput
                        onChangeText={(newTextInputValue) => {
                          updateDDPromptForContext({
                            key: "group_prompt2_response",
                            value: newTextInputValue,
                          });
                        }}
                        style={[
                          styles.TextInputc818658c,
                          {
                            borderColor: theme.colors.divider,
                            color: theme.colors.poppinsLightBlack,
                          },
                        ]}
                        placeholder={"Enter response here..."}
                        autoCorrect={true}
                        defaultValue={
                          selected_team_details?.dd_prompts
                            ?.group_prompt2_response
                        }
                      />
                    </View>

                    <View
                      style={[
                        styles.Viewd23a4abf,
                        {
                          borderColor: theme.colors.lightGray,
                          borderRadius: 28,
                        },
                      ]}
                    >
                      {/* Picker3 */}
                      <AppSelect2
                        isSelectSingle
                        data={ddPromptList.group_prompt3}
                        popupTitle="Select Prompt"
                        title="Select Prompt"
                        showSearchBox={false}
                        listEmptyTitle={"Couldn't find prompt"}
                        onSelect={(id) => {
                          handleSelectedDDPrompt({ id, key: "group_prompt3" });
                        }}
                        styleContainer={[
                          styles.Picker4cb2edf4,
                          {
                            borderRadius: 8,
                            color: theme.colors.poppinsLightBlack,
                          },
                        ]}
                      />
                      <TextInput
                        onChangeText={(newTextInputValue) => {
                          updateDDPromptForContext({
                            key: "group_prompt3_response",
                            value: newTextInputValue,
                          });
                        }}
                        style={[
                          styles.TextInputc818658c,
                          {
                            borderColor: theme.colors.divider,
                            color: theme.colors.poppinsLightBlack,
                          },
                        ]}
                        placeholder={"Enter response here..."}
                        autoCorrect={true}
                        defaultValue={
                          selected_team_details?.dd_prompts
                            ?.group_prompt3_response
                        }
                      />
                    </View>
                  </View>

                  <View>
                    <Text
                      style={[
                        styles.Textbeeb60fc,
                        { color: theme.colors.grayChatLettering },
                      ]}
                    >
                      {"About Me"}
                    </Text>

                    <View>
                      <Text
                        style={[
                          styles.Text495d4a10,
                          { color: theme.colors.poppinsLightBlack },
                        ]}
                      >
                        {"Bio"}
                      </Text>
                      <TextField
                        onChangeText={(newStyledTextAreaValue) =>
                          setGroupBio(newStyledTextAreaValue)
                        }
                        style={styles.TextField77ac752d}
                        placeholder={"Enter bio here..."}
                        type={"solid"}
                        multiline={true}
                        numberOfLines={3}
                        defaultValue={selected_team_details?.group_bio}
                      />
                    </View>
                  </View>
                </>
              );
            }}
          </XanoAPIApi.FetchGetSingleDDTeamsRecordGET>
        </KeyboardAwareScrollView>
        <View style={styles.Viewafec8ce6}>
          <Touchable
            onPress={() => {
              const handler = async () => {
                try {
                  setIsImageUploading(true);

                  await handleUploadImages();

                  await xanoAPIDDEditProfileUpdatePOST.mutateAsync({
                    bio: groupBio ?? selected_team_details?.group_bio,
                    double_dating_teams_id: selected_team?.id ?? "",
                  });

                  const updatedPrompts =
                    await xanoAPIEditDDPromptsPOST.mutateAsync(
                      selected_team_details?.dd_prompts
                    );

                  setUser({
                    ...user,
                    selected_team_details: {
                      ...user.selected_team_details,
                      ...updatedPrompts,
                    },
                  });

                  const isProfileComplete =
                    await xanoAPITeamCompleteProfilePOST.mutateAsync({
                      double_dating_teams_id: selected_team?.id ?? "",
                    });

                  isProfileComplete &&
                    setUser({
                      ...user,
                      selected_team_details: {
                        ...user.selected_team_details,
                        ...updatedPrompts,
                        ...isProfileComplete,
                      },
                    });

                  setIsImageUploading(false);

                  navigation.navigate("DDStack", {
                    screen: "DDBottomNavigator",
                    params: {
                      screen: "DDProfileTabScreen",
                      params: {
                        team_id: selected_team?.id ?? "",
                      },
                    },
                  });
                } catch (err) {
                  setIsImageUploading(false);
                  console.error(err);
                }
              };
              handler();
            }}
          >
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
      </ScreenContainer>
    </>
  );
};

const styles = StyleSheet.create({
  DragView: {
    height: 95,
    width: 95,
    borderRadius: 10,
    borderBottomWidth: 0.75,
    borderLeftWidth: 0.75,
    borderRightWidth: 0.75,
    borderTopWidth: 0.75,
    overflow: "hidden",
  },
  Fetch431eb058: { minHeight: 40 },
  Image65072915: { height: 95, width: 95 },
  LinearGradient29beb386: {
    height: 51,
    justifyContent: "center",
    width: "100%",
  },
  Picker4cb2edf4: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
    maxHeight: 30,
    maxWidth: "90%",
  },
  Text495d4a10: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    marginLeft: 20,
    marginRight: 20,
  },
  Text72738327: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    marginBottom: 0,
    marginLeft: 20,
    marginRight: 20,
  },
  TextField77ac752d: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
  },
  TextInputc818658c: {
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRadius: 8,
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    maxWidth: "90%",
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
  },
  Textbeeb60fc: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  Textd5df39eb: { fontFamily: "Poppins_400Regular", textAlign: "center" },
  Textda110b1a: {
    fontFamily: "Poppins_500Medium",
    fontSize: 24,
    textAlign: "center",
  },
  Touchable65072915: { height: 95, width: 95 },
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
  Viewafec8ce6: { position: "absolute", bottom: 30, left: 20, right: 20 },
  Viewb284c4b3: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 70,
  },
  Viewd23a4abf: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    minHeight: 105,
  },
  Viewe173518b: {
    borderBottomWidth: 0.75,
    borderLeftWidth: 0.75,
    borderRightWidth: 0.75,
    borderTopWidth: 0.75,
    overflow: "hidden",
  },
  Viewff373643: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
});

export default withTheme(DDEditProfileScreen);
