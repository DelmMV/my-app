import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenDelivery from "../screens/ScreenDelivery";
import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator();

const Routers = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ScreenDelivery" component={ScreenDelivery} />
    </Stack.Navigator>
  );
};

export default Routers;
