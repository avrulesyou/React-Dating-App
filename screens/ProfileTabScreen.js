import React from "react";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
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
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { Fetch } from "react-request";
import UserContext from "../context/UserContext.js";
import CachedImage from "../components/CachedImage.js";
import * as Utils from "../utils";
import { LoaderView } from "../components";
import MembershipSlider from "../components/MembershipSlider.js";

const ProfileTabScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const isFocused = useIsFocused();

  const { theme } = props;
  const { navigation } = props;
  const [user, setUser] = React.useContext(UserContext);

  const [purchaseExpireTime, SetPurchaseExpireTime] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [availableMemberShip, setAvailableMemberShip] = React.useState([]);

  React.useEffect(() => {
    //We require user to redirect to TeamScreen after FirstLoad of Application
    if (user?.isFirstTimeLoading) {
      setUser({ ...user, isFirstTimeLoading: false });
      navigation.navigate("TeamsScreen");
    }
  }, [user]);

  const getPurchasesUserDetails = async () => {
    try {
      const customerInfo = await Utils.getPurchasesCustomerDetails(
        Constants["logInUserID"],
        Constants,
        setGlobalVariableValue
      );
      if (
        customerInfo &&
        typeof customerInfo.entitlements.active[Constants["ENTITLEMENT_ID"]] !==
          "undefined"
      ) {
        const activePlan =
          customerInfo.entitlements.active[Constants["ENTITLEMENT_ID"]];
        if (activePlan.willRenew === false) {
          SetPurchaseExpireTime(activePlan.expirationDate);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    if (!isFocused) {
      return;
    }
    getPurchasesUserDetails();
  }, [isFocused]);

  React.useEffect(() => {
    if (user?.subscription_product_id == GlobalVariables.MEMBERSHIP.BASIC) {
      setAvailableMemberShip([
        {
          id: 1,
          title: "Kupple Plus",
          subTitle: "Get unlimited swipes & more!",
          titleColor: "#CC9900",
        },
        {
          id: 2,
          title: "Kupple Platinum",
          subTitle: "See who likes your profile!",
          titleColor: "#222222",
        },
      ]);
    }

    if (
      user?.subscription_product_id ==
      GlobalVariables.MEMBERSHIP.KUPPLE_PLUS_MONTHLY
    ) {
      setAvailableMemberShip([
        {
          id: 2,
          title: "Kupple Platinum",
          subTitle: "See who likes your profile!",
          titleColor: "#222222",
        },
      ]);
    }
  }, [user]);

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.communialWhite }}
      hasTopSafeArea={true}
      hasSafeArea={false}
      scrollable={false}
    >
      <View
        style={[
          styles.View53de6bff,
          {
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.divider,
          },
        ]}
      >
        <View>
          <Image
            style={styles.Imageb06ca8a3}
            source={Images.Final03}
            resizeMode={"contain"}
          />
        </View>

        <View style={styles.View39912261}>
          <Text style={[styles.Text430d592a, { color: theme.colors.strong }]}>
            {"Profile"}
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
            <Circle bgColor={theme.colors.greyChatMessages} size={50}>
              <Icon
                style={styles.Icon4b79332f}
                color={theme.colors.poppinsLightBlack}
                name={"Ionicons/ios-people-outline"}
                size={25}
              />
            </Circle>
          </Touchable>
        </View>
      </View>

      <View style={styles.View1b1797ca}>
        <View>
          <Touchable
            onPress={() => {
              try {
                navigation.navigate("ViewProfileScreen");
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <CachedImage
              source={{ uri: user?.featured_photo?.url ?? "" }}
              size={150}
            />
          </Touchable>
        </View>

        <Text style={[styles.Text5b178486, { color: theme.colors.strong }]}>
          {user?.name}
          {", "}
          {user?.age}
        </Text>
      </View>

      <View style={styles.View1e62a6e5}>
        <View style={styles.View508d110b}>
          <Surface
            style={[
              styles.Surface015bf641,
              { borderRadius: 64, backgroundColor: theme.colors.background },
            ]}
            elevation={1}
          >
            <Touchable
              onPress={() => {
                try {
                  navigation.navigate("SettingsScreen");
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Circle size={60} bgColor={theme.colors.greyChatMessages}>
                <Icon
                  style={styles.Icon4b79332f}
                  name={"Ionicons/md-settings-outline"}
                  size={30}
                  color={theme.colors.poppinsLightBlack}
                />
              </Circle>
            </Touchable>
          </Surface>

          <View style={styles.Viewbfbcf0ca}>
            <Text style={[styles.Texte517bed5, { color: theme.colors.strong }]}>
              {"Settings"}
            </Text>
          </View>
        </View>

        <View style={styles.View508d110b}>
          <Surface
            style={[
              styles.Surface015bf641,
              { borderRadius: 64, backgroundColor: theme.colors.background },
            ]}
            elevation={1}
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
              <Circle size={60} bgColor={theme.colors.greyChatMessages}>
                <Icon
                  style={styles.Icon4b79332f}
                  size={30}
                  color={theme.colors.poppinsLightBlack}
                  name={"Ionicons/ios-people-outline"}
                />
              </Circle>
            </Touchable>
          </Surface>

          <View style={styles.Viewbfbcf0ca}>
            <Text style={[styles.Texte517bed5, { color: theme.colors.strong }]}>
              {"Teams"}
            </Text>
          </View>
        </View>

        <View style={styles.View508d110b}>
          <Surface
            style={[
              styles.Surface015bf641,
              { borderRadius: 64, backgroundColor: theme.colors.background },
            ]}
            elevation={1}
          >
            <Touchable
              onPress={() => {
                try {
                  navigation.navigate("EditProfileScreen");
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Circle size={60} bgColor={theme.colors.greyChatMessages}>
                <Icon
                  size={30}
                  color={theme.colors.poppinsLightBlack}
                  name={"AntDesign/edit"}
                />
              </Circle>
            </Touchable>
          </Surface>

          <View style={styles.Viewbfbcf0ca}>
            <Text style={[styles.Texte517bed5, { color: theme.colors.strong }]}>
              {"Edit Profile"}
            </Text>
          </View>
        </View>
      </View>

      {user?.subscription_product_id !=
        GlobalVariables.MEMBERSHIP.KUPPLE_PLATINUM_MONTHLY && (
        <>
          <MembershipSlider content={availableMemberShip} />

          <View style={styles.Viewfade4909}>
            <Surface
              style={[
                styles.Surface932802a3,
                { borderRadius: 28, backgroundColor: theme.colors.color2Stop },
              ]}
              elevation={3}
            >
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
                    {"Upgrade Now"}
                  </Text>
                </LinearGradient>
              </Touchable>
            </Surface>
          </View>
        </>
      )}

      <Text
        style={[styles.Text0fdf8273, { color: theme.colors.poppinsLightBlack }]}
      >
        {
          "Premium members are seen up to 6x more and go on up to 4x more dates!"
        }
      </Text>
      {purchaseExpireTime !== "" ? (
        <>
          <Text
            style={[
              styles.Text0fdf8273,
              { color: theme.colors.poppinsLightBlack },
            ]}
          >
            {"Your Current plan will be expired at " +
              new Date(purchaseExpireTime)}
          </Text>
        </>
      ) : null}
      {isLoading && <LoaderView loading={true} />}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
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
  Surface015bf641: {
    height: 60,
    width: 60,
  },
  Surface932802a3: {
    minHeight: 51,
  },
  Text0fdf8273: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    textAlign: "center",
  },
  Text430d592a: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    textAlign: "center",
  },
  Text5b178486: {
    fontFamily: "Poppins_500Medium",
    fontSize: 24,
    marginTop: 10,
  },
  Text8b5e265a: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  Texte517bed5: {
    fontFamily: "Poppins_400Regular",
  },
  View1b1797ca: {
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 90,
  },
  View1e62a6e5: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  View39912261: {
    alignItems: "center",
  },
  View508d110b: {
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "25%",
    minWidth: "25%",
  },
  View53de6bff: {
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
  View9494aafa: {
    alignItems: "center",
    justifyContent: "center",
  },
  Viewbfbcf0ca: {
    marginTop: 4,
  },
  Viewfade4909: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
});

export default withTheme(ProfileTabScreen);
