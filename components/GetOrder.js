import { memo } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useFetchPurchase } from "../hooks/useFetchPurchase";
import Purchase from "../components/Purchase";

export default GetOrder = memo(function GetOrder(promis) {
  console.log("getorder");
  const { purchase, isLoading } = useFetchPurchase(promis.OrderId);

  // let result = "";

  // purchase.forEach((e) => {
  //   result += ` ${e.ProductName} - ${e.Quantity}шт. \n`;
  // });

  return (
    <View
      style={{
        alignItems: "center",
        paddingTop: 10,
        flexDirection: "column",
      }}
    >
      <View
        style={{
          borderRadius: 20,
          backgroundColor: "rgba(62, 84, 106, 0.5)",
          paddingBottom: 10,
          paddingLeft: 15,
          paddingRight: 20,
          // marginLeft: 15,
          // marginLeft: 20,
        }}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={purchase}
            renderItem={({ item }) => <Purchase el={item} />}
          />
          // <Text
          //   style={{
          //     paddingLeft: 10,
          //     paddingRight: 10,
          //     paddingTop: 10,
          //     color: "#FAEBD7",
          //     borderRadius: 5,
          //     backgroundColor: "rgba(62, 84, 106, 0.5)",
          //     textAlign: "left",
          //     fontSize: 12,
          //   }}
          // >
          //   {result}
          // </Text>
        )}
      </View>
    </View>
  );
});
