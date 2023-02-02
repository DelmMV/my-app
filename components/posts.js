import React, { useState, useContext, useEffect, memo } from "react";
import AppContext from "../contexts/AppContext";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { days, orderStatus } from "../utils/constans.js";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import QRCode from "react-qr-code";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import GetUserTime from "./GetUserTime.js";
import { showLocation } from "react-native-map-link";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ColorStatus } from "./ColorStatus";
import { PostOrder } from "../api/PostOrder";
import { useFetchPosts } from "../hooks";

export const Post = memo(function Post({ el }) {
  const color = ColorStatus(el);
  const { value2, counter } = useContext(AppContext);
  const options = {
    latitude: el.Latitude,
    longitude: el.Longitude,
    app: value2,
    directionsMode: "car",
  };
  const { setCounter } = useContext(AppContext);
  const [showContent, setShowContent] = useState(false);
  const [showWishes, setShowWishes] = useState(false);
  const navigation = useNavigation();
  const { isLoading, posts, onRefresh, isRefreshing } = useFetchPosts();

  const handelePurchase = (id) => {
    setCounter(id);
    navigation.push("PurchaseScreen");
  };
  const Wishes = () => {
    if (el.Wishes.length > 0) {
      let res = "";
      el.Wishes.forEach((element) => {
        res += `${element["Name"].slice(0, 1)} `;
      });
      return (
        <Text style={styles.text}>
          Пожелания:{"  "}
          <Text style={{ color: "orange", fontWeight: "700" }}>{res}</Text>
        </Text>
      );
    } else {
      return <></>;
    }
  };

  const ClientComment = () => {
    if (el.ClientComment) {
      return el.ClientComment;
    } else {
      return "";
    }
  };

  const handlePostOrder = () => {
    PostOrder({
      Status: 7,
      OrderID: counter,
      CancelReasonID: 1,
      Comment: "",
      WishingDate: null,
    })
      .then((result) => {
        if (result.status == 200) {
          onRefresh();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={styles.title}
          onPress={() => Clipboard.setString(el.DeliveryNumber)}
        >
          <Text style={styles.title}>Заказ #{el.DeliveryNumber}</Text>
        </TouchableOpacity>
        <Text
          style={[color, { fontSize: 16, fontWeight: "bold" }]}
        >{`${orderStatus[el.Status - 1].toUpperCase()}`}</Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <TouchableOpacity
            style={{ width: 300 }}
            onPress={() => Clipboard.setString(el.Address)}
          >
            <Text style={styles.text}>{el.Address}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showLocation(options)}>
            <Ionicons
              name="navigate-circle-outline"
              size={32}
              color="#FAEBD7"
            />
          </TouchableOpacity>
        </View>

        <Wishes />

        <View style={{ flexDirection: "row" }}>
          {el.ClientName ? (
            <Text style={styles.text}>Клинет: {el.ClientName} </Text>
          ) : (
            <></>
          )}
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
          <Text style={styles.button}>
            <Ionicons name="list-outline" size={24} color="white" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={ClientComment().length > 0 ? false : true}
          onPress={() => setShowWishes(!showWishes)}
        >
          {ClientComment().length > 0 ? (
            <Text style={styles.button}>
              <Ionicons
                name="chatbox-ellipses-outline"
                size={24}
                color="white"
              />
            </Text>
          ) : (
            <></>
          )}
        </TouchableOpacity>
        {el.Status === 6 ? (
          <TouchableOpacity
            disabled={el.Status === 6 ? false : true}
            onPress={handlePostOrder}
          >
            <Text style={styles.button}>
              <Ionicons
                name="checkmark-circle-outline"
                size={22}
                color="white"
              />
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
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
            <ClientComment />
          </Text>
        </View>
      )}
    </View>
  );
});

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
