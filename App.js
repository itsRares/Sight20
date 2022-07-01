import React, { useEffect, useState, useCallback } from "react";
import AppNavigator from "./navigation/appNavigator";
import { LogBox, View } from "react-native";
import { ThemeProvider } from "./contexts/themeContext";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  "No native splash screen registered for given view controller. Call 'SplashScreen.show' for given view controller first.",
  "VirtualizedLists should never be nested inside plain ScrollViews",
]);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          "M-Medium": require("./assets/Montserrat/Montserrat-Medium.ttf"),
          "M-Bold": require("./assets/Montserrat/Montserrat-Bold.ttf"),
          "M-SBold": require("./assets/Montserrat/Montserrat-SemiBold.ttf"),
          "M-EBold": require("./assets/Montserrat/Montserrat-ExtraBold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider>
            <AppNavigator />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </View>
  );
}
