import apiClient from './client';

const getCategories = () => {
  return apiClient.get('/categories');
};

const createCategory = (categoryName) => {
  return apiClient.post('/categories', { name: categoryName });
};

const getShopCategories = (id) => {
  return apiClient.get('/categories/' + id);
};

export default {
  getCategories,
  createCategory,
  getShopCategories,
};
