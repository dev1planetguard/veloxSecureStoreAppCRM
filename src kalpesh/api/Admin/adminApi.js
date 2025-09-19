// src/api/adminApi.js
import axios from 'axios';

import { API_BASE_URL } from '../AxiosInterceptor';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Example API calls
export const getCustomers = async () => {
  const res = await api.get('/customers');
  return res.data;
};

export const getSalesReps = async () => {
  const res = await api.get('/sales-reps');
  return res.data;
};

export const getPartners = async () => {
  const res = await api.get('/partners');
  return res.data;
};

export default api;
