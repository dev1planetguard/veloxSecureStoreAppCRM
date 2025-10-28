// import React, { useEffect, useState } from 'react';
// import { ScrollView, View, StyleSheet, FlatList } from 'react-native';
// import CardWithActions from '../../components/reusable/CardWithActions';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getWalkinHistory } from '../../api/apiFunctions/User_Sales_exe/SalesDetails';



// const WalkinHistory = () => {
//     const[history,setHistory]= useState([])


// useEffect(()=>
//     {
// const getHistory = async () => {
//     try {
//       const id = await AsyncStorage.getItem('userId');
// const res = await getWalkinHistory(id)
//     console.log('historyyyyy',res);
//     setHistory(res.data)
    
//     } catch (e) {
//       console.log('Error reading AsyncStorage:', e);
//     }
//   };
//   getHistory()
// },[])



//   return (
//     <View style={styles.screen}>
//      <FlatList
//   data={history}
//   keyExtractor={(_, index) => index.toString()}
//   contentContainerStyle={{ padding: 10 }}
//   renderItem={({ item }) => {
//     return (
//       <CardWithActions 
//         companyName={item.companyName} 
//         date={item.time}
//         contactPerson={item.firstName}
//         contactPersonmail={item.contactEmail}
//         productInterested={item.productName}
//         address={item.address}
//       />
//     );
//   }}
// />
//     </View>
//   );
// };

// export default WalkinHistory;

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     // backgroundColor: '#121212',
//   },
// });


import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SectionList, Text,Modal, TouchableOpacity } from 'react-native';
import CardWithActions from '../../components/reusable/CardWithActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWalkinHistory } from '../../api/apiFunctions/User_Sales_exe/SalesDetails';
import Feather from '@react-native-vector-icons/feather';
import { hp, wp } from '../../utils/responsive';
import MeetingMinutesForm from './MeetingMinutesForm';
import SkeletonCard from '../../components/skeleton/Skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import Dropdown from '../../components/reusable/Dropdown';
import { API_BASE_URL } from '../../api/AxiosInterceptor';
import { showToast } from '../../components/reusable/Toast';

const WalkinHistory = () => {
  const [history, setHistory] = useState([]);
  const [ payment,setPayment] = useState(false)
  const[loading,setLoading] = useState(false)
  const [click,setClick] = useState('')
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
    const [selectedMeetingIdx, setSelectedMeetingIdx] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
      const [showDatePicker, setShowDatePicker] = useState(false);
      const [showTimePicker, setShowTimePicker] = useState(false);
      const [selectedMode, setSelectedMode] = useState('In Person');
      const [rawHistory,setRawHistory] = useState()
       const [stages, setStages] = useState();
       const [stage,setStage] = useState()
       const [location,setLocation] = useState('')

useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        const [
          // pRes, cRes, 
          sRes] = await Promise.all([
          // fetch(`${API_BASE_URL}/product/productNames`, { headers: { Authorization: token ? `Bearer ${token}` : '' } }),
          // fetch(`${API_BASE_URL}/customers/companynames`, { headers: { Authorization: token ? `Bearer ${token}` : '' } }),
          fetch(`${API_BASE_URL}/saleStage/getSaleStageListing`, { headers: { Authorization: token ? `Bearer ${token}` : '' } }),
        ]);
        // const j0 = await pRes.json();
        // const j1 = await cRes.json();
        const j2 = await sRes.json();
        // if (j0.statusCode === 200) setProducts(j0.data);
        // if (j1.statusCode === 200) setCompanies(j1.data);
        if (j2.statusCode === 200) setStages(j2.data);
        console.log('stagesss',j2.data);
        
      } catch {
        Alert.alert('Error', 'Failed loading form data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const getHistory = async () => {
      setLoading(!loading)
      try {

        const id = await AsyncStorage.getItem('userId');
        const res = await getWalkinHistory(id);

        // Group by date
        // setRawHistory(res.data)   
        const groupedData = res.data.reduce((acc, item) => {
          // format date: "2025-09-19T10:20:00" -> "19 Sep 2025"
          const dateObj = new Date(item.time);
          const dateStr = dateObj.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });

          if (!acc[dateStr]) acc[dateStr] = [];
          acc[dateStr].push(item);
          return acc;
        }, {});

        // Convert to SectionList format
        const sections = Object.keys(groupedData).map((date) => ({
          title: date,
          data: groupedData[date],
        }));

        // Sort sections by date (latest first)
        sections.sort(
          (a, b) =>
            new Date(b.data[0].time).getTime() - new Date(a.data[0].time).getTime()
        );
        setHistory(sections);
        setLoading(false)
      } catch (e) {
        setLoading(false)
        console.log('Error reading AsyncStorage:', e);
      }
    };
    getHistory();
  }, []);

  const handleDateChange = (event, date) => {
    if (date) setSelectedDate(date);
    setShowDatePicker(false);
  };

    const onCompanySelect = async (c) => {
    // setCompany(c);
    // setCompanySearch(c);
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const res = await fetch(
        `${API_BASE_URL}/customers/getCompanyDetails?companyName=${encodeURIComponent(c)}`,
        { headers: { Authorization: token ? `Bearer ${token}` : '' } }
      );
      const j = await res.json();
      if (j.statusCode === 200 && j.data.length) {
        setLocation(j.data[0].address);
      }
    } catch {
      // ignore
    }
  };

  const handleTimeChange = (event, date) => {
    if (date) setSelectedDate(date);
    setShowTimePicker(false);
  };

   const handleScheduleFunction = async () => {
    console.log('in schedule func');
    
    if (!selectedDate || !selectedMode) {
      showToast('Please select date, time, and mode',3000)
      // Alert.alert('Validation', 'Please select date, time, and mode');
      return;
    }

    const mt = rawHistory;
    console.log('in schedule func2',mt);
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

    // customerName: company,
    //     stageName: stage,
    //     scheduledTime: formatDateTime(date),
    //     meetingMode: mode,
    //     ...(mode.toLowerCase() !== 'virtual' && { location }),
    //     notes,
    //     productName: product,
      
      const payload = {
         customerName: mt.companyName,
        stageName: stage,
        scheduledTime: scheduledDateTime,
        meetingMode: selectedMode,
        ...(selectedMode.toLowerCase() !== 'virtual' && { location }),
        // notes,
        productName: 'PlanetGuard Personal'
        //  mt.productName,
        // scheduledTime: scheduledDateTime,
        // meetingMode: selectedMode,
        // meetingName: mt.meetingName,  // fetched, do not change
      };
  console.log('in schedule func3');
      // ======= CHANGED ENDPOINT TO reScheduleMeeting =======
      const res = await fetch(
        `${API_BASE_URL}/meetings/schedule`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      console.log('in schedule func4',res);
      
      const json = await res.json();
      console.log('in schedule func5',json);
      // Alert.alert('Server Responseeee', json.message); // <-- Show response from API
      if (json.statusCode === 200) {
        // setMeetings((prev) => {
        //   const updated = [...prev];
        //   updated[selectedMeetingIdx] = {
        //     ...updated[selectedMeetingIdx],
        //     scheduledTime: scheduledDateTime,
        //     meetingMode: selectedMode,
        //   };
        //   return updated;
        // });
        setScheduleModalVisible(false);
        setSelectedMeetingIdx(null);
        showToast('Meeting Scheduled successfully!',3000)
      }else{
        showToast(json.message,3000)
         setScheduleModalVisible(false);
      }
    } 
    catch (err) {
      showToast('Could not schedule meeting',3000)
      // Alert.alert('Network Error', 'Could not schedule meeting');
    }
  };

