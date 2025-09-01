// import { View, Text } from 'react-native'
// import React, { useState } from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import SplashScreen from '../../screen/SplashScreen';
// import LoginScreen from '../../screen/LoginScreen';
// const Drawer = createDrawerNavigator();


// const SalesDrawer = () => {
//   const [hasCheckedOut, setHasCheckedOut] = useState(false);
//   // if (hasCheckedOut) {
//   //   return (
//   //     <View style={{ flex: 1, backgroundColor: '#000' }}>
//   //       <DailyCheckIn
//   //         header="Daily Check-Out"
//   //         header2="Complete your daily check-out to end your shift"
//   //         button="Complete Check-out"
//   //         onComplete={() => setHasCheckedOut(true)}
//   //       />
//   //     </View>
//   //   );
//   // }
//   return (
//     <Drawer.Navigator
//       // drawerContent={(props) => <CustomDrawerContent logout={() => setHasCheckedOut(true)} {...props} />}
//       screenOptions={{
//         headerShown: false,
//         drawerStyle: {
//           backgroundColor: '#1e1e1e',
//           width: 220,
//         },
//         drawerActiveTintColor: '#ffffff',
//         drawerInactiveTintColor: '#ccc',
//         drawerLabelStyle: { fontSize: 16 },
//       }}
//     >
//       <Drawer.Screen name='Login' component={LoginScreen}/>
//       {/* <Drawer.Screen name="Home" component={MeetingDashboard} />
//       <Drawer.Screen name="SalesrepDash" component={SalesRepDashboard} />
//       <Drawer.Screen name="Schedule Meeting" component={ScheduleMeetingScreen} />
//       <Drawer.Screen name="Profile" component={Profile} />
//       <Drawer.Screen name="Add Partner" component={AddPartner} />
//       <Drawer.Screen name="View Partners" component={ViewPartners} />
//       <Drawer.Screen name="View Assigned Products" component={ViewAssignProduct} />
//       <Drawer.Screen name="About us" component={AboutUs} /> */}
//     </Drawer.Navigator>

//   )
// }

// export default SalesDrawer

//////////////

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SalesDashboard from '../../screen/SalesDashboard';
// import CustomDrawerContent from './CustomDrawerContent';


const Drawer = createDrawerNavigator();

export default function SalesDrawer() {
  return (
    // <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
    <Drawer.Navigator>
      <Drawer.Screen name="SalesDashboard" component={SalesDashboard} />
    </Drawer.Navigator>
  );
}