import React from "react";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import {
  CircleImage,
  Divider,
  Icon,
  LinearGradient,
  ScreenContainer,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
} from "react-native";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";
import Constants from "expo-constants";
import UserContext from "../context/UserContext";
import { DEFAULT_USER_IMAGE } from "../config/GlobalVariableContext";
import ChatSettingPopUp from "../components/ChatSettingPopUp";

const ChatScreen = (props) => {
  const [memberProfile, setMemberProfile] = React.useState(null);
  const [onPressSetting, setOnPressSetting] = React.useState(false);

  const {
    route: {
      params: { channel },
    },
    theme,
    navigation,
  } = props;

  const [currentUser] = React.useContext(UserContext);

  const xanoAPIChatUnmatchUserPOST = XanoAPIApi.useChatUnmatchUserPOST();
  const xanoAPIChatBlockUserPOST = XanoAPIApi.useChatBlockUserPOST();

  React.useEffect(() => {
    if (channel.state.members && currentUser) {
      const currentChatMemberId = Object.keys(channel.state.members).find(
        (id) => id != currentUser.id
      );
      const currentChatMember = channel.state.members[currentChatMemberId].user;
      setMemberProfile(currentChatMember);
    }
  }, []);

  const handleOnPressUnmatch = async () => {
    try {
      await xanoAPIChatUnmatchUserPOST.mutateAsync({
        user2_id: memberProfile?.id,
      });
      await channel.delete();
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnPressBlock = async () => {
    try {
      await xanoAPIChatBlockUserPOST.mutateAsync({
        user2_id: memberProfile?.id,
      });
      await channel.delete();
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  };

  if (!channel) return;

  return (
    <Pressable
      onPress={() => setOnPressSetting(false)}
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        paddingBottom: Constants.statusBarHeight * 2,
        borderColor: theme.colors.divider,
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={styles.Viewaf86bec4}>
        <View style={styles.View09a7eea0}>
          <Touchable
            onPress={() => {
              try {
                navigation.goBack();
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <Icon size={24} name={"AntDesign/arrowleft"} />
          </Touchable>
        </View>
        <Touchable
          style={styles.Viewb5179aff}
          onPress={() =>
            navigation.navigate("ProfileViewScreen", {
              user_id: memberProfile?.id ?? "",
            })
          }
        >
          <View style={styles.View96fe2ac3}>
            <CircleImage
              source={{
                uri: memberProfile?.image ?? DEFAULT_USER_IMAGE,
              }}
              size={48}
            />
          </View>
          <Text
            style={[
              styles.Text79ab7d4a,
              { color: theme.colors.grayChatLettering },
            ]}
          >
            {memberProfile?.name}
          </Text>
        </Touchable>
        <View style={styles.View81e0d443}>
          <View style={styles.View4f6009be}>
            <Touchable onPress={() => setOnPressSetting(true)}>
              <Icon
                color={"#000"}
                name={"Ionicons/settings-outline"}
                size={24}
              />
            </Touchable>
          </View>
        </View>
      </View>

      <Channel channel={channel} keyboardVerticalOffset={10}>
        <MessageList />
        <MessageInput />
      </Channel>

      {onPressSetting && (
        <ChatSettingPopUp
          onPressUnmatch={handleOnPressUnmatch}
          onPressBlock={handleOnPressBlock}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Dividerc2e65f96: {
    height: 1,
    marginTop: 2,
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  FlatListc992f941Content: {
    flex: 1,
  },
  KeyboardAwareScrollViewc67db5fe: {
    flexGrow: 0,
  },
  KeyboardAwareScrollViewc67db5feContent: {
    flexShrink: 2,
  },
  LinearGradient92ac5fce: {
    alignItems: "center",
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  LinearGradientc83a394b: {
    alignItems: "center",
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  ScrollView951db784Content: {
    marginBottom: 70,
    paddingBottom: 60,
  },
  Text02d9ab76: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
  },
  Text29584d99: {
    fontFamily: "Poppins_300Light",
    fontSize: 10,
    textAlign: "center",
  },
  Text34449b6f: {
    fontFamily: "Roboto_400Regular",
    fontSize: 11,
  },
  Text4be7f84d: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 22,
  },
  Text51d114ee: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 22,
  },
  Text79ab7d4a: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    lineHeight: 20,
    textAlign: "left",
  },
  TextInput8eb751d6: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 60,
    borderRightWidth: 1,
    borderTopWidth: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    marginLeft: 12,
    marginRight: 12,
    paddingBottom: 15,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 15,
  },
  View0419a0dc: {
    flexGrow: 1,
    flexShrink: 0,
  },
  View09a7eea0: {
    justifyContent: "center",
    minWidth: 42,
    paddingBottom: 7,
    paddingTop: 7,
  },
  View1405c982: {
    bottom: "0%",
    flexGrow: 1,
    flexShrink: 0,
    height: 84,
    position: "absolute",
    width: "100%",
    zIndex: 500,
  },
  View49ad1539: {
    flexGrow: 1,
    flexShrink: 0,
    marginTop: 8,
    paddingBottom: 6,
    paddingTop: 12,
  },
  View4f6009be: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: "center",
  },
  View6fc1f5de: {
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: "center",
  },
  View71a3150a: {
    justifyContent: "center",
    maxWidth: "61%",
  },
  View7524ca01: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  View81e0d443: {
    paddingBottom: 7,
    paddingTop: 7,
  },
  View8cbbf3f8: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 4,
  },
  View91edb4b3: {
    marginTop: 8,
  },
  View948cb1e7: {
    alignItems: "center",
    flexDirection: "row",
    flexGrow: 0,
    flexShrink: 0,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
  },
  View96fe2ac3: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: "center",
    marginBottom: 2,
    marginTop: 8,
  },
  Viewac22decc: {
    flexGrow: 1,
    flexShrink: 0,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 6,
    paddingTop: 18,
  },
  Viewaf86bec4: {
    flexDirection: "row",
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: "space-between",
    paddingLeft: 12,
    paddingRight: 12,
    borderBottomWidth: 1,
    borderColor: "#E7E7E7",
  },
  Viewb2450767: {
    flexShrink: 0,
    minHeight: 35,
    minWidth: 100,
    paddingBottom: 9,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
  },
  Viewb5179aff: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    flexShrink: 0,
  },
  Viewb6d72b06: {
    justifyContent: "center",
    marginRight: 8,
    maxWidth: "61%",
  },
  Viewbabcec09: {
    marginLeft: 4,
  },
  Viewbd31c6f8: {
    marginTop: 4,
    paddingLeft: 4,
  },
  Viewcf73bfa2: {
    flexShrink: 0,
    minHeight: 35,
    minWidth: 100,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
  },
  Viewdbf79098: {
    flexGrow: 0,
    flexShrink: 0,
  },
  Viewdebd3207: {
    flexDirection: "row",
  },
  Viewee33c0b7: {
    justifyContent: "flex-end",
  },
});

export default withTheme(ChatScreen);
