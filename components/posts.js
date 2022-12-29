import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { days, orderStatus } from "../utils/constans.js";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import openMap from "react-native-open-maps";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
// import BarcodeCreatorViewManager, {
//   BarcodeFormat,
// } from "react-native-barcode-creator";

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
  const [showContent, setShowContent] = useState(false);
  const goToYosemite = (x, y, map) => {
    openMap({ latitude: x, longitude: y, provider: map });
  };
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.title}
          onPress={() => Clipboard.setString(el.DeliveryNumber)}
        >
          <Text style={styles.title}>Заказ #{el.DeliveryNumber}</Text>
        </TouchableOpacity>
      </View>

      <View>
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
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>
          {orderStatus[el.Status - 1].toUpperCase()}
        </Text>
        <TouchableOpacity>
          <Text
            style={styles.button}
            onPress={() => setShowContent(!showContent)}
          >
            QRCode
          </Text>
        </TouchableOpacity>
      </View>
      {showContent && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 6,
            height: 280,
            width: 280,
            borderColor: "white",
            backgroundColor: "white",
          }}
        >
          <QRCode
            value={`${el.ClientGUID}.${el.OrderId}`}
            size={256}
            viewBox={`0 0 256 256`}
            style={{
              height: "auto",
              maxWidth: "100%",
              width: "100%",
            }}
          />
        </View>
      )}
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
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    //alignItems: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    width: 60,
    height: 30,
    color: "white",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "green",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
