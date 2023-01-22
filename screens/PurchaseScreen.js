import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  View,
} from "react-native";
import { useFetchPurchase } from "../hooks";
import { StatusBar } from "expo-status-bar";
import Purchase from "../components/Purchase";
import AppContext from "../contexts/AppContext";
import { PostOrder } from "../api/PostOrder";
import { Seporator } from "../components";
import * as Clipboard from "expo-clipboard";

export default function PurchaseScreen({ navigation }) {
  const [order, setOrder] = useState(0);
  const { counter, item } = useContext(AppContext);
  const { isLoading, purchase, onRefresh, isRefreshing } =
    useFetchPurchase(counter);

  useEffect(() => {
    item.forEach((element) => {
      if (element.OrderId === counter) {
        setOrder(element);
      }
    });
  }, []);

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
  const colorStatus = () => {
    if (order.Status === 7) {
      return {
        color: "grey",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 2,
      };
    } else if (order.Status === 5) {
      return {
        color: "#4169E1",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 2,
      };
    } else if (order.Status === 6) {
      return {
        color: "#00FF00",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 2,
      };
    } else if (order.Status === 12) {
      return {
        color: "#FFD700",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 2,
      };
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Text style={styles.button}>Назад</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Clipboard.setString(order.DeliveryNumber)}
        >
          <Text style={colorStatus()}>#{order.DeliveryNumber}</Text>
        </TouchableOpacity>
        <Text style={{ color: "gold", textAlign: "center" }}>
          Общая стоимость: {order.Price}₽
        </Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={purchase}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          ItemSeparatorComponent={Seporator}
          renderItem={({ item }) => <Purchase el={item} />}
        />
      )}
      <View>
        <Button
          title="Доставлено"
          color="green"
          disabled={order.Status === 6 ? false : true}
          onPress={handlePostOrder}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#17212b",
    flex: 1,
  },
  text: {
    color: "white",
    paddingBottom: 20,
    paddingStart: 20,
  },
  button: {
    width: 60,
    height: 35,
    color: "white",
    borderRadius: 5,
    backgroundColor: "green",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 40,
    marginStart: 30,
  },
});
