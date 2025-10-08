import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../AxiosInterceptor';

export const getPendingRequests = async () => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    if (!token) {
      console.error("[approveRequestApi] No JWT token found in AsyncStorage");
      return null;
    }

    const url = `${API_BASE_URL}/admin/pendingUserApprovals`;
    console.log('[approveRequestApi] getPendingRequests →', url);

    // ✅ must be POST (Spring Boot only accepts POST here)
    const response = await axios.post(
      url,
      {}, // send empty body
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log('[approveRequestApi] getPendingRequests status:', response.status);
    return response.data;
  } catch (error) {
    console.error('[approveRequestApi] getPendingRequests error:', error.message);

    if (error.response) {
      console.error('[approveRequestApi] getPendingRequests error status:', error.response.status);
      console.error('[approveRequestApi] getPendingRequests error data:', error.response.data);
    } else if (error.request) {
      console.error('[approveRequestApi] No response received from server:', error.request);
    } else {
      console.error('[approveRequestApi] Request setup error:', error.message);
    }

    throw error;
  }
};

export const approveUserRequest = async (userId, status) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    if (!token) {
      console.error("[approveRequestApi] No JWT token found in AsyncStorage");
      return null;
    }

    const url = `${API_BASE_URL}/admin/approveUser?userId=${userId}&status=${status}`;
    console.log('[approveRequestApi] approveUserRequest →', url);

    const response = await axios.post(
      url,
      {}, // empty body
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log('[approveRequestApi] approveUserRequest status:', response.status);
    return response.data;
  } catch (error) {
    console.error('[approveRequestApi] approveUserRequest error:', error.message);

    if (error.response) {
      console.error('[approveRequestApi] approveUserRequest error status:', error.response.status);
      console.error('[approveRequestApi] approveUserRequest error data:', error.response.data);
    } else if (error.request) {
      console.error('[approveRequestApi] No response received from server:', error.request);
    } else {
      console.error('[approveRequestApi] Request setup error:', error.message);
    }

    throw error;
  }
};
