import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../AxiosInterceptor';

export const getUserDetails = async () => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await axios.get(`${API_BASE_URL}/userDetails`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const updateUserDetails = async (data) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await axios.put(`${API_BASE_URL}/updateUser`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
