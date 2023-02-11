import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  View,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AppContext from "../contexts/AppContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCountLogsStore } from "../contexts/store";

export default function StatisticsSreen({ navigation }) {
  const count = useCountLogsStore((state) => state.logs);
  const removeCountLogs = useCountLogsStore((state) => state.removeCountLogs);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Text style={styles.button}>
          <Ionicons name="return-up-back-outline" size={34} color="white" />
        </Text>
      </TouchableOpacity>
      <Text style={[styles.text, { flex: 1 }]}>{count}</Text>
      {/* <FlatList
        data={log}
        renderItem={(item) => <Text style={styles.text}>{item.name}</Text>}
      /> */}
      <View style={{ width: 200, alignContent: "center", alignSelf: "center" }}>
        <Button onPress={removeCountLogs} title="Reset count" color="green" />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#17212b",
    flex: 1,
  },
  text: {
    color: "white",
    paddingBottom: 20,
    paddingStart: 20,
  },
  button: {
    height: 40,
    color: "white",
    borderRadius: 5,
    backgroundColor: "green",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 40,
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 3,
    fontSize: 16,
  },
});
