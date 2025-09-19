import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_BASE_URL } from '../AxiosInterceptor';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// 🔑 automatically attach JWT token
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 📊 Admin Overview API
export const getAdminOverview = async () => {
  const res = await api.get('/admin/overviewData');
  return res.data;
};

// 🕒 Recent Activity API
export const getRecentActivity = async () => {
  const res = await api.get('/admin/recentActivity');
  return res.data;
};