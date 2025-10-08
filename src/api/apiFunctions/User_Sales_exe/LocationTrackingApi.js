import { formatTimestamp } from "../../../utils/UtilityFunction";
import apiMethods from "../../methods/apiMethods";


export const locationTracking = async (userId, latitude, longitude) => {
  try {
    const response = await apiMethods.post('/customerLiveLocation', {
      userId: parseInt(userId, 10),
          coordinates: `${latitude},${longitude}`,
          timestamp: formatTimestamp(),
    });
    console.log('succes sending location to servers......',response);
    
    return response;
  } catch (error) {
    console.error('Error sending location to servers', error);
    throw error;
  }
};