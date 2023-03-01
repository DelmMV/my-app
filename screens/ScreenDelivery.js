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
  Alert,
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
import { useLogsStore, useSoundToggle } from "../contexts/store";
import { GetUserTimeLogs } from "../components/GetUserTime";
import { Audio } from "expo-av";

function ScreenDelivery({ navigation }) {
  const currentTime = memo(GetUserTimeLogs(new Date()));

  const count = useLogsStore((state) => state.log);

  const soundState = useSoundToggle((state) => state.sound);
  const onSound = useSoundToggle((state) => state.onSound);
  const offSound = useSoundToggle((state) => state.offSound);

  const FilterCurentDay = memo(() => {
    const result = [
      ...count.filter(
        (e) => GetUserTimeLogs(new Date(e.WishingDate)) === currentTime
      ),
    ];
    return <Text>Доставлено {result.length} з.</Text>;
  });
  const [point, setPoint] = useState("");
  const [isSound, setSound] = useState(soundState);

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

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/bell.mp3")
    );

    await sound.playAsync();
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("AccessToken");
      navigation.navigate("LoginScreen");
    } catch (e) {
      console.log(e);
    }
  };

  const handleMap = () => {
    navigation.navigate("MapScreen");
  };
  const handleStatistics = () => {
    navigation.navigate("StatisticsSreen");
  };

  const handleSound = () => {
    if (isSound) {
      setSound(false);
      offSound();
    } else {
      setSound(true);
      onSound();
    }
  };

  const alertRemoveValue = () => {
    Alert.alert("Внимание!", "Вы точно хотите выйти?", [
      { text: "Нет" },
      {
        text: "Да",
        onPress: () => {
          removeValue();
        },
      },
    ]);
  };

  useEffect(() => {
    if (isSound) {
      const interval = setInterval(() => {
        if (posts.filter((e) => e.Status === 12).length !== 0) {
          console.log(posts.filter((e) => e.Status === 12).length);
          playSound();
        }
      }, 10000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isSound, posts]);

  useEffect(() => {
    myPoint();
  }, [point]);

  console.log("screenD");
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.frame,
          { marginTop: 25, alignSelf: "flex-start", top: 11 },
        ]}
      >
        <Text style={styles.topText}> {point}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={[styles.frame, { top: 5 }]}>
          <Text style={styles.botText}>
            <FilterCurentDay /> || Всего {posts.length} з.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <TouchableOpacity onPress={handleSound} style={styles.topButton}>
            {isSound ? (
              <Ionicons name="volume-high-outline" size={24} color="#FAEBD7" />
            ) : (
              <Ionicons name="volume-mute-outline" size={24} color="red" />
            )}
          </TouchableOpacity>

          <Navigation />
          <TouchableOpacity
            onPress={alertRemoveValue}
            style={[styles.topButton, { marginLeft: 10 }]}
          >
            <Ionicons name="log-out-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="light" backgroundColor="#17212b" />
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          width: "95%",
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
          renderItem={({ item }) => (
            <Post el={item} id={item.OrderId} onRefresh={onRefresh} />
          )}
        />
      )}

      <View
        style={{
          backgroundColor: "rgba(24, 37, 52, 1)",
          flexDirection: "row",
          justifyContent: "space-around",
          height: 50,
        }}
      >
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={handleStatistics}
        >
          <Ionicons name="podium-outline" size={24} color="#FAEBD7" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomButton} onPress={handleMap}>
          <Ionicons name="map-outline" size={24} color="#FAEBD7" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
    right: 2,
    color: "#FAEBD7",
    fontSize: 12,
  },
  botText: {
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
  bottomButton: {
    margin: 3,
    borderRadius: 15,
    borderWidth: 1,
    width: "45%",
    backgroundColor: "rgba(62, 84, 106, 0.5)",
    borderColor: "#17312b",
    alignItems: "center",
    justifyContent: "center",
  },
  topButton: {
    backgroundColor: "rgba(62, 84, 106, 0.5)",
    borderColor: "#17312b",
    borderWidth: 2,
    borderRadius: 20,
    width: 37,
    height: 37,
    justifyContent: "center",
    alignItems: "center",
  },
  frame: {
    //marginTop: 38,
    marginLeft: 11,
    padding: 4,
    backgroundColor: "#182533",
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: "center",
    borderColor: "#17312b",
  },
});

export default ScreenDelivery;
