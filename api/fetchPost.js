import ApiManager from "./ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function featchPost() {
  const dataToken = await AsyncStorage.getItem("AccessToken");
  try {
    const response = await ApiManager("/delivery/orders?LastUpdateTicks=0", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        token: dataToken,
      },
    });
    return response !== 200 ? await response.data : [];
  } catch (error) {
    console.log(error);
    return [];
  }
}
