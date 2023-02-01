import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  View,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { useFetchPurchase } from "../hooks";
import { StatusBar } from "expo-status-bar";
import Purchase from "../components/Purchase";
import AppContext from "../contexts/AppContext";
import { PostOrder } from "../api/PostOrder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ColorStatus } from "../components/ColorStatus";
import QRCode from "react-qr-code";
import GetUserTime from "../components/GetUserTime";
import { WishesOrder } from "../components/WishesOrder";

export default function PurchaseScreen({ navigation }) {
  const [order, setOrder] = useState(0);
  const { counter, item } = useContext(AppContext);
  const { isLoading, purchase, onRefresh, isRefreshing } =
    useFetchPurchase(counter);
  const color = ColorStatus(order);
  useEffect(() => {
    item.forEach((element) => {
      if (element.OrderId === counter) {
        setOrder(element);
      }
    });
  }, []);

  const wishesOrder = WishesOrder(order);
  console.log("render");

  const handleLog = async () => {
    const data = AsyncStorage.setItem("Log", `${order.OrderId}`);
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
        console.log(result);
        if (result.status == 200) {
          navigation.replace("ScreenDelivery");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Text style={styles.button}>
              <Ionicons name="chevron-back-outline" size={16} color="white" />
            </Text>
          </TouchableOpacity>
          <View style={{ width: 200 }}>
            <Text
              style={[
                color,
                {
                  paddingTop: 55,
                  textShadowColor: "black",
                  textShadowRadius: 5,
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: 2,
                },
              ]}
            >
              #{order.DeliveryNumber}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View>
          <View>{wishesOrder}</View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.title}>Товары</Text>
            <Text style={[styles.title, { marginRight: 40 }]}>
              {order.QuantityPurchases}
            </Text>
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              scrollEnabled={false}
              estimatedItemSize={72}
              data={purchase}
              onRefresh={onRefresh}
              refreshing={isRefreshing}
              renderItem={({ item }) => <Purchase el={item} />}
            />
          )}
        </View>
        <View>
          <Text style={styles.title}>Информация о заказе</Text>
          <View
            style={{
              marginLeft: 30,
              marginTop: 5,
              padding: 10,
              backgroundColor: "white",
              width: 150,
            }}
          >
            <QRCode
              value={`${order.ClientGUID}.${order.OrderId}`}
              size={128}
              viewBox={`0 0 256 256`}
              style={{
                height: "auto",
                maxWidth: "100%",
                width: "100%",
              }}
            />
          </View>
          <Text style={styles.infotext}>Оплата: {order.PaymentType}</Text>
          <Text style={styles.infotext}>
            Желаемое время получения: {GetUserTime(new Date(order.WishingDate))}
          </Text>
          <Text style={styles.infotext}>
            Ближайшее время: {order.Nearest ? "Да" : "Нет"}
          </Text>
          <Text style={styles.infotext}>
            Время заказа: {GetUserTime(new Date(order.DateOrder))}
          </Text>
          {order.DateComplete ? (
            <Text style={styles.infotext}>
              Время подтверждения заказа:
              {GetUserTime(new Date(order.DateComplete))}
            </Text>
          ) : (
            <View></View>
          )}
          {order.DateLink ? (
            <Text style={styles.infotext}>
              Время сборки заказа: {GetUserTime(new Date(order.DateLink))}
            </Text>
          ) : (
            <View></View>
          )}
          {order.DateReceipt ? (
            <Text style={styles.infotext}>
              Время вручения заказа: {GetUserTime(new Date(order.DateReceipt))}
            </Text>
          ) : (
            <View></View>
          )}
          <Text style={styles.infotext}>Сумма заказа: {order.Price}₽</Text>
        </View>
      </ScrollView>

      {/* <Button onPress={handleLog} title="Тест логирования" color="green" /> */}
      {order.Status === 6 ? (
        <Text
          style={{
            width: "50%",
            height: 40,
            color: "white",
            borderRadius: 5,
            backgroundColor: "green",
            textAlign: "center",
            textAlignVertical: "center",
            // marginTop: 45,
            // marginBottom: 10,
            // marginLeft: 10,
            alignSelf: "center",
          }}
          disabled={order.Status === 6 ? false : true}
          onPress={handlePostOrder}
        >
          <Ionicons name="checkmark-circle-outline" size={32} color="white" />
        </Text>
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#17212b",
  },
  text: {
    color: "white",
    paddingBottom: 20,
    paddingStart: 20,
  },
  button: {
    width: 80,
    height: 40,
    color: "white",
    borderRadius: 5,
    backgroundColor: "green",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 45,
    marginBottom: 10,
    marginLeft: 10,
    borderRadius: 20,
    //alignSelf: "flex-start",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10,
  },
  infotext: {
    color: "gold",
    textAlign: "left",
    paddingLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
