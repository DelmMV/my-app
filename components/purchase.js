import React, { memo } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { useFetchhPictureId } from "../hooks/useFetchPictureId";
import { cacheImage } from "../utils/cacheImage";
import Checkbox from "expo-checkbox";

const Purchase = memo(function Purchase({ el }) {
  const { isLoading, pictureId, onRefresh, isRefreshing } = useFetchhPictureId(
    el.PictureId
  );

  const products = el.Products;
  const ProductsSerch = () => {
    let products2 = "";
    if (products) {
      products.forEach((element) => {
        products2 += `— ${element.ProductName}  ${element.Quantity}шт.\n`;
      });
    }
    return <Text>{products2}</Text>;
  };
  const uri = `${pictureId.baseURL}${pictureId.url}`;
  const QuantityMarket = () => {
    if (el.Quantity > 1) {
      return (
        <Text
          style={[
            styles.quantity,
            {
              color: "white",
              backgroundColor: "green",
              borderWidth: 1,
              borderRadius: 20,
              width: 40,
              height: 40,
              textAlignVertical: "center",
              textAlign: "center",
            },
          ]}
        >
          {el.Quantity}шт.
        </Text>
      );
    }
    return <Text style={[styles.quantity]}>{el.Quantity}шт.</Text>;
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignContent: "space-around",
          paddingTop: 10,
        }}
      >
        <Image
          source={{ uri: uri }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 10,
            right: 10,
            top: 5,
          }}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.text}>{el.ProductName}</Text>
          <Text style={styles.subText}>{el.CatalogName}</Text>
          <Text
            style={{
              color: "orange",
              textAlign: "left",
              fontSize: 12,
              position: "relative",
              width: 220,
            }}
          >
            <ProductsSerch />
          </Text>
        </View>
      </View>

      <View>
        <QuantityMarket />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    paddingRight: 15,
    paddingLeft: 15,
  },
  text: {
    fontWeight: "bold",
    color: "#FAEBD7",
    textAlign: "left",
    width: 200,
    fontSize: 16,
  },
  subText: { fontSize: 12, color: "#A9A9A9" },
  price: {
    marginStart: 10,
    fontWeight: "bold",
    color: "#FAEBD7",
  },
  quantity: {
    fontWeight: "bold",
    color: "#FAEBD7",
  },
});

export default Purchase;
