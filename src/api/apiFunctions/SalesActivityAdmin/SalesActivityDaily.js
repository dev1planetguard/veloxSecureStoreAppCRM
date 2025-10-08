import apiMethods from "../../methods/apiMethods";

export const fetchTodaysDailyReport = async () => {
  try {
    const response = await apiMethods.get('/todaysDailyReport');
    console.log('Report data:', response);
    return response;
  } catch (error) {
    console.error('Error fetching today’s daily report:', error);
    Alert.alert('Error', 'Unable to fetch the daily report');
  }
};