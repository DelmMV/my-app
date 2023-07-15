import React, { useState, useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { orderStatus } from "../utils/constans.js";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
import GetUserTime from "./GetUserTime.js";
import { showLocation } from "react-native-map-link";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ColorStatus } from "./ColorStatus";
import { PostOrder } from "../api/PostOrder";
import { Wishes, ClientComment } from "./WishesPost";
import { useLogsStore } from "../contexts/store";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import GetOrder from "./GetOrder";

import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export function Post({ el, onRefresh }) {
  const addLogs = useLogsStore((state) => () => state.addLogs(el));
  const color = ColorStatus(el);
  const { value2 } = useContext(AppContext);
  const options = {
    latitude: el.Latitude,
    longitude: el.Longitude,
    app: value2,
    directionsMode: "car",
  };
  const { setCounter } = useContext(AppContext);
  const [showWishes, setShowWishes] = useState(false);
  const [showORder, setShowOrder] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const scale = useSharedValue(0);
  const progress = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ scale: scale.value }],
    };
  }, []);

  const handelePurchase = (id) => {
    setCounter(id);
    navigation.push("PurchaseScreen");
  };

  const handlePostOrder = () => {
    setRefreshing(true);
    PostOrder({
      Status: 7,
      OrderID: el.OrderId,
      CancelReasonID: 1,
      Comment: "",
      WishingDate: null,
    })
      .then((result) => {
        if (result.status == 200) {
          setRefreshing(false);
          addLogs();
          onRefresh();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handlePostOrderСheckout = () => {
    setRefreshing(true);
    PostOrder({
      Status: 5,
      OrderID: el.OrderId,
      CancelReasonID: 1,
      Comment: "",
      WishingDate: null,
    })
      .then((result) => {
        if (result.status == 200) {
          setRefreshing(false);
          setShowOrder(false);
          onRefresh();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const alertHandlePostOrder = () =>
    Alert.alert("Внимание!", "Заказ доставлен?", [
      { text: "Нет" },
      {
        text: "Да",
        onPress: () => {
          handlePostOrder();
        },
      },
    ]);

  const alertHandlePostOrderСheckout = () =>
    Alert.alert("Внимание!", "Провести заказа через кассу?", [
      { text: "Нет" },
      {
        text: "Да",
        onPress: () => {
          handlePostOrderСheckout();
        },
      },
    ]);

  const colorTime = () => {
    const curentDate = new Date().getTime();
    const timeDifference = el.WishingDate - curentDate;
    if (el.Status === 7) {
      return "grey";
    }
    if (timeDifference >= 1800000) {
      return "#FAEBD7";
    }
    return timeDifference <= 900000 ? "red" : "orange";
  };

  useEffect(() => {
    progress.value = withTiming(1);
    scale.value = withSpring(1);
  }, []);

  return (
    <Animated.View style={[styles.container, reanimatedStyle]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => setShowOrder(!showORder)}>
            {showORder ? (
              <Ionicons name="caret-up-outline" size={24} color="#FAEBD7" />
            ) : (
              <Ionicons name="caret-down-outline" size={24} color="#FAEBD7" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.title, { paddingLeft: 10 }]}
            onPress={() => Clipboard.setString(el.DeliveryNumber)}
          >
            <Text style={styles.title}>Заказ #{el.DeliveryNumber}</Text>
          </TouchableOpacity>
        </View>
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
            onPress={() => showLocation(options)}
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
        {Wishes(el)}
        {el.CheckoutUserName && (
          <Text style={styles.text}>
            Провёл: {el.CheckoutUserName.split(" ", 2)}
          </Text>
        )}

        <View style={{ flexDirection: "row" }}>
          {el.ClientName ? (
            <Text style={styles.text}>Клиент: {el.ClientName} </Text>
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
            Желаемое время:{" "}
            <Text style={{ color: colorTime(), fontWeight: "bold" }}>
              {GetUserTime(new Date(el.WishingDate))}
            </Text>
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
          disabled={ClientComment(el).length > 0 ? false : true}
          onPress={() => setShowWishes(!showWishes)}
        >
          {ClientComment(el).length > 0 ? (
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
            onPress={alertHandlePostOrder}
          >
            {!isRefreshing ? (
              <Text style={styles.button}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={22}
                  color="white"
                />
              </Text>
            ) : (
              <Pressable style={styles.button}>
                <ActivityIndicator size="small" />
              </Pressable>
            )}
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {el.Status === 5 ? (
          <TouchableOpacity
            disabled={el.Status === 5 ? false : true}
            onPress={alertHandlePostOrderСheckout}
          >
            {!isRefreshing ? (
              <Text style={styles.button}>
                <Ionicons name="receipt-outline" size={22} color="white" />
              </Text>
            ) : (
              <Pressable style={styles.button}>
                <ActivityIndicator size="small" />
              </Pressable>
            )}
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
            {ClientComment(el)}
          </Text>
        </View>
      )}
      {showORder && <GetOrder OrderId={el.OrderId} />}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#17312b",
    padding: 10,
    margin: 10,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: "#182534",
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
    width: 125,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FAEBD7",
  },
  button: {
    width: 80,
    height: 40,
    color: "#FAEBD7",
    borderWidth: 1,
    borderColor: "#17312b",
    borderRadius: 20,
    padding: 5,
    backgroundColor: "rgba(62, 84, 106, 0.5)",
    textAlign: "center",
    textAlignVertical: "center",
  },
  status: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
  },
});
