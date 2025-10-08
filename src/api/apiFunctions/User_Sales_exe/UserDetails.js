import AsyncStorage from "@react-native-async-storage/async-storage";
import apiMethods from "../../methods/apiMethods";

export const getUserDetails = async (id) => {
  try {
    const res = await apiMethods.get(`/userDetails`, {
      // headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (error) {
    console.error("Meetings API Error:", error);
    throw error;
  }
};

export const updateUserDetails = async (data) => {
  try {
    const response = await apiMethods.put(`/updateUser`, data, {

    });
    return response;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};