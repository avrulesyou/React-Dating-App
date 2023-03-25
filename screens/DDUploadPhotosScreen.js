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
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Fetch } from "react-request";
import UserContext from "../context/UserContext.js";

const DDUploadPhotosScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;
  const [{ selected_team }] = React.useContext(UserContext);

  const xanoAPIUploadDDPhotosPOST = XanoAPIApi.useUploadDDPhotosPOST();
  const xanoAPIUploadDDGroupPic2POST = XanoAPIApi.useDDGroupPic2POST();
  const xanoAPIUploadDDGroupPic3POST = XanoAPIApi.useDDGroupPic3POST();
  const xanoAPIUploadDDGroupPic4POST = XanoAPIApi.useDDGroupPic4POST();
  const xanoAPIUploadDDGroupPic5POST = XanoAPIApi.useDDGroupPic5POST();
  const xanoAPIUploadDDGroupPic6POST = XanoAPIApi.useDDGroupPic6POST();

  const team_id = props.route?.params?.team_id;

  return (
    <ScreenContainer
      style={styles.screen}
      scrollable={false}
      hasSafeArea={true}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps={"never"}
        enableAutomaticScroll={true}
        enableOnAndroid={true}
        extraScrollHeight={20}
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
              <>
                <View style={styles.Viewea564e7b}>
                  <Image
                    style={styles.Imageee92b18b}
                    source={Images.Final03}
                    resizeMode={"cover"}
                  />
                  <Text
                    style={[
                      styles.Textf317f7b5,
                      { color: theme.colors.staticPurple },
                    ]}
                  >
                    {"Upload Photos"}
                  </Text>

                  <Text
                    style={[
                      styles.Text5644fa6d,
                      { color: theme.colors.poppinsLightBlack },
                    ]}
                  >
                    {"Please upload at least two photos of your team"}
                  </Text>
                </View>

                <View style={styles.View1324b9e2}>
                  <View
                    style={[
                      styles.Viewe173518b,
                      { borderColor: theme.colors.lightGray, borderRadius: 10 },
                    ]}
                  >
                    <Touchable
                      onPress={() => {
                        const handler = async () => {
                          try {
                            const pickerValue = await Utils.openImagePicker({
                              allowsEditing: true,
                            });
                            await xanoAPIUploadDDPhotosPOST.mutateAsync({
                              double_dating_teams_id: team_id ?? "",
                              group_photo_1: pickerValue,
                            });
                            await refetchGetSingleDDTeamsRecord();
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                      style={styles.Touchable65072915}
                    >
                      <Image
                        style={styles.Image65072915}
                        source={{ uri: `${fetchData?.group_photo1?.url}` }}
                        resizeMode={"cover"}
                      />
                    </Touchable>
                  </View>

                  <View
                    style={[
                      styles.Viewe173518b,
                      { borderColor: theme.colors.lightGray, borderRadius: 10 },
                    ]}
                  >
                    <Touchable
                      onPress={() => {
                        const handler = async () => {
                          try {
                            const pickerValue2 = await Utils.openImagePicker({
                              allowsEditing: true,
                            });
                            await xanoAPIUploadDDGroupPic2POST.mutateAsync({
                              double_dating_teams_id: team_id ?? "",
                              group_photo_2: pickerValue2,
                            });
                            await refetchGetSingleDDTeamsRecord();
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                      style={styles.Touchable65072915}
                    >
                      <Image
                        style={styles.Image65072915}
                        resizeMode={"cover"}
                        source={{ uri: `${fetchData?.group_photo2?.url}` }}
                      />
                    </Touchable>
                  </View>

                  <View
                    style={[
                      styles.Viewe173518b,
                      { borderColor: theme.colors.lightGray, borderRadius: 10 },
                    ]}
                  >
                    <Touchable
                      onPress={() => {
                        const handler = async () => {
                          try {
                            const pickerValue3 = await Utils.openImagePicker({
                              allowsEditing: true,
                            });
                            await xanoAPIUploadDDGroupPic3POST.mutateAsync({
                              double_dating_teams_id: team_id ?? "",
                              group_photo_3: pickerValue3,
                            });
                            await refetchGetSingleDDTeamsRecord();
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                      style={styles.Touchable65072915}
                    >
                      <Image
                        style={styles.Image65072915}
                        source={{ uri: `${fetchData?.group_photo3?.url}` }}
                        resizeMode={"cover"}
                      />
                    </Touchable>
                  </View>
                </View>

                <View style={styles.Viewbaec827c}>
                  <View
                    style={[
                      styles.Viewe173518b,
                      { borderColor: theme.colors.lightGray, borderRadius: 10 },
                    ]}
                  >
                    <Touchable
                      onPress={() => {
                        const handler = async () => {
                          try {
                            const pickerValue4 = await Utils.openImagePicker({
                              allowsEditing: true,
                            });
                            await xanoAPIUploadDDGroupPic4POST.mutateAsync({
                              double_dating_teams_id: team_id ?? "",
                              group_photo_4: pickerValue4,
                            });
                            await refetchGetSingleDDTeamsRecord();
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                      style={styles.Touchable65072915}
                    >
                      <Image
                        style={styles.Image65072915}
                        resizeMode={"cover"}
                        source={{ uri: `${fetchData?.group_photo4?.url}` }}
                      />
                    </Touchable>
                  </View>

                  <View
                    style={[
                      styles.Viewe173518b,
                      { borderColor: theme.colors.lightGray, borderRadius: 10 },
                    ]}
                  >
                    <Touchable
                      onPress={() => {
                        const handler = async () => {
                          try {
                            const pickerValue5 = await Utils.openImagePicker({
                              allowsEditing: true,
                            });
                            await xanoAPIUploadDDGroupPic5POST.mutateAsync({
                              double_dating_teams_id: team_id ?? "",
                              group_photo_5: pickerValue5,
                            });
                            await refetchGetSingleDDTeamsRecord();
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                      style={styles.Touchable65072915}
                    >
                      <Image
                        style={styles.Image65072915}
                        resizeMode={"cover"}
                        source={{ uri: `${fetchData?.group_photo5?.url}` }}
                      />
                    </Touchable>
                  </View>

                  <View
                    style={[
                      styles.Viewe173518b,
                      { borderColor: theme.colors.lightGray, borderRadius: 10 },
                    ]}
                  >
                    <Touchable
                      onPress={() => {
                        const handler = async () => {
                          try {
                            const pickerValue6 = await Utils.openImagePicker({
                              allowsEditing: true,
                            });
                            await xanoAPIUploadDDGroupPic6POST.mutateAsync({
                              double_dating_teams_id: team_id ?? "",
                              group_photo_6: pickerValue6,
                            });
                            await refetchGetSingleDDTeamsRecord();
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                      style={styles.Touchable65072915}
                    >
                      <Image
                        style={styles.Image65072915}
                        resizeMode={"cover"}
                        source={{ uri: `${fetchData?.group_photo6?.url}` }}
                      />
                    </Touchable>
                  </View>
                </View>

                <View>
                  <Touchable
                    onPress={() => {
                      const handler = async () => {
                        try {
                          const response = await XanoAPIApi.checkDDPhotosGET(
                            Constants,
                            {
                              double_dating_teams_id: team_id ?? "",
                            }
                          );
                          const response_result = response.var_1;
                          setGlobalVariableValue({
                            key: "visible",
                            value: response_result,
                          });
                          if (response_result === true) {
                            return;
                          }
                          navigation.navigate("DDPromptsScreen", {
                            team_id: team_id ?? "",
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
                        styles.LinearGradient29beb386,
                        { borderRadius: 28 },
                      ]}
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
                        {"Next"}
                      </Text>
                    </LinearGradient>
                  </Touchable>
                </View>
              </>
            );
          }}
        </XanoAPIApi.FetchGetSingleDDTeamsRecordGET>
      </KeyboardAwareScrollView>
      <>
        {!Constants["visible"] ? null : (
          <Modal animationType={"slide"} presentationStyle={"pageSheet"}>
            <Text style={[styles.Textfae17694, { color: theme.colors.strong }]}>
              {"Oops!"}
            </Text>

            <Text style={[styles.Textcb760a31, { color: theme.colors.strong }]}>
              {"You must upload at least two group photos to continue."}
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
                styles.ButtonOutlinefcd59e07,
                {
                  borderColor: theme.colors["Static Purple"],
                  color: theme.colors["Static Purple"],
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
  ButtonOutlinefcd59e07: {
    backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: "Poppins_400Regular",
    marginTop: 16,
    textAlign: "center",
  },
  Fetch431eb058: { minHeight: 40 },
  Image65072915: { height: 95, width: 95 },
  Imageee92b18b: { height: 56, width: 68 },
  LinearGradient29beb386: {
    height: 51,
    justifyContent: "center",
    width: "100%",
  },
  Text5644fa6d: { fontFamily: "Poppins_300Light", fontSize: 12, marginTop: 0 },
  Textcb760a31: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 4,
  },
  Textd5df39eb: { fontFamily: "Poppins_400Regular", textAlign: "center" },
  Textf317f7b5: { fontFamily: "Poppins_700Bold", fontSize: 27, marginTop: 15 },
  Textfae17694: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    marginLeft: 20,
    marginTop: 30,
  },
  Touchable65072915: { height: 95, width: 95 },
  View1324b9e2: { flexDirection: "row", justifyContent: "space-evenly" },
  Viewbaec827c: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    marginTop: 10,
  },
  Viewe173518b: {
    borderBottomWidth: 0.75,
    borderLeftWidth: 0.75,
    borderRightWidth: 0.75,
    borderTopWidth: 0.75,
    overflow: "hidden",
  },
  Viewea564e7b: { marginBottom: 18 },
  screen: { marginLeft: 20, marginRight: 20, marginTop: 30 },
});

export default withTheme(DDUploadPhotosScreen);
