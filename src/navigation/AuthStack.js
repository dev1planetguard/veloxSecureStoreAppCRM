import { View, Text } from 'react-native'
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import LoginScreen from '../screen/login/Login';
import SplashScreen from '../screen/SplashScreen';
import { CreateAccount } from '../screen/login/CreateAccount';
import TermsOfService from '../screen/login/TermsofService';
import PrivacyPolicy from '../screen/login/PrivacyPolicy';
import ForgotPasswordScreen from '../screen/ForgetPasswordScreen';
// import CreateAccount  from '../screen/login/CreateAccount';
const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
     <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen
      name="Splash"
      component={SplashScreen}
      options={{ headerShown: false }}
    />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={CreateAccount} options={{ headerShown: false }} />
      <Stack.Screen name="TermsOfService" component={TermsOfService} options={{ headerShown: false }} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default AuthStack