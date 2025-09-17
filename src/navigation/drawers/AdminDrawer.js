// import { View, Text } from 'react-native'
// import React from 'react'

// const AdminDrawer = () => {
//   return (
//     <View>
//       <Text>AdminDrawer</Text>
//     </View>
//   )
// }

// export default AdminDrawer


//////////


import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminDashboard from '../../screen/AdminDashboard';
import SalesPersonDetails from '../../screen/admin/SalesPersonDetails';
import SalesActivity from '../../screen/admin/SalesActivity';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function AdminDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="AdminDashboard" component={AdminDashboard} />
      <Drawer.Screen name="SalesPersonDetails" component={SalesPersonDetails} options={{ headerShown: false }} />
      <Drawer.Screen name="SalesActivity" component={SalesActivity} options={{ drawerItemStyle: { display: 'none' } }} />
    </Drawer.Navigator>
  );
}