const handleSchedule = async  (item) => {
  console.log('iddddd',item);
  setRawHistory(item)
  setScheduleModalVisible(!scheduleModalVisible)
  // await onCompanySelect(item.companyName)
  // setSelectedMeetingIdx('');  // Save index to update correct meeting
      
}

  const handleAction = (item) => {
    if(item[0]=='Payment link'){
      setPayment(!payment)
      setClick('Payment')
    }else{
      setPayment(!payment)
      setClick('Proposal')
    }


  }

 if(payment){
    return (
    <SafeAreaView style={{flex:1}}>
    <MeetingMinutesForm action={click} onClose={setPayment}/>
    </SafeAreaView>)
  }

  return (
    <View style={styles.screen}>
{loading ? (
        <View style={{ padding: 12 }}>{
          [...Array(5)].map((_, index) => (
        <View style={{top:hp(7),marginBottom:hp(2)}}>
          <SkeletonCard height={19} key={index} />
          </View>
        ))}
        </View>
      ) : history.length > 0 ? (
        <SectionList
        key={(_, index) => index.toString()}
        sections={history}
        keyExtractor={(_, index) => index.toString()}
        renderSectionHeader={({ section: { title } }) => (<View style={{flexDirection:'row',alignItems:'center',left:wp(2)}}>
           <Feather name="calendar" size={14} color='#fff' />
          <Text style={styles.dateHeader}>{title}</Text>
          </View>
        )}
        renderItem={({ item,index }) => (
          <CardWithActions
            companyName={item.companyName}
            date={item.time}
            contactPerson={item.firstName}
            contactPersonmail={item.contactEmail}
            productInterested={item.productName}
            address={item.address}
            handleClick={(...items)=>handleAction(items)
            }
            handleSchedule={()=>handleSchedule(item)}
          />
        )}
        contentContainerStyle={{ padding: 10 }}
      />
      ) : (
        <Text style={{ color: '#94a3b8', textAlign: 'center', marginTop: 20 }}>No History found</Text>
      )}


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
<View style={{width: wp(60),}}>
<Dropdown
                            txt="#fff"
                            bg='#222b3a'
                            options={stages}
                            selected={stage}
                            placeholder={'Select Stage'}
                            onSelect={(value) => setStage(value)}
                        />
</View>
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
              onPress={()=>handleScheduleFunction()}
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

      {/* {history.length>0?
       
      :
       [...Array(5)].map((_, index) => (
        <View style={{top:hp(7),marginBottom:hp(2)}}>
          <SkeletonCard key={index} />
          </View>
        ))} */}
     
    </View>
  );
};

export default WalkinHistory;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // bottom:hp(6)
    top:hp(2)
    // backgroundColor: '#121212', // dark theme
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 8,
    marginLeft: 5,
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
    width: wp(60),
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

