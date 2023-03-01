import React from "react";
import Lottie from "lottie-react-native";
import { Text, StyleSheet } from "react-native";
import View from "@expo/html-elements/build/primitives/View";

export const Empty = () => (
  <View>
    <Text style={styles.empty}>Заказов нету!</Text>
    <View style={styles.animation}>
      <Lottie
        source={require("../assets/animationLoad.json")}
        autoPlay
        loop
        resizeMode="cover"
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  empty: {
    padding: 80,
    textAlign: "center",
    color: "white",
  },
  animation: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
});
