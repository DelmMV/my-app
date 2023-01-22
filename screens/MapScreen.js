import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import GetUserTime from "../components/GetUserTime";
import openMap from "react-native-open-maps";
import { StatusBar } from "expo-status-bar";
import DropDownList from "../components/DropDownList";

export default function MapScreen({ navigation }) {
  const { value, item } = useContext(AppContext);
  function filterItem() {
    if (value === null) {
      return item;
    } else {
      return [...item.filter((e) => e.Status === value)];
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Text style={styles.button}> {`< Назад`}</Text>
      </TouchableOpacity>
      <DropDownList />

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
        {filterItem().length > 0 &&
          filterItem().map((element) => {
            const goToYosemite = (x, y, map) => {
              openMap({ latitude: x, longitude: y, provider: map });
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
                onPress={() =>
                  goToYosemite(element.Latitude, element.Longitude, "yandex")
                }
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
}
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
    height: 35,
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
