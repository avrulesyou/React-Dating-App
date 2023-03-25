import React from "react";
import * as GlobalVariables from "../config/GlobalVariableContext";
import Images from "../config/Images";
import {
  Circle,
  CircleImage,
  Divider,
  Icon,
  LinearGradient,
  ScreenContainer,
  Surface,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Header = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { style, title } = props;
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.View1d8587d2,
        {
          borderColor: theme.colors.divider,
          backgroundColor: theme.colors.background,
        },
        style,
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
          {title}
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
    fontSize: 20,
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
    // position: "absolute",
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
    paddingTop: 135,
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

export default withTheme(Header);
