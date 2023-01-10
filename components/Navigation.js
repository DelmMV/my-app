import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, Button, TouchableOpacity, View } from "react-native";
import BackgroundNotification from "../components/BackgroundNotification";

function Navigation({ navigation }) {
  return (
    <View>
      <BackgroundNotification />
    </View>
  );
}

export default Navigation;
