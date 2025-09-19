

/////////new code

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screen/login/Login';
import SplashScreen from '../screen/SplashScreen';
import { CreateAccount } from '../screen/login/CreateAccount';
import TermsOfService from '../screen/login/TermsofService';
import PrivacyPolicy from '../screen/login/PrivacyPolicy';
import SalesDashboard from '../screen/SalesDashboard';
import SalesDrawer from './drawers/SalesDrawer';
import AdminDrawer from './drawers/AdminDrawer';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SalesDrawer" component={SalesDrawer} />    
      <Stack.Screen name='AdminDrawer' component={AdminDrawer}/>

      <Stack.Screen name="SalesDashboard" component={SalesDashboard} />
      <Stack.Screen name="Register" component={CreateAccount} />
      <Stack.Screen name="TermsOfService" component={TermsOfService} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />

    </Stack.Navigator>
  );
};

export default AuthStack;
