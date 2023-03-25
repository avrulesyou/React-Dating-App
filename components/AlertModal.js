import React from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import Modal from "react-native-modal";
import {
  LinearGradient,
  Touchable,
  ButtonOutline,
  IconButton,
} from "@draftbit/ui";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

function AlertModal({
  isVisible = false,
  isCentered = false,
  isCenteredText = false,
  hasTop = true,
  hasImage,
  title,
  subTitle,
  primary,
  onPressPrimary,
  secondary,
  onPressSecondary,
  onPressClose,
  icon,
}) {
  const [popUpHeight, setPopUpHeight] = React.useState(0);
  const centeredText = isCenteredText ? { textAlign: "center" } : {};

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.mainContainer,
            { bottom: isCentered ? (screenHeight - popUpHeight) / 2 : 80 },
            { backgroundColor: hasImage ? "#F2F4F7" : "white" },
          ]}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setPopUpHeight(height);
          }}
        >
          {hasImage && (
            <Image
              style={styles.topImage}
              source={hasImage}
              resizeMode={"contain"}
            />
          )}
          {hasTop && (
            <View style={styles.topContainer}>
              <Image
                style={styles.image}
                source={icon}
                resizeMode={"contain"}
              />
              <IconButton
                onPress={onPressClose}
                size={32}
                icon={"Feather/x"}
                color={"#667085"}
              />
            </View>
          )}
          <View style={styles.infoContainer}>
            <Text style={[styles.title, centeredText]}>{title}</Text>
            <Text style={[styles.subTitle, centeredText]}>{subTitle}</Text>
            <View style={styles.bottomContainer}>
              <Touchable onPress={onPressPrimary}>
                <LinearGradient
                  style={styles.primaryButton}
                  endY={100}
                  endX={100}
                  color2={"rgb(223, 48, 133)"}
                  color1={"rgb(103, 6, 186)"}
                >
                  <Text style={styles.primaryButtonText}>{primary}</Text>
                </LinearGradient>
              </Touchable>
              <ButtonOutline
                onPress={onPressSecondary}
                style={styles.secondaryButton}
                title={secondary}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: { flex: 1 },
  mainContainer: {
    position: "absolute",
    width: "100%",
    borderRadius: 12,
  },
  topImage: {
    width: "100%",
    height: 208,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  infoContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  image: { height: 56, width: 68 },
  title: {
    marginTop: 12,
    fontSize: 18,
    lineHeight: 28,
    fontFamily: "Inter_600SemiBold",
    color: "#101828",
  },
  subTitle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Inter_400Regular",
    color: "#475467",
  },
  bottomContainer: { marginTop: 24 },
  primaryButton: {
    height: 51,
    justifyContent: "center",
    width: "100%",
    borderRadius: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
    color: "white",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: "Inter_600SemiBold",
    marginTop: 12,
    minHeight: 51,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "#344054",
    borderColor: "#D0D5DD",
  },
});
export default AlertModal;
