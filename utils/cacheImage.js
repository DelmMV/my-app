import { CacheManager } from "react-native-expo-image-cache";

export const cacheImage = async (downloadURL) => {
  try {
    const cachedURL = await CacheManager.get(downloadURL).getPath();
    console.log(cachedURL);
    return cachedURL;
  } catch (error) {
    console.log(error);
  }
};
