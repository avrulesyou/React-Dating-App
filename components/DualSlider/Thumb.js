import React, { memo } from "react";
import { View, StyleSheet } from "react-native";

const THUMB_RADIUS_LOW = 14;
const THUMB_RADIUS_HIGH = 17;

const Thumb = ({ name }) => {
  return <View style={name === "high" ? styles.rootHigh : styles.rootLow} />;
};

const styles = StyleSheet.create({
  rootLow: {
    width: THUMB_RADIUS_LOW * 2,
    height: THUMB_RADIUS_LOW * 2,
    borderRadius: THUMB_RADIUS_LOW,
    borderWidth: 2,
    borderColor: "rgb(189, 36, 148)",
    backgroundColor: "rgb(189, 36, 148)",
  },
  rootHigh: {
    width: THUMB_RADIUS_HIGH * 2,
    height: THUMB_RADIUS_HIGH * 2,
    borderRadius: THUMB_RADIUS_HIGH,
    borderWidth: 2,
    borderColor: "rgb(189, 36, 148)",
    backgroundColor: "rgb(189, 36, 148)",
  },
});

export default memo(Thumb);
