// import React, { useLayoutEffect, useState } from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import SalesDashboard from '../../screen/SalesDashboard';
// import DailyCheckIn from '../../components/moduleBased/login/DailyCheckin';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ActivityIndicator, View } from 'react-native';
// import SalesLogsScreen from '../../screen/Admin/SalesLoginActivity';
// import Profile from '../../screen/Sales/Profile';
// import SalesRepDashboard from '../../screen/Sales/SalesrepDash';

// const Drawer = createDrawerNavigator();

// export default function SalesDrawer() {
//   const [hasCheckedInToday, setHasCheckedInToday] = useState(null); // null = still loading

//   useLayoutEffect(() => {
//     const checkDailyCheckin = async () => {
//       try {
//         const isCheckin = await AsyncStorage.getItem('IS_DAILY_CHECKIN');
//         console.log('IS_DAILY_CHECKIN:', isCheckin);
//         setHasCheckedInToday(isCheckin === 'true'); // store as boolean
//       } catch (e) {
//         console.log('Error reading AsyncStorage:', e);
//         setHasCheckedInToday(false);
//       }
//     };

//     checkDailyCheckin();
//   }, []);

//   if (hasCheckedInToday === null) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (!hasCheckedInToday) {
//     return (
//       <DailyCheckIn
//         header="Daily Check-In"
//         header2="Complete your daily check-in to access the dashboard"
//         onComplete={()=>setHasCheckedInToday(!hasCheckedInToday)}
//       />
//     );
//   }

//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen options={{
//       title: 'Sales Overview',
//       headerStyle: {
//         backgroundColor: '#000', 
//       },
//       headerTintColor: '#ffffff', 
//     }}  name="SalesDashboard" component={SalesDashboard} />
//     <Drawer.Screen name='Profile' component={Profile} />
//     <Drawer.Screen name='SalesRepDash' component={SalesRepDashboard}/>
//     </Drawer.Navigator>
//   );
// }

///////////

import React, { useLayoutEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SalesDashboard from '../../screen/SalesDashboard';
import DailyCheckIn from '../../components/moduleBased/login/DailyCheckin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import SalesLogsScreen from '../../screen/Admin/SalesLoginActivity';
import Profile from '../../screen/Sales/Profile';
import SalesRepDashboard from '../../screen/Sales/SalesrepDash';
import MeetingMinutesForm from '../../screen/Sales/MeetingMinutesForm'; // Import MeetingMinutesForm

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Create a Stack Navigator for Sales screens
function SalesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SalesDashboard" component={SalesDashboard} />
      <Stack.Screen name="MeetingMinutesForm" component={MeetingMinutesForm} />
       <Stack.Screen name="SalesRepDash" component={SalesRepDashboard} />
    </Stack.Navigator>
  );
}

export default function SalesDrawer() {
  const [hasCheckedInToday, setHasCheckedInToday] = useState(null); // null = still loading

  useLayoutEffect(() => {
    const checkDailyCheckin = async () => {
      try {
        const isCheckin = await AsyncStorage.getItem('IS_DAILY_CHECKIN');
        console.log('IS_DAILY_CHECKIN:', isCheckin);
        setHasCheckedInToday(isCheckin === 'true'); // store as boolean
      } catch (e) {
        console.log('Error reading AsyncStorage:', e);
        setHasCheckedInToday(false);
      }
    };

    checkDailyCheckin();
  }, []);

  if (hasCheckedInToday === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!hasCheckedInToday) {
    return (
      <DailyCheckIn
        header="Daily Check-In"
        header2="Complete your daily check-in to access the dashboard"
        onComplete={() => setHasCheckedInToday(!hasCheckedInToday)}
      />
    );
  }

  return (
    <Drawer.Navigator>
      <Drawer.Screen 
        name="SalesStack" 
        component={SalesStack}
        options={{
          title: 'Sales Overview',
          headerStyle: {
            backgroundColor: '#000', 
          },
          headerTintColor: '#ffffff', 
        }}
      />
      <Drawer.Screen name='Profile' component={Profile} />
      <Drawer.Screen name='SalesRepDash' component={SalesRepDashboard}/>
    </Drawer.Navigator>
  );
}
