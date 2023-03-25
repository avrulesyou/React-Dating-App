import React from "react";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import Images from "../config/Images";
import {
  ButtonOutline,
  LinearGradient,
  ScreenContainer,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Fetch } from "react-request";
import * as Utils from "../utils";
import UserContext from "../context/UserContext.js";
import AppSelect2 from "../components/AppSelect2.js";

const PromptsInputScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const xanoAPIUpdatePromptsPOST = XanoAPIApi.useUpdatePromptsPOST();
  const xanoAPICompleteProfilePOST = XanoAPIApi.useCompleteProfilePOST();

  const [promptList, setPromptList] = React.useState({
    prompt1: [],
    prompt2: [],
    prompt3: [],
  });
  const [Picker1, setPicker1] = React.useState("Choose a prompt...");
  const [Picker2, setPicker2] = React.useState("Choose a prompt...");
  const [Picker3, setPicker3] = React.useState("Choose a prompt...");
  const [promptResponse1, setPromptResponse1] = React.useState("");
  const [promptResponse2, setPromptResponse2] = React.useState("");
  const [promptResponse3, setPromptResponse3] = React.useState("");

  const [user, setUser] = React.useContext(UserContext);

  React.useEffect(() => {
    const prompt_list_1 = GlobalVariables.PROMPT_LIST.map((prompt, idx) => ({
      id: idx + 1,
      name: prompt,
      value: prompt,
      checked: false,
    }));
    const prompt_list_2 = GlobalVariables.PROMPT_LIST.map((prompt, idx) => ({
      id: idx + 1,
      name: prompt,
      value: prompt,
      checked: false,
    }));
    const prompt_list_3 = GlobalVariables.PROMPT_LIST.map((prompt, idx) => ({
      id: idx + 1,
      name: prompt,
      value: prompt,
      checked: false,
    }));

    setPromptList({
      ...promptList,
      prompt1: prompt_list_1,
      prompt2: prompt_list_2,
      prompt3: prompt_list_3,
    });
  }, []);

  const getSelectedPromptById = (id) => {
    let value = id
      ? promptList.prompt1.find(({ id: promptId }) => promptId == id).value
      : null;
    return value;
  };

  return (
    <ScreenContainer
      style={styles.screen}
      scrollable={false}
      hasSafeArea={true}
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
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps={"never"}
              enableAutomaticScroll={true}
              enableOnAndroid={true}
              extraScrollHeight={20}
            >
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
                  {"Choose Prompts"}
                </Text>

                <Text
                  style={[
                    styles.Text06aff924,
                    { color: theme.colors.poppinsLightBlack },
                  ]}
                >
                  {"Please choose three prompts to feature on your profile"}
                </Text>
              </View>

              <Text
                style={[styles.Text26598313, { color: theme.colors.lightGray }]}
              >
                {"Written Prompts (3)"}
              </Text>

              <View
                style={[
                  styles.View94669ec3,
                  { borderRadius: 28, borderColor: theme.colors.lightGray },
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
                  onSelect={(id) => setPicker1(getSelectedPromptById(id[0]))}
                  styleContainer={[
                    styles.Picker7062857e,
                    {
                      borderRadius: 8,
                      color: theme.colors.poppinsLightBlack,
                    },
                  ]}
                />
                <TextInput
                  onChangeText={(newTextInputValue) =>
                    setPromptResponse1(newTextInputValue)
                  }
                  style={[
                    styles.TextInputa3cbb17b,
                    {
                      borderColor: theme.colors.divider,
                      color: theme.colors["Gray Chat Lettering"],
                    },
                  ]}
                  placeholder={"Enter response here..."}
                  value={promptResponse1}
                  autoCorrect={true}
                />
              </View>

              <View
                style={[
                  styles.View94669ec3,
                  { borderRadius: 28, borderColor: theme.colors.lightGray },
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
                  onSelect={(id) => setPicker2(getSelectedPromptById(id[0]))}
                  styleContainer={[
                    styles.Picker7062857e,
                    {
                      borderRadius: 8,
                      color: theme.colors.poppinsLightBlack,
                    },
                  ]}
                />
                <TextInput
                  onChangeText={(newTextInputValue) =>
                    setPromptResponse2(newTextInputValue)
                  }
                  style={[
                    styles.TextInput06c5b859,
                    {
                      borderColor: theme.colors.divider,
                      color: theme.colors.poppinsLightBlack,
                    },
                  ]}
                  placeholder={"Enter response here..."}
                  value={promptResponse2}
                  autoCorrect={true}
                />
              </View>

              <View
                style={[
                  styles.View94669ec3,
                  { borderRadius: 28, borderColor: theme.colors.lightGray },
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
                  onSelect={(id) => setPicker3(getSelectedPromptById(id[0]))}
                  styleContainer={[
                    styles.Picker7062857e,
                    {
                      borderRadius: 8,
                      color: theme.colors.poppinsLightBlack,
                    },
                  ]}
                />
                <TextInput
                  onChangeText={(newTextInputValue) =>
                    setPromptResponse3(newTextInputValue)
                  }
                  style={[
                    styles.TextInput06c5b859,
                    {
                      borderColor: theme.colors.divider,
                      color: theme.colors.poppinsLightBlack,
                    },
                  ]}
                  placeholder={"Enter response here..."}
                  value={promptResponse3}
                  autoCorrect={true}
                />
              </View>

              <View style={styles.View02f8ec45}>
                <Touchable
                  onPress={() => {
                    const handler = async () => {
                      try {
                        console.log({ Picker1, Picker2, Picker3 });
                        await xanoAPIUpdatePromptsPOST.mutateAsync({
                          prompt1: Picker1,
                          prompt1_response: promptResponse1,
                          prompt2: Picker2,
                          prompt2_response: promptResponse2,
                          prompt3: Picker3,
                          prompt3_response: promptResponse3,
                        });

                        const response =
                          await XanoAPIApi.arePromptsCompletedGET(Constants);
                        const response_result = response.var_1;
                        setGlobalVariableValue({
                          key: "visible",
                          value: response_result,
                        });
                        if (response_result === true) {
                          return;
                        }
                        await xanoAPICompleteProfilePOST.mutateAsync({
                          isProfileComplete: true,
                        });
                        const userResponse = await XanoAPIApi.getSingleItemGET(
                          {
                            AUTHORIZATION_HEADER: user?.authToken,
                          },
                          {}
                        );
                        setUser({ ...user, ...userResponse });
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
                                userResponse.double_dating_team_ids.length >
                                  0 &&
                                userResponse.double_dating_team_ids.includes(
                                  parseInt(Constants["invited_ddteam_id"])
                                )
                              ) {
                                navigation.navigate("BottomTabNavigator", {
                                  screen: "HomeScreen",
                                });
                                return;
                              }
                            }
                          }
                          navigation.navigate("JoinTeamScreen", {
                            team_id: Constants["invited_ddteam_id"],
                          });
                        } else {
                          navigation.navigate("BottomTabNavigator", {
                            screen: "HomeScreen",
                          });
                        }
                      } catch (err) {
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
            </KeyboardAwareScrollView>
          );
        }}
      </XanoAPIApi.FetchGetSingleItemGET>
      <>
        {!Constants["visible"] ? null : (
          <Modal animationType={"slide"} presentationStyle={"pageSheet"}>
            <Text style={[styles.Text42e4c07e, { color: theme.colors.strong }]}>
              {"Oops!"}
            </Text>

            <Text style={[styles.Textf964ce0c, { color: theme.colors.strong }]}>
              {"You must complete all three prompts and responses to continue."}
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
    </ScreenContainer>
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
  Imageee92b18b: {
    height: 56,
    width: 68,
  },
  LinearGradient4704f023: {
    height: 51,
    justifyContent: "center",
    width: "100%",
  },
  Picker7062857e: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
    maxHeight: 30,
    maxWidth: "90%",
  },
  Text06aff924: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    marginTop: 0,
  },
  Text26598313: {
    fontFamily: "Poppins_500Medium",
    marginBottom: 10,
  },
  Text42e4c07e: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    marginLeft: 20,
    marginTop: 30,
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
  TextInput06c5b859: {
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
  TextInputa3cbb17b: {
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
  Textf964ce0c: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 4,
  },
  View02f8ec45: {
    marginTop: 20,
  },
  View94669ec3: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    minHeight: 105,
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

export default withTheme(PromptsInputScreen);
