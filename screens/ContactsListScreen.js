import React from "react";
import * as TwilioApi from "../apis/TwilioApi.js";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import Images from "../config/Images";

import * as CustomCode from "../CustomCode.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import {
  ButtonOutline,
  Icon,
  LinearGradient,
  ScreenContainer,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import UserContext from "../context/UserContext.js";
import PopUp from "../components/PopUp.js";
import AlertModal from "../components/AlertModal.js";

const ContactsListScreen = (props) => {
  const { theme } = props;
  const { navigation } = props;

  const [user] = React.useContext(UserContext);
  const [textInputValue, setTextInputValue] = React.useState("");
  const [contactList, setContactList] = React.useState([]);
  const [selectedContact, setSelectedContact] = React.useState(null);
  const [showInviteAlertModal, setShowInviteAlertModal] = React.useState(false);

  React.useEffect(() => {
    const userContactsList = user?.user_contacts ?? [];
    const filteredContactList = userContactsList
      .filter((item) => item.name.includes(textInputValue))
      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    setContactList(filteredContactList);
  }, [textInputValue]);

  const twilioSendDoubleTeamInviteLink =
    TwilioApi.useSendDoubleTeamInviteLink();

  const xanoAPICreateDDTeams = XanoAPIApi.useCreateDDTeams();

  const handleOnPressSelectedContact = async () => {
    setShowInviteAlertModal(false);
    try {
      const createDDTeamsID = await xanoAPICreateDDTeams.mutateAsync();
      if (createDDTeamsID && createDDTeamsID.id) {
        const handlerForInvite = async () => {
          try {
            const doubleTeamInviteLink =
              await twilioSendDoubleTeamInviteLink.mutateAsync({
                phoneNumber: selectedContact?.phoneNumber,
                double_dating_teams_id: createDDTeamsID.id,
              });
            const message = doubleTeamInviteLink?.message;

            if (message) {
              alert(message);
            } else {
              navigation.navigate("InviteFriendSuccessScreen");
            }
          } catch (err) {
            console.error(err);
          } finally {
            setSelectedContact(null);
          }
        };
        handlerForInvite();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSelectedContact(null);
    }
  };

  const handleOnCancelSelectedContact = () => {
    setShowInviteAlertModal(false);
    setSelectedContact(null);
  };

  return (
    <ScreenContainer
      style={styles.screen}
      scrollable={false}
      hasTopSafeArea={true}
      hasSafeArea={false}
    >
      <AlertModal
        isCentered
        isVisible={showInviteAlertModal}
        icon={Images.SuccessIcon}
        title={"Confirm Invite"}
        subTitle={`Would you like to invite ${
          selectedContact?.name ?? ""
        } to join a double dating team with you?`}
        onPressClose={handleOnCancelSelectedContact}
        primary={"Confirm"}
        secondary={"Cancel"}
        onPressPrimary={handleOnPressSelectedContact}
        onPressSecondary={handleOnCancelSelectedContact}
      />
      <View
        style={[
          styles.Viewf1ce9d7a,
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
          <Text style={[styles.Text4dad3443, { color: theme.colors.strong }]}>
            {"Invite A Friend"}
          </Text>
        </View>
        <View style={styles.View0cd1e7ab} />
      </View>

      <View style={styles.Viewbce1fd4c}>
        <TextInput
          onChangeText={(newTextInputValue) => {
            try {
              setTextInputValue(newTextInputValue);
            } catch (err) {
              console.error(err);
            }
          }}
          style={[
            styles.TextInput1641b463,
            { borderColor: theme.colors.divider },
          ]}
          placeholder={"Search contacts..."}
          value={textInputValue}
          placeholderTextColor={theme.colors.lightGray}
        />
      </View>

      <View style={styles.View27ed6151}>
        <Text style={[styles.Text79c76060, { color: theme.colors.strong }]}>
          {"Contacts"}
        </Text>
        <FlatList
          data={contactList}
          listKey={"M5ta3Hbk"}
          keyExtractor={(listData) =>
            listData?.id || listData?.uuid || JSON.stringify(listData)
          }
          renderItem={({ item }) => {
            const listData = item;
            return (
              <Touchable>
                <View style={styles.Viewb26e439c}>
                  <View style={styles.Viewdebd3207}>
                    <View style={styles.View099f345b}>
                      <LinearGradient
                        style={[
                          styles.LinearGradientdbbbc800,
                          { borderRadius: 64 },
                        ]}
                        endY={100}
                        endX={100}
                        color1={theme.colors.color1Stop}
                        color2={theme.colors.color2Stop}
                      />
                      <Text
                        style={[
                          styles.TextContact,
                          {
                            color: theme.colors.White,
                          },
                        ]}
                      >
                        {listData?.name[0] ?? ""}
                      </Text>
                    </View>

                    <View style={styles.View8191f784}>
                      <Text
                        style={[
                          styles.Texte517bed5,
                          { color: theme.colors.strong },
                        ]}
                      >
                        {listData?.name ?? ""}
                      </Text>
                      <Text
                        style={[
                          styles.Text12184e4e,
                          { color: theme.colors.strong },
                        ]}
                      >
                        {listData?.phoneNumbers &&
                        listData?.phoneNumbers.length > 0
                          ? listData?.phoneNumbers[0]?.number
                          : ""}
                      </Text>
                    </View>
                  </View>

                  <View>
                    <View style={styles.View6a955cc3}>
                      <ButtonOutline
                        onPress={() => {
                          const userPhoneNumber =
                            listData?.phoneNumbers &&
                            listData?.phoneNumbers.length > 0
                              ? listData?.phoneNumbers[0].number.replace(
                                  /[^a-zA-Z0-9]/g,
                                  ""
                                )
                              : "";

                          setSelectedContact({
                            phoneNumber: userPhoneNumber,
                            name: listData?.name ?? "",
                          });
                          setShowInviteAlertModal(true);
                        }}
                        style={[
                          styles.ButtonOutlinee3aff693,
                          { color: theme.colors.grayChatLettering },
                        ]}
                        title={"Invite"}
                      />
                    </View>
                  </View>
                </View>
              </Touchable>
            );
          }}
          numColumns={1}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ButtonOutlinee3aff693: {
    backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    minWidth: 70,
    textAlign: "center",
  },
  ViewPopUpContact: {
    position: "absolute",
    backgroundColor: "white",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  FlatListc992f941Content: {
    flex: 1,
  },
  LinearGradientdbbbc800: {
    height: "100%",
    width: "100%",
  },
  Text12184e4e: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginTop: 2,
  },
  Text4dad3443: {
    fontFamily: "Poppins_500Medium",
    fontSize: 24,
    textAlign: "center",
  },
  Text79c76060: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    marginBottom: 4,
  },
  TextInput1641b463: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 8,
    borderRightWidth: 1,
    borderTopWidth: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    minHeight: 50,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
  },
  Texte517bed5: {
    fontFamily: "Poppins_400Regular",
  },
  View099f345b: {
    maxHeight: 55,
    maxWidth: 55,
    minHeight: 55,
    minWidth: 55,
  },
  TextContact: {
    position: "absolute",
    left: 16,
    top: 5,
    fontSize: 35,
  },
  View0cd1e7ab: {
    alignItems: "center",
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  View27ed6151: {
    marginLeft: 10,
    marginRight: 10,
  },
  View39912261: {
    alignItems: "center",
  },
  View6a955cc3: {
    justifyContent: "center",
  },
  View8191f784: {
    justifyContent: "center",
    marginLeft: 16,
  },
  Viewb26e439c: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    width: "100%",
  },
  Viewbce1fd4c: {
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 60,
  },
  Viewdebd3207: {
    flexDirection: "row",
  },
  Viewf1ce9d7a: {
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
  screen: {
    marginBottom: 20,
  },
});

export default withTheme(ContactsListScreen);
