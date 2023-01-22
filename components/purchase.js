import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { useFetchhPictureId } from "../hooks/useFetchPictureId";
import { Image } from "react-native-expo-image-cache";
import { cacheImage } from "../utils/cacheImage";

export default function Purchase({ el }) {
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

  const preview = { uri: `${pictureId.baseURL}${pictureId.url}` };
  const uri = `${pictureId.baseURL}${pictureId.url}`;
  cacheImage(`${pictureId.baseURL}${pictureId.url}`);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignContent: "space-around",
          paddingTop: 10,
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Image
            {...{ preview, uri }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              right: 10,
              top: 5,
            }}
          />
        )}

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
        <Text style={styles.quantity}>{el.Quantity}шт.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "flex-start",
    //justifyContent: "space-between",
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
