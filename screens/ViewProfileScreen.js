import React from "react";
import * as CustomCode from "../CustomCode.js";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import {
  Divider,
  Icon,
  ScreenContainer,
  Surface,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Fetch } from "react-request";
import Image from "../components/CachedImage";
import UserContext from "../context/UserContext.js";
import CustomIcon from "../components/CustomIcon.js";

const ViewProfileScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const [user] = React.useContext(UserContext);

  const requestLocation = async () => {
    let { status } = await CustomCode.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Access to your location is needed to complete this action");
      return null;
    }

    let location = await CustomCode.getCurrentPositionAsync({});
    return location;
  };

  const { theme } = props;
  const { navigation } = props;

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.communialWhite }}
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
                navigation.navigate("BottomTabNavigator", {
                  screen: "ProfileTabScreen",
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
            {"Profile"}
          </Text>
        </View>
        <View style={styles.View0cd1e7ab} />
      </View>

      <ScrollView showsVerticalScrollIndicator={true} bounces={true}>
        <>
          {user?.featured_photo?.url && (
            <Surface
              style={[
                styles.Surface553a686d,
                {
                  backgroundColor: theme.colors.lightGray,
                  borderColor: theme.colors.lightGray,
                  borderRadius: 20,
                },
              ]}
              elevation={3}
            >
              {/* First Pic */}
              <View style={{ borderRadius: 20 }}>
                <Image
                  style={styles.Image405d7a68}
                  source={{ uri: `${user?.featured_photo?.url}` }}
                  resizeMode={"cover"}
                />
              </View>
            </Surface>
          )}

          <Divider
            style={styles.Divider21f06762}
            color={theme.colors.lightBorderColor}
          />
          {/* Name and Social Icons */}
          <View style={styles.View7e92d9ae}>
            <View style={styles.Viewee33c0b7}>
              {/* Name and Age */}
              <Text
                style={[
                  styles.Textc5227374,
                  { color: theme.colors.grayChatLettering },
                ]}
              >
                {user?.name}
                {", "}
                {user?.age}
              </Text>
            </View>
          </View>
          {/* Location */}
          <View style={styles.Viewece0b640}>
            <View style={styles.View7d6a39b7}>
              <CustomIcon
                color={theme.colors.grayChatLettering}
                name={"AntDesign/home"}
                size={22}
              />
              {/* Location */}
              <Text
                style={[
                  styles.Text153d3e18,
                  { color: theme.colors.grayChatLettering },
                ]}
              >
                {user?.user_city}
              </Text>
            </View>

            <View style={styles.Viewc0ba6ba7}>
              <CustomIcon
                name={"EvilIcons/location"}
                size={22}
                color={theme.colors.grayChatLettering}
              />
              {/* Location */}
              <Text
                style={[
                  styles.Textb3c68225,
                  { color: theme.colors.grayChatLettering },
                ]}
              >
                {"1 mile away"}
              </Text>
            </View>

            {user?.job_title && (
              <View style={styles.Viewc0ba6ba7}>
                <CustomIcon
                  size={22}
                  color={theme.colors.grayChatLettering}
                  name={"Ionicons/briefcase-outline"}
                />
                <Text
                  style={[
                    styles.Textb3c68225,
                    { color: theme.colors.grayChatLettering },
                  ]}
                >
                  {user?.job_title}
                </Text>
              </View>
            )}
          </View>
          {/* About Me */}
          <>
            {!user?.bio ? null : (
              <View
                style={[
                  styles.View210f2c5e,
                  { borderColor: theme.colors.lightGray },
                ]}
              >
                {/* About Me Text */}
                <Text
                  style={[
                    styles.Text35a6967c,
                    { color: theme.colors.grayChatLettering },
                  ]}
                >
                  {"About Me"}
                </Text>

                <View style={styles.View90ea170d}>
                  {/* Bio */}
                  <Text
                    style={[
                      styles.Textd89e8b33,
                      { color: theme.colors.grayChatLettering },
                    ]}
                  >
                    {user?.bio}
                  </Text>
                </View>
              </View>
            )}
          </>
          <Divider
            style={styles.Divider525ee5e9}
            color={theme.colors.lightBorderColor}
          />
          {/* Second Pic */}
          {user?.profilePic2?.url && (
            <View
              style={[
                styles.Viewd3e31259,
                { borderColor: theme.colors.lightGray, borderRadius: 20 },
              ]}
            >
              <Image
                style={styles.Image405d7a68}
                resizeMode={"cover"}
                source={{ uri: `${user?.profilePic2?.url}` }}
              />
            </View>
          )}

          {user?.prompt_1_response && (
            <View
              style={[
                styles.View0e9c4a27,
                { borderColor: theme.colors.lightGray, borderRadius: 28 },
              ]}
            >
              {/* Prompt1 */}
              <Text
                style={[
                  styles.Text2e9eb673,
                  { color: theme.colors.grayChatLettering },
                ]}
              >
                {user?.prompt_1}
              </Text>
              {/* Prompt 1 Response */}
              <Text
                style={[
                  styles.Textff2ede45,
                  { color: theme.colors.grayChatLettering },
                ]}
              >
                {user?.prompt_1_response}
              </Text>
            </View>
          )}

          {/* Third Pic */}
          {user?.profilePic3?.url && (
            <View
              style={[
                styles.Viewc88f7e60,
                { borderColor: theme.colors.lightGray, borderRadius: 20 },
              ]}
            >
              <Image
                style={styles.Image405d7a68}
                resizeMode={"cover"}
                source={{ uri: `${user?.profilePic3?.url}` }}
              />
            </View>
          )}

          {user?.prompt_2_response && (
            <View
              style={[
                styles.Viewea858d67,
                { borderColor: theme.colors.lightGray, borderRadius: 28 },
              ]}
            >
              {/* Prompt2 */}
              <Text
                style={[
                  styles.Text2e9eb673,
                  { color: theme.colors.grayChatLettering },
                ]}
              >
                {user?.prompt_2}
              </Text>
              {/* Prompt 2 Response */}
              <Text
                style={[
                  styles.Text94bc1780,
                  { color: theme.colors.grayChatLettering },
                ]}
              >
                {user?.prompt_2_response}
              </Text>
            </View>
          )}

          {/* Fourth Pic */}
          {user?.profilePic4?.url && (
            <View
              style={[
                styles.View596f480e,
                { borderColor: theme.colors.lightGray, borderRadius: 20 },
              ]}
            >
              <Image
                style={styles.Image405d7a68}
                resizeMode={"cover"}
                source={{ uri: `${user?.profilePic4?.url}` }}
              />
            </View>
          )}

          {/* Fifth Pic */}
          {user?.profilePic5?.url && (
            <View
              style={[
                styles.Viewc88f7e60,
                { borderColor: theme.colors.lightGray, borderRadius: 20 },
              ]}
            >
              <Image
                style={styles.Image405d7a68}
                resizeMode={"cover"}
                source={{ uri: `${user?.profilePic5?.url}` }}
              />
            </View>
          )}

          {user?.prompt_3_response && (
            <View
              style={[
                styles.View8fb49519,
                { borderColor: theme.colors.lightGray, borderRadius: 28 },
              ]}
            >
              {/* Prompt3 */}
              <Text
                style={[
                  styles.Text52eafb1c,
                  { color: theme.colors.grayChatLettering },
                ]}
              >
                {user?.prompt_3}
              </Text>
              {/* Prompt 3 Response */}
              <Text
                style={[
                  styles.Text94bc1780,
                  { color: theme.colors.grayChatLettering },
                ]}
              >
                {user?.prompt_3_response}
              </Text>
            </View>
          )}

          {/* Sixth Pic */}
          {user?.profilePic6?.url && (
            <View
              style={[
                styles.View62da8741,
                { borderColor: theme.colors.lightGray, borderRadius: 20 },
              ]}
            >
              <Image
                style={styles.Image405d7a68}
                resizeMode={"cover"}
                source={{ uri: `${user?.profilePic6?.url}` }}
              />
            </View>
          )}
        </>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Divider21f06762: {
    height: 1,
    marginBottom: 16,
    marginLeft: 14,
    marginRight: 14,
  },
  Divider525ee5e9: {
    height: 1,
    marginBottom: 4,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 16,
  },
  Fetch431eb058: { minHeight: 40 },
  Image405d7a68: { minHeight: 375, width: "100%" },
  Surface553a686d: {
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    marginBottom: 16,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 60,
    minHeight: 375,
    overflow: "hidden",
  },
  Text153d3e18: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.89,
  },
  Text2e9eb673: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginLeft: 20,
    marginRight: 20,
  },
  Text35a6967c: { fontFamily: "Poppins_500Medium", fontSize: 17 },
  Text52eafb1c: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginLeft: 20,
    marginRight: 20,
  },
  Text94bc1780: {
    fontFamily: "Poppins_400Regular",
    fontSize: 22,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 12,
  },
  Textb3c68225: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.89,
  },
  Textc5227374: { fontFamily: "Poppins_500Medium", fontSize: 26 },
  Textd89e8b33: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    opacity: 0.89,
  },
  Textda110b1a: {
    fontFamily: "Poppins_500Medium",
    fontSize: 24,
    textAlign: "center",
  },
  Textff2ede45: {
    fontFamily: "Poppins_400Regular",
    fontSize: 22,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 12,
  },
  View0cd1e7ab: {
    alignItems: "center",
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  View0e9c4a27: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    justifyContent: "center",
    marginLeft: 12,
    marginRight: 12,
    marginTop: 24,
    minHeight: 160,
  },
  View210f2c5e: { marginLeft: 14, marginRight: 14, marginTop: 12 },
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
  View596f480e: {
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 24,
    overflow: "hidden",
  },
  View62da8741: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    marginBottom: 24,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 24,
    overflow: "hidden",
  },
  View7d6a39b7: { alignItems: "center", flexDirection: "row" },
  View7e92d9ae: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 14,
    marginRight: 14,
  },
  View8fb49519: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    justifyContent: "center",
    marginLeft: 12,
    marginRight: 12,
    marginTop: 24,
    minHeight: 160,
  },
  View90ea170d: { flexDirection: "row", marginTop: 4 },
  Viewc0ba6ba7: { alignItems: "center", flexDirection: "row", marginTop: 3 },
  Viewc88f7e60: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 24,
    overflow: "hidden",
  },
  Viewd3e31259: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
    overflow: "hidden",
  },
  Viewea858d67: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    justifyContent: "center",
    marginLeft: 12,
    marginRight: 12,
    marginTop: 24,
    minHeight: 160,
  },
  Viewece0b640: {
    justifyContent: "space-between",
    marginLeft: 14,
    marginRight: 14,
    marginTop: 3,
  },
  Viewee33c0b7: { justifyContent: "flex-end" },
});

export default withTheme(ViewProfileScreen);
