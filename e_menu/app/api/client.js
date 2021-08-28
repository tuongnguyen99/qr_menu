const { create } = require('apisauce');
import authStorage from '../auth/storage';

const apiClient = create({
  baseURL: 'http://192.168.1.132:9000',
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers['auth-token'] = authToken;
});

export default apiClient;
