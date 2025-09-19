import axios from 'axios';
import { API_BASE_URL } from '../AxiosInterceptor';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Initiate call
export const initiateCall = async (phone, token) => {
  console.log('API called: /meetings/initiatecall', phone);
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await api.get(`/meetings/initiatecall?phone=${phone}`, { headers });
  return response.data;
};

// Verify OTP
export const verifyMobileNumber = async (phone, otp, token) => {
  console.log('API called: /sms/verifyMobileNumber', phone, otp);
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await api.post(`/sms/verifyMobileNumber?number=${phone}&otp=${otp}`, {}, { headers });
  return response.data;
};
