import React from "react";
import Images from "../config/Images";
import {
  ButtonSolid,
  Circle,
  Icon,
  LinearGradient,
  ScreenContainer,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import {
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as GlobalVariables from "../config/GlobalVariableContext";
import * as Utils from "../utils";
import { LoaderView } from "../components";
import Purchases from "react-native-purchases";
import AppWebView from "../components/WebView";

const SubscriptionOptionsScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const [packages, setPackages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [policyURL, setPolicyURL] = React.useState(null);

  const getUserDetails = async () => {
    try {
      const userDetail = await Utils.getPurchasesCustomerDetails(
        Constants["logInUserID"],
        Constants,
        setGlobalVariableValue
      );
      console.log("userDetail", userDetail);
    } catch (err) {
      console.error(err);
    }
  };
  React.useEffect(() => {
    Purchases.addCustomerInfoUpdateListener(getUserDetails);
    return () => {
      Purchases.removeCustomerInfoUpdateListener(getUserDetails);
    };
  });

  React.useEffect(() => {
    getPackages();
  }, []);

  const getPackages = async () => {
    setIsLoading(true);
    try {
      await getUserDetails();
      const offerings = await Utils.getPurchasesOfferings();
      console.log("offerings", offerings, Constants["subscription"]);
      if (
        offerings &&
        offerings.current !== null &&
        offerings.current.availablePackages.length !== 0
      ) {
        setPackages(offerings.current.availablePackages);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <ScreenContainer
      scrollable={false}
      hasTopSafeArea={true}
      hasSafeArea={false}
    >
      {policyURL ? (
        <>
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
              <Touchable onPress={() => setPolicyURL(null)}>
                <Icon size={24} name={"AntDesign/close"} />
              </Touchable>
            </View>
          </View>
          <AppWebView sourceUrl={policyURL} currentUrl={() => {}} />
        </>
      ) : (
        <View>
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
                <Icon name={"AntDesign/arrowleft"} size={32} />
              </Touchable>
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

          <FlatList
            data={packages}
            listKey={"DEHxZtu0"}
            keyExtractor={(item) => item?.identifier}
            ListHeaderComponent={({ item }) => {
              return (
                <View style={styles.View9dfc81ae}>
                  {/* app-logo */}
                  <Image
                    style={styles.Imagef3954d0e}
                    resizeMode={"contain"}
                    source={Images.Final03}
                  />
                  <Text
                    style={[
                      theme.typography.headline3,
                      styles.Text116ff3bc,
                      { color: theme.colors.strong },
                    ]}
                  >
                    {"Kupple Plans"}
                  </Text>
                </View>
              );
            }}
            style={styles.FlatList}
            ListFooterComponent={() => {
              return (
                <View style={styles.MainFooterView}>
                  <Text
                    style={[
                      styles.Text0fdf8273,
                      { color: theme.colors.poppinsLightBlack },
                    ]}
                  >
                    {`Recurring billing. Cancel Anytime.
        Payment will be charged to your iTunes account at confirmation of purchase.
        Your subscription automatically renews unless auto-renew is turned off at least 24 hours before the end of the current period.
        You can manage your subscription and switch off auto-renewal by accessing your iTunes & App Store Account Settings after purchase.`}
                  </Text>

                  <Text
                    style={[
                      styles.Text0fdf8273,
                      {
                        color: theme.colors.poppinsLightBlack,
                        marginHorizontal: 20,
                      },
                    ]}
                  >
                    <Text>For more information, see the </Text>
                    <Text
                      style={{ textDecorationLine: "underline" }}
                      onPress={() =>
                        setPolicyURL(GlobalVariables.URL.TERM_AND_CONDITION)
                      }
                    >
                      Terms of Use
                    </Text>
                    <Text> and </Text>
                    <Text
                      style={{ textDecorationLine: "underline" }}
                      onPress={() =>
                        setPolicyURL(GlobalVariables.URL.PRIVACY_POLICY)
                      }
                    >
                      Privacy Policy.{" "}
                    </Text>
                  </Text>
                </View>
              );
            }}
            renderItem={({ item }) => {
              const {
                product: { title, description, priceString, identifier },
              } = item;
              console.log(
                "subscription == item.productIdentifier",
                Constants["subscription"] == item.productIdentifier
              );
              const descriptionData = description ? description.split(",") : "";
              return (
                <View style={styles.View8dfc81ae}>
                  <View
                    style={[
                      styles.Viewecc70fc0,
                      {
                        borderColor: theme.colors.divider,
                        borderRadius: theme.roundness,
                        backgroundColor: theme.colors.background,
                      },
                    ]}
                  >
                    <LinearGradient
                      style={[
                        styles.LinearGradient8b410e32,
                        { borderRadius: 8 },
                      ]}
                      endY={100}
                      endX={100}
                      color1={theme.colors.color1Stop}
                      color2={theme.colors.color2Stop}
                    >
                      <View style={styles.Viewffe70fed}>
                        <View style={styles.Viewcdc1570e}>
                          <View style={styles.Viewbbbc969c}>
                            <Icon
                              style={styles.Iconb26c7831}
                              size={34}
                              color={theme.colors.strong}
                              name={
                                title === "Plus"
                                  ? "FontAwesome/plus-circle"
                                  : "Foundation/crown"
                              }
                            />
                          </View>

                          <View style={styles.View41ebce54}>
                            <Text
                              style={[
                                theme.typography.headline6,
                                styles.Textde64ea2c,
                                { color: theme.colors.strongInverse },
                              ]}
                              allowFontScaling={true}
                              textBreakStrategy={"highQuality"}
                              ellipsizeMode={"tail"}
                            >
                              {title}
                            </Text>

                            <Text
                              style={[
                                styles.Text915485fc,
                                { color: theme.colors.strongInverse },
                              ]}
                              textBreakStrategy={"highQuality"}
                              allowFontScaling={true}
                              ellipsizeMode={"tail"}
                            >
                              {`${priceString}/month`}
                            </Text>
                            {/* features-list */}
                            <View style={styles.View2362b272}>
                              {/* feature-item */}
                              {descriptionData.length > 0
                                ? descriptionData.map((descriptionItem) => {
                                    return (
                                      <View
                                        key={descriptionItem}
                                        style={styles.View42df60c9}
                                      >
                                        <View style={styles.View4d536f66}>
                                          <Icon
                                            style={styles.Icon020a3ec8}
                                            color={theme.colors.strong}
                                            name={"Entypo/dot-single"}
                                            size={24}
                                          />
                                        </View>
                                        <View>
                                          <Text
                                            style={[
                                              theme.typography.body2,
                                              styles.Textea060b69,
                                              {
                                                color:
                                                  theme.colors.strongInverse,
                                              },
                                            ]}
                                            ellipsizeMode={"tail"}
                                            textBreakStrategy={"highQuality"}
                                            allowFontScaling={true}
                                          >
                                            {descriptionItem}
                                          </Text>
                                        </View>
                                      </View>
                                    );
                                  })
                                : null}
                            </View>
                          </View>
                        </View>
                      </View>

                      {Constants["subscription"] == identifier ? (
                        <View style={styles.View8e891818}>
                          <ButtonSolid
                            style={[
                              theme.typography.headline6,
                              styles.ButtonSolid4991c1da,
                              {
                                color: theme.colors.grayChatLettering,
                                backgroundColor: theme.colors.strongInverse,
                                borderColor: theme.colors.divider,
                              },
                            ]}
                            title={"Activated"}
                          />
                        </View>
                      ) : (
                        <View style={styles.View8e891818}>
                          <ButtonSolid
                            onPress={() => {
                              const purchasePackageHandler = async () => {
                                setIsLoading(true);
                                try {
                                  setIsLoading(true);
                                  const purchaserInfo =
                                    await Utils.purchasePackage(item);
                                  console.log(
                                    "purchaserInfo",
                                    purchaserInfo &&
                                      purchaserInfo.customerInfo.entitlements
                                        .active[Constants["ENTITLEMENT_ID"]]
                                  );
                                  if (
                                    purchaserInfo &&
                                    typeof purchaserInfo.customerInfo
                                      .entitlements.active[
                                      Constants["ENTITLEMENT_ID"]
                                    ] !== "undefined"
                                  ) {
                                    setGlobalVariableValue({
                                      key: "subscription",
                                      value:
                                        purchaserInfo.customerInfo.entitlements
                                          .active[Constants["ENTITLEMENT_ID"]]
                                          .productIdentifier,
                                    });
                                  }
                                  await getPackages();
                                  setIsLoading(false);
                                } catch (e) {
                                  setIsLoading(false);
                                }
                              };
                              purchasePackageHandler();
                            }}
                            style={[
                              styles.ButtonSolid4991c1da,
                              {
                                color: theme.colors.grayChatLettering,
                                backgroundColor: theme.colors.strongInverse,
                                borderColor: theme.colors.divider,
                              },
                            ]}
                            title={
                              title === "Plus" ? "Get Plus" : "Get Platinum"
                            }
                          />
                        </View>
                      )}
                    </LinearGradient>
                  </View>
                </View>
              );
            }}
            contentContainerStyle={styles.FlatListc992f941Content}
            numColumns={1}
          />

          {isLoading && <LoaderView loading={true} />}
        </View>
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  MainFooterView: { width: "98%" },
  FlatList: {
    marginBottom: 40,
  },
  ButtonSolid4991c1da: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 64,
    borderRightWidth: 1,
    borderTopWidth: 1,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    width: 160,
  },
  Text0fdf8273: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    textAlign: "center",
  },
  Icon020a3ec8: {
    height: 24,
    maxHeight: 24,
    maxWidth: 24,
    width: 24,
  },
  Icon4b79332f: {
    marginBottom: 1,
  },
  Iconb26c7831: {
    height: 34,
    maxHeight: 34,
    maxWidth: 34,
    width: 34,
  },
  Iconfd23fb9d: {
    height: 24,
    maxHeight: 24,
    maxWidth: 24,
    width: 24,
  },
  Imagef3954d0e: {
    height: 84,
    marginBottom: 24,
    width: 100,
  },
  LinearGradient8b410e32: {
    opacity: 0.96,
    width: "100%",
  },
  ScrollViewb284e5b0: {
    flexGrow: 1,
  },
  Text116ff3bc: {
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 24,
    textAlign: "center",
  },
  Text915485fc: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  Textb2c7bb0f: {
    fontFamily: "Poppins_400Regular_Italic",
  },
  Textde64ea2c: {
    fontFamily: "Poppins_700Bold",
  },
  Textea060b69: {
    fontFamily: "Poppins_400Regular",
  },
  View1d4fd775: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 2,
    marginTop: 2,
    width: "100%",
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
    position: "relative",
  },
  View2362b272: {
    marginTop: 10,
  },
  View41ebce54: {
    paddingRight: 34,
  },
  View42df60c9: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 2,
    marginTop: 2,
    width: "100%",
  },
  View4d536f66: {
    height: 24,
    marginRight: 8,
    width: 24,
  },
  View87a818a7: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 2,
    marginTop: 2,
    width: "100%",
  },
  View8dfc81ae: {
    alignContent: "center",
    alignItems: "center",
    // marginTop: 40,
    paddingLeft: 32,
    paddingRight: 32,
    // paddingTop: 48,
  },
  View9dfc81ae: {
    alignContent: "center",
    alignItems: "center",
    marginTop: 40,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 48,
  },
  View8e891818: {
    alignItems: "center",
    marginBottom: 12,
  },
  View9494aafa: {
    alignItems: "center",
    justifyContent: "center",
  },
  Viewbbbc969c: {
    height: 34,
    marginRight: 14,
    width: 34,
  },
  Viewcdc1570e: {
    alignItems: "flex-start",
    flexDirection: "row",
    maxWidth: "80%",
    width: "100%",
  },
  Viewecc70fc0: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    justifyContent: "center",
    marginBottom: 24,
    overflow: "hidden",
    width: "100%",
  },
  Viewf20c054c: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
  },
  Viewffe70fed: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 20,
    width: "100%",
  },
});

export default withTheme(SubscriptionOptionsScreen);
