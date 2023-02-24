import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { UserLogin } from "../api/UserLogin";

export default function LoginScreen({ navigation }) {
  const [login, setlogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    UserLogin({
      login: login,
      password: password,
    })
      .then((result) => {
        if (result.status == 200) {
          AsyncStorage.setItem("AccessToken", result.headers.token);
          AsyncStorage.setItem("Point", result.data.ShopName);
          navigation.navigate("ScreenDelivery");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#17212b" />

      <Text style={styles.text}>Служба доставки ЦЕХ85</Text>
      <TextInput
        style={[styles.input, styles.shadowProp]}
        placeholder="Login"
        placeholderTextColor="#fff"
        value={login}
        onChangeText={(text) => setlogin(text)}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#fff"
        value={password}
        onChangeText={(text) => setPassword(text)}
      ></TextInput>
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.button}>Войти</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingTop: 250,
    alignItems: "center",
    backgroundColor: "#17212b",
    color: "red",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
  },
  input: {
    color: "white",
    width: 150,
    margin: 10,
    borderWidth: 1,
    borderColor: "red",
    textAlign: "center",
    borderRadius: 10,
  },

  button: {
    color: "#fff",
    marginTop: 10,
    width: 70,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "green",
  },
});
