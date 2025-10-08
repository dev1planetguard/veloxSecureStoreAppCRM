import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { API_BASE_URL } from '../configurl';
//import { useNavigation, useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DrawerActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from '@react-native-vector-icons/feather';
import { hp, responsiveFontSize } from '../../utils/responsive';
import ToastMessage, { showToast } from '../../components/reusable/Toast';
import SkeletonCard from '../../components/skeleton/Skeleton';
// import DailyCheckIn from './DailyCheckIn';

export default function ScheduledMeetingsList() {
  const navigation = useNavigation();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasCheckedInToday,setHasCheckedInToday]= useState('false')

  // ------------- MODAL STATE ADDED -------------
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [selectedMeetingIdx, setSelectedMeetingIdx] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedMode, setSelectedMode] = useState('In Person');
  // ---------------------------------------------
// useLayoutEffect(() => {
//   const checkDailyCheckin = async () => {
//     try {
//       const isCheckin = await AsyncStorage.getItem('IS_DAILY_CHECKIN');
//       console.log('IS_DAILY_CHECKIN:', isCheckin); // use or store this value
//       setHasCheckedInToday(isCheckin)
//     } catch (e) {
//       console.log('Error reading AsyncStorage:', e);
//     }
//   };

//   checkDailyCheckin();
// }, []);
  // Fetch meetings (unchanged)
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      (async () => {
        try {
                console.log('all meeting details : ');
          setLoading(true);
          const token = await AsyncStorage.getItem('jwtToken');
          const res = await fetch(`http://192.168.0.204:9191/api/v1/meetings/allMeetingDetails`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const json = await res.json();
          console.log('all meeting details : ',json);

          if (isActive) {
            if (json.statusCode === 200 && Array.isArray(json.data)) {
              setMeetings(json.data);
            } else {
              showToast(`${json.message}`,3000);
              // Alert.alert('Error', json.message || 'Failed to load meetings');
            }
          }
        } catch (err) {
          if (isActive) {
            showToast(`Could not fetch meetings`,3000);
            // Alert.alert('Network Error', 'Could not fetch meetings');
          }
        } finally {
          if (isActive) setLoading(false);
        }
      })();
      return () => {
        isActive = false;
      };
    }, [])
  );

  // ------------ SCHEDULING HANDLER ---------------
  const openScheduleModal = (idx) => {
    setSelectedMeetingIdx(idx);
    setSelectedDate(new Date());
    setSelectedMode('In Person');
    setScheduleModalVisible(true);
  };

  const handleDateChange = (event, date) => {
    if (date) setSelectedDate(date);
    setShowDatePicker(false);
  };

  const handleTimeChange = (event, date) => {
    if (date) setSelectedDate(date);
    setShowTimePicker(false);
  };

  // const handleSchedule = async () => {
  //   if (!selectedDate || !selectedMode) {
  //     Alert.alert('Validation', 'Please select date, time, and mode');
  //     return;
  //   }
  //   const mt = meetings[selectedMeetingIdx];
  //   try {
  //     const token = await AsyncStorage.getItem('jwtToken');
  //     // Compose datetime string as required by backend
  //     const yyyy = selectedDate.getFullYear();
  //     const MM = String(selectedDate.getMonth() + 1).padStart(2, '0');
  //     const dd = String(selectedDate.getDate()).padStart(2, '0');
  //     const hh = String(selectedDate.getHours()).padStart(2, '0');
  //     const mm = String(selectedDate.getMinutes()).padStart(2, '0');
  //     const ss = String(selectedDate.getSeconds()).padStart(2, '0');
  //     const scheduledDateTime = `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
  //     const payload = {
  //       meetingId: mt.id,
  //       scheduledTime: scheduledDateTime,
  //       meetingMode: selectedMode,
  //     };

  //     const res = await fetch(
  //       '${API_BASE_URL}/meetings/scheduleNextStage',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(payload),
  //       }
  //     );
  //     const json = await res.json();
  //     if (json.statusCode === 200) {
  //       // ------------------ UPDATE STATE LOCALLY ------------------
  //       setMeetings((prev) => {
  //         const updated = [...prev];
  //         updated[selectedMeetingIdx] = {
  //           ...updated[selectedMeetingIdx],
  //           scheduledTime: scheduledDateTime,
  //           mode: selectedMode,
  //         };
  //         return updated;
  //       });
  //       setScheduleModalVisible(false);
  //       setSelectedMeetingIdx(null);
  //     } else {
  //       Alert.alert('Error', json.message || 'Could not schedule meeting');
  //     }
  //   } catch (err) {
  //     Alert.alert('Network Error', 'Could not schedule meeting');
  //   }
  // };
  // -----------------------------------------------------------

  // const handleSchedule = async () => {
  //   if (!selectedDate || !selectedMode) {
  //     Alert.alert('Validation', 'Please select date, time, and mode');
  //     return;
  //   }
  //   const mt = meetings[selectedMeetingIdx];
  //   try {
  //     const token = await AsyncStorage.getItem('jwtToken');
  //     // Compose datetime string as required by backend
  //     const yyyy = selectedDate.getFullYear();
  //     const MM = String(selectedDate.getMonth() + 1).padStart(2, '0');
  //     const dd = String(selectedDate.getDate()).padStart(2, '0');
  //     const hh = String(selectedDate.getHours()).padStart(2, '0');
  //     const mm = String(selectedDate.getMinutes()).padStart(2, '0');
  //     const ss = String(selectedDate.getSeconds()).padStart(2, '0');
  //     const scheduledDateTime = `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
  //     const payload = {
  //       meetingId: mt.id,
  //       scheduledTime: scheduledDateTime,
  //       meetingMode: selectedMode,
  //     };
  
  //     // ------ Updated API endpoint ------
  //     const res = await fetch(
  //       '${API_BASE_URL}/meetings/schedule',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(payload),
  //       }
  //     );
  //     const json = await res.json();
  //     if (json.statusCode === 200) {
  //       setMeetings((prev) => {
  //         const updated = [...prev];
  //         updated[selectedMeetingIdx] = {
  //           ...updated[selectedMeetingIdx],
  //           scheduledTime: scheduledDateTime,
  //           mode: selectedMode,
  //         };
  //         return updated;
  //       });
  //       setScheduleModalVisible(false);
  //       setSelectedMeetingIdx(null);
  //     } else {
  //       Alert.alert('Error', json.message || 'Could not schedule meeting');
  //     }
  //   } catch (err) {
  //     Alert.alert('Network Error', 'Could not schedule meeting');
  //   }
  // };


  const handleSchedule = async () => {
    if (!selectedDate || !selectedMode) {
      showToast('Please select date, time, and mode',3000)
      // Alert.alert('Validation', 'Please select date, time, and mode');
      return;
    }
    const mt = meetings[selectedMeetingIdx];
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      // Compose datetime string as required by backend
      const yyyy = selectedDate.getFullYear();
      const MM = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dd = String(selectedDate.getDate()).padStart(2, '0');
      const hh = String(selectedDate.getHours()).padStart(2, '0');
      const mm = String(selectedDate.getMinutes()).padStart(2, '0');
      const ss = String(selectedDate.getSeconds()).padStart(2, '0');
      const scheduledDateTime = `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
      const payload = {
        scheduledTime: scheduledDateTime,
        meetingMode: selectedMode,
        meetingName: mt.meetingName,  // fetched, do not change
      };
  
      // ======= CHANGED ENDPOINT TO reScheduleMeeting =======
      const res = await fetch(
        `http://192.168.0.204:9191/api/v1/meetings/reScheduleMeeting`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const json = await res.json();
      // Alert.alert('Server Responseeee', json.message); // <-- Show response from API
      if (json.statusCode === 200) {
        setMeetings((prev) => {
          const updated = [...prev];
          updated[selectedMeetingIdx] = {
            ...updated[selectedMeetingIdx],
            scheduledTime: scheduledDateTime,
            meetingMode: selectedMode,
          };
          return updated;
        });
        setScheduleModalVisible(false);
        setSelectedMeetingIdx(null);
      }
    } 
    catch (err) {
      showToast('Could not schedule meeting',3000)
      // Alert.alert('Network Error', 'Could not schedule meeting');
    }
  };
  
  
  
  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        {/* <ActivityIndicator size="large" color="#fff" />
         */}
          <View style={{ padding: 12 }}>
            {[...Array(5)].map((_, index) => (
        <View style={{marginBottom:hp(2)}}>
          <SkeletonCard height={23} key={index} />
          </View>
              ))}
              </View>
      </SafeAreaView>
    );
  }
