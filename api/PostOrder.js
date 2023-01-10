import ApiManager from "./ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function PostOrder(data) {
  const dataToken = await AsyncStorage.getItem("AccessToken");

  try {
    const result = await ApiManager("/delivery/order/input", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: dataToken,
      },
      data: data,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}
