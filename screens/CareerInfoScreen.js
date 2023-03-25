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
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Fetch } from "react-request";
import UserContext from "../context/UserContext.js";
import { capitalizeFirstLetter } from "../config/helper.js";

const CareerInfoScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const xanoAPIEditUserInfoPOST = XanoAPIApi.useEditUserInfoPOST();

  const [TextInputValue, setTextInputValue] = React.useState("");

  const [user, setUser] = React.useContext(UserContext);

  return (
    <ScreenContainer
      style={styles.screen}
      hasSafeArea={true}
      scrollable={false}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps={"always"}
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
            style={[styles.Text3a76ec9b, { color: theme.colors.staticPurple }]}
          >
            {"Career Info"}
          </Text>

          <Text
            style={[
              styles.Text3debbeb4,
              { color: theme.colors.poppinsLightBlack },
            ]}
          >
            {"What is your job title?"}
          </Text>
        </View>
        <TextInput
          onChangeText={(newTextInputValue) => {
            try {
              setTextInputValue(newTextInputValue);
            } catch (err) {
              console.error(err);
            }
          }}
          style={[
            styles.TextInputb9ce71db,
            {
              borderColor: theme.colors.divider,
              color: theme.colors["Gray Chat Lettering"],
            },
          ]}
          placeholder={"Enter job title..."}
          placeholderTextColor={theme.colors["Light Gray"]}
          autoFocus={true}
          defaultValue={user?.job_title ?? ""}
        />
        <Touchable
          onPress={() => {
            try {
              navigation.navigate("LocationScreen");
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <Text
            style={[styles.Text03260af4, { color: theme.colors.lightGray }]}
          >
            {"Skip"}
          </Text>
        </Touchable>

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
              <View>
                <Touchable
                  onPress={() => {
                    const handler = async () => {
                      try {
                        const newJob_title = setGlobalVariableValue({
                          key: "job_title",
                          value: TextInputValue,
                        });

                        const updatedUser =
                          await xanoAPIEditUserInfoPOST.mutateAsync({
                            company: fetchData?.company,
                            gender: fetchData?.gender,
                            job_title: capitalizeFirstLetter(newJob_title),
                            name: fetchData?.name,
                            sexual_interest: fetchData?.sexual_interest,
                            user_city: fetchData?.user_city,
                          });
                        setUser({ ...user, ...updatedUser });
                        navigation.navigate("LocationScreen");
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
                      {"Next"}
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
  LinearGradient4704f023: {
    height: 51,
    justifyContent: "center",
    width: "100%",
  },
  Text03260af4: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginBottom: 16,
    textAlign: "right",
    textDecorationLine: "underline",
  },
  Text3a76ec9b: {
    fontFamily: "Poppins_700Bold",
    fontSize: 27,
    marginTop: 16,
  },
  Text3debbeb4: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
  },
  Text8b5e265a: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  TextInputb9ce71db: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 8,
    borderRightWidth: 1,
    borderTopWidth: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginBottom: 16,
    marginTop: 4,
    minHeight: 50,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
  },
  screen: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
});

export default withTheme(CareerInfoScreen);
