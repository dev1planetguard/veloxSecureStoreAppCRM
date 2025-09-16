import React, { useLayoutEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SalesDashboard from '../../screen/SalesDashboard/SalesDashboard';
import DailyCheckIn from '../../components/moduleBased/login/DailyCheckin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import CustomDrawer from '../../components/reusable/CustomAppDrawer';
import { useNavigation } from '@react-navigation/native';
import { getUserDetails } from '../../api/apiFunctions/User_Sales_exe/UserDetails';

const Drawer = createDrawerNavigator();

export default function SalesDrawer() {
  const [hasCheckedInToday, setHasCheckedInToday] = useState(null); // null = still loading
  const [hasCheckedOutToday, setHasCheckedOutToday] = useState(false);
  const [userDetails,setUserDetails] = useState()
const navigation = useNavigation()

  useLayoutEffect(() => {
    const checkDailyCheckin = async () => {
      try {
        const isCheckin = await AsyncStorage.getItem('IS_DAILY_CHECKIN');
        const details = await getUserDetails()
         console.log('profile detailsss', details);
         setUserDetails(details)
        console.log('IS_DAILY_CHECKIN:', isCheckin);
        setHasCheckedInToday(isCheckin === 'true'); // store as boolean
      } catch (e) {
        console.log('Error reading AsyncStorage:', e);
        setHasCheckedInToday(false);
      }
    };

    checkDailyCheckin();
  }, []);

 const onLogOut = () => {
    // setHasCheckedOutToday(true)
    console.log('logouttt on logout');
    
    navigation.navigate('SplashScreen')
  }

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
  }else if(hasCheckedOutToday==true){
    return <DailyCheckIn
          header="Daily Check-Out"
          header2="Complete your daily check-out to end your shift"
          button='Complete Check-out'
          onComplete={() => onLogOut()}
        />
  }

 

  return (
     <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer details={userDetails.data} onpress={()=>setHasCheckedOutToday(true)} {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        drawerStyle: { backgroundColor: '#1A1A1A' }, // Dark theme for drawer
        drawerActiveTintColor: '#FFA500', // Active item color
        drawerInactiveTintColor: '#ccc', // Inactive item color
      }}
    >
      <Drawer.Screen options={{
      title: 'Sales Overview', // Displayed title in the header
      headerStyle: {
        backgroundColor: '#000', // Change header background color
      },
      headerTintColor: '#ffffff', // Change header text color
    }}  name="SalesDashboard" component={SalesDashboard} />
    </Drawer.Navigator>
  );
}
