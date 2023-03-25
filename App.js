import * as React from "react";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Provider as ThemeProvider } from "@draftbit/ui";
import { QueryClient, QueryClientProvider } from "react-query";
import { StreamChat } from "stream-chat";
import { OverlayProvider, Chat } from "stream-chat-expo";

import AppNavigator from "./AppNavigator";
import DraftbitTheme from "./themes/DraftbitTheme.js";
import cacheAssetsAsync from "./config/cacheAssetsAsync";
import {
  GETSTREAM_API_KEY,
  GlobalVariableProvider,
} from "./config/GlobalVariableContext";
import { useFonts } from "expo-font";
import UserContext from "./context/UserContext";
import Purchases, { PurchasesOffering } from "react-native-purchases";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const client = StreamChat.getInstance(GETSTREAM_API_KEY);

const queryClient = new QueryClient();

const App = () => {
  const [isReady, setIsReady] = React.useState(false);
  const user = React.useState(null);
  const [fontsLoaded] = useFonts({
    Poppins_300Light:
      "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDz8V1tvFP-KUEg.ttf",
    Poppins_400Regular:
      "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrFJDUc1NECPY.ttf",
    Poppins_700Bold:
      "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7V1tvFP-KUEg.ttf",
    Poppins_500Medium:
      "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9V1tvFP-KUEg.ttf",
    Roboto_400Regular:
      "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf",
    Poppins_600SemiBold:
      "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6V1tvFP-KUEg.ttf",
    Pacifico_400Regular:
      "https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ96A4sijpFu_.ttf",
    Poppins_400Regular_Italic:
      "https://fonts.gstatic.com/s/poppins/v20/pxiGyp8kv8JHgFVrJJLed3FBGPaTSQ.ttf",
    Inter_400Regular:
      "http://fonts.gstatic.com/s/inter/v1/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
    Inter_600SemiBold:
      "http://fonts.gstatic.com/s/inter/v1/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
  });

  React.useEffect(() => {
    // connectUser();
    // Status Bar set for Both Mode.
    StatusBar.setBarStyle("dark-content");

    return () => client.disconnectUser();
  }, []);

  React.useEffect(() => {
    async function prepare() {
      try {
        Purchases.setDebugLogsEnabled(true);
        Purchases.configure({
          apiKey: "appl_EiQrglvPDtsrMVrRakiftrPhIKn",
          observerMode: false,
          useAmazon: false,
        });
        await cacheAssetsAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (isReady && fontsLoaded) {
      // await SplashScreen.hideAsync();
    }
  }, [isReady, fontsLoaded]);

  if (!isReady || !fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
      onLayout={onLayoutRootView}
    >
      <OverlayProvider>
        <UserContext.Provider value={user}>
          <Chat client={client}>
            <GlobalVariableProvider>
              <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={DraftbitTheme}>
                  <AppNavigator />
                </ThemeProvider>
              </QueryClientProvider>
            </GlobalVariableProvider>
          </Chat>
        </UserContext.Provider>
      </OverlayProvider>
    </SafeAreaProvider>
  );
};

export default App;
