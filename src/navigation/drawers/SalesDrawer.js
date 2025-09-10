import React, { useLayoutEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SalesDashboard from '../../screen/SalesDashboard';
import DailyCheckIn from '../../components/moduleBased/login/DailyCheckin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

const Drawer = createDrawerNavigator();

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
        onComplete={()=>setHasCheckedInToday(!hasCheckedInToday)}
      />
    );
  }

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="SalesDashboard" component={SalesDashboard} />
    </Drawer.Navigator>
  );
}
