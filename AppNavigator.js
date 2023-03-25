import * as React from "react";
import {
  I18nManager,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { systemWeights } from "react-native-typography";
import { Icon, Touchable } from "@draftbit/ui";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Constants from "expo-constants";
import theme from "./themes/DraftbitTheme.js";
import Images from "./config/Images";
import { DD_SCREEN_TITLE } from "./config/GlobalVariableContext";

import CareerInfoScreen from "./screens/CareerInfoScreen";
import CodeVerificationScreen_kibEVzWy from "./screens/CodeVerificationScreen_kibEVzWy";
import ContactsListScreen from "./screens/ContactsListScreen";
import DDEditProfileScreen from "./screens/DDEditProfileScreen";
import DDHomeScreen from "./screens/DDHomeScreen";
import DDLikesMeTabScreen from "./screens/DDLikesMeTabScreen";
import DDMatchesTabScreen from "./screens/DDMatchesTabScreen";
import DDProfileTabScreen from "./screens/DDProfileTabScreen";
import DDProfileViewScreen from "./screens/DDProfileViewScreen";
import DDProfileViewWithLikeScreen from "./screens/DDProfileViewWithLikeScreen";
import DDPromptsScreen from "./screens/DDPromptsScreen";
import DDSettingsScreen_0JVpbZ86 from "./screens/DDSettingsScreen_0JVpbZ86";
import DDUploadPhotosScreen from "./screens/DDUploadPhotosScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import FirstNameScreen from "./screens/FirstNameScreen";
import GenderScreen from "./screens/GenderScreen";
import HomeScreen from "./screens/HomeScreen";
import IDVerificationScreen from "./screens/IDVerificationScreen";
import JoinTeamScreen from "./screens/JoinTeamScreen";
import LikesMeTabScreen from "./screens/LikesMeTabScreen";
import LocationScreen from "./screens/LocationScreen";
import LoginScreen_o3IxayGE from "./screens/LoginScreen_o3IxayGE";
import LoginVerificationScreen from "./screens/LoginVerificationScreen";
import MatchesTabScreen from "./screens/MatchesTabScreen";
import PhoneVerificationScreen from "./screens/PhoneVerificationScreen";
import ProfileTabScreen from "./screens/ProfileTabScreen";
import ProfileViewScreen from "./screens/ProfileViewScreen";
import ProfileViewWithLikeScreen from "./screens/ProfileViewWithLikeScreen";
import PromptsInputScreen from "./screens/PromptsInputScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SexuallyInterestedInScreen from "./screens/SexuallyInterestedInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SubscriptionOptionsScreen from "./screens/SubscriptionOptionsScreen";
import TeamsScreen from "./screens/TeamsScreen";
import UploadPhotosScreen from "./screens/UploadPhotosScreen";
import ViewProfileScreen from "./screens/ViewProfileScreen";
import InviteFriendSuccessScreen from "./screens/InviteFriendSuccessScreen.js";
import ChatScreen from "./screens/ChatScreen.js";
import DDChatScreen from "./screens/DDChatScreen.js";
import DDOtherProfilesScreen from "./screens/DDOtherProfilesScreen.js";
import DateOfBirthScreen from "./screens/DateOfBirthScreen.js";
import Header from "./components/Header.js";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Placeholder() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#131A2A",
        justifyContent: "center",
        alignItems: "center",
        padding: 36,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 12,
          color: "#FFF",
        }}
      >
        Missing Screen
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          color: "#FFF",
          marginBottom: 8,
        }}
      >
        This screen is not in a navigator.
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          color: "#FFF",
          marginBottom: 8,
        }}
      >
        Go to Navigation mode, and click the + (plus) icon in the Navigator tab
        on the left side to add this screen to a Navigator.
      </Text>
      <Text style={{ textAlign: "center", fontSize: 16, color: "#FFF" }}>
        If the screen is in a Tab Navigator, make sure the screen is assigned to
        a tab in the Config panel on the right.
      </Text>
    </View>
  );
}
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="ProfileTabScreen"
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: true,
        labelPosition: "below-icon",
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Image
              style={{ width: 25, height: 25 }}
              source={Images.Home}
              resizeMode={"contain"}
            />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="LikesMeTabScreen"
        component={LikesMeTabScreen}
        options={{
          title: "Likes Me Tab",
          tabBarIcon: ({ focused, color }) => (
            <Image
              style={{ width: 25, height: 25 }}
              source={Images.Heart}
              resizeMode={"contain"}
            />
          ),
          tabBarLabel: "Likes Me",
        }}
      />
      <Tab.Screen
        name="MatchesTabScreen"
        component={MatchesTabScreen}
        options={{
          title: "Matches Tab",
          tabBarIcon: ({ focused, color }) => (
            <Image
              style={{ width: 25, height: 25 }}
              source={Images.Chat}
              resizeMode={"contain"}
            />
          ),
          tabBarLabel: "Matches",
        }}
      />
      <Tab.Screen
        name="ProfileTabScreen"
        component={ProfileTabScreen}
        options={{
          title: "Profile Tab",
          tabBarIcon: ({ focused, color }) => (
            <Image
              style={{ width: 25, height: 25 }}
              source={Images.Profile}
              resizeMode={"contain"}
            />
          ),
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}

function DDBottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="DDHomeScreen"
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        name="DDHomeScreen"
        component={DDHomeScreen}
        options={{
          title: "DD Home",
          tabBarIcon: ({ focused, color }) => (
            <Image
              style={{ width: 25, height: 25 }}
              source={Images.Home}
              resizeMode={"contain"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DDLikesMeTabScreen"
        component={DDLikesMeTabScreen}
        options={{
          title: "DD Likes Me Tab",
          tabBarIcon: ({ focused, color }) => (
            <Image
              style={{ width: 25, height: 25 }}
              source={Images.Heart}
              resizeMode={"contain"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DDMatchesTabScreen"
        component={DDMatchesTabScreen}
        options={{
          title: "DD Matches Tab",
          tabBarIcon: ({ focused, color }) => (
            <Image
              style={{ width: 25, height: 25 }}
              source={Images.Chat}
              resizeMode={"contain"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DDProfileTabScreen"
        component={DDProfileTabScreen}
        options={{
          title: "DD Profile Tab",
          tabBarIcon: ({ focused, color }) => (
            <Image
              style={{ width: 25, height: 25 }}
              source={Images.Profile}
              resizeMode={"contain"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function DDStack() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="DDBottomNavigator"
        component={DDBottomNavigator}
        options={{
          headerShown: true,

          header: ({ scene, previous, navigation }) => {
            const currentScreenIndex =
              navigation.getState().routes[0]?.state?.index;
            const headerTitle = DD_SCREEN_TITLE[currentScreenIndex];
            return <Header title={headerTitle} style={styles.header} />;
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default function RootAppNavigator() {
  const linking = {
    prefixes: ["kupple-app://"],
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ title: "Sign Up" }}
        />
        <Stack.Screen
          name="PhoneVerificationScreen"
          component={PhoneVerificationScreen}
          options={{ title: "Phone Verification" }}
        />
        <Stack.Screen
          name="LoginScreen_o3IxayGE"
          component={LoginScreen_o3IxayGE}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="CodeVerificationScreen_kibEVzWy"
          component={CodeVerificationScreen_kibEVzWy}
          options={{ title: "Code Verification" }}
        />
        <Stack.Screen
          name="FirstNameScreen"
          component={FirstNameScreen}
          options={{ title: "First Name" }}
        />
        <Stack.Screen
          name="DateOfBirthScreen"
          component={DateOfBirthScreen}
          options={{ title: "Date Of Birth" }}
        />
        <Stack.Screen
          name="GenderScreen"
          component={GenderScreen}
          options={{ title: "Gender" }}
        />
        <Stack.Screen
          name="SexuallyInterestedInScreen"
          component={SexuallyInterestedInScreen}
          options={{ title: "Sexually Interested In" }}
        />
        <Stack.Screen
          name="CareerInfoScreen"
          component={CareerInfoScreen}
          options={{ title: "Career Info" }}
        />
        <Stack.Screen
          name="UploadPhotosScreen"
          component={UploadPhotosScreen}
          options={{ title: "Upload Photos" }}
        />
        <Stack.Screen
          name="PromptsInputScreen"
          component={PromptsInputScreen}
          options={{ title: "Prompts Input" }}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ title: "Settings" }}
        />
        <Stack.Screen
          name="SubscriptionOptionsScreen"
          component={SubscriptionOptionsScreen}
          options={{ title: "Subscription Options" }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{ title: "Edit Profile" }}
        />
        <Stack.Screen
          name="ViewProfileScreen"
          component={ViewProfileScreen}
          options={{ title: "View Profile" }}
        />

        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ title: "Chat Screen" }}
        />
        <Stack.Screen
          name="LocationScreen"
          component={LocationScreen}
          options={{ title: "Location" }}
        />
        <Stack.Screen
          name="TeamsScreen"
          component={TeamsScreen}
          options={{ title: "Teams" }}
        />
        <Stack.Screen
          name="ContactsListScreen"
          component={ContactsListScreen}
          options={{ title: "Contacts List" }}
        />
        <Stack.Screen
          name="DDUploadPhotosScreen"
          component={DDUploadPhotosScreen}
          options={{ title: "DD Upload Photos" }}
        />
        <Stack.Screen
          name="DDEditProfileScreen"
          component={DDEditProfileScreen}
          options={{ title: "DD Edit Profile" }}
        />
        <Stack.Screen
          name="ProfileViewScreen"
          component={ProfileViewScreen}
          options={{ title: "Profile View" }}
        />
        <Stack.Screen
          name="IDVerificationScreen"
          component={IDVerificationScreen}
          options={{ title: "ID Verification" }}
        />
        <Stack.Screen
          name="DDProfileViewScreen"
          component={DDProfileViewScreen}
          options={{ title: "DD Profile View" }}
        />

        <Stack.Screen
          name="DDChatScreen"
          component={DDChatScreen}
          options={{ title: "DD Messaging" }}
        />
        <Stack.Screen
          name="DDOtherProfilesScreen"
          component={DDOtherProfilesScreen}
          options={{ title: "View Profile" }}
        />
        <Stack.Screen
          name="ProfileViewWithLikeScreen"
          component={ProfileViewWithLikeScreen}
          options={{ title: "Profile View With Like" }}
        />
        <Stack.Screen
          name="DDSettingsScreen_0JVpbZ86"
          component={DDSettingsScreen_0JVpbZ86}
          options={{ title: "DD Settings " }}
        />
        <Stack.Screen
          name="DDProfileViewWithLikeScreen"
          component={DDProfileViewWithLikeScreen}
          options={{ title: "DD Profile View With Like" }}
        />
        <Stack.Screen
          name="DDPromptsScreen"
          component={DDPromptsScreen}
          options={{ title: "DD Prompts" }}
        />
        <Stack.Screen
          name="JoinTeamScreen"
          component={JoinTeamScreen}
          options={{ title: "Join Team" }}
        />
        <Stack.Screen
          name="LoginVerificationScreen"
          component={LoginVerificationScreen}
          options={{ title: "Login Verification" }}
        />
        <Stack.Screen
          name="InviteFriendSuccessScreen"
          component={InviteFriendSuccessScreen}
          options={{ title: "Success" }}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
        <Stack.Screen name="DDBottomNavigator" component={DDBottomNavigator} />
        <Stack.Screen name="DDStack" component={DDStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerIcon: Platform.select({
    ios: {
      marginVertical: 12,
      resizeMode: "contain",
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: "contain",
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({
    ios: {
      marginRight: 6,
    },
  }),
  headerIconRight: Platform.select({
    ios: {
      marginLeft: 6,
    },
  }),
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    ...Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11,
      },
    }),
  },
  headerContainerLeft: Platform.select({
    ios: {
      marginLeft: 8,
    },
  }),
  headerContainerRight: Platform.select({
    ios: {
      marginRight: 8,
    },
  }),
  headerLabelWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  headerLabel: {
    fontSize: 17,
    letterSpacing: 0.35,
  },
  header: {
    height: 100,
    paddingTop: Constants.statusBarHeight,
  },
});
