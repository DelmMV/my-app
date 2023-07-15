import ApiManager from "./ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function featchIntensive() {
  const dataToken = await AsyncStorage.getItem("AccessToken");
  console.log(dataToken);
  try {
    const response = await ApiManager("/delivery/settings", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        token: dataToken,
      },
    });
    return response !== 200 ? await response.data.AddDeliveryTime : [];
  } catch (error) {
    console.log(error);
    return [];
  }
}
