import React, { useContext, useEffect, useState } from "react";
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
import DropDownList from "../components/DropDownList";
import AppContext from "../contexts/AppContext";

export default function ScreenDelivery({ navigation }) {
  const [point, setPoint] = useState("");
  const { value } = useContext(AppContext);
  const { isLoading, posts, onRefresh, isRefreshing } = useFetchPosts();

  const myPoint = async () => {
    try {
      const point = await AsyncStorage.getItem("Point");
      if (point !== null) setPoint(point);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    myPoint();
  }, []);

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

  function filterPost(post) {
    let filterResult = value;
    if (filterResult === null) {
      return post;
    } else {
      return [...post.filter((e) => e.Status === value)];
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 41,
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

      <StatusBar style="light" backgroundColor="#17212b" />
      <DropDownList />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          ListEmptyComponent={Empty}
          data={filterPost(posts)}
          renderItem={({ item }) => <Post el={item} />}
        />
      )}
      <Text style={styles.botText}>
        {point} || Закзов {posts.length} || Выручка {profit()}₽
      </Text>
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
    marginStart: 11,
    marginTop: 30,
    color: "#FAEBD7",
    //alignSelf: "left",
  },
  botText: {
    color: "#FAEBD7",
    alignSelf: "center",
    fontSize: 12,
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
