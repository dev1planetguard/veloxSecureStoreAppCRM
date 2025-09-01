import { View, Text } from 'react-native'
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import LoginScreen from '../screen/LoginScreen';
import SplashScreen from '../screen/SplashScreen';
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
    </Stack.Navigator>
  )
}

export default AuthStack