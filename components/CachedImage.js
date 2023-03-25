import React from "react";
import { withTheme } from "@draftbit/ui";

import CachedImage from "expo-cached-image";
import { StyleSheet, Image } from "react-native";

const MyCachedImage = ({ source: { uri }, size, style, ...otherProps }) => {
  const getCacheKey = (string) => {
    return string.replace(/^.*\/\/[^\/]+/, "").replaceAll("/", "-");
  };

  let isBase64 = (() => {
    return uri.startsWith("data:");
  })();

  return (
    <>
      {isBase64 ? (
        <Image
          source={{ uri: `${uri}` }}
          style={[
            style ?? {},
            size ? { height: size, width: size, borderRadius: size / 2 } : {},
          ]}
          {...otherProps}
        />
      ) : (
        <CachedImage
          cacheKey={`${getCacheKey(uri)}-thumb`}
          source={{ uri: `${uri}`, expiresIn: 86400 }}
          style={[
            style ?? {},
            size ? { height: size, width: size, borderRadius: size / 2 } : {},
          ]}
          {...otherProps}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default withTheme(MyCachedImage);
