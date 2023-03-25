import React, { useEffect, useState, useRef } from "react";
import { BackHandler } from "react-native";
import { WebView } from "react-native-webview";

function AppWebView({
  navigation,
  currentUrl,
  sourceUrl,
  onClose,
  allowBack = true,
  ...otherProps
}) {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const removeMenuBar = `document.querySelectorAll("header.header")[0].remove()`;

  const backAction = () => {
    if (canGoBack) {
      webViewRef.current.goBack();
    } else {
      onClose && onClose();
      navigation.goBack();
    }

    return true;
  };

  useEffect(() => {
    if (allowBack) {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    } else {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true
      );
      return () => backHandler.remove();
    }
  }, [canGoBack]);

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: sourceUrl }}
      startInLoadingState
      onNavigationStateChange={(navState) => {
        setCanGoBack(navState.canGoBack);
        currentUrl(navState.url);
      }}
      injectedJavaScript={removeMenuBar}
      {...otherProps}
    />
  );
}

export default AppWebView;
