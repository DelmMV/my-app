import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routers from "./routes/index";

export default function App() {
  return (
    <NavigationContainer>
      <Routers />
    </NavigationContainer>
  );
}
