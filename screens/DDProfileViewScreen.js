import React from "react";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import { Icon, ScreenContainer, Touchable, withTheme } from "@draftbit/ui";
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Fetch } from "react-request";
import UserContext from "../context/UserContext.js";
import Image from "../components/CachedImage.js";
import CustomIcon from "../components/CustomIcon.js";

const DDProfileViewScreen = (props) => {
  const { theme } = props;
  const { navigation } = props;
  const [{ selected_team, selected_team_details }] =
    React.useContext(UserContext);

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={false}
      hasTopSafeArea={true}
      hasBottomSafeArea={false}
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
                navigation.goBack();
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
            {"View Profile"}
          </Text>
        </View>
        <View style={styles.View0cd1e7ab} />
      </View>

      <XanoAPIApi.FetchGetSingleDDTeamsRecordGET
        double_dating_teams_id={selected_team?.id ?? ""}
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
            <ScrollView
              contentContainerStyle={styles.ScrollViewae2e0932Content}
              showsVerticalScrollIndicator={true}
              bounces={true}
            >
              <View style={styles.View277c1da5}>
                <Touchable
                  onPress={() =>
                    navigation.navigate("ProfileViewScreen", {
                      user_id: fetchData && fetchData["_user"]?.id,
                    })
                  }
                >
                  <Image
                    style={[styles.Imagee9bed824, { borderRadius: 4 }]}
                    source={{
                      uri: `${
                        fetchData && fetchData["_user"]?.featured_photo?.url
                      }`,
                    }}
                    resizeMode={"cover"}
                  />
                </Touchable>

                <View style={styles.View144e0db8}>
                  <View style={styles.View91edb4b3}>
                    <Text
                      style={[
                        styles.Textcc9fc846,
                        { color: theme.colors.strong },
                      ]}
                    >
                      {fetchData && fetchData["_user"]?.name}
                      {", "}
                      {fetchData && fetchData["_user"]?.age}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={[
                        styles.Text21725963,
                        { color: theme.colors.grayChatLettering },
                      ]}
                    >
                      {"About Me"}
                    </Text>

                    <View style={styles.Viewb3267adf}>
                      <CustomIcon
                        name={"AntDesign/home"}
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
                        {fetchData && fetchData["_user"]?.user_city}
                      </Text>
                    </View>

                    <View style={styles.Viewb3267adf}>
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
                        {Math.ceil(fetchData?.distance)}
                        {" mi away"}
                      </Text>
                    </View>

                    {fetchData && fetchData["_user"]?.job_title && (
                      <View style={styles.Viewb3267adf}>
                        <CustomIcon
                          name={"Ionicons/briefcase-outline"}
                          size={22}
                          color={theme.colors.grayChatLettering}
                        />
                        {/* Location */}
                        <Text
                          style={[
                            styles.Textb3c68225,
                            { color: theme.colors.grayChatLettering },
                          ]}
                          numberOfLines={1}
                          ellipsizeMode={"tail"}
                        >
                          {fetchData["_user"]?.job_title}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.View2952d12e}>
                    <Touchable
                      onPress={() => {
                        try {
                          navigation.navigate("ProfileViewScreen", {
                            user_id: fetchData && fetchData["_user"]?.id,
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      <Text
                        style={[
                          styles.Textd39bcef0,
                          { color: theme.colors.lightGray },
                        ]}
                      >
                        {"Individual Profile"}
                      </Text>
                    </Touchable>
                  </View>
                </View>
              </View>

              <View style={styles.Viewdebd3207}>
                <Touchable
                  onPress={() =>
                    navigation.navigate("ProfileViewScreen", {
                      user_id: fetchData?.user2_id,
                    })
                  }
                >
                  <Image
                    style={[styles.Imagee9bed824, { borderRadius: 4 }]}
                    source={{
                      uri: `${
                        fetchData && fetchData["_user_2"]?.featured_photo?.url
                      }`,
                    }}
                    resizeMode={"cover"}
                  />
                </Touchable>

                <View style={styles.View144e0db8}>
                  <View style={styles.View91edb4b3}>
                    <Text
                      style={[
                        styles.Text2e9a2e06,
                        { color: theme.colors.grayChatLettering },
                      ]}
                    >
                      {fetchData && fetchData["_user_2"]?.name}
                      {", "}
                      {fetchData && fetchData["_user_2"]?.age}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={[
                        styles.Text3e0ee043,
                        { color: theme.colors.grayChatLettering },
                      ]}
                    >
                      {"About Me"}
                    </Text>

                    <View style={styles.Viewb3267adf}>
                      <CustomIcon
                        name={"AntDesign/home"}
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
                        {fetchData && fetchData["_user_2"]?.user_city}
                      </Text>
                    </View>

                    <View style={styles.Viewb3267adf}>
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
                        {Math.ceil(fetchData?.distance_2)}
                        {" mi away"}
                      </Text>
                    </View>

                    {fetchData && fetchData["_user_2"]?.job_title && (
                      <View style={styles.Viewb3267adf}>
                        <CustomIcon
                          name={"Ionicons/briefcase-outline"}
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
                          {fetchData["_user_2"]?.job_title}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.View2952d12e}>
                    <Touchable
                      onPress={() => {
                        try {
                          navigation.navigate("ProfileViewScreen", {
                            user_id: fetchData?.user2_id,
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      <Text
                        style={[
                          styles.Textd39bcef0,
                          { color: theme.colors.lightGray },
                        ]}
                      >
                        {"Individual Profile"}
                      </Text>
                    </Touchable>
                  </View>
                </View>
              </View>
              {/* First Group Pic */}
              {fetchData?.group_photo1?.url && (
                <View
                  style={[
                    styles.Viewc88f7e60,
                    { borderColor: theme.colors.lightGray, borderRadius: 20 },
                  ]}
                >
                  <Image
                    style={styles.Image405d7a68}
                    resizeMode={"cover"}
                    source={{ uri: `${fetchData?.group_photo1?.url}` }}
                  />
                </View>
              )}

              <View
                style={[
                  styles.Viewde95f889,
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
                  {selected_team_details?.group_prompt1_title}
                </Text>
                {/* Prompt 1 Response */}
                <Text
                  style={[
                    styles.Textff2ede45,
                    { color: theme.colors.grayChatLettering },
                  ]}
                >
                  {selected_team_details?.group_prompt1_response}
                </Text>
              </View>
              {/* Second Group Pic */}
              {fetchData?.group_photo2?.url && (
                <View
                  style={[
                    styles.Viewc88f7e60,
                    { borderColor: theme.colors.lightGray, borderRadius: 20 },
                  ]}
                >
                  <Image
                    style={styles.Image405d7a68}
                    resizeMode={"cover"}
                    source={{ uri: `${fetchData?.group_photo2?.url}` }}
                  />
                </View>
              )}

              <View
                style={[
                  styles.Viewde95f889,
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
                  {selected_team_details?.group_prompt2_title}
                </Text>
                {/* Prompt 2 Response */}
                <Text
                  style={[
                    styles.Textff2ede45,
                    { color: theme.colors.grayChatLettering },
                  ]}
                >
                  {selected_team_details?.group_prompt2_response}
                </Text>
              </View>
              {/* Third Group Pic */}
              {fetchData?.group_photo3?.url && (
                <View
                  style={[
                    styles.Viewc88f7e60,
                    { borderColor: theme.colors.lightGray, borderRadius: 20 },
                  ]}
                >
                  <Image
                    style={styles.Image405d7a68}
                    resizeMode={"cover"}
                    source={{ uri: `${fetchData?.group_photo3?.url}` }}
                  />
                </View>
              )}

              {/* Fourth Group Pic */}
              {fetchData?.group_photo4?.url && (
                <View
                  style={[
                    styles.Viewc88f7e60,
                    { borderColor: theme.colors.lightGray, borderRadius: 20 },
                  ]}
                >
                  <Image
                    style={styles.Image405d7a68}
                    resizeMode={"cover"}
                    source={{ uri: `${fetchData?.group_photo4?.url}` }}
                  />
                </View>
              )}

              <View
                style={[
                  styles.Viewde95f889,
                  { borderColor: theme.colors.lightGray, borderRadius: 28 },
                ]}
              >
                {/* Prompt3 */}
                <Text
                  style={[
                    styles.Text2e9eb673,
                    { color: theme.colors.grayChatLettering },
                  ]}
                >
                  {selected_team_details?.group_prompt3_title}
                </Text>
                {/* Prompt 3 Response */}
                <Text
                  style={[
                    styles.Textff2ede45,
                    { color: theme.colors.grayChatLettering },
                  ]}
                >
                  {selected_team_details?.group_prompt3_response}
                </Text>
              </View>
              {/* Fifth Group Pic */}
              {fetchData?.group_photo5?.url && (
                <View
                  style={[
                    styles.Viewc88f7e60,
                    { borderColor: theme.colors.lightGray, borderRadius: 20 },
                  ]}
                >
                  <Image
                    style={styles.Image405d7a68}
                    resizeMode={"cover"}
                    source={{ uri: `${fetchData?.group_photo5?.url}` }}
                  />
                </View>
              )}

              {/* Sixth Group Pic */}
              {fetchData?.group_photo6?.url && (
                <View
                  style={[
                    styles.Viewa30927ce,
                    { borderColor: theme.colors.lightGray, borderRadius: 20 },
                  ]}
                >
                  <Image
                    style={styles.Image405d7a68}
                    resizeMode={"cover"}
                    source={{ uri: `${fetchData?.group_photo6?.url}` }}
                  />
                </View>
              )}
            </ScrollView>
          );
        }}
      </XanoAPIApi.FetchGetSingleDDTeamsRecordGET>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Fetch431eb058: { minHeight: 40 },
  Image405d7a68: { minHeight: 375, width: "100%" },
  Imagee9bed824: { height: 232, width: 175 },
  ScrollViewae2e0932Content: { paddingBottom: 80, top: 60 },
  Text21725963: { fontFamily: "Poppins_500Medium", fontSize: 14 },
  Text2e9a2e06: { fontFamily: "Poppins_500Medium", fontSize: 18 },
  Text2e9eb673: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginLeft: 20,
    marginRight: 20,
  },
  Text3e0ee043: { fontFamily: "Poppins_500Medium" },
  Textb3c68225: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.89,
  },
  Textcc9fc846: { fontFamily: "Poppins_500Medium", fontSize: 20 },
  Textd39bcef0: { fontFamily: "Poppins_300Light" },
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
  View144e0db8: {
    justifyContent: "space-between",
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
  },
  View277c1da5: { flexDirection: "row", marginBottom: 16 },
  View2952d12e: { justifyContent: "flex-end", marginTop: 10 },
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
  View91edb4b3: { marginTop: 8 },
  Viewa30927ce: {
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
  Viewb3267adf: { flexDirection: "row", marginTop: 3, alignItems: "center" },
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
  Viewde95f889: {
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
  Viewdebd3207: { flexDirection: "row" },
});

export default withTheme(DDProfileViewScreen);
