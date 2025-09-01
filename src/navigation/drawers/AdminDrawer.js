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

const Drawer = createDrawerNavigator();

export default function AdminDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="AdminDashboard" component={AdminDashboard} />
    </Drawer.Navigator>
  );
}