import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminDashboard from '../../screen/AdminDashboard';
import SalesLogsScreen from '../../screen/Admin/SalesLoginActivity';

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
    </Drawer.Navigator>
  );
}