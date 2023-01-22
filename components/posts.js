import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { days, orderStatus } from "../utils/constans.js";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import openMap from "react-native-open-maps";
import QRCode from "react-qr-code";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../contexts/AppContext";
import { Audio } from "expo-av";
import GetUserTime from "./GetUserTime.js";

export const Post = ({ el }) => {
  const [wishes, setWishes] = useState("");
  const [clientComment, setClientComment] = useState("");
  const { counter, setCounter } = useContext(AppContext);
  const [showContent, setShowContent] = useState(false);
  const [showWishes, setShowWishes] = useState(false);
  const navigation = useNavigation();

  const handelePurchase = (id) => {
    setCounter(id);
    navigation.push("PurchaseScreen");
  };

  const colorStatus = () => {
    if (el.Status === 7) {
      return { color: "grey", fontSize: 16, fontWeight: "bold" };
    } else if (el.Status === 5) {
      return { color: "#4169E1", fontSize: 16, fontWeight: "bold" };
    } else if (el.Status === 6) {
      return { color: "#00FF00", fontSize: 16, fontWeight: "bold" };
    } else if (el.Status === 12) {
      return { color: "#FFD700", fontSize: 16, fontWeight: "bold" };
    }
  };

  const goToYosemite = (x, y, map) => {
    openMap({ latitude: x, longitude: y, provider: map });
  };

  useEffect(() => {
    if (el.Wishes.length > 0) {
      let res = "";
      el.Wishes.forEach((element) => {
        res += `${element["Name"].slice(0, 1)} `;
        setWishes(res);
      });
    } else {
      setWishes(" — ");
    }
  }, []);

  useEffect(() => {
    if (el.ClientComment) {
      setClientComment(el.ClientComment);
    } else {
      setClientComment("");
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={styles.title}
          onPress={() => Clipboard.setString(el.DeliveryNumber)}
        >
          <Text style={styles.title}>Заказ #{el.DeliveryNumber}</Text>
        </TouchableOpacity>
        <Text style={colorStatus()}>{`${orderStatus[
          el.Status - 1
        ].toUpperCase()}`}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => goToYosemite(el.Latitude, el.Longitude, "yandex")}
        >
          <Text style={styles.text}>{el.Address}</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          Пожелания:{" "}
          <Text style={{ color: "orange", fontWeight: "700" }}>{wishes}</Text>
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>Клинет: {el.ClientName} </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel: +${el.ClientPhone}`)}
          >
            <Text style={styles.text}>Тел. +{el.ClientPhone}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>
            Желаемое время: {GetUserTime(new Date(el.WishingDate))}
          </Text>
          <Text
            style={{
              marginBottom: 4,
              marginEnd: 4,
              fontSize: 16,
              fontWeight: "bold",
              color: "#FAEBD7",
            }}
          >
            {el.Nearest ? "Ближайшее" : ""}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => handelePurchase(el.OrderId)}>
          <Text style={styles.button}>Состав</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={clientComment.length > 0 ? false : true}
          onPress={() => setShowWishes(!showWishes)}
        >
          <Text style={styles.button}>
            {clientComment.length > 0 ? "Коммент" : "—"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowContent(!showContent)}>
          <Text style={styles.button}>QR-Код</Text>
        </TouchableOpacity>
      </View>
      {showWishes && (
        <View
          style={{
            alignItems: "center",
            paddingTop: 20,
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              color: "#FAEBD7",
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              backgroundColor: "gray",
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            {clientComment}
          </Text>
        </View>
      )}
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
    borderColor: "#17312b",
    padding: 10,
    margin: 10,
    backgroundColor: "#182533",
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
    width: 100,
    height: 30,
    color: "#FAEBD7",
    borderWidth: 1,
    borderRadius: 5,
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
