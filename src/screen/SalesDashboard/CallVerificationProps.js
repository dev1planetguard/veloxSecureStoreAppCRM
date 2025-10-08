import React, {  useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  AppState,
  Linking,
  PermissionsAndroid,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { initiateCall, verifyMobileNumber } from '../../api/apiFunctions/User_Sales_exe/onCallApi';
import { hp, wp } from '../../utils/responsive';
import MeetingMinutesForm from './MeetingMinutesForm';

 function CallVerification({ customer, onVerified }) {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callInProgress, setCallInProgress] = useState(false);
  const [callInitiated,setCallInitiated] = useState(false)

  const appState = useRef(AppState.currentState);
  const navigation = useNavigation();
  const callStartTime = useRef(null);
  const inFlight = useRef(false);

  // AppState effect to detect coming back from call
  // useEffect(() => {
  //   const handleAppStateChange = nextAppState => {
  //     if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
  //       if (callInProgress) {
  //         setCallInProgress(false);
  //         navigation.navigate('MeetingMinutesForm', { customer });
  //       }
  //     }
  //     appState.current = nextAppState;
  //   };
  //   const sub = AppState.addEventListener('change', handleAppStateChange);
  //   return () => sub.remove();
  // }, [callInProgress, navigation, customer]);

//   useEffect(() => {
//   const handleAppStateChange = nextAppState => {
//     if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
//       if (callInProgress) {
//         setCallInProgress(false);
//         // navigate via parent stack
//         // navigation.getParent()?.navigate('MeetingMinutesForm', { customer });
// //         navigation.getParent()?.reset({
// //   index: 0,
// //   routes: [{ name: 'MeetingMinutesForm', params: { customer } }],
// // });
//       }
//     }
//     appState.current = nextAppState;
//   };

//   const sub = AppState.addEventListener('change', handleAppStateChange);
//   return () => sub.remove();
// }, [callInProgress, navigation, customer]);

// useEffect(() => {
//   const handleAppStateChange = nextAppState => {
//     if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
//       if (callInProgress) {
//         setCallInProgress(false);
//         setTimeout(() => {
//           navigation.getParent()?.navigate('MeetingMinutesForm', { customer });
//         }, 500); // wait 0.5s for navigator to be ready
//       }
//     }
//     appState.current = nextAppState;
//   };

//   const sub = AppState.addEventListener('change', handleAppStateChange);
//   return () => sub.remove();
// }, [callInProgress, navigation, customer]);

 useEffect(() => {
  console.log('appp state ',appState.current);
  // Alert.alert(appState.current)
    const handleAppStateChange = nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        if (callInProgress) {
          setCallInProgress(false);
          // Navigate to MeetingMinutesForm with customer data
          // navigation.navigate('MeetingMinutesForm', { 
          //   customer: customer,
          //   phoneNumber: customer.phone,
          //   customerName: customer.name
          // });

//           navigation.navigate('SalesStack', { 
//   screen: 'MeetingMinutesForm',
//   params: { 
//     customer: customer,
//     phoneNumber: customer.phone,
//     customerName: customer.name
//   }
// });
// return (<MeetingMinutesForm/>)
setCallInitiated(!callInitiated)
        }
      }
      appState.current = nextAppState;
    };
    // Alert.alert(appState.current)
console.log('appp state 1 ',appState.current);

    const sub = AppState.addEventListener('change', handleAppStateChange);
    return () => sub.remove();
  }, [callInProgress, navigation, customer]);


  async function requestCallPermission() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}

 

  ///new code 
  const handleStartCall = async () => {
  if (inFlight.current) return;
  inFlight.current = true;

  setLoading(true);
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    const data = await initiateCall(customer.phone, token);

    if (data.ErrorCode !== '000') throw new Error(data.ErrorMessage);

    setOtpSent(true);
    Toast.show({ type: 'success', text1: 'OTP Sent', text2: `Sent to ${customer.phone}` });

    // sanitize number and build dial URL
    const cleanedNumber = customer.phone.replace(/[^\d+]/g, '');
    const dial = Platform.OS === 'ios'
      ? `telprompt:${cleanedNumber}`
      : `tel:${cleanedNumber}`;

    // check permission first
    // const okPermission = await requestCallPermission();
    // if (!okPermission) {
    //   Alert.alert('Permission denied', 'Allow call permission in settings.');
    //   return;
    // }

    // (optional) check canOpenURL but don’t block
    // const ok = await Linking.canOpenURL(dial);
    // if (!ok) Toast.show({type:'info', text1:'Attempting call anyway'});

    callStartTime.current = Date.now();
    setCallInProgress(true);

    // just try to open dialer
    await Linking.openURL(dial);

  } catch (e) {
    Alert.alert('Error', e.message);
    inFlight.current = false;
  } finally {
    setLoading(false);
  }
};


  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Toast.show({ type: 'error', text1: 'Invalid OTP', text2: 'Enter 6 digits' });
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const data = await verifyMobileNumber(customer.phone, otp, token);

      if (data.statuscode == '200') throw new Error(data.message);

      Toast.show({ type: 'success', text1: 'Phone Verified' });
      onVerified();

    } catch (e) {
      Toast.show({ type: 'error', text1: 'Verification Failed', text2: e.message });
    } finally {
      setLoading(false);
    }
  };

  if(callInitiated){
    return (<MeetingMinutesForm onClose={setCallInitiated}/>)
  }
  
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="phone" size={wp('6%')} color="#60a5fa" />
          <Text style={styles.title}>Call Verification</Text>
        </View>

        <View style={styles.customerInfo}>
          <Text style={styles.name}>{customer.name}</Text>
          <Text style={styles.phone}>{customer.phone}</Text>
        </View>

        {!otpSent ? (
          <TouchableOpacity
            style={[styles.button, loading && styles.disabled]}
            onPress={handleStartCall}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Start Call</Text>}
          </TouchableOpacity>
        ) : null}

        <Toast />
      </View>
    </KeyboardAvoidingView>
  );
}

CallVerification.propTypes = {
  customer: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onVerified: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, padding: wp('4%'), backgroundColor: '#0f172a', justifyContent: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: hp('3%') },
  title: { marginLeft: wp('2%'), fontSize: wp('5%'), color: '#fff', fontWeight: '600' },
  customerInfo: { marginBottom: hp('4%') },
  name: { fontSize: wp('4.5%'), color: '#fff', fontWeight: '500' },
  phone: { marginTop: hp('1%'), color: '#94a3b8' },
  button: { backgroundColor: '#2563eb', paddingVertical: hp('1.5%'), borderRadius: wp('1.5%'), alignItems: 'center' },
  disabled: { backgroundColor: '#1e40af' },
  buttonText: { color: '#fff', fontSize: wp('4%') },
});

export default CallVerification