const handleCheckInComplete = async () => {

    const today = new Date().toDateString();
    console.log('timeeeeeeeeeee',today);
    
    await AsyncStorage.setItem('lastCheckIn', today);
    setHasCheckedInToday(true);
    console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    
  };

//    if ( hasCheckedInToday=='false') {
//     return <DailyCheckIn header={'Daily Check-In'} header2={'Complete your daily check-in to access the dashboard'} onComplete={handleCheckInComplete} />;
//    }

  return (
    <View style={styles.safe}>
      {/* Header */}
      {/* <View style={styles.header}> */}
        {/* <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={styles.menuBtn}
        > */}
         {/* <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          style={styles.menuBtn}
       >
          <Feather name="menu" size={24} color="#fff" />
        </TouchableOpacity> */}
        {/* <View style={styles.header}> */}
        <View style={styles.header}>
        <Feather name="check-square" size={24} color="#fff" />
        <Text style={styles.headerTitle}>Meeting Summary</Text>
        </View>
        {/* </View> */}
      {/* </View> */}

      <ScrollView contentContainerStyle={styles.container}>
        {meetings.map((mt, idx) => {
          const meetingName = mt.meetingName || '–';
          const productName = mt.productName || '–';
          const customerName = mt.customerName || '–';
          const scheduledTime = mt.scheduledTime || '–';
          const stageName = mt.stageName || '–';
          const location = mt.location || '–';
           const productId= mt.productId;
          const meetingId = mt.id;
          const customerId = mt.customerID;
          const latitude = mt.latitude;
          const longitude = mt.longitude;

          console.log('meeting name :',meetingName);

          // --- CONDITIONALLY RENDER BUTTONS ---
          const isToBeScheduled =
            String(scheduledTime).toLowerCase().includes('Pending Schedule');
          return (
            <View key={meetingId} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{meetingName}</Text>
              </View>
              {mt.productName != null && (
                <View style={styles.row}>
                  <Text style={styles.label}>Product:</Text>
                  <Text style={styles.value}>{productName}</Text>
                </View>
              )}
              <View style={styles.row}>
                <Text style={styles.label}>Customer:</Text>
                <Text style={styles.value}>{customerName}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Scheduled:</Text>
                <Text style={[
                  styles.value,
                  isToBeScheduled && { color: '#FFB300', fontWeight: 'bold' }
                ]}>
                  {scheduledTime}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Stage:</Text>
                <Text style={styles.value}>{stageName}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Location:</Text>
                <Text style={styles.value}>{location}</Text>
              </View>
              {/* --- Button based on scheduling status --- */}
              {/* {isToBeScheduled ? (
                <TouchableOpacity
                  style={styles.scheduleBtn}
                  onPress={() => openScheduleModal(idx)}
                > */}

{mt.scheduledTime === 'Pending Schedule' ? (
  <TouchableOpacity
    style={styles.scheduleBtn}
    onPress={() => {
      setSelectedMeetingIdx(idx);  // Save index to update correct meeting
      setScheduleModalVisible(true); // Open modal
    }}
  >
                  <Feather name="calendar" size={18} color="#fff" />
                  <Text style={styles.scheduleBtnText}>Schedule</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.visitBtn}
                  onPress={() =>
                    navigation.navigate('VisitFormScreen', {
                      meetingId,
                      customerId,
                      latitude,
                      longitude,
                      meetingName,
                      productName,
                      productId
                      
                    })  
                  }
                ><Feather name="corner-right-down" size={18} color="#fff" />
                  <Text style={styles.visitText}>Visit</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* ----------------- SCHEDULING MODAL ------------------ */}
      <Modal
        visible={scheduleModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setScheduleModalVisible(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Schedule Next Stage</Text>
            <TouchableOpacity
              style={styles.pickerBtn}
              onPress={() => setShowDatePicker(true)}
            >
              <Feather name="calendar" size={20} color="#2979FF" />
              <Text style={styles.pickerBtnText}>
                {selectedDate.toDateString()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pickerBtn}
              onPress={() => setShowTimePicker(true)}
            >
              <Feather name="clock" size={20} color="#2979FF" />
              <Text style={styles.pickerBtnText}>
                {selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
            {/* Mode Picker */}
            <View style={styles.modePicker}>
              <TouchableOpacity
                style={[
                  styles.modeOption,
                  selectedMode === 'In Person' && styles.selectedMode,
                ]}
                onPress={() => setSelectedMode('In Person')}
              >
                <Text
                  style={[
                    styles.modeOptionText,
                    selectedMode === 'In Person' && styles.selectedModeText,
                  ]}
                >
                  In Person
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modeOption,
                  selectedMode === 'Virtual' && styles.selectedMode,
                ]}
                onPress={() => setSelectedMode('Virtual')}
              >
                <Text
                  style={[
                    styles.modeOptionText,
                    selectedMode === 'Virtual' && styles.selectedModeText,
                  ]}
                >
                  Virtual
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.modalActionBtn}
              onPress={handleSchedule}
            >
              <Text style={styles.modalActionText}>Schedule Meeting</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={() => setScheduleModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            {/* Date/time pickers */}
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={handleDateChange}
              />
            )}
            {showTimePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleTimeChange}
              />
            )}
          </View>
        </View>
      </Modal>
      {/* ----------------------------------------------------- */}
    </View>
  );
}

