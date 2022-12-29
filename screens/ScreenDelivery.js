import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  FlatList,
  Button,
} from "react-native";
import { useFetchPosts } from "../hooks/index";
import { Post, Seporator, Empty } from "../components/index";
import { StatusBar } from "expo-status-bar";
import BackgroundNotification from "../components/BackgroundNotification";
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.topText}>Всего закзов {posts.length}</Text>
      <Button title="Выход" onPress={removeValue} />
      <BackgroundNotification />
      <StatusBar style="light" backgroundColor="#17212b" />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          ListEmptyComponent={Empty}
          //ItemSeparatorComponent={Seporator}
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
    paddingTop: 40,
    color: "white",
    alignSelf: "center",
  },
});
