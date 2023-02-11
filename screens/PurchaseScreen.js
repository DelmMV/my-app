import React, { useContext, useState, useEffect, memo } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  View,
  Platform,
  Button,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { showLocation } from "react-native-map-link";
import { Seporator } from "../components";
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
import { useCountLogsStore } from "../contexts/store";

const PurchaseScreen = memo(function PurchaseScreen({ navigation }) {
  const [order, setOrder] = useState(0);
  const { counter, item, value2 } = useContext(AppContext);
  const { isLoading, purchase, onRefresh, isRefreshing } =
    useFetchPurchase(counter);

  const color = ColorStatus(order);

  useEffect(() => {
    item.forEach((element) => {
      if (element.OrderId === counter) {
        setOrder(element);
      }
    });
  }, [item]);

  const wishesOrder = WishesOrder(order);

  const options = {
    latitude: order.Latitude,
    longitude: order.Longitude,
    app: value2,
    directionsMode: "car",
  };

  const increaseCount = useCountLogsStore((state) => state.increaseCount);

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
          increaseCount();
          navigation.replace("ScreenDelivery");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const Header = () => {
    return (
      <>
        <View>{wishesOrder}</View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.title}>Товары</Text>
          <Text style={[styles.title, { marginRight: 40 }]}>
            {order.QuantityPurchases}
          </Text>
        </View>
        <Seporator />
      </>
    );
  };
  const Footer = () => {
    return (
      <>
        <View style={{ marginBottom: 5, flex: 1 }}>
          <Text style={styles.title}>Информация о заказе</Text>
          <Seporator />
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
          <Text style={styles.infotext}>Сумма заказа: {order.Price}₽</Text>
          {order.ClientName ? (
            <Text style={styles.infotext}>Клиент: {order.ClientName}</Text>
          ) : (
            <></>
          )}

          <Text style={styles.infotext}>Телефон: +{order.ClientPhone}</Text>

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

          {order.DateReceipt ? (
            <Text style={styles.infotext}>
              Время вручения заказа: {GetUserTime(new Date(order.DateReceipt))}
            </Text>
          ) : (
            <View></View>
          )}
          <Text style={[styles.infotext, { width: "95%" }]}>
            Адрес: {order.Address}
          </Text>
        </View>
        <MapView
          loadingEnabled={true}
          style={{
            height: 150,
            width: "95%",
            alignSelf: "center",
            marginBottom: 5,
          }}
          mapType="standard"
          userLocationPriority="passive"
          initialRegion={{
            latitude: order.Latitude,
            longitude: order.Longitude,
            latitudeDelta: 0.0065,
            longitudeDelta: 0.0065,
          }}
        >
          <Marker
            onPress={() => showLocation(options)}
            coordinate={{
              latitude: order.Latitude,
              longitude: order.Longitude,
            }}
          />
        </MapView>
      </>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
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

      <View style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            ListHeaderComponent={<Header />}
            data={purchase}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            renderItem={({ item }) => <Purchase el={item} />}
            ListFooterComponent={<Footer />}
          />
        )}
      </View>

      {/* <Button onPress={increaseCount} title="1" color="green" /> */}
      {order.Status === 6 ? (
        <View>
          <Text
            style={{
              width: "50%",
              height: 40,
              color: "white",
              borderRadius: 5,
              backgroundColor: "green",
              textAlign: "center",
              textAlignVertical: "center",
              alignSelf: "center",
            }}
            disabled={order.Status === 6 ? false : true}
            onPress={handlePostOrder}
          >
            <Ionicons name="checkmark-circle-outline" size={32} color="white" />
          </Text>
        </View>
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
});
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
    marginBottom: 3,
    marginLeft: 10,
    borderRadius: 20,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 2,
  },
  infotext: {
    color: "gold",
    textAlign: "left",
    paddingLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default PurchaseScreen;
