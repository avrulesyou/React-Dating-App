import AsyncStorage from "@react-native-async-storage/async-storage";

const Constants = {
  ACCESS_TOKEN: "access_token",
  STREAM_TOKEN: "stream_token",
  USER: "user",
};

const StorageUtils = {
  getAccessToken: async () => {
    const token = await AsyncStorage.getItem(Constants.ACCESS_TOKEN);
    return token;
  },

  setAccessToken: async (token) => {
    AsyncStorage.setItem(Constants.ACCESS_TOKEN, token);
  },

  removeAccessToken: async () => {
    AsyncStorage.removeItem(Constants.ACCESS_TOKEN);
  },
  getStreamToken: async () => {
    const token = await AsyncStorage.getItem(Constants.STREAM_TOKEN);
    return token;
  },

  setStreamToken: async (token) => {
    AsyncStorage.setItem(Constants.STREAM_TOKEN, token);
  },

  removeStreamToken: async () => {
    AsyncStorage.removeItem(Constants.STREAM_TOKEN);
  },
};

export default StorageUtils;
