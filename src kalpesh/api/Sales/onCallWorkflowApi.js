import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../api/AxiosInterceptor';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const onCallApi = {
  // Get on-call customer list
  getOnCallCustomers: async () => {
    try {
      console.log('API: Fetching on-call customers');
      const response = await api.get('/salesperson/onCallCustomerList');
      console.log('API Response - Customers:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error - Customers:', error);
      throw error;
    }
  },

  // Get sale stages
  getSaleStages: async () => {
    try {
      console.log('API: Fetching sale stages');
      const response = await api.get('/saleStage/getSaleStageListing');
      console.log('API Response - Sale Stages:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error - Sale Stages:', error);
      throw error;
    }
  },

  // Initiate call
  initiateCall: async (phone) => {
    try {
      console.log('API: Initiating call to', phone);
      const response = await api.get(`/meetings/initiatecall?phone=${phone}`);
      console.log('API Response - Initiate Call:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error - Initiate Call:', error);
      throw error;
    }
  },

  // Verify call OTP
  verifyCallOtp: async (phone, otp) => {
    try {
      console.log('API: Verifying call OTP for', phone);
      const response = await api.post(`/meetings/verifyCall?number=${phone}&otp=${otp}`);
      console.log('API Response - Verify Call OTP:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error - Verify Call OTP:', error);
      throw error;
    }
  },

  // Fetch products by suite
  fetchProducts: async (suite) => {
    try {
      console.log('API: Fetching products for suite', suite);
      const response = await api.get(`/proposal/fetchProductName?suite=${encodeURIComponent(suite)}`);
      console.log('API Response - Products:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error - Products:', error);
      throw error;
    }
  },

  // Send email OTP
  sendEmailOtp: async (email) => {
    try {
      console.log('API: Sending email OTP to', email);
      const response = await api.post(`/otp/getOtp?email=${encodeURIComponent(email)}`);
      console.log('API Response - Email OTP:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error - Email OTP:', error);
      throw error;
    }
  },

  // Verify email OTP
  verifyEmailOtp: async (email, otp) => {
    try {
      console.log('API: Verifying email OTP for', email);
      const response = await api.post(`/otp/verifyEmail?mail=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
      console.log('API Response - Verify Email OTP:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error - Verify Email OTP:', error);
      throw error;
    }
  },

  // Submit walk-in customer
  submitWalkInCustomer: async (data) => {
    try {
      console.log('API: Submitting walk-in customer', data);
      const response = await api.post('/salesperson/walkInCustomer', data);
      console.log('API Response - Walk-in Customer:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error - Walk-in Customer:', error);
      throw error;
    }
  },

  // Add on-call customer
  addOnCallCustomer: async (data) => {
    try {
      console.log('API: Adding on-call customer', data);
      const response = await api.post('/salesperson/addOnCallCustomer', data);
      console.log('API Response - Add Customer:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error - Add Customer:', error);
      throw error;
    }
  },
};

export default onCallApi;