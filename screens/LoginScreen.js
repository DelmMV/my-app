import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

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
          navigation.replace("ScreenDelivery");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Привет!</Text>
      <TextInput
        placeholder="Login"
        value={login}
        onChangeText={(text) => setlogin(text)}
      ></TextInput>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      ></TextInput>
      <TouchableOpacity>
        <Button title="Login" onPress={handleLogin}></Button>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 150,
    alignItems: "center",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
});
