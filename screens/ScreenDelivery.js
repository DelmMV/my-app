import React, { useContext, useEffect, useState, memo } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { useFetchPosts } from "../hooks/index";
import { Post, Empty } from "../components/index";
import { StatusBar } from "expo-status-bar";
import Navigation from "../components/Navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownList from "../components/DropDownList";
import DropDownList2 from "../components/DropDownList2";
import AppContext from "../contexts/AppContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FilterItem } from "../components/FilterItem";
import { useCountLogsStore } from "../contexts/store";

const ScreenDelivery = memo(function ScreenDelivery({ navigation }) {
  const count = useCountLogsStore((state) => state.logs);

  const [point, setPoint] = useState("");
  const { value } = useContext(AppContext);
  const { isLoading, posts, onRefresh, isRefreshing } = useFetchPosts();
  const filter = FilterItem(value, posts);
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
  }, [point]);

  useEffect(() => {
    setInterval(onRefresh, 0.5 * 60 * 1000);
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
  const handleStatistics = () => {
    navigation.push("StatisticsSreen");
  };
  function profit() {
    let result = 0;
    posts.forEach((element) => {
      result = result + element.Price;
    });
    return result;
  }
  console.log("screenD");
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: 38, marginLeft: 11 }}>
        <Text style={styles.topText}> {point}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 1,
          marginLeft: 11,
          marginRight: 11,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Navigation />
          <TouchableOpacity onPress={handleStatistics} style={{ margin: 10 }}>
            <Ionicons name="podium-outline" size={24} color="#FAEBD7" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleMap}
            style={{ marginLeft: 30, marginTop: 10, marginBottom: 10 }}
          >
            <Ionicons name="map-outline" size={24} color="#FAEBD7" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={removeValue}>
          <Ionicons name="log-out-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>

      <StatusBar style="light" backgroundColor="#17212b" />
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          width: "95%",
          //zIndex: 0,
        }}
      >
        <View style={{ width: "50%", paddingRight: 5 }}>
          <DropDownList />
        </View>
        <View style={{ width: "50%" }}>
          <DropDownList2 />
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <FlatList
          extraData={filter}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          ListEmptyComponent={Empty}
          data={filter}
          keyExtractor={(item) => item.OrderId}
          renderItem={({ item }) => <Post el={item} />}
        />
      )}
      <Text style={styles.botText}>
        Доставил заказов {count} || Всего заказов {posts.length} || Выручка{" "}
        {profit()}₽
      </Text>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    height: "100%",
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
  topText: {
    color: "#FAEBD7",
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

export default ScreenDelivery;
