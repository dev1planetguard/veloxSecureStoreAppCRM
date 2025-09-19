import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../api/AxiosInterceptor';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add JWT token to headers
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch address suggestions
export const fetchAddressSuggestions = async (input) => {
  try {
    console.log('API call: /admin/placeSuggestions', input);
    const res = await api.get(`/admin/placeSuggestions?input=${encodeURIComponent(input)}`);
    return res.data;
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
};

export default api;
