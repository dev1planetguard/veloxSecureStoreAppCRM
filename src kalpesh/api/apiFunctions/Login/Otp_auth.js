import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiMethods from '../../methods/apiMethods';


export const sendOtp = async ({ type,email, mobile, callingCode },  setOtpSentMail,setOtpSentMobile) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');

    let apiUrl = '';
    if(type=='email'){
    if (email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return Alert.alert('Error', 'Please enter a valid email');
      }
      apiUrl = `/otp/getOtp?email=${encodeURIComponent(email.trim())}`;
    } 
}else if(type=='mobile') {
        if (mobile) {
      if (!/^\d{10}$/.test(mobile.trim())) {
        return Alert.alert('Error', 'Enter a valid 10-digit mobile number');
      }
      const fullNumber = `${callingCode}${mobile.trim()}`;
      apiUrl = `/sms/sendOtp?number=${encodeURIComponent(fullNumber)}`;
    } }else {
      return Alert.alert('Error', 'Please provide email or mobile');
    }

    const res = type=='email'
      ? await apiMethods.post(apiUrl, null)
      : await apiMethods.get(apiUrl);
console.log('res from api', res.ErrorCode);

    if ((res.statusCode === 200) || (type=='mobile' && res.ErrorCode === '000')) {
      Alert.alert('Success', 'OTP sent successfully');
      if (type=='email') setOtpSentMail(true);
      else setOtpSentMobile(true);
    } else {
      Alert.alert('Error', email ? res.message : res.ErrorMessage || 'OTP send failed');
    }

  } catch (error) {
    console.error('OTP error:', error);
    Alert.alert('Error', 'Network issue, please try again');
  }
};

export const verifyOtp = async ({ type, email, otpEmail, mobile, callingCode, otpMobile }, setEmailVerified, setMobileVerified) => {
  try {
    console.log('-----------------',type, email, otpEmail, mobile, callingCode, otpMobile);
    
    const token = await AsyncStorage.getItem('jwtToken');
    let apiUrl = '';
    let params = {};

    if (type === 'email') {
      if (!/^\d{6}$/.test(otpEmail.trim())) {
        return Alert.alert('Error', 'Enter valid 6-digit OTP for email');
      }
      apiUrl = `/otp/verifyEmail?mail=${encodeURIComponent(email)}&otp=${encodeURIComponent(otpEmail)}`;
    //   params = {
    //     mail: email.trim(),
    //     otp: otpEmail.trim(),
    //   };
    } else {
        console.log('hellooooo in mobile part');
        
      if (!/^\d{6}$/.test(otpMobile.trim())) {
        return Alert.alert('Error', 'Enter valid 6-digit OTP for mobile');
      }
      const fullNumber = `${callingCode}${mobile}`;
      apiUrl = `/sms/verifyMobileNumber?number=${encodeURIComponent(fullNumber)}&otp=${encodeURIComponent(otpMobile)}`,
      params = {
        number: fullNumber,
        otp: otpMobile.trim(),
      };
    }
console.log('paramsss',params);

    const res = await apiMethods.post(apiUrl,null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: '',
      },
    //   params: params, // sending query params
    });

    const data = res

    if (data.statusCode === 200) {
      Alert.alert('Success', data.message);
      if (type === 'email') {
        setEmailVerified(true);
      } else {
        setMobileVerified(true);
      }
    } else {
      Alert.alert('Error', data.message || 'OTP verification failed');
    }
  } catch (error) {
    console.error('OTP verification error:', error);
    Alert.alert('Error', 'Network issue, try again');
     if (error.response) {
    console.error('Server responded with:', error.response.status, error.response.data);
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Request setup error:', error.message);
  }
  }
};

