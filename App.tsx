// import { I18nManager } from 'react-native';
// import * as ReactNavigation from '@react-navigation/native';

// // Patch useLocale if missing
// if (typeof ReactNavigation.useLocale !== 'function') {
//   ReactNavigation.useLocale = () => ({
//     direction: I18nManager.isRTL ? 'rtl' : 'ltr',
//   });
// }

import 'react-native-reanimated';
import {  StyleSheet, View,Text, SafeAreaView, StatusBar, } from 'react-native';
import LoginScreen from './src/screen/LoginScreen';
import SplashScreen from './src/screen/SplashScreen'
import React, { useState } from 'react';
import { hp, wp } from './src/utils/responsive';
import ButtonReusable from './src/components/reusable/ButtonReusable';
import InputFieldReusable from './src/components/reusable/InputFieldResuable';
import HalfInputReusable from './src/components/reusable/HalfInputReusable';
import GetOtpReusable from './src/components/reusable/GetOtpReusable';
import PrivacyPolicyCardReusable from './src/components/reusable/PrivacyPolicyCardReusable';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootNavigator from './src/navigation/RootNavigator';
// const Stack = createNativeStackNavigator();
function App() {
  const [street, setStreet] = useState('');//for inputfield
  const [firstName, setFirstName] = useState('');//for halfinput
  return (<RootNavigator />);
//     <NavigationContainer>
//        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
//      {/* <SafeAreaView style={styles.container}>  */}

//               <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />

    
//       {/* <Text allowFontScaling={false} style={{fontSize:20}}>Velox Secure Store App</Text> */}
     
//      {/* <LoginScreen /> */}
//      {/* <ButtonReusable 
//       // label="Create Account"
//       label='Send OTP'
//       onPress={() => console.log('Button pressed')}
//       // disabled={true}
//      /> */}
// {/* 
//       <InputFieldReusable
//         placeholder="Street Address"
//         // value={street}
//         // onChangeText={setStreet}
//       /> */}

//        {/* <HalfInputReusable
//         placeholder="First Name"
//         value={firstName}
//         onChangeText={setFirstName}
//       /> */}

//       {/* <GetOtpReusable /> */}

//        {/* <PrivacyPolicyCardReusable
//         title="1. Information We Collect"
//         content="We may collect your name, email address, billing information, device identifiers, and usage data when you interact with our website or purchase our products."
//       /> */}
    
//     {/* </SafeAreaView>  */}
//     </Stack.Navigator>
//    </NavigationContainer>

{/* <View style={{flex:1,width:wp(100),height:hp(100),justifyContent:'center',alignItems:'center'}}> */}
  
  {/* <Text style={{color:'white',fontSize:22}}>velox</Text> */}
// </View>

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'black',
    // paddingTop:20,
    justifyContent:'center',
    alignItems:'center',
    // borderWidth:5,
    // borderColor:'red'


  },
});

export default App;
