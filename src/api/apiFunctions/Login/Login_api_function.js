import apiMethods from "../../methods/apiMethods";
import AsyncStorage from "@react-native-async-storage/async-storage";


// Login function
export const loginUser = async (email, password) => {
  try {
    const res = await apiMethods.post("/login", {
      email: email.trim(),
      password: password.trim(),
    });

    return res; // axios wrapper already returns res.data
  } catch (error) {
    console.error("Login API Error:", error);
    throw error;
  }
};

export const getTodayMeetings = async (token) => {
  try {
    const res = await apiMethods.get("/meetings/todayMeetingDetails", {
      // headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (error) {
    console.error("Meetings API Error:", error);
    throw error;
  }
};

// export const submitDailyCheckInOut = async (header, formData, token) => {
//   try {
//     const apiUrl =
//       header === "Daily Check-Out"
//         ? "/dailyLogout"
//         : "/dailyLogin";

// console.log('in api function',apiUrl,formData,token);

// const res = await apiMethods.post('/dailyLogin',formData);
//     // const res = await apiMethods.post(apiUrl, formData, 
//       // {
//       // headers: {
//       //   // "Content-Type": "multipart/form-data",
//       //   // "Authorization": `Bearer ${token}`
//       // },
//     // }
//   // );

//     if (header === "Daily Check-Out") {
//       await AsyncStorage.clear();
//     }

//     console.log("click and submit", res);
//     return res; // axios wrapper already returns res.data
//   } catch (error) {
//     console.error("CheckIn/Out API Error:", error);
//     throw error;
//   }
// };

export const submitDailyLogin = async (formattedDateTime, geoloc, id, img,header) => {
  try {
      const apiUrl =
      header === "Daily Check-Out"
        ? "/dailyLogout"
        : "/dailyLogin";

    const formData = new FormData();
    formData.append('data', JSON.stringify({
      loginTime: formattedDateTime,
      loginLocation: geoloc,
      userId: id,
    }));
    formData.append('image', {
      uri: img, // should be file:// or content:// scheme depending on platform
      type: 'image/jpeg',
      name: 'selfie.jpg',
    });
       

    console.log('Submitting Daily Login:', apiUrl, formData);

    const res = await apiMethods.post(apiUrl, formData);
    console.log('Daily Login Response:', res.data);
     if (header === "Daily Check-Out") {
      await AsyncStorage.clear();
    }
    return res;
  } catch (error) {
    console.error('Daily Login API Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const fetchUserRoles = async () => {
  try {
    const json = await apiMethods.get('/getUserRoleListing');

    if (json.statusCode === 200 && Array.isArray(json.data)) {
      const opts = json.data.map(roleName => ({ label: roleName, value: roleName }));
      console.log('opts', opts);
      return opts;
    } else {
      Alert.alert('Error', 'Unexpected response from server');
      return [];
    }
  } catch (error) {
    console.error('Error fetching user roles:', error);
    Alert.alert('Error', 'Unable to fetch roles');
    return [];
  }
};
