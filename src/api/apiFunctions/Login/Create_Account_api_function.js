import AsyncStorage from "@react-native-async-storage/async-storage";
import apiMethods from "../../methods/apiMethods";
import { Alert } from "react-native";


export const createUser = async (payload, navigation) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    console.log('Submitting payload:', JSON.stringify(payload, null, 2));

    const res = await apiMethods.post('/createUser', payload);

    const data = res;
    console.log('API Response:', data);

    return data;
    // if (res.statusCode === 200 && data.statusCode === 200) {
    //   Alert.alert('Success', data.message || 'Registered successfully!', [
    //     { text: 'OK', onPress: () => navigation.navigate('Login') },
    //   ]);
    // } else {
    //   Alert.alert('Error', data.error || data.message || 'Registration failed');
    // }
  } catch (e) {
    console.error('Registration Error:', e);
    Alert.alert('Error', 'Network issue or unexpected error, try again');
  }
};