// Add these styles for the new UI elements
const styles = StyleSheet.create({
  safe: { flex: 1,bottom:hp(5)},
  center: {
    flex: 1,
    backgroundColor: '#0f172a',
    // justifyContent: 'center',
    // alignItems: 'center',
    
       
  },
  header: {
    // height: 56,
    // backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
     marginBottom:hp(1),
     marginTop:hp(0.5)
  },
  // menuBtn: { padding: 8 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600', marginLeft: 8 },
  container: { padding: 16  },
  card: {
    // backgroundColor: '#121212',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingHorizontal: hp(2.5),
    paddingVertical:hp(2),
    marginBottom: hp(3),
    borderLeftWidth: 4,
    borderLeftColor: '#2979FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  cardHeader: {
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    // fontSize: 20,
    fontWeight: '700',
    fontSize:responsiveFontSize(12)
  },
  row: {
    flexDirection: 'row',
    marginBottom: hp(0.5),
  },
  label: {
    color: '#ccc',
    fontWeight: '500',
    width: 110,
    fontSize:responsiveFontSize(9)
  },
  value: {
    color: '#fff',
    flex: 1,
    fontWeight: '400',
    fontSize:responsiveFontSize(9)
  },
  visitBtn: {
    marginTop: 12,
    backgroundColor: '#2979FF',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  visitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 4,
  },
  // ------------ NEW/CHANGED STYLES ------------
  scheduleBtn: {
    marginTop: 12,
    backgroundColor: '#FFB300',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scheduleBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 4,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#181F2B',
    borderRadius: 14,
    padding: 22,
    minWidth: 300,
    maxWidth: 340,
    alignItems: 'center',
    borderWidth:1.5,
    // borderColor:'black'
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 18,
  },
  pickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222b3a',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
    width: 220,
    alignSelf: 'center',
  },
  pickerBtnText: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 12,
    fontWeight: '500',
  },
  modePicker: {
    flexDirection: 'row',
    marginVertical: 14,
    width: 220,
    justifyContent: 'space-between',
  },
  modeOption: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: '#232F46',
  },
  selectedMode: {
    backgroundColor: '#2979FF',
  },
  modeOptionText: {
    color: '#aaa',
    fontWeight: '600',
    fontSize: 15,
  },
  selectedModeText: {
    color: '#fff',
  },
  modalActionBtn: {
    backgroundColor: '#2979FF',
    borderRadius: 8,
    marginTop: 18,
    width: 200,
    alignItems: 'center',
    paddingVertical: 12,
  },
  modalActionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  modalCancelBtn: {
    backgroundColor: '#333',
    borderRadius: 8,
    marginTop: 10,
    width: 200,
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalCancelText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
