import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import Loader from "../screens/shared/loader";
import { useTheme } from "../contexts/themeContext";
import MainNavigator from "./mainNavigator";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { isDark, colors } = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={{ colors: { background: colors.background } }}
      >
        <StatusBar
          backgroundColor="#ccc"
          barStyle={!isDark ? "dark-content" : "light-content"}
        />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Settings" component={MainNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
