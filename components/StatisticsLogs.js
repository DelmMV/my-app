import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GetUserTimeLogs } from "./GetUserTime.js";
import { StatusBar } from "expo-status-bar";
import AppContext from "../contexts/AppContext";

import React, { useContext, memo } from "react";
import { useNavigation } from "@react-navigation/native";

export const StatisticsLogs = ({ el }) => {
  const navigation = useNavigation();

  const { setCounter } = useContext(AppContext);

  const handelePurchase = (id) => {
    setCounter(id);
    navigation.push("PurchaseLogsScreen");
  };

  return (
    <TouchableOpacity onPress={() => handelePurchase(el.OrderId)}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {GetUserTimeLogs(new Date(el.WishingDate))}
        </Text>
        <Text style={styles.text}>#{el.DeliveryNumber}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    //flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#17312b",
    padding: 5,
    margin: 5,
    backgroundColor: "#182533",
    width: 100,
    height: 60,
    alignItems: "center",
  },
  text: {
    marginBottom: 6,
    marginEnd: 6,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "400",
    color: "#FAEBD7",
    flex: 1,
    fontSize: 15,
  },
  title: {
    //textAlign: "center",
    width: 125,
    //flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FAEBD7",
    // borderWidth: 1,
    // borderRadius: 5,
  },
  button: {
    width: 80,
    height: 40,
    color: "#FAEBD7",
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    backgroundColor: "green",
    textAlign: "center",
    textAlignVertical: "center",
  },
  status: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
  },
});
