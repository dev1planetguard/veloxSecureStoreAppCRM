import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SalesLogsScreen from '../../screen/Admin/SalesLoginActivity';
import CustomDrawerContent from './CustomDrawerContent';

// Minimal Admin Dashboard (basic structure)
// import AdminDashboard from '../../screen/admin/AdminDashboard';
// import AdminDashboard from '../../screen/Admin/AdminDashboard.js';
import SalesPersonDetails from '../../screen/Admin/SalesPersonDetails';
import ApproveRequest from '../../screen/Admin/ApproveRequest';
import AdminDashboard from '../../screen/Admin/AdminDashboard';
// import SalesActivity from '../../screen/admin/SalesActivity';

const Drawer = createDrawerNavigator();

export default function AdminDrawer() {
  return (
    <Drawer.Navigator >
      <Drawer.Screen options={{
      title: 'Admin Dashboard', // Displayed title in the header
      headerStyle: {
        backgroundColor: '#000', // Change header background color
      },
      headerTintColor: '#ffffff', // Change header text color
    }}  name="AdminDashboard" component={AdminDashboard} />
      <Drawer.Screen options={{
      title: 'Sales Login Activity', // Displayed title in the header
      headerStyle: {
        backgroundColor: '#000', // Change header background color
      },
      headerTintColor: '#ffffff', // Change header text color
    }}  name="Sales_Login_activity" component={SalesLogsScreen} />
    {/* <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} /> }> */}
      {/* <Drawer.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={{ headerShown: false }}
      /> */}
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