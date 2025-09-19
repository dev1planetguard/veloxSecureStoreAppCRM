// import { View, Text, ActivityIndicator } from 'react-native'
// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AuthStack from './AuthStack';
// import SalesDrawer from './drawers/SalesDrawer';
// import AdminDrawer from './drawers/AdminDrawer';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import SplashScreen from '../screen/SplashScreen';
// const Stack = createNativeStackNavigator();

// const RootNavigator = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [roleType, setRoleType] = useState(null);

//     useEffect(() => {
//         const checkAuth = async () => {
//             const token = await AsyncStorage.getItem('jwtToken');
//             const role = await AsyncStorage.getItem('roleType');

//             if (token && role) {
//                 setRoleType(role);
//             }

//             setIsLoading(false);
//         };

//         checkAuth();
//     }, []);

//     if (isLoading) {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
//                 <ActivityIndicator size="large" />
//             </View>
//         );
//     }
// const Stack = createNativeStackNavigator();
//     return (
//         // <NavigationContainer>
//         //     {roleType === 'Admin' ? (
//         //         <AdminDrawer />
//         //     ) : roleType === 'Sales' ? (
//         //         <SalesDrawer />
//         //         // <SplashScreen/>
//         //     )  : (
//         //         <AuthStack />
//         //     )}
//         // </NavigationContainer>


//  <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="SplashScreen" component={AuthStack} />
//         <Stack.Screen name="SalesDashboard" component={SalesDrawer} />
//         <Stack.Screen name="AdminDashboard" component={AdminDrawer} />
//       </Stack.Navigator>
//     </NavigationContainer>
//     )
// }

// export default RootNavigator


//////new code

import React, { useEffect, useState, createContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthStack from './AuthStack';
import SalesDrawer from './drawers/SalesDrawer';
import AdminDrawer from './drawers/AdminDrawer';
import SplashScreen from '../screen/SplashScreen';

export const AuthContext = createContext();

const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [roleType, setRoleType] = useState(null);


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        const role = await AsyncStorage.getItem('roleType');
        if (token && role) {
          setRoleType(role);
        } else {
          setRoleType(null);
        }
      } catch (err) {
        console.log('Auth check error:', err);
        setRoleType(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

 if (isLoading) {return <SplashScreen />}

  // logout function
  const logout = async () => {
    await AsyncStorage.removeItem('jwtToken');
    await AsyncStorage.removeItem('roleType');
    setRoleType(null); 
  };

  return (
    <AuthContext.Provider value={{ roleType, setRoleType, logout }}>
      <NavigationContainer>
        {roleType === 'Admin' ? (
          <AdminDrawer />
        ) : roleType === 'Sales' ? (
          <SalesDrawer />
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default RootNavigator;
