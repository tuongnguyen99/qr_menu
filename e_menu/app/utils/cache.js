import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const prefix = 'cache';
const expiryInMinutes = 45;

const store = async (key, value) => {
  try {
    const item = {
      value: value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const isExpired = (item) => {
  const now = dayjs();
  const storedTime = dayjs(item.timestamp);
  const isExpired = now.diff(storedTime, 'minute') > expiryInMinutes;
  return isExpired;
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);
    if (!item) return null;
    if (isExpired(item)) {
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }
    return item.value;
  } catch (error) {
    console.log(error);
  }
};

export default {
  store,
  get,
};
