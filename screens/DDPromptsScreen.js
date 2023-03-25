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
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Fetch } from "react-request";
import AppSelect2 from "../components/AppSelect2.js";

const DDPromptsScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const team_id = props.route?.params?.team_id;

  const xanoAPIEditDDPromptsPOST = XanoAPIApi.useEditDDPromptsPOST();

  const [ddPromptList, setDDPromptList] = React.useState({
    group_prompt1: [],
    group_prompt2: [],
    group_prompt3: [],
  });
  const [Picker1, setPicker1] = React.useState("Choose a prompt...");
  const [Picker2, setPicker2] = React.useState("Choose a prompt...");
  const [Picker3, setPicker3] = React.useState("Choose a prompt...");
  const [promptResponse1, setPromptResponse1] = React.useState("");
  const [promptResponse2, setPromptResponse2] = React.useState("");
  const [promptResponse3, setPromptResponse3] = React.useState("");

  React.useEffect(() => {
    const dd_prompt_list_1 = GlobalVariables.DD_PROMPT_LIST.map(
      (prompt, idx) => ({
        id: idx + 1,
        name: prompt,
        value: prompt,
        checked: false,
      })
    );
    const dd_prompt_list_2 = GlobalVariables.DD_PROMPT_LIST.map(
      (prompt, idx) => ({
        id: idx + 1,
        name: prompt,
        value: prompt,
        checked: false,
      })
    );
    const dd_prompt_list_3 = GlobalVariables.DD_PROMPT_LIST.map(
      (prompt, idx) => ({
        id: idx + 1,
        name: prompt,
        value: prompt,
        checked: false,
      })
    );
    setDDPromptList({
      ...ddPromptList,
      group_prompt1: dd_prompt_list_1,
      group_prompt2: dd_prompt_list_2,
      group_prompt3: dd_prompt_list_3,
    });
  }, []);

  const getSelectedPromptById = (id) => {
    let value = id
      ? ddPromptList.group_prompt1.find(({ id: promptId }) => promptId == id)
          .value
      : null;
    return value;
  };

  return (
    <ScreenContainer
      style={styles.screen}
      scrollable={false}
      hasSafeArea={true}
    >
      <XanoAPIApi.FetchGetSingleDDTeamsRecordGET
        double_dating_teams_id={team_id ?? ""}
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
            <FlatList
              data={[fetchData]}
              listKey={"O6A8wnQX"}
              keyExtractor={(listData) =>
                listData?.id || listData?.uuid || JSON.stringify(listData)
              }
              renderItem={({ item }) => {
                const listData = item;
                return (
                  <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={true}
                    keyboardShouldPersistTaps={"always"}
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
                        {
                          "Please choose three prompts to feature on your profile"
                        }
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.Text26598313,
                        { color: theme.colors.lightGray },
                      ]}
                    >
                      {"Written Prompts (3)"}
                    </Text>

                    <View
                      style={[
                        styles.View94669ec3,
                        {
                          borderRadius: 28,
                          borderColor: theme.colors.lightGray,
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
                        onSelect={(id) =>
                          setPicker1(getSelectedPromptById(id[0]))
                        }
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
                        {
                          borderRadius: 28,
                          borderColor: theme.colors.lightGray,
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
                        onSelect={(id) =>
                          setPicker2(getSelectedPromptById(id[0]))
                        }
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
                        {
                          borderRadius: 28,
                          borderColor: theme.colors.lightGray,
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
                        onSelect={(id) =>
                          setPicker3(getSelectedPromptById(id[0]))
                        }
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
                              await xanoAPIEditDDPromptsPOST.mutateAsync({
                                double_dating_teams_id: team_id ?? "",
                                group_prompt1: Picker1,
                                group_prompt1_response: promptResponse1,
                                group_prompt2: Picker2,
                                group_prompt2_response: promptResponse2,
                                group_prompt3: Picker3,
                                group_prompt3_response: promptResponse3,
                              });

                              const response =
                                await XanoAPIApi.dDPromptsCheckGET(Constants, {
                                  double_dating_teams_id: team_id ?? "",
                                });

                              const response_result = response.var_1;
                              setGlobalVariableValue({
                                key: "visible",
                                value: response_result,
                              });
                              if (response_result === true) {
                                return;
                              }
                              navigation.navigate("DDStack", {
                                screen: "DDBottomNavigator",
                                params: {
                                  screen: "DDHomeScreen",
                                  params: {
                                    team_id: team_id ?? "",
                                  },
                                },
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
              contentContainerStyle={styles.FlatListc992f941Content}
              numColumns={1}
            />
          );
        }}
      </XanoAPIApi.FetchGetSingleDDTeamsRecordGET>
      <>
        {!Constants["visible"] ? null : (
          <Modal animationType={"slide"} presentationStyle={"pageSheet"}>
            <Text style={[styles.Text42e4c07e, { color: theme.colors.strong }]}>
              {"Oops!"}
            </Text>

            <Text style={[styles.Textf964ce0c, { color: theme.colors.strong }]}>
              {
                "Your team must complete all three prompts and responses to continue."
              }
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
  FlatListc992f941Content: {
    flex: 1,
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
    marginBottom: 10,
    marginTop: 10,
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

export default withTheme(DDPromptsScreen);
