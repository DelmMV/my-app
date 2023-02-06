import React from "react";
import { View, StyleSheet } from "react-native";

export const Seporator = () => <View style={styles.seporator} />;

const styles = StyleSheet.create({
  seporator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "white",
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
