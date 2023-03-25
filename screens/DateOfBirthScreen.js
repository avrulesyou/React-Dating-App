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
import { Image, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import UserContext from "../context/UserContext.js";
import AlertModal from "../components/AlertModal.js";

const DateOfBirthScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const xanoAPIEditUserInfoPOST = XanoAPIApi.useEditUserInfoPOST();
  const xanoAPIUserDateOfBirthPOST = XanoAPIApi.useUserDateOfBirthPOST();

  const [date, setDate] = React.useState(new Date());
  const [timestamp, setTimestamp] = React.useState(Date.now());
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);

  const [user, setUser] = React.useContext(UserContext);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setTimestamp(event?.nativeEvent?.timestamp);
  };

  return (
    <ScreenContainer
      style={styles.screen}
      hasSafeArea={true}
      scrollable={false}
    >
      <AlertModal
        isVisible={isAlertVisible}
        icon={Images.WarningIcon}
        title={"Age Limit"}
        subTitle={
          "You must be 18 years or older to create an account on Kupple."
        }
        onPressClose={() => setIsAlertVisible(false)}
        primary={"Confirm"}
        secondary={"Cancel"}
        onPressPrimary={() => setIsAlertVisible(false)}
        onPressSecondary={() => setIsAlertVisible(false)}
      />
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
            {"Date of Birth"}
          </Text>

          <Text
            style={[
              styles.Text06aff924,
              { color: theme.colors.poppinsLightBlack },
            ]}
          >
            {"Please enter your date of birth."}
          </Text>
        </View>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          display={"spinner"}
          onChange={onChange}
        />
        <View>
          <Touchable
            onPress={() => {
              const handler = async () => {
                try {
                  const result = await xanoAPIUserDateOfBirthPOST.mutateAsync({
                    dateOfBirth: timestamp,
                  });

                  if (result?.visible) {
                    setIsAlertVisible(true);
                    return;
                  }

                  navigation.navigate("GenderScreen");
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
          >
            <LinearGradient
              style={[styles.LinearGradient4704f023, { borderRadius: 28 }]}
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
  Text06aff924: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    marginTop: 0,
  },
  Text3a76ec9b: {
    fontFamily: "Poppins_700Bold",
    fontSize: 27,
    marginTop: 16,
  },
  Text8b5e265a: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  TextInput3bb40ce5: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 8,
    borderRightWidth: 1,
    borderTopWidth: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginBottom: 20,
    marginTop: 16,
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

export default withTheme(DateOfBirthScreen);
