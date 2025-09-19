// api/Sales/salesApi.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../api/AxiosInterceptor';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// attach token automatically
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (e) {
    console.warn('Failed to get token for request', e);
  }
  return config;
});

/** Get on-call customer list */
export const getOnCallCustomerList = async () => {
  console.log('API: GET /salesperson/onCallCustomerList');
  const res = await api.get('/salesperson/onCallCustomerList');
  return res.data;
};

/** Add on-call customer */
export const addOnCallCustomer = async (body) => {
  console.log('API: POST /salesperson/addOnCallCustomer', body);
  const res = await api.post('/salesperson/addOnCallCustomer', body);
  return res.data;
};

/** Update on-call customer */
export const updateOnCallCustomer = async (id, body) => {
  console.log('API: PUT /salesperson/updateOnCallCustomer', { id, body });
  // server expects id as query param in your original code
  const res = await api.put(`/salesperson/updateOnCallCustomer?id=${id}`, body);
  return res.data;
};

/** Delete on-call customer */
export const deleteOnCallCustomer = async (id) => {
  console.log('API: DELETE /salesperson/deleteOnCallCustomer', id);
  const res = await api.delete(`/salesperson/deleteOnCallCustomer?id=${id}`);
  return res.data;
};

export default api;
