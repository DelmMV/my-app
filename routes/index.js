import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenDelivery from "../screens/ScreenDelivery";
import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import PurchaseScreen from "../screens/PurchaseScreen";
import MapScreen from "../screens/MapScreen";
import StatisticsSreen from "../screens/StatisticsSreen";

const Stack = createNativeStackNavigator();

const Routers = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ScreenDelivery" component={ScreenDelivery} />
      <Stack.Screen name="PurchaseScreen" component={PurchaseScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="StatisticsSreen" component={StatisticsSreen} />
    </Stack.Navigator>
  );
};

export default Routers;
