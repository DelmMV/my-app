import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";

export async function fetchPictureId(id) {
  const dataToken = await AsyncStorage.getItem("AccessToken");
  console.log(dataToken);
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
    console.log(`${error} fetchPictureId`);
    return [];
  }
}
