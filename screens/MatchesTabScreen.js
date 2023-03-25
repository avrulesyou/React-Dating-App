import React from "react";
import * as GlobalVariables from "../config/GlobalVariableContext";
import Images from "../config/Images";
import {
  Circle,
  CircleImage,
  Icon,
  LinearGradient,
  ScreenContainer,
  Surface,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { Image, StyleSheet, Text, View } from "react-native";
import moment from "moment";
import {
  ChannelAvatar,
  ChannelList,
  ChannelListMessenger,
  ChannelPreviewMessage,
  ChannelPreviewMessenger,
} from "stream-chat-expo";
import UserContext from "../context/UserContext.js";

const MatchesTabScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  const [selectedChannel, setSelectedChannel] = React.useState(null);

  const [user] = React.useContext(UserContext);

  const onChannelPressed = (channel) => {
    setSelectedChannel(channel);
    navigation.navigate("ChatScreen", { channel });
  };

  const filters = { members: { $in: [String(user?.id)] }, member_count: 2 };

  //Custome Status of Channel on ChannelList
  //Adjust Emty Message Status
  const modelChannelStatus = ({ channel, latestMessagePreview }) => {
    const isItToday =
      moment(moment()._d).format("l") ==
      moment(channel?.data?.created_at).format("l");

    const noMessageTimeStatus = isItToday
      ? moment(channel?.data?.created_at).format("LT")
      : moment(channel?.data?.created_at).format("l");

    return channel?.state?.last_message_at
      ? `${latestMessagePreview?.created_at}`
      : noMessageTimeStatus;
  };

  const modelChannelTitle = ({ channel }) => {
    return `${channel?.data?.created_by?.name ?? ""}`;
  };

  const modelChannelMessage = ({ latestMessagePreview }) => {
    console.log({ latestMessagePreview });

    return `${latestMessagePreview?.messageObject?.text ?? ""}`;
  };

  return (
    <ScreenContainer
      scrollable={false}
      hasTopSafeArea={true}
      hasSafeArea={false}
    >
      <View
        style={[
          styles.View1d8587d2,
          {
            borderColor: theme.colors.divider,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <View>
          <Image
            style={styles.Image8d9dc9c5}
            source={Images.Final03}
            resizeMode={"contain"}
          />
        </View>

        <View style={styles.View39912261}>
          <Text style={[styles.Text430d592a, { color: theme.colors.strong }]}>
            {"Matches"}
          </Text>
        </View>

        <View style={styles.View9494aafa}>
          <Touchable
            onPress={() => {
              try {
                navigation.navigate("TeamsScreen");
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <Circle size={50} bgColor={theme.colors.greyChatMessages}>
              <Icon
                style={styles.Icon4b79332f}
                size={25}
                color={theme.colors.poppinsLightBlack}
                name={"Ionicons/ios-people-outline"}
              />
            </Circle>
          </Touchable>
        </View>
      </View>

      <ChannelList
        onSelect={onChannelPressed}
        filters={filters}
        PreviewStatus={(channel) => {
          return (
            <Text
              style={{
                fontSize: 12,
                color: theme.colors["Light Gray"],
              }}
            >
              {modelChannelStatus(channel)}
            </Text>
          );
        }}
        EmptyStateIndicator={() => (
          <View style={styles.View69c23daf}>
            <View style={styles.View39912261}>
              <Image
                style={styles.Imagea7f9e204}
                source={Images.Jigsaw1}
                resizeMode={"contain"}
              />
            </View>

            <View style={styles.View2c095495}>
              <Text
                style={[
                  styles.Texte6e33b3d,
                  { color: theme.colors.grayChatLettering },
                ]}
              >
                {"You're new here. No matches yet!"}
              </Text>

              <Text
                style={[
                  styles.Text0328bc39,
                  { color: theme.colors.grayChatLettering },
                ]}
              >
                {"When you get your first match, you can chat with them here!"}
              </Text>
            </View>

            <View style={styles.View059cfbad}>
              <Surface style={[styles.Surface9b87f518, { borderRadius: 28 }]}>
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate("SubscriptionOptionsScreen");
                    } catch (err) {
                      console.error(err);
                    }
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
                      {"Upgrade Now"}
                    </Text>
                  </LinearGradient>
                </Touchable>
              </Surface>
            </View>
          </View>
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Dividerde11d607: {
    height: 1,
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  FlatListc992f941Content: {
    flex: 1,
  },
  Icon4b79332f: {
    marginBottom: 1,
  },
  Image8d9dc9c5: {
    height: 42,
    width: 50,
  },
  Imagea7f9e204: {
    height: 158,
    width: 158,
  },
  LinearGradient4704f023: {
    height: 51,
    justifyContent: "center",
    width: "100%",
  },
  ScrollView6b9b7eaa: {
    flexGrow: 1,
  },
  ScrollView6b9b7eaaContent: {
    flexShrink: 0,
    top: 55,
  },
  Surface9b87f518: {
    minHeight: 40,
  },
  Text0328bc39: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  Text430d592a: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    textAlign: "center",
  },
  Text8b5e265a: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  Text9ef9db67: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    paddingBottom: 4,
  },
  Textbc8ec4a0: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 18,
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
  View09162134: {
    marginRight: 12,
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
    position: "relative",
    right: 0,
    top: 0,
    zIndex: 5,
  },
  View2345b38d: {
    flexDirection: "row",
    flexGrow: 0,
    flexShrink: 0,
    paddingBottom: 4,
    paddingTop: 4,
  },
  View2c095495: {
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 16,
  },
  View39912261: {
    alignItems: "center",
  },
  View69c23daf: {
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  View902abe0e: {
    alignItems: "center",
    flexDirection: "row",
    maxWidth: 250,
  },
  View931ffa01: {
    alignItems: "center",
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: "center",
  },
  View9494aafa: {
    alignItems: "center",
    justifyContent: "center",
  },
  Viewc1f0d5b7: {
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  Viewf8304bf6: {
    marginTop: 12,
  },
  Viewfcd7183b: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: "center",
    marginLeft: 18,
  },
});

export default withTheme(MatchesTabScreen);
