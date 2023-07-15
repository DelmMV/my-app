import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import GetUserTime from "../components/GetUserTime";
import { StatusBar } from "expo-status-bar";
import DropDownList from "../components/DropDownList";
import DropDownList2 from "../components/DropDownList2";
import { showLocation } from "react-native-map-link";
import Ionicons from "@expo/vector-icons/Ionicons";
import { memo } from "react";
import { FilterItem } from "../components/FilterItem";

const MapScreen = memo(function MapScreen({ navigation }) {
  const { value, item } = useContext(AppContext);
  const { value2 } = useContext(AppContext);

  const filter = FilterItem(value, item);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Text style={styles.button}>
          <Ionicons name="return-up-back-outline" size={34} color="white" />
        </Text>
      </TouchableOpacity>
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
      <MapView
        style={styles.map}
        mapType="standard"
        userLocationPriority="balanced"
        followsUserLocation={true}
        initialRegion={{
          latitude: 59.947303,
          longitude: 30.367467,
          latitudeDelta: 0.4,
          longitudeDelta: 0.4,
        }}
      >
        {filter.length > 0 &&
          filter.map((element) => {
            const options = {
              latitude: element.Latitude,
              longitude: element.Longitude,
              app: value2,
              directionsMode: "car",
            };
            const colorStatus = () => {
              if (element.Status === 7) {
                return { color: "grey", fontSize: 13, fontWeight: "bold" };
              } else if (element.Status === 5) {
                return { color: "#4169E1", fontSize: 13, fontWeight: "bold" };
              } else if (element.Status === 6) {
                return { color: "#00FF00", fontSize: 13, fontWeight: "bold" };
              } else if (element.Status === 12) {
                return { color: "#FFD700", fontSize: 13, fontWeight: "bold" };
              }
            };
            return (
              <Marker
                onPress={() => showLocation(options)}
                key={element.DeliveryNumber}
                coordinate={{
                  latitude: element.Latitude,
                  longitude: element.Longitude,
                }}
              >
                <View
                  style={{
                    width: 55,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "grey",
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 10,
                  }}
                >
                  <Text style={colorStatus()}>{element.DeliveryNumber}</Text>
                  <Text style={{ fontSize: 13, color: "black" }}>
                    {GetUserTime(new Date(element.WishingDate))}
                  </Text>
                </View>
              </Marker>
            );
          })}
      </MapView>
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17212b",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  button: {
    height: 40,
    color: "white",
    borderRadius: 20,
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 40,
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 3,
    fontSize: 16,
    backgroundColor: "rgba(62, 84, 106, 0.5)",
    borderColor: "#17312b",
    borderWidth: 1,
  },
});
export default MapScreen;
