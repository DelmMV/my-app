import { CacheManager } from "react-native-expo-image-cache";

export const cacheImage = async (downloadURL) => {
  const cachedURL = await CacheManager.get(downloadURL).getPath();
  return cachedURL;
};
