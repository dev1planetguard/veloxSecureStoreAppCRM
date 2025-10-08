import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DailyCheckIn from '../../components/moduleBased/login/DailyCheckin';
import TabBar from '../../components/reusable/TabBar';
import WalkinHistory from './WalkinHistory';
import ScheduledMeetingsList from './ScheduledMeetingsList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hp } from '../../utils/responsive';
import { requestLocationPermissions } from '../../service/Back_ground_location';
import { startForegroundTracking } from '../../service/Fore_Ground_location';
import { locationTracking } from '../../api/apiFunctions/User_Sales_exe/LocationTrackingApi';

const SalesDashboard = () => {
  const [hasCheckedInToday, setHasCheckedInToday] = useState()
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [{name:'Scheduled meetings',icon:'clock'}, {name:'Walked-In history',icon:'map-pin'}];

  useEffect(() => {
    console.log('Checking token for n');
    // InteractionManager.runAfterInteractions(() => {
    (async () => {
      console.log('Checking token for login');
      const token = await AsyncStorage.getItem('jwtToken');
      console.log('ppppp', token);

      // if (!token) return;

      try {
        const granted = await requestLocationPermissions();
        console.log('permission', granted);

        if (granted) {
          // Start foreground tracking (live updates)
          startForegroundTracking(coords => trackLocation(coords));

          // Optional: start 15-min background fetch
          // initBackgroundFetch();
        } else {
          console.warn('Location permission denied');
        }
      } catch (err) {
        console.warn('Permission request failed:', err);
      }
    })();
    // });
  }, []);

  const trackLocation = async (coords) => {

    const userId = await AsyncStorage.getItem('userId');
    await locationTracking(userId, coords.latitude, coords.longitude);

  }



  const renderTabContent = (index) => {
    switch (activeTab) {
      case 0:
        return <ScheduledMeetingsList />;
      case 1:
        return <WalkinHistory />;

      default:
        return <Text style={styles.text}>Unknown Tab</Text>;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      {/* <View style={{backgroundColor: '#0f172a' }}> */}
        <View style={{bottom:hp(7)}}>
        <TabBar
          tabs={tabs}
          activeIndex={activeTab}
          onTabPress={setActiveTab}
        />
        </View>
        {/* <View style={{backgroundColor:'red'}}> */}
          {renderTabContent()}
          {/* </View> */}
        {/* </View> */}
        {/* {renderTabContent()} */}
      {/* </View> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  logoutButton: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: '#E63946',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default SalesDashboard