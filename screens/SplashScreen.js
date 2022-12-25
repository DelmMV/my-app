import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      handleGetToken();
    }, 2000);
  });

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem("AccessToken");

    if (!dataToken) {
      navigation.replace("LoginScreen");
    } else {
      navigation.replace("ScreenDelivery");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Цех <Text style={{ color: "white", fontSize: 30 }}>85</Text>
      </Text>
      <Text style={{ color: "white", fontSize: 30 }}>Доставка</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  text: {
    fontWeight: "800",
    fontSize: 30,
    color: "red",
  },
});
