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
import CustomDrawerContent from './CustomDrawerContent';

// Minimal Admin Dashboard (basic structure)
import AdminDashboard from '../../screen/admin/AdminDashboard';
// import AdminDashboard from '../../screen/Admin/AdminDashboard.js';
import SalesPersonDetails from '../../screen/admin/SalesPersonDetails';
import ApproveRequest from '../../screen/admin/ApproveRequest';
// import SalesActivity from '../../screen/admin/SalesActivity';

const Drawer = createDrawerNavigator();

export default function AdminDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} /> }>
      
      <Drawer.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="ApproveRequest"
        component={ApproveRequest}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="SalesPersonDetails" component={SalesPersonDetails} options={{ headerShown: false, title: 'Sales Person Details' }} />
      {/** If needed later
      <Drawer.Screen name="SalesActivity" component={SalesActivity} options={{ drawerItemStyle: { display: 'none' } }} />
      */}
    </Drawer.Navigator>
  );
}