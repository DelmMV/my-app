import "./wdyr";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routers from "./routes/index";
import { AppProvider } from "./contexts/AppContext";

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Routers />
      </NavigationContainer>
    </AppProvider>
  );
}
