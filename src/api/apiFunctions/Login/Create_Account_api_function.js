import AsyncStorage from "@react-native-async-storage/async-storage";
import apiMethods from "../../methods/apiMethods";
import { Alert } from "react-native";
import { showToast } from "../../../components/reusable/Toast";


export const createUser = async (payload, navigation) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    console.log('Submitting payload:', JSON.stringify(payload, null, 2));

    const res = await apiMethods.post('/createUser', payload);

    const data = res;
    console.log('API Response:', data);

  
    // if (res.statusCode === 200 && data.statusCode === 200) {
    //   Alert.alert('Success', data.message || 'Registered successfully!', [
    //     { text: 'OK', onPress: () => navigation.navigate('Login') },
    //   ]);
    // } else {
    //   Alert.alert('Error', data.error || data.message || 'Registration failed');
    // }
      return data;
  } catch (e) {
    console.log('error in create user',e.response.data);
    showToast(e.response.data.message,5000)
    return e.response.data
    // console.log('error in create userrrerrrrrrr',e);
    
    
    // console.log('Registration Error:', e);
    // Alert.alert('Account created successfully!', '');
  }
};