import React from "react";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import Images from "../config/Images";
import {
  LinearGradient,
  ScreenContainer,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Fetch } from "react-request";
import UserContext from "../context/UserContext.js";

const GenderScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const xanoAPIEditUserInfoPOST = XanoAPIApi.useEditUserInfoPOST();

  const [numberInputValue, setNumberInputValue] = React.useState("");
  const [textInputValue, setTextInputValue] = React.useState("");

  const [user, setUser] = React.useContext(UserContext);

  return (
    <ScreenContainer
      style={styles.screen}
      hasSafeArea={true}
      scrollable={false}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps={"never"}
        enableAutomaticScroll={true}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <View>
          <Image
            style={styles.Imageee92b18b}
            source={Images.Final03}
            resizeMode={"contain"}
          />
          <Text
            style={[styles.Text8e60057b, { color: theme.colors.staticPurple }]}
          >
            {"Gender"}
          </Text>

          <Text
            style={[
              styles.Text06aff924,
              { color: theme.colors.poppinsLightBlack },
            ]}
          >
            {"What is your gender?"}
          </Text>
        </View>

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
              <View style={styles.View7c604ee7}>
                <Touchable
                  onPress={() => {
                    const handler = async () => {
                      try {
                        const newGender = setGlobalVariableValue({
                          key: "gender",
                          value: "male",
                        });
                        const updatedUser =
                          await xanoAPIEditUserInfoPOST.mutateAsync({
                            company: fetchData?.company,
                            gender: newGender,
                            job_title: fetchData?.job_title,
                            name: fetchData?.name,
                            sexual_interest: fetchData?.sexual_interest,
                            user_city: fetchData?.user_city,
                          });
                        setUser({ ...user, ...updatedUser });
                        navigation.navigate("SexuallyInterestedInScreen");
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                >
                  <LinearGradient
                    style={[styles.LinearGradient3333a125, { borderRadius: 8 }]}
                    endY={0}
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
                      {"Male"}
                    </Text>
                  </LinearGradient>
                </Touchable>

                <Touchable
                  onPress={() => {
                    const handler = async () => {
                      try {
                        const newGender = setGlobalVariableValue({
                          key: "gender",
                          value: "female",
                        });
                        await xanoAPIEditUserInfoPOST.mutateAsync({
                          company: fetchData?.company,
                          gender: newGender,
                          job_title: fetchData?.job_title,
                          name: fetchData?.name,
                          sexual_interest: fetchData?.sexual_interest,
                          user_city: fetchData?.user_city,
                        });
                        navigation.navigate("SexuallyInterestedInScreen");
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={styles.Touchable6728d304}
                >
                  <LinearGradient
                    style={[styles.LinearGradient3333a125, { borderRadius: 8 }]}
                    endY={0}
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
                      {"Female"}
                    </Text>
                  </LinearGradient>
                </Touchable>

                <Touchable
                  onPress={() => {
                    const handler = async () => {
                      try {
                        const newGender = setGlobalVariableValue({
                          key: "gender",
                          value: "nonBinary",
                        });
                        await xanoAPIEditUserInfoPOST.mutateAsync({
                          company: fetchData?.company,
                          gender: newGender,
                          job_title: fetchData?.job_title,
                          name: fetchData?.name,
                          sexual_interest: fetchData?.sexual_interest,
                          user_city: fetchData?.user_city,
                        });
                        navigation.navigate("SexuallyInterestedInScreen");
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={styles.Touchable6728d304}
                >
                  <LinearGradient
                    style={[styles.LinearGradient3333a125, { borderRadius: 8 }]}
                    endY={0}
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
                      {"Non-Binary"}
                    </Text>
                  </LinearGradient>
                </Touchable>
              </View>
            );
          }}
        </XanoAPIApi.FetchGetSingleItemGET>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Fetch431eb058: {
    minHeight: 40,
  },
  Imageee92b18b: {
    height: 56,
    width: 68,
  },
  LinearGradient3333a125: {
    height: 51,
    justifyContent: "center",
    width: "100%",
  },
  Text06aff924: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    marginTop: 0,
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
  Touchable6728d304: {
    marginTop: 16,
  },
  View7c604ee7: {
    marginTop: 18,
  },
  screen: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
});

export default withTheme(GenderScreen);
