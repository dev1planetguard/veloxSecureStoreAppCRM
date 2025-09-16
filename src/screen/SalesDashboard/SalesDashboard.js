import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DailyCheckIn from '../../components/moduleBased/login/DailyCheckin';
import TabBar from '../../components/reusable/TabBar';
import WalkinHistory from './WalkinHistory';

const SalesDashboard = () => {
  const [hasCheckedInToday,setHasCheckedInToday]= useState()
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Schedule meetings','Walkin-In'];


    const navigation = useNavigation();
useLayoutEffect(() => {
  const checkDailyCheckin = async () => {
    try {
      const isCheckin = await AsyncStorage.getItem('IS_DAILY_CHECKIN');
      console.log('IS_DAILY_CHECKIN:', isCheckin); // use or store this value
      setHasCheckedInToday(isCheckin)
    } catch (e) {
      console.log('Error reading AsyncStorage:', e);
    }
  };
  checkDailyCheckin();
}, []);

if (hasCheckedInToday=='false') {
     return (<DailyCheckIn header={'Daily Check-In'} header2={'Complete your daily check-in to access the dashboard'} 
    // onComplete={handleCheckInComplete} 
    />)
   }


     const renderTabContent = (index) => {
    switch(activeTab) {
      case 0:
        return <Text style={{color:'white'}}>Welcome to Home</Text>;
      case 1:
        return <WalkinHistory/>;
      case 2:
        return <Text style={styles.text}>Adjust your Settings</Text>;
      default:
        return <Text style={styles.text}>Unknown Tab</Text>;
    }
  };

  return (
    <View style={{flex:1,backgroundColor:'#000'}}>
       <TabBar
        tabs={tabs} 
        activeIndex={activeTab} 
        onTabPress={setActiveTab} 
      />
{renderTabContent()}

    </View>
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