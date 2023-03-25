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
import GridView from "react-native-draggable-gridview";
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Image from "../components/CachedImage.js";
import UserContext from "../context/UserContext.js";
import AppSelect2 from "../components/AppSelect2.js";
import CustomActivityIndicator from "../components/ActivityIndicator.js";

const EditProfileScreen = (props) => {
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
  const xanoAPIUpdatePromptsPOST = XanoAPIApi.useUpdatePromptsPOST();
  const xanoAPIEditProfileUserPOST = XanoAPIApi.useEditProfileUserPOST();
  const xanoAPIUserImageListPOST = XanoAPIApi.useUserImageListPOST();

  const [promptList, setPromptList] = React.useState({
    prompt1: [],
    prompt2: [],
    prompt3: [],
  });
  const [genderList, setGenderList] = React.useState([]);
  const [bio, setBio] = React.useState(null);
  const [job_title, setJob_title] = React.useState(null);
  const [sexual_interest, setSexual_interest] = React.useState(null);
  const [isImageOrderChanged, setIsImageOrderChanged] = React.useState(false);
  const [hasScroll, setHasScroll] = React.useState(true);

  const [user, setUser] = React.useContext(UserContext);

  const [isImageUploading, setIsImageUploading] = React.useState(false);
  const [grid, setGrid] = React.useState([
    JSON.stringify({
      id: 1,
      uri: user?.featured_photo?.url ?? ``,
    }),
    JSON.stringify({
      id: 2,
      uri: user?.profilePic2?.url ?? ``,
    }),
    JSON.stringify({
      id: 3,
      uri: user?.profilePic3?.url ?? ``,
    }),
    JSON.stringify({
      id: 4,
      uri: user?.profilePic4?.url ?? ``,
    }),
    JSON.stringify({
      id: 5,
      uri: user?.profilePic5?.url ?? ``,
    }),
    JSON.stringify({
      id: 6,
      uri: user?.profilePic6?.url ?? ``,
    }),
  ]);

  React.useEffect(() => {
    const prompt_list_1 = modelPromptListForSelect2({
      key_prompt: user?.prompt_1,
    });
    const prompt_list_2 = modelPromptListForSelect2({
      key_prompt: user?.prompt_2,
    });
    const prompt_list_3 = modelPromptListForSelect2({
      key_prompt: user?.prompt_3,
    });
    const gender_list = GlobalVariables.GENDER_LIST.map((gender, idx) => ({
      id: idx + 1,
      name: gender,
      value: stringToLowerCase(gender),
      checked: user?.sexual_interest == stringToLowerCase(gender),
    }));

    setPromptList({
      ...promptList,
      prompt1: prompt_list_1,
      prompt2: prompt_list_2,
      prompt3: prompt_list_3,
    });
    setGenderList(gender_list);
  }, []);

  React.useLayoutEffect(() => {
    const prompts = {
      prompt1: user?.prompt_1,
      prompt1_response: user?.prompt_1_response,
      prompt2: user?.prompt_2,
      prompt2_response: user?.prompt_2_response,
      prompt3: user?.prompt_3,
      prompt3_response: user?.prompt_3_response,
    };

    setUser({ ...user, prompts });
  }, []);

  // React.useEffect(async () => {
  //   //after uploading image if we reached to this screen we should store fresh images url data in User Context
  //   const updatedUser = await XanoAPIApi.getSingleItemGET(
  //     {
  //       AUTHORIZATION_HEADER: user?.authToken ?? "",
  //     },
  //     {}
  //   );
  //   setUser({ ...user, ...updatedUser });
  // }, []);

  const modelPromptListForSelect2 = ({ key_prompt }) =>
    GlobalVariables.PROMPT_LIST.map((prompt, idx) => ({
      id: idx + 1,
      name: prompt,
      value: prompt,
      checked: key_prompt == prompt,
    }));

  const upadateImageForContext = ({ key, value }) => {
    //Updating User Context because we are updating Image on this Screen
    setUser({ ...user, [key]: { ...user[key], url: value } });
    console.log({ key, value });
  };

  const updatePromptForContext = ({ key, value }) => {
    //Updating User Context because we are updating Prompts on this Screen
    setUser({ ...user, prompts: { ...user.prompts, [key]: value } });
  };

  const handleSelectedPrompt = ({ id, key }) => {
    let value = id.length
      ? promptList[key].find(({ id: promptId }) => promptId == id[0]).value
      : null;

    value = value ?? user?.prompts[key];
    updatePromptForContext({ key, value });
  };

  const handleSelectedGender = ({ id }) => {
    let value = id.length
      ? genderList.find(({ id: genderId }) => genderId == id[0]).value
      : null;

    value = value ?? user?.sexual_interest;
    setSexual_interest(value);
  };

  const stringToLowerCase = (string) => {
    return string ? string.toLowerCase() : "";
  };

  const stringToUpperCase = (string) => {
    return string ? string.replace(/(^\w|-\w)/g, clearAndUpper) : "";
  };

  const clearAndUpper = (string) => {
    return string ? string.replace(/-/, "-").toUpperCase() : "";
  };

  const handleUploadImages = async () => {
    if (isImageOrderChanged) {
      let parseGrid = grid.map((m) => JSON.parse(m));

      // Filter5 Out Empty Box from List
      parseGrid = parseGrid.filter((m) => m.uri !== "");

      upadateImageForContext({
        key: GlobalVariables.EDIT_PROFILE_IMAGE_KEY[0],
        value: parseGrid[0]?.uri,
      });

      const new_photos_list = await xanoAPIUserImageListPOST.mutateAsync({
        featured_photo: parseGrid[0]?.uri,
        profilePic2: parseGrid[1]?.uri,
        profilePic3: parseGrid[2]?.uri,
        ProfilePic4: parseGrid[3]?.uri,
        ProfilePic5: parseGrid[4]?.uri,
        ProfilePic6: parseGrid[5]?.uri,
      });
    }
  };

  return (
    <>
      <CustomActivityIndicator visible={isImageUploading} />
      <ScreenContainer
        hasTopSafeArea={true}
        hasSafeArea={false}
        scrollable={false}
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
            <Text style={[styles.Text41746828, { color: theme.colors.strong }]}>
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
                      <Text
                        style={[
                          {
                            fontFamily: "Poppins_500Medium",
                            fontSize: 12,
                            color: theme.colors.grayChatLettering,
                          },
                        ]}
                      >
                        {" (optional)"}
                      </Text>
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
                        data={promptList.prompt1}
                        popupTitle="Select Prompt"
                        title="Select Prompt"
                        showSearchBox={false}
                        listEmptyTitle={"Couldn't find prompt"}
                        onSelect={(id) =>
                          handleSelectedPrompt({ id, key: "prompt1" })
                        }
                        styleContainer={[
                          styles.Pickerfa7d8a90,
                          {
                            borderRadius: 8,
                            color: theme.colors.poppinsLightBlack,
                          },
                        ]}
                      />
                      <TextInput
                        onChangeText={(newTextInputValue) => {
                          updatePromptForContext({
                            key: "prompt1_response",
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
                        placeholder={user?.prompt_1_response}
                        defaultValue={user?.prompt_1_response}
                        autoCorrect={true}
                        placeholderTextColor={theme.colors.grayChatLettering}
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
                        data={promptList.prompt2}
                        popupTitle="Select Prompt"
                        title="Select Prompt"
                        showSearchBox={false}
                        listEmptyTitle={"Couldn't find prompt"}
                        onSelect={(id) =>
                          handleSelectedPrompt({ id, key: "prompt2" })
                        }
                        styleContainer={[
                          styles.Pickerfa7d8a90,
                          {
                            borderRadius: 8,
                            color: theme.colors.poppinsLightBlack,
                          },
                        ]}
                      />
                      <TextInput
                        onChangeText={(newTextInputValue) => {
                          updatePromptForContext({
                            key: "prompt2_response",
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
                        placeholder={user?.prompt_2_response}
                        defaultValue={user?.prompt_2_response}
                        autoCorrect={true}
                        placeholderTextColor={theme.colors.grayChatLettering}
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
                        data={promptList.prompt3}
                        popupTitle="Select Prompt"
                        title="Select Prompt"
                        showSearchBox={false}
                        listEmptyTitle={"Couldn't find prompt"}
                        onSelect={(id) =>
                          handleSelectedPrompt({ id, key: "prompt3" })
                        }
                        styleContainer={[
                          styles.Pickerfa7d8a90,
                          {
                            borderRadius: 8,
                            color: theme.colors.poppinsLightBlack,
                          },
                        ]}
                      />

                      <TextInput
                        onChangeText={(newTextInputValue) => {
                          updatePromptForContext({
                            key: "prompt3_response",
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
                        placeholder={user?.prompt_3_response}
                        defaultValue={user?.prompt_3_response}
                        autoCorrect={true}
                        placeholderTextColor={theme.colors.grayChatLettering}
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
                          setBio(newStyledTextAreaValue)
                        }
                        style={styles.TextField77ac752d}
                        placeholder={"Enter bio here..."}
                        type={"solid"}
                        multiline={true}
                        numberOfLines={3}
                        placeholderTextColor={
                          theme.colors["Gray Chat Lettering"]
                        }
                        defaultValue={user?.bio}
                      />
                    </View>

                    <View>
                      <Text
                        style={[
                          styles.Text495d4a10,
                          { color: theme.colors.poppinsLightBlack },
                        ]}
                      >
                        {"Job Title"}
                      </Text>
                      <TextField
                        onChangeText={(newStyledTextAreaValue) =>
                          setJob_title(newStyledTextAreaValue)
                        }
                        style={styles.TextField77ac752d}
                        placeholder={"Enter job title here…"}
                        type={"solid"}
                        multiline={true}
                        numberOfLines={1}
                        placeholderTextColor={
                          theme.colors["Gray Chat Lettering"]
                        }
                        defaultValue={user?.job_title}
                      />
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.Text495d4a10,
                          { color: theme.colors.poppinsLightBlack },
                        ]}
                      >
                        {"Sexually Interested In"}
                      </Text>

                      <AppSelect2
                        isSelectSingle
                        data={genderList}
                        popupTitle="Select Gender"
                        title="Select Gender"
                        showSearchBox={false}
                        listEmptyTitle={"Couldn't find Gender"}
                        onSelect={(id) => handleSelectedGender({ id })}
                        styleContainer={[
                          styles.Select2PickerGender,
                          { color: theme.colors.grayChatLettering },
                        ]}
                      />
                    </View>
                  </View>
                </>
              );
            }}
          </XanoAPIApi.FetchGetSingleItemGET>
        </KeyboardAwareScrollView>
        <View style={styles.Viewafec8ce6}>
          <Touchable
            onPress={() => {
              const handler = async () => {
                try {
                  setIsImageUploading(true);

                  await handleUploadImages();

                  await xanoAPIEditProfileUserPOST.mutateAsync({
                    bio: bio ?? user?.bio,
                    job_title: job_title ?? user?.job_title,
                    sexual_interest: sexual_interest ?? user?.sexual_interest,
                  });

                  const updatedPrompts =
                    await xanoAPIUpdatePromptsPOST.mutateAsync(user?.prompts);

                  setUser({
                    ...user,
                    ...updatedPrompts,
                  });

                  setIsImageUploading(false);

                  navigation.navigate("BottomTabNavigator", {
                    screen: "ProfileTabScreen",
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
  Select2PickerGender: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginHorizontal: 20,
    width: "91%",
    minHeight: 60,
    borderRadius: 6,
    marginRight: 50,
    paddingRight: 40,
    marginBottom: 20,
    marginTop: 5,
  },
  Fetch431eb058: { minHeight: 40 },
  Image65072915: { height: 95, width: 95 },
  LinearGradient29beb386: {
    height: 51,
    justifyContent: "center",
    width: "100%",
  },
  Pickerfa7d8a90: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
    maxHeight: 30,
    maxWidth: "90%",
  },
  Text41746828: {
    fontFamily: "Poppins_500Medium",
    fontSize: 24,
    textAlign: "center",
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
  Viewafec8ce6: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
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
  Viewe5dcdc30: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 70,
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

export default withTheme(EditProfileScreen);
