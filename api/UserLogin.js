import ApiManager from "./ApiManager";

// export async function UserLogin(data) {
//   try {
//     const response = await ApiManager("/AuthenticateDelivery", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       data: data,
//     });
//     return response !== 200 ? await response.data : [];
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }

export async function UserLogin(data) {
  try {
    const result = await ApiManager("/AuthenticateDelivery", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}
