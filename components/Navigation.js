import React from "react";
import { View } from "react-native";
import BackgroundNotification from "../components/BackgroundNotification";

function Navigation({ navigation }) {
  return (
    <View style={{ margin: 10 }}>
      <BackgroundNotification />
    </View>
  );
}

export default Navigation;
