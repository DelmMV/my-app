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
import { useLogsStore } from "../contexts/store";
import { GetUserTimeLogs } from "../components/GetUserTime";

const ScreenDelivery = memo(function ScreenDelivery({ navigation }) {
  const count = useLogsStore((state) => state.log);
  const currentTime = GetUserTimeLogs(new Date());

  const FilterCurentDay = () => {
    const result = [
      ...count.filter(
        (e) => GetUserTimeLogs(new Date(e.WishingDate)) === currentTime
      ),
    ];
    return <Text>Доставлено {result.length} з.</Text>;
  };

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
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      ) : (
        <FlatList
          extraData={filter}
          initialNumToRender={3}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          ListEmptyComponent={Empty}
          data={filter}
          keyExtractor={(item) => item.OrderId}
          renderItem={({ item }) => <Post el={item} />}
        />
      )}
      <Text style={styles.botText}>
        <FilterCurentDay /> || Всего {posts.length} з.
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
    fontSize: 13,
    marginBottom: 3,
    marginTop: 3,
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
