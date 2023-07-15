import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList,
  SafeAreaView,
  View,
  Platform,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLogsStore } from "../contexts/store";
import { StatisticsLogs } from "../components/StatisticsLogs";
import { GetUserTimeLogs } from "../components/GetUserTime";
import DateRangePicker from "rn-select-date-range";

export default function StatisticsSreen({ navigation }) {
  const logCount = useLogsStore((state) => state.log);
  const removeLogs = useLogsStore((state) => state.removeLogs);
  const [isFilter, setFilter] = useState([]);
  const [selectedRange, setRange] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);

  const currentTime = GetUserTimeLogs(new Date());
  const filterCurentDay = () => {
    const result = [
      ...logCount.filter(
        (e) => GetUserTimeLogs(new Date(e.WishingDate)) === currentTime
      ),
    ];
    return result;
  };

  const filterRange = () => {
    const a = new Date(selectedRange.firstDate).getTime();
    const b = new Date(selectedRange.secondDate).getTime();
    let result = [];

    for (let i = 0; i < logCount.length; i++) {
      let dateReset = new Date(
        GetUserTimeLogs(new Date(logCount[i].WishingDate))
      ).getTime();
      if (dateReset >= a && dateReset <= b) {
        result.push(logCount[i]);
      }
    }
    return result;
  };

  useEffect(() => {
    setFilter(filterCurentDay());
  }, []);

  const deleteHistory = () =>
    Alert.alert("Внимание!", "Все данные будут удалены.", [
      { text: "Нет" },
      {
        text: "Да",
        onPress: () => {
          removeLogs();
        },
      },
    ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", marginTop: 40 }}>
        <View>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Text style={styles.button}>
              <Ionicons name="chevron-back-outline" size={20} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", right: 20 }}>
          <Text style={[styles.text, { top: 10, marginRight: 0 }]}>
            Фильтр:{" "}
          </Text>
          <TouchableOpacity onPress={() => setFilter(filterCurentDay())}>
            <Text style={[styles.button_filter]}> Сегодня</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)}>
            <Text style={[styles.button_filter]}> По датам</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter(logCount)}>
            <Text style={[styles.button_filter]}> Все</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showCalendar && (
        <View
          style={{
            width: "93%",
            alignSelf: "center",
            marginTop: 10,
            padding: 5,
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <DateRangePicker
            onSelectDateRange={(range) => {
              setRange(range);
            }}
            blockSingleDateSelection={true}
            responseFormat="YYYY-MM-DD"
            onConfirm={() => setFilter(filterRange())}
            selectedDateContainerStyle={styles.selectedDateContainerStyle}
            selectedDateStyle={styles.selectedDateStyle}
          />
        </View>
      )}

      <View style={{ alignSelf: "flex-start", marginLeft: 10, marginTop: 10 }}>
        {filterCurentDay().length ? (
          <Text style={{ color: "#FAEBD7" }}>
            Доставленно сегодня: {filterCurentDay().length}
          </Text>
        ) : (
          <></>
        )}
        {filterRange().length ? (
          <Text style={{ color: "#FAEBD7" }}>
            В период с {selectedRange.firstDate} до {selectedRange.secondDate}{" "}
            доставлено: {filterRange().length} з.
          </Text>
        ) : (
          <></>
        )}
        <Text style={{ color: "#FAEBD7" }}>
          Доставлено за все время: {logCount.length} з.
        </Text>
      </View>

      <View
        style={{
          alignItems: "center",
          flex: 1,
        }}
      >
        <FlatList
          data={isFilter}
          numColumns={3}
          renderItem={({ item }) => <StatisticsLogs el={item} />}
        />
      </View>

      <View style={{ width: 200, alignContent: "center", alignSelf: "center" }}>
        <Button
          onPress={deleteHistory}
          title="Очистить историю"
          color="rgba(62, 84, 106, 0.5)"
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#17212b",
    flex: 1,
  },
  text: {
    color: "#FAEBD7",
    paddingBottom: 20,
    paddingStart: 20,
  },
  button_filter: {
    padding: 8,
    height: 40,
    color: "#FAEBD7",
    borderRadius: 20,
    textAlignVertical: "center",
    backgroundColor: "rgba(62, 84, 106, 0.5)",
    borderColor: "#17312b",
    borderWidth: 1,
  },
  button: {
    width: 80,
    height: 40,
    color: "#FAEBD7",
    borderRadius: 20,
    textAlign: "center",
    textAlignVertical: "center",
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 3,
    fontSize: 16,
    backgroundColor: "rgba(62, 84, 106, 0.5)",
    borderColor: "#17312b",
    borderWidth: 1,
  },
  selectedDateContainerStyle: {
    height: 35,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    borderRadius: 20,
    color: "#FAEBD7",
  },
  selectedDateStyle: {
    fontWeight: "bold",
    color: "#FAEBD7",
  },
});
