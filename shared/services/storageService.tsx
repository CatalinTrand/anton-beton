import AsyncStorage from '@react-native-community/async-storage';

const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

const getData = async (key, defaultValue) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

const clearData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};

const clearAll = () => {
  return (async () => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      return false;
    }
  })().then(() => {
    return true;
  });
};

export default { setData, clearAll, clearData, getData };
