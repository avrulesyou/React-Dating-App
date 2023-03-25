import React from "react";
import * as GlobalVariables from "../config/GlobalVariableContext";
import Images from "../config/Images";
import {
  LinearGradient,
  ScreenContainer,
  Surface,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { Image, StyleSheet, Text, View } from "react-native";

const InviteFriendSuccessScreen = (props) => {
  const { theme } = props;
  const { navigation } = props;

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.background }}
      hasBottomSafeArea={false}
      scrollable={false}
      hasSafeArea={false}
      hasTopSafeArea={true}
    >
      <View
        style={[
          styles.View91652d5a,
          { backgroundColor: theme.colors.communialWhite },
        ]}
      >
        <View style={styles.Viewc689abd8}>
          <Image
            style={styles.Image8c142508}
            source={Images.InviteSuccess}
            resizeMode={"contain"}
          />
        </View>

        <View style={styles.Viewbd0a9d03}>
          <Text
            style={[
              styles.Texte6e33b3d,
              { color: theme.colors.grayChatLettering },
            ]}
          >
            {"Your invite has been sent!"}
          </Text>

          <Text
            style={[
              styles.Text7d6303eb,
              { color: theme.colors.grayChatLettering },
            ]}
          >
            {
              "Once your friend accepts the invite,your team will be visible on the Teams page."
            }
          </Text>
        </View>
        <>
          <View style={styles.View059cfbad}>
            <Surface
              style={[styles.Surface9b87f518, { borderRadius: 28 }]}
              elevation={3}
            >
              <Touchable
                onPress={() => {
                  try {
                    navigation.navigate("TeamsScreen");
                  } catch (err) {
                    console.error(err);
                  }
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
                    {"Return to Teams"}
                  </Text>
                </LinearGradient>
              </Touchable>
            </Surface>
          </View>
        </>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Image8c142508: {
    height: 175,
    width: 175,
  },
  LinearGradient4704f023: {
    height: 51,
    justifyContent: "center",
    width: "100%",
  },
  ScrollView2b38a12cContent: {
    marginTop: 70,
    paddingBottom: 80,
  },
  Surface08cb0ab8: {
    minHeight: 40,
    overflow: "hidden",
  },
  Surface9b87f518: {
    minHeight: 40,
  },
  Text1b303628: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    textAlign: "center",
  },
  Text1bfea2cb: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
  },
  Text1e1f916a: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    textAlign: "center",
  },
  Text430d592a: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    textAlign: "center",
  },
  Text7d6303eb: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  Text8b5e265a: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  Texte6e33b3d: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
  },
  View059cfbad: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  View0f73ae71: {
    bottom: 90,
    left: 20,
    position: "absolute",
    right: 20,
  },
  View1d8587d2: {
    alignItems: "center",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 5,
  },
  View39912261: {
    alignItems: "center",
  },
  View523a7924: {
    flex: 1,
    marginTop: 12,
    maxWidth: "50%",
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
  },
  View779f4589: {
    alignSelf: "center",
    bottom: 20,
    marginBottom: 20,
    position: "absolute",
    width: "80%",
    zIndex: 2,
  },
  View7a184f84: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    overflow: "hidden",
  },
  View91652d5a: {
    height: "100%",
    justifyContent: "center",
    width: "100%",
    zIndex: 4,
  },
  View9494aafa: {
    alignItems: "center",
    justifyContent: "center",
  },
  Viewa76b7c63: {
    alignItems: "center",
    marginBottom: 4,
    marginTop: 4,
  },
  Viewbd0a9d03: {
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  Viewc0ba4da7: {
    alignSelf: "center",
    marginLeft: 20,
    marginRight: 20,
    width: "60%",
  },
  Viewc689abd8: {
    alignItems: "center",
    marginBottom: 16,
  },
  Viewd42e9bbc: {
    height: 180,
  },
});

export default withTheme(InviteFriendSuccessScreen);
