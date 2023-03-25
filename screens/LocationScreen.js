import React from "react";
import * as GeocodioApi from "../apis/GeocodioApi.js";
import * as XanoAPIApi from "../apis/XanoAPIApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import Images from "../config/Images";
import * as Utils from "../utils";
import { MapMarker, MapView } from "@draftbit/maps";
import {
  LinearGradient,
  ScreenContainer,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { useIsFocused } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";
import UserContext from "../context/UserContext.js";
import { modelAddressFromGeoFormat } from "../config/helper.js";

const LocationScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const xanoAPIPostUserLocationPOST = XanoAPIApi.usePostUserLocationPOST();
  const xanoAPIPostUserCityPOST = XanoAPIApi.usePostUserCityPOST();

  const [userCity, setUserCity] = React.useState("");
  const [user, setUser] = React.useContext(UserContext);

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const userLocations = await Utils.getLocation();
        const long = userLocations.longitude;

        setGlobalVariableValue({
          key: "long",
          value: long,
        });
        const lat = userLocations.latitude;
        setGlobalVariableValue({
          key: "lat",
          value: lat,
        });
        await xanoAPIPostUserLocationPOST.mutateAsync({ lat: lat, long: long });
        let userAddress = await GeocodioApi.reverseGeocodeGET(Constants, {
          api_key: Constants["geocodio_api_key"],
          lat: lat,
          long: long,
        });

        userAddress = modelAddressFromGeoFormat(userAddress);

        if (!userAddress) {
          return;
        }
        const userCity = userAddress.city;

        setUserCity(userCity);
        setGlobalVariableValue({
          key: "user_city",
          value: userCity,
        });
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  const mapViewDfXKtjy7Ref = React.useRef();

  return (
    <ScreenContainer
      style={styles.screen}
      scrollable={false}
      hasSafeArea={true}
    >
      <View>
        <Image
          style={styles.Imageee92b18b}
          source={Images.Final03}
          resizeMode={"contain"}
        />
        <Text
          style={[styles.Text8e60057b, { color: theme.colors.staticPurple }]}
        >
          {"Location"}
        </Text>

        <Text
          style={[
            styles.Text06aff924,
            { color: theme.colors.poppinsLightBlack },
          ]}
        >
          {"We use your location to improve matchmaking."}
        </Text>
      </View>

      <MapView
        style={styles.MapView803d6b72}
        latitude={37.40241}
        longitude={-122.12125}
        zoom={8}
        zoomEnabled={true}
        rotateEnabled={true}
        scrollEnabled={true}
        loadingEnabled={true}
        showsPointsOfInterest={true}
        apiKey={"AIzaSyC53v7BvSuA1yv7Hwf1rC_9kpHMmmYJJhU"}
        showsUserLocation={true}
        followsUserLocation={true}
        ref={mapViewDfXKtjy7Ref}
      >
        <MapMarker latitude={Constants["lat"]} longitude={Constants["long"]} />
      </MapView>

      <View>
        <Touchable
          onPress={() => {
            const handler = async () => {
              try {
                const city = await xanoAPIPostUserCityPOST.mutateAsync({
                  user_city: userCity,
                });

                setUser({ ...user, ...city });
                navigation.navigate("UploadPhotosScreen");
              } catch (err) {
                console.error(err);
              }
            };
            handler();
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
              {"Next"}
            </Text>
          </LinearGradient>
        </Touchable>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Imageee92b18b: {
    height: 56,
    width: 68,
  },
  LinearGradient4704f023: {
    height: 51,
    justifyContent: "center",
    width: "100%",
  },
  MapView803d6b72: {
    flex: 1,
    marginBottom: 20,
    marginTop: 12,
    maxHeight: "60%",
  },
  Text06aff924: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    marginTop: 0,
  },
  Text8b5e265a: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  Text8e60057b: {
    fontFamily: "Poppins_700Bold",
    fontSize: 27,
    marginTop: 15,
  },
  screen: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
});

export default withTheme(LocationScreen);
