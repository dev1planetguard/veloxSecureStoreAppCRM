//   import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation, useRoute } from '@react-navigation/native';
// // import * as ImagePicker from 'expo-image-picker';
// // import * as Location from 'expo-location';
// import { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Dimensions,
//   KeyboardAvoidingView,
//   Modal,
//   PermissionsAndroid,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// // import { API_BASE_URL } from '../configurl';
// // import { API_BASE_URL } from '../../config/config';
// import { showToast } from '../../components/reusable/Toast';
// import { launchCamera } from 'react-native-image-picker';
// import Feather from '@react-native-vector-icons/feather';
// import Geolocation from 'react-native-geolocation-service';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { API_BASE_URL } from '../../api/AxiosInterceptor';

// const { width } = Dimensions.get('window');
// const BASE_URL = API_BASE_URL;
// const BUTTON_HEIGHT = 52;
// const FIELD_HEIGHT = 50;
// const RADIUS_THRESHOLD = 200;

// function getDistance(lat1, lon1, lat2, lon2) {
//   const toRad = x => (x * Math.PI) / 180;
//   const R = 6371000;
//   const dLat = toRad(lat2 - lat1);
//   const dLon = toRad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) *
//     Math.cos(toRad(lat2)) *
//     Math.sin(dLon / 2) ** 2;
//   return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// }

// export default function VisitFormScreen() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { meetingId, customerId, latitude, longitude, meetingName, productName, productId } = route.params;

//   const [roles, setRoles] = useState([]);
//   const [selectedRole, setSelectedRole] = useState('');
//   const [roleModalVisible, setRoleModalVisible] = useState(false);

//   const [firstName, setFirstName] = useState('');
//   const [middleName, setMiddleName] = useState('');
//   const [lastName, setLastName] = useState('');

//   const [mobile, setMobile] = useState('');
//   const [mobileOtpSent, setMobileOtpSent] = useState(false);
//   const [mobileOtp, setMobileOtp] = useState('');
//   const [mobileVerified, setMobileVerified] = useState(false);

//   const [email, setEmail] = useState('');
//   const [emailOtpSent, setEmailOtpSent] = useState(false);
//   const [emailOtp, setEmailOtp] = useState('');
//   const [emailVerified, setEmailVerified] = useState(false);

//   const [stages, setStages] = useState([]);
//   const [selectedStages, setSelectedStages] = useState([]);
//   const [stageModalVisible, setStageModalVisible] = useState(false);

//   const [stageRemark, setStageRemark] = useState('Pending');

//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [distance, setDistance] = useState(null);
//   const [loadingLoc, setLoadingLoc] = useState(true);

//   const [photoUri, setPhotoUri] = useState(null);
//   const [mom, setMom] = useState('');
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const prodId = parseInt(productId, 10);
//       const custId = parseInt(customerId, 10);

//       // Roles
//       try {
//         const res = await fetch(
//           `${API_BASE_URL}/salesperson/getRoleListing`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const json = await res.json();
         
//         setRoles(json.data || []);
//         console.log('Fetched roles response:', json);
//       } catch(e) {
        
//         setRoles([]);
//         console.error('Failed to fetch roles:', e);
//       }

//       // Stages
//       try {
//         const res = await fetch(
//           `${API_BASE_URL}/saleStage/getSaleStage?productId=${prodId}&customerID=${custId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const json = await res.json();
//         setStages(json.data || []);
//       } catch {
//         setStages([]);
//       }

//       // Location
//       // let { status } = await Location.requestForegroundPermissionsAsync();
//       // if (status !== 'granted') {
//       //   Alert.alert('Permission Denied', 'Location required');
//       //   setLoadingLoc(false);
//       //   return;
//       // }
//       try {
//          setLoadingLoc(false)
//         Geolocation.getCurrentPosition(
//       async (position) => {
//         console.log('📍 Location:', position.coords);
//         // const formattedDateTime = getFormattedDateTime()
//         const geoloc = `${position.coords.latitude},${position.coords.longitude}`;
//        setCurrentLocation(position.coords)
//         setDistance(
//           getDistance(
//             position.coords.latitude,
//             position.coords.longitude,
//             parseFloat(latitude),
//             parseFloat(longitude)
//           )
//         );
//       },
//       (error) => {
//         console.log('Location error:', error);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//         // const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
//         // setCurrentLocation(loc.coords);
//         // setDistance(
//         //   getDistance(
//         //     loc.coords.latitude,
//         //     loc.coords.longitude,
//         //     parseFloat(latitude),
//         //     parseFloat(longitude)
//         //   )
//         // );
//       } catch {
//         Alert.alert('Error', 'Could not fetch location');
//       }
//       setLoadingLoc(false);
//     })();
//   }, [productId, customerId]);

