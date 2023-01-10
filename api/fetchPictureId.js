import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const ApiManager = axios.create({
  baseURL: "https://app.tseh85.com/Service/api",
  responseType: "json",
  withCredentials: true,
});

export async function fetchPictureId(id) {
  const dataToken = await AsyncStorage.getItem("AccessToken");
  try {
    const response = await ApiManager(`/image?PictureId=${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        token: dataToken,
      },
    });
    return response !== 200 ? await response.config : [];
  } catch (error) {
    console.log(error);
    return [];
  }
}
