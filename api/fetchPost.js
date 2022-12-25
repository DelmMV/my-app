import ApiManager from "./ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export async function featchPost() {
//   try {
//     const response = await fetch(
//       `https://app.tseh85.com/Service/api/delivery/orders?LastUpdateTicks=0`,
//       {
//         method: "GET",
//         headers: {
//           "content-type": "application/json",
//           token:
//             "JQlHiiKvk8zs06L9i9Z5Egr1yFPeK6kHp05lTFyAQRiyyzBkYQR5u7/N0+xZ4YrU",
//         },
//       }
//     );
//     console.log(response.json());
//     return response.ok ? await response.json() : [];
//   } catch (e) {
//     console.log(e);
//     return [];
//   }
// }

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
