import React from "react";
import * as GeocodioApi from "../apis/GeocodioApi.js";
import * as CustomCode from "../CustomCode.js";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import * as Utils from "../utils";
import Images from "../config/Images";
import {
  Circle,
  CircleImage,
  Icon,
  LinearGradient,
  ScreenContainer,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
} from "react-native";
import { Fetch } from "react-request";
import UserContext from "../context/UserContext.js";
import CachedImage from "../components/CachedImage.js";
import AlertModal from "../components/AlertModal.js";
import { modelAddressFromGeoFormat } from "../config/helper.js";
import useAppState from "../hooks/useAppState.js";

const TeamsScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [user, setUser] = React.useContext(UserContext);

  const getUserContacts = async () => {
    const { status } = await CustomCode.Contacts.requestPermissionsAsync();

    if (status === "granted") {
      let contact = [];
      const { data } = await CustomCode.Contacts.getContactsAsync({
        fields: [
          CustomCode.Contacts.Fields.ID,
          CustomCode.Contacts.Fields.Image,
          CustomCode.Contacts.Fields.FirstName,
          CustomCode.Contacts.Fields.LastName,
          CustomCode.Contacts.Fields.PhoneNumbers,
          CustomCode.Contacts.Fields.Emails,
          CustomCode.Contacts.Fields.Birthday,
          CustomCode.Contacts.Fields.Addresses,
        ],
      });

      if (Array.isArray(data)) {
        contact = data.map((item) => ({
          name: item?.name ?? "Not Availble",
          phoneNumbers: item?.phoneNumbers ?? [],
          ...item,
        }));
      }
      return contact;
    } else {
      alert("Contact permission was not granted");
    }
  };

  const { theme } = props;
  const { navigation } = props;

  const xanoAPIPostUserLocationPOST = XanoAPIApi.usePostUserLocationPOST();
  const xanoAPIUserTeamLocationPOST = XanoAPIApi.useUserTeamLocationPOST();
  const xanoAPIPostUserCityPOST = XanoAPIApi.usePostUserCityPOST();

  useAppState({
    onForeground: () => setLocationAlertModal(false),
  });

  const [contacts, setContacts] = React.useState([]);
  const [contacts2, setContacts2] = React.useState({});
  const [locationAlertModal, setLocationAlertModal] = React.useState(false);

  React.useEffect(() => {
    async function findUserLocation() {
      try {
        const location = await Utils.getLocation();
        const latitude = location?.latitude;
        const longitude = location?.longitude;
        if (!latitude || !longitude) {
          setLocationAlertModal(true);
          return;
        }

        await xanoAPIPostUserLocationPOST.mutateAsync({
          lat: latitude,
          long: longitude,
        });

        let userAddress = __DEV__
          ? {
              results: [
                {
                  address_components: {
                    number: "18",
                    street: "Ellis",
                    suffix: "St",
                    formatted_street: "Ellis St",
                    city: "San Francisco",
                    county: "San Francisco County",
                    state: "CA",
                    zip: "94102",
                    country: "US",
                  },
                  formatted_address:
                    "18 Demo Ellis St, San Francisco, CA 94102",
                  location: {
                    lat: 37.78585,
                    lng: -122.40653,
                  },
                  accuracy: 1,
                  accuracy_type: "rooftop",
                  source: "San Francisco",
                },
              ],
            }
          : await GeocodioApi.reverseGeocodeGET(Constants, {
              api_key: Constants["geocodio_api_key"],
              lat: latitude,
              long: longitude,
            });

        userAddress = modelAddressFromGeoFormat(userAddress);

        await xanoAPIPostUserCityPOST.mutateAsync({
          user_city: userAddress?.city,
        });
        await xanoAPIUserTeamLocationPOST.mutateAsync({});
      } catch (error) {
        console.log({ error });
      }
    }

    findUserLocation();
  }, [locationAlertModal]);

  const onCancelPopUp = () => {
    try {
      if (!user?.is_visited_before) {
        setUser({ ...user, is_visited_before: true });
        XanoAPIApi.checkedVisitedBeforePOST({
          AUTHORIZATION_HEADER: user?.authToken,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={false}
      hasTopSafeArea={true}
    >
      <AlertModal
        isCentered
        isVisible={locationAlertModal}
        icon={Images.WarningIcon}
        title={"Location Permission"}
        subTitle={
          "Kupple needs access to your location in order to show you people nearby. Please update your settings, then reload the app to continue."
        }
        onPressClose={() => setLocationAlertModal(false)}
        primary={"Update Location"}
        secondary={"Cancel"}
        onPressPrimary={() => {
          Linking.openURL("App-prefs:Privacy&path=LOCATION");
        }}
        onPressSecondary={() => setLocationAlertModal(false)}
      />
      <AlertModal
        isCentered
        isCenteredText
        hasTop={false}
        hasImage={Images.WelcomePopUp}
        isVisible={!user?.is_visited_before}
        icon={Images.WarningIcon}
        title={"Welcome to Kupple!"}
        subTitle={
          "To create a team, click on the Teams icon in the upper right hand corner."
        }
        onPressClose={onCancelPopUp}
        primary={"Confirm"}
        secondary={"Cancel"}
        onPressPrimary={onCancelPopUp}
        onPressSecondary={onCancelPopUp}
      />
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
          <Text style={[styles.Text430d592a, { color: theme.colors.strong }]}>
            {"Teams"}
          </Text>
        </View>

        <View style={styles.View9494aafa} />
      </View>

      <View style={styles.Viewe8c798da}>
        <Text
          style={[
            styles.Text84805378,
            { color: theme.colors.grayChatLettering },
          ]}
        >
          {"Profile"}
        </Text>

        {/* Records Frame */}
        <View style={styles.Viewf8304bf6}>
          {/* Flex Touchable */}
          <View style={[styles.View138523fa, { borderRadius: 20 }]}>
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
              {/* Record Item Frame */}
              <View style={[styles.View7fd58046, { borderRadius: 12 }]}>
                {/* Left Side Frame */}
                <View
                  style={[
                    styles.View359dc5e8,
                    {
                      borderTopLeftRadius: 12,
                      borderBottomLeftRadius: 12,
                    },
                  ]}
                >
                  {/* Review Image */}
                  <CachedImage
                    style={styles.CircleImage5f47a348}
                    source={{
                      uri: `${user?.featured_photo?.url}`,
                    }}
                    size={90}
                  />
                </View>
                {/* Middle Frame */}
                <View style={styles.Viewfa928eb2}>
                  {/* Top Frame */}
                  <View style={styles.View09162134}>
                    {/* Record Name */}
                    <Text
                      style={[
                        styles.Textec86969a,
                        { color: theme.colors.strong },
                      ]}
                      ellipsizeMode={"tail"}
                    >
                      {user?.name}
                    </Text>
                  </View>
                </View>
              </View>
            </Touchable>
          </View>
        </View>
      </View>

      <View style={styles.View38706ab9}>
        <View style={styles.Viewe30805ee}>
          <Text
            style={[
              styles.Text66beff76,
              { color: theme.colors.grayChatLettering },
            ]}
          >
            {"Teams"}
          </Text>
        </View>
      </View>

      <View>
        <View>
          <XanoAPIApi.FetchGetBothDDTeamsGET>
            {({ loading, error, data, refetchGetBothDDTeams }) => {
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
                <>
                  <FlatList
                    data={fetchData}
                    listKey={"lyztlt67"}
                    keyExtractor={(listData) =>
                      listData?.id || listData?.uuid || JSON.stringify(listData)
                    }
                    showsVerticalScrollIndicator
                    bounces={false}
                    renderItem={({ item }) => {
                      const listData = item;
                      return (
                        <>
                          {/* Records Frame */}
                          <View style={styles.Viewf8304bf6}>
                            {/* Flex Touchable */}
                            <View
                              style={[
                                styles.View8d78a939,
                                { borderRadius: 20 },
                              ]}
                            >
                              <Touchable
                                onPress={() => {
                                  try {
                                    //Setting Context for Selected Team
                                    setUser({
                                      ...user,
                                      selected_team: listData,
                                      selected_team_details: null,
                                    });

                                    navigation.navigate("DDStack", {
                                      screen: "DDBottomNavigator",
                                      params: {
                                        screen: "DDProfileTabScreen",
                                        params: { team_id: listData?.id },
                                      },
                                    });
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                {/* Record Item Frame */}
                                <View
                                  style={[
                                    styles.View0807b108,
                                    { borderRadius: 12 },
                                  ]}
                                >
                                  {/* Left Side Frame */}
                                  <View
                                    style={[
                                      styles.Viewef5f2031,
                                      {
                                        borderTopLeftRadius: 12,
                                        borderBottomLeftRadius: 12,
                                      },
                                    ]}
                                  >
                                    {/* Review Image */}
                                    <CachedImage
                                      style={styles.CircleImage0da45819}
                                      source={{
                                        uri: `${
                                          listData &&
                                          listData["_user"]?.featured_photo?.url
                                        }`,
                                      }}
                                      size={90}
                                    />
                                    <CachedImage
                                      style={styles.CircleImagea7e2d639}
                                      source={{
                                        uri: `${
                                          listData &&
                                          listData["_user2"]?.featured_photo
                                            ?.url
                                        }`,
                                      }}
                                      size={90}
                                    />
                                  </View>
                                  {/* Middle Frame */}
                                  <View style={styles.Viewfcd7183b}>
                                    {/* Top Frame */}
                                    <View style={styles.View09162134}>
                                      {/* Record Name */}
                                      <Text
                                        style={[
                                          styles.Text6079e38f,
                                          { color: theme.colors.strong },
                                        ]}
                                        ellipsizeMode={"tail"}
                                      >
                                        {listData && listData["_user"]?.name}
                                        {" & "}
                                        {listData && listData["_user2"]?.name}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              </Touchable>
                            </View>
                          </View>
                        </>
                      );
                    }}
                    numColumns={1}
                  />
                  <View style={styles.View269dfba3}>
                    <Touchable
                      onPress={() => {
                        const handler = async () => {
                          try {
                            const userContacts = await getUserContacts();
                            //Setting User Contacts in UserContext
                            setUser({
                              ...user,
                              user_contacts: userContacts ?? [],
                            });

                            navigation.navigate("ContactsListScreen");
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
                          {"Create New Team"}
                        </Text>
                      </LinearGradient>
                    </Touchable>
                  </View>
                </>
              );
            }}
          </XanoAPIApi.FetchGetBothDDTeamsGET>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  CircleImage0da45819: {
    zIndex: 3,
  },
  CircleImage5f47a348: {
    marginRight: 4,
  },
  CircleImagea7e2d639: {
    marginBottom: 40,
    marginLeft: -70,
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  Icon4b79332f: {
    marginBottom: 1,
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
  Text430d592a: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    textAlign: "center",
  },
  Text6079e38f: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
  },
  Text66beff76: {
    fontFamily: "Poppins_500Medium",
    fontSize: 22,
  },
  Text84805378: {
    fontFamily: "Poppins_500Medium",
    fontSize: 22,
    marginLeft: 12,
    marginRight: 12,
  },
  Text8b5e265a: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  Textec86969a: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    paddingBottom: 4,
  },
  View0807b108: {
    flexDirection: "row",
    flexGrow: 0,
    flexShrink: 0,
  },
  View09162134: {
    marginRight: 12,
  },
  View138523fa: {
    marginBottom: 12,
    marginLeft: 12,
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
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 5,
  },
  View269dfba3: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
  },
  View359dc5e8: {
    alignItems: "center",
    flexDirection: "row",
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: "center",
    paddingLeft: 12,
  },
  View38706ab9: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  View39912261: {
    alignItems: "center",
  },
  View7fd58046: {
    flexDirection: "row",
    flexGrow: 0,
    flexShrink: 0,
    paddingBottom: 12,
    paddingTop: 12,
  },
  View8d78a939: {
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  View9494aafa: {
    alignItems: "center",
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  Viewe30805ee: {
    marginLeft: 12,
    marginRight: 12,
  },
  Viewe8c798da: {
    marginTop: 80,
  },
  Viewef5f2031: {
    alignItems: "flex-end",
    flexDirection: "row",
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: "center",
    paddingBottom: 8,
    paddingLeft: 8,
    paddingTop: 8,
  },
  Viewf8304bf6: {
    marginTop: 12,
  },
  Viewfa928eb2: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: "center",
    marginLeft: 12,
  },
  Viewfcd7183b: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: "center",
    marginLeft: 18,
  },
});

export default withTheme(TeamsScreen);
