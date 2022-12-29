import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { useFetchPosts } from "../hooks/index";
import { Post, Empty } from "../components/index";
import { StatusBar } from "expo-status-bar";
import Navigation from "../components/Navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import View from "@expo/html-elements/build/primitives/View";

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
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingTop: 40,
        }}
      >
        <Navigation />
        <TouchableOpacity onPress={removeValue}>
          <Text style={styles.button}>Выход</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.topText}>Всего закзов {posts.length}</Text>
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
    color: "white",
    alignSelf: "center",
  },
  button: {
    width: 60,
    height: 35,
    color: "white",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "green",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
