import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { useFetchPosts } from "../hooks/index";
import { Post, Empty } from "../components/index";
import { StatusBar } from "expo-status-bar";
import Navigation from "../components/Navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ScreenDelivery({ navigation }) {
  const { isLoading, posts, onRefresh, isRefreshing } = useFetchPosts();
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("AccessToken");
      navigation.replace("LoginScreen");
    } catch (e) {
      console.log(e);
    }
  };
  const handleMap = () => {
    navigation.push("MapScreen");
  };
  function profit() {
    let result = 0;
    posts.forEach((element) => {
      result = result + element.Price;
    });
    return result;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 40,
          marginLeft: 11,
          marginRight: 11,
        }}
      >
        <Navigation />
        <TouchableOpacity onPress={handleMap}>
          <Text style={styles.map}>Карта</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={removeValue}>
          <Text style={styles.button}>Выход</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.topText}>
        Всего закзов {posts.length} || Выручка {profit()}₽
      </Text>
      <StatusBar style="light" backgroundColor="#17212b" />

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          ListEmptyComponent={Empty}
          data={posts}
          renderItem={({ item }) => <Post el={item} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "center",
    backgroundColor: "#17212b",
  },
  textContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 2,
  },
  text: {
    color: "white",
  },
  topText: {
    color: "#FAEBD7",
    alignSelf: "center",
  },
  button: {
    width: 60,
    height: 30,
    color: "white",
    borderRadius: 5,
    backgroundColor: "#8B0000",
    textAlign: "center",
    textAlignVertical: "center",
  },
  map: {
    width: 60,
    height: 30,
    color: "white",
    borderRadius: 5,
    backgroundColor: "green",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
