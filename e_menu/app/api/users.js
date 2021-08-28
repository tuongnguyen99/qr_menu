import apiClient from './client';

const regisCustomer = (email, password) => {
  return apiClient.post('/users/customer', { email, password });
};

const regisManager = (email, password, name, shopName, phone) => {
  return apiClient.post('/users/manager', {
    email,
    password,
    name,
    shopName,
    phone,
  });
};

export default { regisCustomer, regisManager };
