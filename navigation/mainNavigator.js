import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../screens/settings/settings";
import Schedule from "../screens/settings/schedule";
import ParentalControls from "../screens/settings/parental";
import Home from "../screens/main/home";
import SetPin from "../screens/settings/setPin";

const Stack = createStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    {/* <Stack.Screen name="Landing" component={Landing} /> */}
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="Schedule" component={Schedule} />
    <Stack.Screen name="ParentalControls" component={ParentalControls} />
    <Stack.Screen name="SetPin" component={SetPin} />
  </Stack.Navigator>
);

export default MainNavigator;
