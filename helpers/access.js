import * as SecureStore from "expo-secure-store";

export const setSecurePin = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

export const deleteSecurePin = async (key) => {
  await SecureStore.deleteItemAsync(key);
};

export const getSecurePin = async (key) => {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
};
