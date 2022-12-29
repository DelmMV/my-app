import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { days, orderStatus } from "../utils/constans.js";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import openMap from "react-native-open-maps";

function addLeadingZero(d) {
  return d < 10 ? "0" + d : d;
}

function getUserTime(t) {
  let tr = t - 840 * 60;
  let Y = t.getFullYear();
  let M = addLeadingZero(t.getMonth() + 1);
  let D = addLeadingZero(t.getDate());
  let d = days[t.getDay()];
  let h = addLeadingZero(t.getHours());
  let m = addLeadingZero(t.getMinutes());
  return `${h}:${m}`;
}

export const Post = ({ el }) => {
  const goToYosemite = (x, y, map) => {
    openMap({ latitude: x, longitude: y, provider: map });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => Clipboard.setString(el.DeliveryNumber)}>
        <Text style={styles.text}>Заказ #{el.DeliveryNumber}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => goToYosemite(el.Latitude, el.Longitude, "yandex")}
      >
        <Text style={styles.text}>{el.Address}</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        Желаемое время получения: {getUserTime(new Date(el.WishingDate))}
      </Text>
      <TouchableOpacity
        onPress={() => Linking.openURL(`tel: +${el.ClientPhone}`)}
      >
        <Text style={styles.text}>Телефон: +{el.ClientPhone}</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        {orderStatus[el.Status - 1].toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    //borderColor: "#2a4858",
    padding: 10,
    margin: 10,
    backgroundColor: "#182533",
  },
  text: {
    marginBottom: 4,
    marginEnd: 4,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