//   // Send OTP
//   // const sendOtp = async type => {
//   //   const token = await AsyncStorage.getItem('jwtToken');
//   //   let url, method;
//   //   if (type === 'email') {
//   //     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return Alert.alert('Error','Enter valid email');
//   //     url = `${API_BASE_URL}/api/v1/otp/getOtp?email=${encodeURIComponent(email)}`;
//   //     method = 'POST';
//   //   } else {
//   //     if (!/^\d{10}$/.test(mobile.trim())) return Alert.alert('Error','Enter valid 10-digit mobile');
//   //     url = `${API_BASE_URL}/api/v1/sms/sendOtp?number=${encodeURIComponent(mobile)}`;
//   //     method = 'GET';
//   //   }
//   //   console.log('OTP URL:', url);
//   //   const res = await fetch(url, { method, headers: { Authorization: `Bearer ${token}` } });
//   //   const data = await res.json();
//   //   console.log('OTP data:', data);
//   //   if (type === 'email') {
//   //     data.statusCode === 200 ? (setEmailOtpSent(true), Alert.alert('Success',data.message)) : Alert.alert('Error',data.message);
//   //   } else {
//   //     data.ErrorCode === '000' ? (setMobileOtpSent(true), Alert.alert('Success',data.ErrorMessage)) : Alert.alert('Error',data.ErrorMessage);
//   //   }
//   // };

//   //new changes below
//   const sendOtp = async (type) => {
//   const token = await AsyncStorage.getItem('jwtToken');
//   let url, method;

//   if (type === 'email') {
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
//       return Alert.alert('Error', 'Enter valid email');//new changes
//     }
//     url = `${API_BASE_URL}/otp/getOtp?email=${encodeURIComponent(email)}`;//new changes
//     method = 'POST';
//   } else {
//     if (!/^\d{10}$/.test(mobile.trim())) {
//       return Alert.alert('Error', 'Enter valid 10-digit mobile');
//     }
//     // url = `${API_BASE_URL}/api/v1/sms/sendOtp?number=${encodeURIComponent(mobile)}`;
//     url = `${API_BASE_URL}/sms/sendOtp?number=${encodeURIComponent(mobile)}`;//new changes

//     method = 'GET';
//   }

//   console.log('OTP URL:', url);

//   try {
//     const res = await fetch(url, { method, headers: { Authorization: `Bearer ${token}` } });
//     const data = await res.json();
//     console.log('OTP data:', data);

//     if (type === 'email') {
//       if (data.statusCode === 200) {
//         setEmailOtpSent(true);
//         Alert.alert('Success', 'OTP is sent to your email');
//       } else {
//         Alert.alert('Error', data.message || 'Failed to send OTP');
//       }
//     } else {
//       if (data.ErrorCode === '000') {
//         setMobileOtpSent(true);
//         Alert.alert('Success', 'OTP is sent to your mobile number');
//       } else {
//         Alert.alert('Error', data.ErrorMessage || 'Failed to send OTP');
//       }
//     }
//   } catch (error) {
//     console.log('OTP send error:', error);
//     Alert.alert('Error', 'Something went wrong while sending OTP');
//   }
// };


//   // Verify OTP
//   const verifyOtp = async type => {
//     const token = await AsyncStorage.getItem('jwtToken');
//     let url;
//     if (type === 'email') {
//       if (!/^\d{6}$/.test(emailOtp.trim())) return Alert.alert('Error','Enter 6-digit OTP');
//       url = `${API_BASE_URL}/otp/verifyEmail?mail=${encodeURIComponent(email)}&otp=${encodeURIComponent(emailOtp)}`;//new changes
//     } else {
//       if (!/^\d{6}$/.test(mobileOtp.trim())) return Alert.alert('Error','Enter 6-digit OTP');
//       // url = `${API_BASE_URL}/api/v1/sms/verifyMobileNumber?number=${encodeURIComponent(mobile)}&otp=${encodeURIComponent(mobileOtp)}`;
//       url = `${API_BASE_URL}/sms/verifyMobileNumber?number=${encodeURIComponent(mobile)}&otp=${encodeURIComponent(mobileOtp)}`;//new changes

//     }
//     console.log('Verify URL:', url);
//     const res = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
//     const data = await res.json();
//     console.log('Verify data:', data);
//     if (type === 'email') {
//       data.statusCode === 200 ? (setEmailVerified(true), Alert.alert('Success',data.message)) : Alert.alert('Error',data.message);
//     } else {
//       data.statusCode === 200 ? (setMobileVerified(true), Alert.alert('Success',data.message)) : Alert.alert('Error',data.message);
//     }
//   };
//   // export default function FetchLocationScreen() {$1const [uploading, setUploading] = useState(false);
//   //    // store server response data
//   //   const [uploadData, setUploadData] = useState([]);

//    const requestCameraPermission = async () => {
//       if (Platform.OS === 'android') {
//         const result = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA
//         );
//         return result === PermissionsAndroid.RESULTS.GRANTED;
//       }
//       return true;
//     };
//   // Capture Selfie
//   const pickPhoto = async () => {
//  const hasPermission = await requestCameraPermission();
//     if (!hasPermission) {
//       Alert.alert('Permission Denied', 'Camera permission is required to take a selfie.');
//       return;
//     }

//     launchCamera(
//       {
//         mediaType: 'photo',
//         cameraType: 'front',
//         saveToPhotos: false,
//         includeBase64: false,
//         quality: 0.8,
//       },
//       (response) => {
//         if (response.didCancel) return;
//         if (response.errorCode) {
//           Alert.alert('Camera Error', response.errorMessage || response.errorCode);
//           return;
//         }
//         const uri = response?.assets?.[0]?.uri;
//         if (uri) {
//           setPhotoUri(uri);
//           showToast('Selfie Captured')
//         //   Alert.alert('Selfie Captured');
//         //   setStep('onboarding');
//         } else {
//           Alert.alert('Error', 'Could not capture image. Please try again.');
//         }
//       }
//     );


