import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../api/AxiosInterceptor';

export const getPendingRequests = async () => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await axios.post(
      `${API_BASE_URL}/admin/pendingUserApprovals`,
      {},
      { headers: { Authorization: token ? `Bearer ${token}` : '' } }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    throw error;
  }
};

export const approveUserRequest = async (userId, status) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await axios.post(
      `${API_BASE_URL}/admin/approveUser?userId=${userId}&status=${status}`,
      {},
      { headers: { Authorization: token ? `Bearer ${token}` : '' } }
    );
    return response.data;
  } catch (error) {
    console.error('Error approving user:', error);
    throw error;
  }
};
