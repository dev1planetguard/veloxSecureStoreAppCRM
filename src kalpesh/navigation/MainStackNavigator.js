// import { View, Text } from 'react-native'
// import React from 'react'

// import LoginScreen from '../screen/LoginScreen';
// import SalesDrawer from '../navigation/drawers/SalesDrawer';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from '../screen/SplashScreen';


// const Stack = createNativeStackNavigator();

// const MainStackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
//       <Stack.Screen name="Splash" component={SplashScreen} />
//       <Stack.Screen name="Login" component={LoginScreen} />
//        {/* Role-based Drawers */}
//       <Stack.Screen name="SalesDrawer" component={SalesDrawer} />
//     </Stack.Navigator>
//   )
// }

// export default MainStackNavigator

import { View, Text } from 'react-native'
import React from 'react'

const MainStackNavigator = () => {
  return (
    <View>
      <Text>MainStackNavigator</Text>
    </View>
  )
}

export default MainStackNavigator