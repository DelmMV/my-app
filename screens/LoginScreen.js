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
      <TouchableOpacity>
        <Text style={styles.button} onPress={handleLogin}>
          Войти
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
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
  shadowProp: {
    shadowOffset: { width: 3, height: 4 },
    shadowColor: "#black",
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
