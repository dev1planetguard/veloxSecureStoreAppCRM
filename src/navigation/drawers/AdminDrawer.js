import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SalesLogsScreen from '../../screen/Admin/SalesLoginActivity';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import CustomDrawer from '../../components/reusable/CustomAppDrawer';

// Minimal Admin Dashboard (basic structure)
// import AdminDashboard from '../../screen/admin/AdminDashboard';
// import AdminDashboard from '../../screen/Admin/AdminDashboard.js';
import SalesPersonDetails from '../../screen/Admin/SalesPersonDetails';
import ApproveRequest from '../../screen/Admin/ApproveRequest';
import AdminDashboard from '../../screen/Admin/AdminDashboard';
import SalesActivity from '../../screen/Admin/SalesActivity';
import UserListScreen from '../../screen/Admin/UserListScreen';
import SalesLogsScreenDetail from '../../screen/Admin/SalesDailyLoginActivityDetails';

const Drawer = createDrawerNavigator();

export default function AdminDrawer() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove([
        'jwtToken',
        'roleType',
        'userId',
        'IS_DAILY_CHECKIN',
      ]);
    } catch (e) {
      // noop
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'SplashScreen' }],
    });
  };

  // Minimal admin details placeholder to avoid null access in CustomDrawer
  const adminDetails = { firstName: 'Admin', lastName: '', email: '' };

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer details={adminDetails} onpress={handleLogout} {...props} />
      )}
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        drawerStyle: { backgroundColor: '#0f172a' },
        drawerActiveTintColor: '#2563eb',
        drawerInactiveTintColor: '#ccc',
      }}
    >
      <Drawer.Screen options={{
      headerShown: false
    }}  name="AdminDashboard" component={AdminDashboard} />
      <Drawer.Screen options={{
      title: 'Sales Login Activity', // Displayed title in the header
      headerStyle: {
        backgroundColor: '#000', // Change header background color
      },
      headerTintColor: '#ffffff', // Change header text color
    }}  name="Sales_Login_activity" component={SalesLogsScreen} />
      <Drawer.Screen
        name="UserList"
        component={UserListScreen}
        options={{ headerShown:false}}
      />
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
      <Drawer.Screen
        name="SalesActivity"
        component={SalesActivity}
        options={{ headerShown: false, drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="SalesLogsScreenDetail"
        component={SalesLogsScreenDetail}
        options={{ headerShown: false, drawerItemStyle: { display: 'none' } }}
      />

      
    </Drawer.Navigator>
  );
}