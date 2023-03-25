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
import moment from "moment";
import { ChannelList, useChatContext } from "stream-chat-expo";
import UserContext from "../context/UserContext.js";
import ActivityIndicator from "../components/ActivityIndicator.js";

const DDMatchesTabScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  const [channelListIds, setChannelListIds] = React.useState([]);
  const [loadingChannelList, setLoadingChannelList] = React.useState(true);

  const [user] = React.useContext(UserContext);

  const { client } = useChatContext();

  const modelFilter = (member) => {
    return {
      type: "messaging",
      members: { $in: [member] },
      member_count: 4,
    };
  };

  const sort = [{ last_message_at: -1 }];

  React.useEffect(() => {
    async function getCommonChannel() {
      try {
        const FirstUserChannels = await client.queryChannels(
          modelFilter(String(user?.selected_team?.user2_id)),
          sort,
          {
            watch: true, // this is the default
            state: true,
          }
        );

        const SecondUserChannels = await client.queryChannels(
          modelFilter(String(user?.selected_team?.user_id)),
          sort,
          {
            watch: true, // this is the default
            state: true,
          }
        );

        const commonChannel = FirstUserChannels.filter((c) =>
          SecondUserChannels.some((s) => s.cid === c.cid)
        ).map((m) => m.cid);

        setChannelListIds(commonChannel);
      } catch (error) {
        console.log({ error });
      } finally {
        setLoadingChannelList(false);
      }
    }
    getCommonChannel();
  }, []);

  const onChannelPressed = (channel) => {
    navigation.navigate("DDChatScreen", { channel });
  };

  //Custome Name of Channel on ChannelList
  const modelChannelName = (channel) => {
    const currentTeamMembers = [
      String(user?.selected_team?.user_id),
      String(user?.selected_team?.user2_id),
    ];
    const getNameOf = Object.entries(channel.state.members)
      .filter((member) => !currentTeamMembers.includes(member[0]))
      .map((member) => member[1]?.user?.name);

    return `${getNameOf[0]} & ${getNameOf[1]}`;
  };

  //get Channel Member Image on ChannelList
  const getChannelMemberImage = (channel) => {
    const currentTeamMembers = [
      String(user?.selected_team?.user_id),
      String(user?.selected_team?.user2_id),
    ];
    const getImageOf = Object.entries(channel.state.members)
      .filter((member) => !currentTeamMembers.includes(member[0]))
      .map((member) => member[1]?.user?.image);

    return getImageOf;
  };

  //channelListIds Length is 0 that means we don't have Any Channel to Show
  const filters = {
    type: "messaging",
    cid: channelListIds.length
      ? {
          $in: channelListIds,
        }
      : "",
    member_count: 4,
  };

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

  if (loadingChannelList) return <ActivityIndicator visible={true} />;

  return (
    <ScreenContainer
      scrollable={false}
      // hasTopSafeArea={true}
      hasSafeArea={false}
    >
      <ChannelList
        PreviewTitle={({ channel }) => (
          <View style={styles.View39912261}>
            <Text style={[styles.Text430d592a, { color: theme.colors.strong }]}>
              {modelChannelName(channel)}
            </Text>
          </View>
        )}
        // PreviewAvatar={({ channel }) => (
        //   <View
        //     style={[
        //       styles.Viewdb37c482,
        //       {
        //         borderTopLeftRadius: 12,
        //         borderBottomLeftRadius: 12,
        //       },
        //     ]}
        //   >
        //     <CircleImage
        //       style={styles.CircleImageb438ed9d}
        //       source={{
        //         uri:
        //           getChannelMemberImage(channel)[0] ??
        //           GlobalVariables.DEFAULT_USER_IMAGE,
        //       }}
        //       size={48}
        //     />
        //     <CircleImage
        //       style={styles.CircleImage83edf0c3}
        //       source={{
        //         uri:
        //           getChannelMemberImage(channel)[1] ??
        //           GlobalVariables.DEFAULT_USER_IMAGE,
        //       }}
        //       size={48}
        //     />
        //   </View>
        // )}
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
  CircleImage83edf0c3: {
    marginBottom: 27,
    marginLeft: -25,
  },
  CircleImageb438ed9d: {
    marginRight: 4,
    zIndex: 3,
  },
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
  Imagea7f9e204: {
    height: 158,
    width: 158,
  },
  Imageb06ca8a3: {
    height: 42,
    width: 50,
  },
  LinearGradient4704f023: {
    height: 51,
    justifyContent: "center",
    width: "100%",
  },
  ScrollViewe081026c: {
    flexGrow: 1,
  },
  ScrollViewe081026cContent: {
    flexShrink: 0,
    marginTop: 55,
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
    fontSize: 16,
    textAlign: "center",
  },
  Text8b5e265a: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  Texta7f0c839: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    paddingBottom: 4,
  },
  Texte6e33b3d: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
  },
  Textf17e297c: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 18,
  },
  View006d6a31: {
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  View059cfbad: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  View09162134: {
    marginRight: 12,
  },
  View189a5587: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: "center",
    marginLeft: 18,
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
  View7d6a39b7: {
    alignItems: "center",
    flexDirection: "row",
  },
  View7fd58046: {
    flexDirection: "row",
    flexGrow: 0,
    flexShrink: 0,
    paddingBottom: 12,
    paddingTop: 12,
  },
  View9494aafa: {
    alignItems: "center",
    justifyContent: "center",
  },
  Viewdb37c482: {
    alignItems: "center",
    flexDirection: "row",
    flexGrow: 0,
    flexShrink: 0,
    paddingLeft: 4,
  },
  Viewf8304bf6: {
    marginTop: 12,
  },
});

export default withTheme(DDMatchesTabScreen);
