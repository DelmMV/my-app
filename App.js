import "./wdyr";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routers from "./routes/index";
import { AppProvider } from "./contexts/AppContext";
import { enableLatestRenderer } from "react-native-maps";

export default function App() {
  enableLatestRenderer();
  return (
    <AppProvider>
      <NavigationContainer>
        <Routers />
      </NavigationContainer>
    </AppProvider>
  );
}
