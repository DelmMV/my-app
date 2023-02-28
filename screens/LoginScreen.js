import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { UserLogin } from "../api/UserLogin";

export default function LoginScreen({ navigation }) {
  const [login, setlogin] = useState("");
  const [password, setPassword] = useState("");
  const [isRefreshing, setRefreshing] = useState(false);

  const validationButtonStyle = () => {
    if (login && password) {
      return styles.button;
    }
    return styles.buttonFalse;
  };
  const validationButtonDisabled = () => {
    if (login && password) {
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    setRefreshing(true);
    UserLogin({
      login: login,
      password: password,
    })
      .then((result) => {
        if (result.status == 200) {
          setRefreshing(false);
          AsyncStorage.setItem("AccessToken", result.headers.token);
          AsyncStorage.setItem("Point", result.data.ShopName);
          navigation.replace("ScreenDelivery");
        }
      })
      .catch((err) => {
        console.error(err);
      });
    // .finally(setRefreshing(false));
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#17212b" />

      <Text style={styles.text}>Служба доставки ЦЕХ 85</Text>

      <TextInput
        style={styles.input}
        placeholder="Login"
        placeholderTextColor="#fff"
        value={login}
        onChangeText={(text) => setlogin(text)}
      ></TextInput>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#fff"
        value={password}
        onChangeText={(text) => setPassword(text)}
      ></TextInput>
      {/* <Pressable
        onPress={handleLogin}
        color="green"
        title="Войти"
        disabled={validationButton()}
      /> */}
      <Pressable
        style={validationButtonStyle()}
        onPress={handleLogin}
        disabled={validationButtonDisabled()}
      >
        {isRefreshing ? (
          <Text style={styles.textButton}>Войти</Text>
        ) : (
          <ActivityIndicator size="small" style={{ top: 8 }} />
        )}
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingTop: 120,
    alignItems: "center",
    backgroundColor: "#17212b",
    color: "red",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    color: "white",
    width: 150,
    margin: 10,
    borderBottomWidth: 1,
    borderColor: "grey",
    textAlign: "center",
  },

  button: {
    marginTop: 10,
    width: 150,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "green",
  },
  buttonFalse: {
    marginTop: 10,
    width: 150,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "grey",
  },

  textButton: {
    textAlign: "center",
    top: 7,
    color: "#fff",
  },
});
