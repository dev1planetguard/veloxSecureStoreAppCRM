// import { API_BASE_URL } from "../AxiosInterceptor";
import { Alert } from "react-native";
import apiMethods from "../methods/apiMethods";


export const getSalesLoginActivity = async (id) => {
    console.log('idd in api call', id);
    
  try {
    const response = await apiMethods.get(`/salesperson/fetchDailyLocations/${id}`);
    console.log('Report data:', response);
    return response;
  } catch (error) {
    console.log('errrrroooorrrr',error);
    
    console.error('Error fetching today’s daily report:', error);
    Alert.alert('Error', 'Unable to fetch the daily report');
  }
};