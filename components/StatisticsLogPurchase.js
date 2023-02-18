import React, { memo, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useFetchhPictureId } from "../hooks/useFetchPictureId";
import { Image } from "react-native-expo-image-cache";

export default StatisticsLogPurchase = memo(function StatisticsLogPurchase({
  el,
}) {
  const { isLoading, pictureId, onRefresh, isRefreshing } = useFetchhPictureId(
    el.PictureId
  );
  const uri = `${pictureId.baseURL}${pictureId.url}`;

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
  const QuantityMarket = () => {
    if (el.Quantity > 1) {
      return (
        <Text
          style={[
            styles.quantity,
            {
              color: "red",
              borderBottomWidth: 2,
              borderBottomColor: "red",
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
          defaultSource={{ uri: uri, cache: "force-cache" }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 10,
            margin: 5,
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
    width: "95%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingRight: 15,
    paddingLeft: 15,
  },
  text: {
    fontWeight: "bold",
    color: "#FAEBD7",
    textAlign: "left",
    width: 235,
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
