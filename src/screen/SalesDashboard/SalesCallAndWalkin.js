import React, { useEffect, useState } from 'react';
import {

  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { wp, hp } from '../utils/responsive'; // new responsive helpers


// import your actual workflow components
// import OnCallWorkflowProps from './OnCallWorkflowProps';
// import OnCallWorkflow from './OnCallWorkflowbkk';
// import WalkInWorkflow from './WalkInWorkflow';
// import ScheduleMeetingScreen from './ScheduleMeetingScreen';
import { hp, responsiveFontSize, wp } from '../../utils/responsive';
import OnCallWorkflowProps from './OnCallWorkflowProps';
import WalkIn from '../salesrep/WalkIn';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@react-native-vector-icons/feather';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/reusable/Header';

export default function SalesRepDashboard() {
  const [activeTab, setActiveTab] = useState('on-call');
  const [userName, setUsername] = useState('');
  const [time, setTime] = useState(new Date());
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const navigation = useNavigation()

  useEffect(() => {
    const loadUsername = async () => {
      try {
        const stored = await AsyncStorage.getItem('username');
        if (stored) setUsername(stored);
      } catch (e) {
        console.warn('Failed to load username', e);
      }
    };
    loadUsername();
  }, []);

  useEffect(() => {
    const checkLastCheckIn = async () => {
      const last = await AsyncStorage.getItem('lastCheckIn');
      const today = new Date().toDateString();
      if (last === today) {
        setHasCheckedInToday(true);
      }
    };
    checkLastCheckIn();

    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckInComplete = async () => {
    
    const today = new Date().toDateString();
    await AsyncStorage.setItem('lastCheckIn', today);
    setHasCheckedInToday(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'on-call':
        return <OnCallWorkflowProps />;
      case 'walk-in':
        return <WalkIn />;
    //   case 'schedule':
    //     return <ScheduleMeetingScreen />;
    //   default:
    //     return <OnCallWorkflow />;
    }
  };

  const tabs = [
    { id: 'on-call', label: 'On-Call' },
    { id: 'walk-in', label: 'Walk-In' },
    // { id: 'schedule', label: 'Schedule' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <View style={styles.userInfo}>
          <Feather onPress={()=>navigation.openDrawer()} size={responsiveFontSize(20)} color={'white'} name='menu'/>
          {/* <View style={styles.avatar} /> */}
          {/* <View>
            <Text style={styles.title}>Sales Dashboard</Text>
            <Text style={styles.subtitle}>Welcome back, {userName}</Text>
          </View>
        </View>
      </View> */} 
       <Header title="Engagements" onMenuPress={() => navigation.openDrawer()} />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map(tab => {
          const selected = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabButton, selected && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab.id)}>
              <Text
                style={[styles.tabLabel, selected && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Content */}
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(4),
    backgroundColor: '#1e293b',
  },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap:wp(5) },
  avatar: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2),
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
    gap:wp(10)
  },
  title: {
    color: '#fff',
    fontSize: wp(4.5),
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: wp(3),
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    paddingVertical: hp(1),
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: hp(1.8),
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#2563eb',
  },
  tabLabel: {
    color: '#888',
    fontSize: wp(3.5),
  },
  tabLabelActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