//     const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
//     // new API returns 'canceled' and 'assets'
//     // if (!result.canceled && result.assets && result.assets.length > 0) {
//     //   setPhotoUri(result.assets[0].uri);
//     //   Alert.alert('Success', 'Selfie uploaded');
//     // }
//   };
//   const submitVisit = async () => {
//     if (distance == null) return Alert.alert('Error', 'Location pending');
//     if (distance > RADIUS_THRESHOLD) return Alert.alert('Out of Range', `${Math.round(distance)}m away`);
//     if (!firstName.trim() || !lastName.trim()) return Alert.alert('Error', 'Enter full name');
//     // if (!mobileVerified) return Alert.alert('Error', 'Verify mobile OTP');
//     // if (!emailVerified) return Alert.alert('Error', 'Verify email OTP');
//     if (!selectedRole) return Alert.alert('Error', 'Select role');
//     if (!photoUri) return Alert.alert('Error', 'Take selfie');
//     if (!selectedStages.length) return Alert.alert('Error', 'Select stages');
//     if (!mom.trim()) return Alert.alert('Error', 'Enter MOM');

//     setUploading(true);
//     const token = await AsyncStorage.getItem('jwtToken');
//     const userId = await AsyncStorage.getItem('userId');
//     const payload = {
//       userId: Number(userId),
//       customer: Number(customerId),
//       meetingId: Number(meetingId),
//       visitTime: new Date().toISOString(),
//       longitude: String(currentLocation.longitude),
//       latitude: String(currentLocation.latitude),
//       battery: '80%',
//       attend_name: `${firstName} ${middleName} ${lastName}`,
//       attend_role: selectedRole,
//       status: stageRemark,
//       mom,
//       productName,
//       stageName: selectedStages,
//     };
//     const form = new FormData();
//     form.append('data', JSON.stringify(payload));
//     form.append('image', { uri: photoUri, type: 'image/jpeg', name: 'selfie.jpg' });
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/v1/salesperson/uploadVisit`, { 
//         method: 'POST',
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
//         body: form,
//       });
//       const json = await res.json();
//      // setUploadData(json.data || []);
//       console.log('Upload response data:', json.data);
//       Alert.alert('Success', 'Upload visit successfully', [
//         { text: 'OK', onPress: () => navigation.replace('MeetingDashboard') },
//       ]);
//     } catch (e) {
//       Alert.alert('Error', e.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//     if(loadingLoc||uploading){return<View style={styles.overlay}><ActivityIndicator size="large" color="#fff"/></View>;} 


    
//     return (
//       <SafeAreaView style={styles.safe}>
//         <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':undefined} style={{flex:1}}>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={()=>navigation.goBack()}><Feather name="chevron-left" size={24} color="#fff"/></TouchableOpacity>
//             <Text style={styles.title}>Customer Visit</Text>
//             <TouchableOpacity onPress={pickPhoto}><Feather name="camera" size={24} color="#fff"/></TouchableOpacity>
//           </View>
//           <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
//             <Text style={styles.label}> {meetingName}</Text>
//             <View style={[styles.nameRow]}> 
//               <TextInput placeholderTextColor="#777" style={[styles.inputName]} placeholder="First" value={firstName} onChangeText={setFirstName}/>  
//               <TextInput placeholderTextColor="#777" style={[styles.inputName, styles.nameMiddle]} placeholder="Middle" value={middleName} onChangeText={setMiddleName}/>  
//               <TextInput placeholderTextColor="#777" style={[styles.inputName]} placeholder="Last" value={lastName} onChangeText={setLastName}/>  
//             </View>

//             <Text style={styles.label}>Phone *</Text>
//             <View style={styles.row}>
//               <TextInput style={[styles.input, {flex:1}]} value={mobile} onChangeText={setMobile} keyboardType="phone-pad" placeholder="Enter phone" placeholderTextColor="#777"/>
//               {/* <TouchableOpacity style={styles.otpBtn} onPress={()=>sendOtp('mobile')}><Text style={styles.otpText}>Send OTP</Text></TouchableOpacity> */}
//             </View>
//             {/* {mobileOtpSent&&!mobileVerified&&<View style={styles.row}>
//               <TextInput style={[styles.input,{flex:1}]} value={mobileOtp} onChangeText={setMobileOtp} keyboardType="number-pad" placeholder="OTP" placeholderTextColor="#777"/>
//               <TouchableOpacity style={styles.otpBtn} onPress={()=>verifyOtp('mobile')}><Text style={styles.otpText}>Verify</Text></TouchableOpacity>
//             </View>} */}

//             <Text style={styles.label}>Email *</Text>
//             <View style={styles.row}>
//               <TextInput style={[styles.input,{flex:1}]} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="Enter email" placeholderTextColor="#777"/>
//               {/* <TouchableOpacity style={styles.otpBtn} onPress={()=>sendOtp('email')}><Text style={styles.otpText}>Send OTP</Text></TouchableOpacity> */}
//             </View>
//             {/* {emailOtpSent&&!emailVerified&&<View style={styles.row}>
//               <TextInput style={[styles.input,{flex:1}]} value={emailOtp} onChangeText={setEmailOtp} keyboardType="number-pad" placeholder="OTP" placeholderTextColor="#777"/>
//               <TouchableOpacity style={styles.otpBtn} onPress={()=>verifyOtp('email')}><Text style={styles.otpText}>Verify</Text></TouchableOpacity>
//             </View>} */}

//             {/* Role, Stage, Remark, MOM unchanged */}
//             <Text style={styles.label}>Role *</Text>
//             <TouchableOpacity style={styles.input} onPress={()=>setRoleModalVisible(true)}><Text style={styles.inputText}>{selectedRole||'Select Role'}</Text><Feather name="chevron-down" size={20} color="#777"/>
//             </TouchableOpacity>
//             <Text style={styles.label}>Sales Cycle *</Text>
//             <TouchableOpacity style={styles.input} onPress={()=>setStageModalVisible(true)}><Text style={styles.inputText}>{selectedStages.length?selectedStages.join(', '):'Select Stages'}</Text><Feather name="chevron-down" size={20} color="#777"/></TouchableOpacity>
//             <Text style={styles.label}>Stage Remark</Text>
//             <View style={styles.segment}>{['Pending','Completed'].map(opt=>
//               (<TouchableOpacity key={opt} style={[styles.segmentBtn,stageRemark===opt&&styles.segmentActive]} onPress={()=>setStageRemark(opt)}><Text style={styles.segmentText}>{opt}</Text></TouchableOpacity>))}</View>
//             <Text style={styles.label}>MOM *</Text>
//             <TextInput style={[styles.input,styles.textArea]} value={mom} onChangeText={setMom} multiline placeholder="Notes..." placeholderTextColor="#777"/>

//             <TouchableOpacity style={styles.submitBtn} onPress={submitVisit}><Text style={styles.submitText}>Submit Visit</Text></TouchableOpacity>
//           </ScrollView>

//           {/* Modals unchanged... */}
//         </KeyboardAvoidingView>

//         {/* Role Selection Modal */}
        
//         <Modal
//           visible={roleModalVisible}
//           transparent
//           animationType="fade"
//           onRequestClose={() => setRoleModalVisible(false)}
//         >
//           <View style={styles.modalBg}>
//             <View style={styles.modal}>
//               <ScrollView>
//                 {roles.map(role => (
//                   <TouchableOpacity
//                     key={role}
//                     style={styles.modalItem}
//                     onPress={() => {
//                       setSelectedRole(role);
//                       setRoleModalVisible(false);
//                     }}
//                   >
//                     <Text style={styles.modalText}>{role}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>
//             </View>
//           </View>
//         </Modal>

//         {/* Sales Cycle (Stages) Multi-Select Modal */}
//         <Modal
//           visible={stageModalVisible}
//           transparent
//           animationType="fade"
//           onRequestClose={() => setStageModalVisible(false)}
//         >
//           <View style={styles.modalBg}>
//             <View style={styles.modal}>
//               <ScrollView>
//                 {stages.map(stage => {
//                   const isSelected = selectedStages.includes(stage);
//                   return (
//                     <TouchableOpacity
//                       key={stage}
//                       style={styles.modalItem}
//                       onPress={() => {
//                         let updated = [...selectedStages];
//                         if (isSelected) {
//                           updated = updated.filter(s => s !== stage);
//                         } else {
//                           updated.push(stage);
//                         }
//                         setSelectedStages(updated);
//                       }}
//                     >
//                       <Text style={[styles.modalText, isSelected && { fontWeight: 'bold' }]}>
//                         {stage}
//                       </Text>
//                     </TouchableOpacity>
//                   );
//                 })}
//               </ScrollView>
//               <TouchableOpacity
//                 style={[styles.submitBtn, { margin: 12 }]}
//                 onPress={() => setStageModalVisible(false)}
//               >
//                 <Text style={styles.submitText}>Done</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>

//       </SafeAreaView>
//     );
//   }

//   const styles = StyleSheet.create({
//     safe:{flex:1,backgroundColor:'#111'},
//     header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:16,backgroundColor:'#1A1A1A'},
//     title:{color:'#fff',fontSize:18,fontWeight:'600'},
//     container:{padding:16,paddingBottom:80},
//     label:{color:'#fff',fontSize:14,marginTop:12},
//     nameRow:{flexDirection:'row',justifyContent:'space-between',marginTop:4},
//     inputName:{flex:1,height:FIELD_HEIGHT,backgroundColor:'#1E1E1E',borderRadius:8,paddingHorizontal:12,color:'#fff'},
//     nameMiddle:{marginHorizontal:4},
//     input:{flexDirection:'row',alignItems:'center',height:FIELD_HEIGHT,backgroundColor:'#1E1E1E',borderRadius:8,paddingHorizontal:12,color:'#fff',marginTop:4},
//     inputText:{flex:1,color:'#fff'},
//     row:{flexDirection:'row',alignItems:'center'},
//     otpBtn:{marginLeft:8,backgroundColor:'#2979FF',paddingHorizontal:12,paddingVertical:8,borderRadius:6},
//     otpText:{color:'#fff'},
//     badge:{padding:6,borderRadius:6,alignSelf:'flex-start',marginTop:8},
//     badgeText:{color:'#fff'},
//     segment:{flexDirection:'row',marginTop:8},
//     segmentBtn:{flex:1,backgroundColor:'#1E1E1E',padding:10,marginHorizontal:4,borderRadius:6},
//     segmentActive:{backgroundColor:'#2979FF'},
//     segmentText:{color:'#fff',textAlign:'center'},
//     textArea:{height:100,textAlignVertical:'top',marginTop:4},
//     submitBtn:{backgroundColor:'#43A047',borderRadius:8,height:BUTTON_HEIGHT,justifyContent:'center',alignItems:'center',marginTop:16},
//     submitText:{color:'#fff',fontSize:16,fontWeight:'600'},
//     overlay:{...StyleSheet.absoluteFillObject,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.6)'},
//     modalBg:{flex:1,backgroundColor:'rgba(0,0,0,0.6)',
//         justifyContent: 'center',
//   alignItems: 'center',
//     },
//     // modal:{position:'absolute',top:width*0.35,left:20,right:20,backgroundColor:'#1A1A1A',borderRadius:8,maxHeight:width*0.6},
//     modal: {
//   width: '80%',
//   backgroundColor: '#1A1A1A',
//   borderRadius: 8,
//   maxHeight: '60%',
//   padding: 10,
// },
//     modalItem:{padding:12},
//     modalText:{color:'#fff'},
//   });


import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
// import * as ImagePicker from 'expo-image-picker';
// import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { API_BASE_URL } from '../configurl';
// import { API_BASE_URL } from '../../config/config';
import { showToast } from '../../components/reusable/Toast';
import { launchCamera } from 'react-native-image-picker';
import Feather from '@react-native-vector-icons/feather';
import Geolocation from 'react-native-geolocation-service';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_BASE_URL } from '../../api/AxiosInterceptor';

const { width } = Dimensions.get('window');
const BASE_URL = API_BASE_URL;
const BUTTON_HEIGHT = 52;
const FIELD_HEIGHT = 50;
const RADIUS_THRESHOLD = 200;

function getDistance(lat1, lon1, lat2, lon2) {
  const toRad = x => (x * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function VisitFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { meetingId, customerId, latitude, longitude, meetingName, productName, productId } = route.params;

  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [roleModalVisible, setRoleModalVisible] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');

  const [mobile, setMobile] = useState('');
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtp, setMobileOtp] = useState('');
  const [mobileVerified, setMobileVerified] = useState(false);

  const [email, setEmail] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);

  const [stages, setStages] = useState([]);
  const [selectedStages, setSelectedStages] = useState([]);
  const [stageModalVisible, setStageModalVisible] = useState(false);

  const [stageRemark, setStageRemark] = useState('Pending');

  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loadingLoc, setLoadingLoc] = useState(true);

  const [photoUri, setPhotoUri] = useState(null);
  const [mom, setMom] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      const prodId = parseInt(productId, 10);
      const custId = parseInt(customerId, 10);

      // Roles
      try {
        const res = await fetch(
          `${API_BASE_URL}/salesperson/getRoleListing`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const json = await res.json();
         
        setRoles(json.data || []);
        console.log('Fetched roles response:', json);
      } catch(e) {
        
        setRoles([]);
        console.error('Failed to fetch roles:', e);
      }

      // Stages
      try {
        const res = await fetch(
          `${API_BASE_URL}/saleStage/getSaleStage?productId=${prodId}&customerID=${custId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const json = await res.json();
        setStages(json.data || []);
      } catch {
        setStages([]);
      }

      // Location
      // let { status } = await Location.requestForegroundPermissionsAsync();
      // if (status !== 'granted') {
      //   Alert.alert('Permission Denied', 'Location required');
      //   setLoadingLoc(false);
      //   return;
      // }
      try {
         setLoadingLoc(false)
        Geolocation.getCurrentPosition(
      async (position) => {
        console.log('📍 Location:', position.coords);
        // const formattedDateTime = getFormattedDateTime()
        const geoloc = `${position.coords.latitude},${position.coords.longitude}`;
       setCurrentLocation(position.coords)
        setDistance(
          getDistance(
            position.coords.latitude,
            position.coords.longitude,
            parseFloat(latitude),
            parseFloat(longitude)
          )
        );
      },
      (error) => {
        console.log('Location error:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
        // const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        // setCurrentLocation(loc.coords);
        // setDistance(
        //   getDistance(
        //     loc.coords.latitude,
        //     loc.coords.longitude,
        //     parseFloat(latitude),
        //     parseFloat(longitude)
        //   )
        // );
      } catch {
        Alert.alert('Error', 'Could not fetch location');
      }
      setLoadingLoc(false);
    })();
  }, [productId, customerId]);

  // Send OTP
  // const sendOtp = async type => {
  //   const token = await AsyncStorage.getItem('jwtToken');
  //   let url, method;
  //   if (type === 'email') {
  //     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return Alert.alert('Error','Enter valid email');
  //     url = `${API_BASE_URL}/api/v1/otp/getOtp?email=${encodeURIComponent(email)}`;
  //     method = 'POST';
  //   } else {
  //     if (!/^\d{10}$/.test(mobile.trim())) return Alert.alert('Error','Enter valid 10-digit mobile');
  //     url = `${API_BASE_URL}/api/v1/sms/sendOtp?number=${encodeURIComponent(mobile)}`;
  //     method = 'GET';
  //   }
  //   console.log('OTP URL:', url);
  //   const res = await fetch(url, { method, headers: { Authorization: `Bearer ${token}` } });
  //   const data = await res.json();
  //   console.log('OTP data:', data);
  //   if (type === 'email') {
  //     data.statusCode === 200 ? (setEmailOtpSent(true), Alert.alert('Success',data.message)) : Alert.alert('Error',data.message);
  //   } else {
  //     data.ErrorCode === '000' ? (setMobileOtpSent(true), Alert.alert('Success',data.ErrorMessage)) : Alert.alert('Error',data.ErrorMessage);
  //   }
  // };

  //new changes below
  const sendOtp = async (type) => {
  const token = await AsyncStorage.getItem('jwtToken');
  let url, method;

  if (type === 'email') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return Alert.alert('Error', 'Enter valid email');//new changes
    }
    url = `${API_BASE_URL}/otp/getOtp?email=${encodeURIComponent(email)}`;//new changes
    method = 'POST';
  } else {
    if (!/^\d{10}$/.test(mobile.trim())) {
      return Alert.alert('Error', 'Enter valid 10-digit mobile');
    }
    // url = `${API_BASE_URL}/api/v1/sms/sendOtp?number=${encodeURIComponent(mobile)}`;
    url = `${API_BASE_URL}/sms/sendOtp?number=${encodeURIComponent(mobile)}`;//new changes

    method = 'GET';
  }

  console.log('OTP URL:', url);

  try {
    const res = await fetch(url, { method, headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    console.log('OTP data:', data);

    if (type === 'email') {
      if (data.statusCode === 200) {
        setEmailOtpSent(true);
        Alert.alert('Success', 'OTP is sent to your email');
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }
    } else {
      if (data.ErrorCode === '000') {
        setMobileOtpSent(true);
        Alert.alert('Success', 'OTP is sent to your mobile number');
      } else {
        Alert.alert('Error', data.ErrorMessage || 'Failed to send OTP');
      }
    }
  } catch (error) {
    console.log('OTP send error:', error);
    Alert.alert('Error', 'Something went wrong while sending OTP');
  }
};


  // Verify OTP
  const verifyOtp = async type => {
    const token = await AsyncStorage.getItem('jwtToken');
    let url;
    if (type === 'email') {
      if (!/^\d{6}$/.test(emailOtp.trim())) return Alert.alert('Error','Enter 6-digit OTP');
      url = `${API_BASE_URL}/otp/verifyEmail?mail=${encodeURIComponent(email)}&otp=${encodeURIComponent(emailOtp)}`;//new changes
    } else {
      if (!/^\d{6}$/.test(mobileOtp.trim())) return Alert.alert('Error','Enter 6-digit OTP');
      // url = `${API_BASE_URL}/api/v1/sms/verifyMobileNumber?number=${encodeURIComponent(mobile)}&otp=${encodeURIComponent(mobileOtp)}`;
      url = `${API_BASE_URL}/sms/verifyMobileNumber?number=${encodeURIComponent(mobile)}&otp=${encodeURIComponent(mobileOtp)}`;//new changes

    }
    console.log('Verify URL:', url);
    const res = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    console.log('Verify data:', data);
    if (type === 'email') {
      data.statusCode === 200 ? (setEmailVerified(true), Alert.alert('Success',data.message)) : Alert.alert('Error',data.message);
    } else {
      data.statusCode === 200 ? (setMobileVerified(true), Alert.alert('Success',data.message)) : Alert.alert('Error',data.message);
    }
  };
  // export default function FetchLocationScreen() {$1const [uploading, setUploading] = useState(false);
  //    // store server response data
  //   const [uploadData, setUploadData] = useState([]);

   const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        return result === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    };
  // Capture Selfie
  const pickPhoto = async () => {
 const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera permission is required to take a selfie.');
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'front',
        saveToPhotos: false,
        includeBase64: false,
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Camera Error', response.errorMessage || response.errorCode);
          return;
        }
        const uri = response?.assets?.[0]?.uri;
        if (uri) {
          setPhotoUri(uri);
          showToast('Selfie Captured')
        //   Alert.alert('Selfie Captured');
        //   setStep('onboarding');
        } else {
          Alert.alert('Error', 'Could not capture image. Please try again.');
        }
      }
    );


    const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    // new API returns 'canceled' and 'assets'
    // if (!result.canceled && result.assets && result.assets.length > 0) {
    //   setPhotoUri(result.assets[0].uri);
    //   Alert.alert('Success', 'Selfie uploaded');
    // }
  };
  const submitVisit = async () => {
    if (distance == null) return Alert.alert('Error', 'Location pending');
    if (distance > RADIUS_THRESHOLD) return Alert.alert('Out of Range', `${Math.round(distance)}m away`);
    if (!firstName.trim() || !lastName.trim()) return Alert.alert('Error', 'Enter full name');
    // if (!mobileVerified) return Alert.alert('Error', 'Verify mobile OTP');
    // if (!emailVerified) return Alert.alert('Error', 'Verify email OTP');
    if (!selectedRole) return Alert.alert('Error', 'Select role');
    if (!photoUri) return Alert.alert('Error', 'Take selfie');
    if (!selectedStages.length) return Alert.alert('Error', 'Select stages');
    if (!mom.trim()) return Alert.alert('Error', 'Enter MOM');

    setUploading(true);
    const token = await AsyncStorage.getItem('jwtToken');
    const userId = await AsyncStorage.getItem('userId');
    const payload = {
      userId: Number(userId),
      customer: Number(customerId),
      meetingId: Number(meetingId),
      visitTime: new Date().toISOString(),
      longitude: String(currentLocation.longitude),
      latitude: String(currentLocation.latitude),
      battery: '80%',
      attend_name: `${firstName} ${middleName} ${lastName}`,
      attend_role: selectedRole,
      status: stageRemark,
      mom,
      productName,
      stageName: selectedStages,
    };
    console.log(payload,'payloadddd')
    const form = new FormData();
    form.append('data', JSON.stringify(payload));
    form.append('image', { uri: photoUri, type: 'image/jpeg', name: 'selfie.jpg' });

    console.log('=========',form);
    
    try {
      const res = await fetch(`${API_BASE_URL}/salesperson/uploadVisit`, { 
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data'},
        body: form,
      });
      console.log('resssssssss',res);
      
      const json = await res.json();
     // setUploadData(json.data || []);
      console.log('Upload response data:', json.data);
      showToast('Visit uploaded successfully',3000)
      navigation.navigate('SalesDashboardScreen')
      // Alert.alert('Success', 'Upload visit successfully', [
      //   { text: 'OK', onPress: () => navigation.replace('MeetingDashboard') },
      // ]);
    } catch (e) {
      showToast(`${e.message}`,3000)
      console.log(e.statusCode,'errorooro')
      // Alert.alert('Error', e.message);
    } finally {
      setUploading(false);
    }
  };

    if(loadingLoc||uploading){return<View style={styles.overlay}><ActivityIndicator size="large" color="#fff"/></View>;} 


    
    return (
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':undefined} style={{flex:1}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.goBack()}><Feather name="chevron-left" size={24} color="#fff"/></TouchableOpacity>
            <Text style={styles.title}>Customer Visit</Text>
            <TouchableOpacity onPress={pickPhoto}><Feather name="camera" size={24} color="#fff"/></TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.label}> {meetingName}</Text>
            <View style={[styles.nameRow]}> 
              <TextInput placeholderTextColor="#777" style={[styles.inputName]} placeholder="First" value={firstName} onChangeText={setFirstName}/>  
              <TextInput placeholderTextColor="#777" style={[styles.inputName, styles.nameMiddle]} placeholder="Middle" value={middleName} onChangeText={setMiddleName}/>  
              <TextInput placeholderTextColor="#777" style={[styles.inputName]} placeholder="Last" value={lastName} onChangeText={setLastName}/>  
            </View>

            <Text style={styles.label}>Phone *</Text>
            <View style={styles.row}>
              <TextInput style={[styles.input, {flex:1}]} value={mobile} onChangeText={setMobile} keyboardType="phone-pad" placeholder="Enter phone" placeholderTextColor="#777"/>
              {/* <TouchableOpacity style={styles.otpBtn} onPress={()=>sendOtp('mobile')}><Text style={styles.otpText}>Send OTP</Text></TouchableOpacity> */}
            </View>
            {/* {mobileOtpSent&&!mobileVerified&&<View style={styles.row}>
              <TextInput style={[styles.input,{flex:1}]} value={mobileOtp} onChangeText={setMobileOtp} keyboardType="number-pad" placeholder="OTP" placeholderTextColor="#777"/>
              <TouchableOpacity style={styles.otpBtn} onPress={()=>verifyOtp('mobile')}><Text style={styles.otpText}>Verify</Text></TouchableOpacity>
            </View>} */}

            <Text style={styles.label}>Email *</Text>
            <View style={styles.row}>
              <TextInput style={[styles.input,{flex:1}]} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="Enter email" placeholderTextColor="#777"/>
              {/* <TouchableOpacity style={styles.otpBtn} onPress={()=>sendOtp('email')}><Text style={styles.otpText}>Send OTP</Text></TouchableOpacity> */}
            </View>
            {/* {emailOtpSent&&!emailVerified&&<View style={styles.row}>
              <TextInput style={[styles.input,{flex:1}]} value={emailOtp} onChangeText={setEmailOtp} keyboardType="number-pad" placeholder="OTP" placeholderTextColor="#777"/>
              <TouchableOpacity style={styles.otpBtn} onPress={()=>verifyOtp('email')}><Text style={styles.otpText}>Verify</Text></TouchableOpacity>
            </View>} */}

            {/* Role, Stage, Remark, MOM unchanged */}
            <Text style={styles.label}>Role *</Text>
            <TouchableOpacity style={styles.input} onPress={()=>setRoleModalVisible(true)}><Text style={styles.inputText}>{selectedRole||'Select Role'}</Text><Feather name="chevron-down" size={20} color="#777"/>
            </TouchableOpacity>
            <Text style={styles.label}>Sales Cycle *</Text>
            <TouchableOpacity style={styles.input} onPress={()=>setStageModalVisible(true)}><Text style={styles.inputText}>{selectedStages.length?selectedStages.join(', '):'Select Stages'}</Text><Feather name="chevron-down" size={20} color="#777"/></TouchableOpacity>
            <Text style={styles.label}>Stage Remark</Text>
            <View style={styles.segment}>{['Pending','Completed'].map(opt=>
              (<TouchableOpacity key={opt} style={[styles.segmentBtn,stageRemark===opt&&styles.segmentActive]} onPress={()=>setStageRemark(opt)}><Text style={styles.segmentText}>{opt}</Text></TouchableOpacity>))}</View>
            <Text style={styles.label}>MOM *</Text>
            <TextInput style={[styles.input,styles.textArea]} value={mom} onChangeText={setMom} multiline placeholder="Notes..." placeholderTextColor="#777"/>

            <TouchableOpacity style={styles.submitBtn} onPress={submitVisit}><Text style={styles.submitText}>Submit Visit</Text></TouchableOpacity>
          </ScrollView>

          {/* Modals unchanged... */}
        </KeyboardAvoidingView>

        {/* Role Selection Modal */}
        
        <Modal
          visible={roleModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setRoleModalVisible(false)}
        >
          <View style={styles.modalBg}>
            <View style={styles.modal}>
              <ScrollView>
                {roles.map(role => (
                  <TouchableOpacity
                    key={role}
                    style={styles.modalItem}
                    onPress={() => {
                      setSelectedRole(role);
                      setRoleModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalText}>{role}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Sales Cycle (Stages) Multi-Select Modal */}
        <Modal
          visible={stageModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setStageModalVisible(false)}
        >
          <View style={styles.modalBg}>
            <View style={styles.modal}>
              <ScrollView>
                {stages.map(stage => {
                  const isSelected = selectedStages.includes(stage);
                  return (
                    <TouchableOpacity
                      key={stage}
                      style={styles.modalItem}
                      onPress={() => {
                        let updated = [...selectedStages];
                        if (isSelected) {
                          updated = updated.filter(s => s !== stage);
                        } else {
                          updated.push(stage);
                        }
                        setSelectedStages(updated);
                      }}
                    >
                      <Text style={[styles.modalText, isSelected && { fontWeight: 'bold' }]}>
                        {stage}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              <TouchableOpacity
                style={[styles.submitBtn, { margin: 12 }]}
                onPress={() => setStageModalVisible(false)}
              >
                <Text style={styles.submitText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    safe:{flex:1,backgroundColor:'#111'},
    header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:16,backgroundColor:'#1A1A1A'},
    title:{color:'#fff',fontSize:18,fontWeight:'600'},
    container:{padding:16,paddingBottom:80},
    label:{color:'#fff',fontSize:14,marginTop:12},
    nameRow:{flexDirection:'row',justifyContent:'space-between',marginTop:4},
    inputName:{flex:1,height:FIELD_HEIGHT,backgroundColor:'#1E1E1E',borderRadius:8,paddingHorizontal:12,color:'#fff'},
    nameMiddle:{marginHorizontal:4},
    input:{flexDirection:'row',alignItems:'center',height:FIELD_HEIGHT,backgroundColor:'#1E1E1E',borderRadius:8,paddingHorizontal:12,color:'#fff',marginTop:4},
    inputText:{flex:1,color:'#fff'},
    row:{flexDirection:'row',alignItems:'center'},
    otpBtn:{marginLeft:8,backgroundColor:'#2979FF',paddingHorizontal:12,paddingVertical:8,borderRadius:6},
    otpText:{color:'#fff'},
    badge:{padding:6,borderRadius:6,alignSelf:'flex-start',marginTop:8},
    badgeText:{color:'#fff'},
    segment:{flexDirection:'row',marginTop:8},
    segmentBtn:{flex:1,backgroundColor:'#1E1E1E',padding:10,marginHorizontal:4,borderRadius:6},
    segmentActive:{backgroundColor:'#2979FF'},
    segmentText:{color:'#fff',textAlign:'center'},
    textArea:{height:100,textAlignVertical:'top',marginTop:4},
    submitBtn:{backgroundColor:'#43A047',borderRadius:8,height:BUTTON_HEIGHT,justifyContent:'center',alignItems:'center',marginTop:16},
    submitText:{color:'#fff',fontSize:16,fontWeight:'600'},
    overlay:{...StyleSheet.absoluteFillObject,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.6)'},
    modalBg:{flex:1,backgroundColor:'rgba(0,0,0,0.6)',
        justifyContent: 'center',
  alignItems: 'center',
    },
    // modal:{position:'absolute',top:width*0.35,left:20,right:20,backgroundColor:'#1A1A1A',borderRadius:8,maxHeight:width*0.6},
    modal: {
  width: '80%',
  backgroundColor: '#1A1A1A',
  borderRadius: 8,
  maxHeight: '60%',
  padding: 10,
},
    modalItem:{padding:12},
    modalText:{color:'#fff'},
  });
