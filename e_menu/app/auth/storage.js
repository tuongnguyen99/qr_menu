import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

const key = 'auth-token';

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log('Error storing auth token');
  }
};

const removeToken = async (authToken) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log('Error deleting the auth token');
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log('Error getting the auth token');
    return null;
  }
};

const getUser = async () => {
  const token = await getToken();
  console.log(token);
  if (token) return jwtDecode(token);
  return null;
};

export default {
  getToken,
  storeToken,
  removeToken,
  getUser,
};
