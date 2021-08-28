import apiClient from './client';
const endPoint = '/expo-push-token';

const register = (token) => {
  return apiClient.post(endPoint, { token });
};

export default { register };
