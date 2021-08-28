import apiClient from './client';

const loginAsCustomer = (email, password) => {
  return apiClient.post('/auth/customer', { email, password });
};

const loginAsManager = (email, password) => {
  return apiClient.post('/auth/manager', { email, password });
};

export default {
  loginAsCustomer,
  loginAsManager,
};
