

import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
// import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { API_BASE_URL } from '../configurl';
import { fetchTodaysDailyReport } from '../../api/apiFunctions/SalesActivityAdmin/SalesActivityDaily';
import { formatTime, getCoordsFromString, openMap, openMapWithCoords, resolveImageUrl } from '../../utils/UtilityFunction';
import pLimit from 'p-limit';
import { calculateTotalPathDistance } from '../../utils/DistanceCalculation';
import Feather from '@react-native-vector-icons/feather';
import { getSalesLoginActivity } from '../../api/Admin/getSalesLoginDetails';
import SalesPersonCard from '../../components/reusable/SalesPersonsDetailsCard';
import LoginLogoutCard from '../../components/reusable/SalesPersonsLoginoutCard';
import TotalDistanceCard from '../../components/reusable/SalesPersonTotalDistanceCrad';
import DateSelectorCard from '../../components/reusable/SalesPersonsDateSelectorCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/reusable/Header';
import { hp } from '../../utils/responsive';
import { useNavigation, useRoute } from '@react-navigation/native';
import LoginLogoutHistoryCard from '../../components/reusable/SalesPersonshistoryInOutCard';

const IMAGE_BASE_URL = 'http://192.168.0.204:9191/';
// const IMAGE_BASE_URL =  'http://45.118.160.135:9192/';//public

export default function SalesLogsScreenDetail() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
const [search, setSearch] = useState('');
const [searchText, setSearchText] = useState('');
const [filteredData, setFilteredData] = useState([]); // Filtered data
const [currentDate, setCurrentDate] = useState(new Date());
const navigation = useNavigation()
const route = useRoute()
const id = route?.params
const [history,setHistory]= useState()
const [coords,setCoords] = useState()
console.log('idddddddd',id);


const fetchLogs = async () => {
  try {
    const responseData = await getSalesLoginActivity(JSON.stringify(id));
    console.log('Response data:', responseData.data);
setHistory(responseData.data)
const coordinatesArray = buildCoordinatesArray(responseData.data);
setCoords(coordinatesArray)
console.log('coordinates arrayyyyy',coordinatesArray);
    // setData(responseData.data || []);
    // setFilteredData(responseData.data || []);
    // await fetchAllAddresses(responseData);
  } catch (err) {
    console.error('Fetch error:', err);
  } finally {
    setLoading(false);
  }
};
const formatDate = (date) =>
  date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  useEffect(() => {
    fetchLogs();
  });

const [addressMap, setAddressMap] = useState({});

// console.log('array of coordinates',history?.activityLogs[0]?.walkCoordinates);


const parseCoords = (coordString) => {
  if (!coordString) return null;
  const [lat, lng] = coordString.split(',').map((n) => parseFloat(n.trim()));
  if (isNaN(lat) || isNaN(lng)) return null;
  return { latitude: lat, longitude: lng };
};

// Function to transform API data
const buildCoordinatesArray = (dataItem) => {
  console.log('history in buildcoordinatesarray',dataItem);
  
  const coordinatesArray = [];

  // 1️⃣ Add login location first
  const loginCoords = parseCoords(dataItem?.activityLogs[0]?.loginLocation);
  if (loginCoords) coordinatesArray.push(loginCoords);

  // 2️⃣ Add walk coordinates (loop through array)
  if (Array.isArray(dataItem?.activityLogs[0]?.walkCoordinates)) {
    dataItem?.activityLogs[0]?.walkCoordinates?.forEach((walkPoint) => {
      const point = parseCoords(walkPoint.location);
      if (point) coordinatesArray.push(point);
    });
  }

  // 3️⃣ Add logout location last
  const logoutCoords = parseCoords(dataItem?.activityLogs[0]?.logoutLocation);
  if (logoutCoords) coordinatesArray.push(logoutCoords);

  return coordinatesArray;
};




const totalDistanceInMeters = calculateTotalPathDistance(coords);
  const totalDistanceInKm = (totalDistanceInMeters / 1000).toFixed(2);
  console.log('distaaannnncceeeee',totalDistanceInKm);
  
  return (  <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
       <Header onback={true}  title="Sales Detail Activity" onMenuPress={() => navigation.goBack()} />
        <ScrollView>
    <View style={styles.container}>
      <SalesPersonCard
  name={`${history?.firstName} ${history?.lastName}`}
  email={history?.email}
  phone= {`${history?.mobile?.countryCode} ${history?.mobile.number}`}
  city="New York"
  image="https://example.com/sarah.jpg"
  theme="light"
  // onPress={() => navigation.navigate('SalesDetails', { id: 1 })}
/>
<LoginLogoutCard
  loginImage="https://example.com/login-photo.jpg"
  logoutImage="https://example.com/logout-photo.jpg"
  loginTime="09:15 AM"
  logoutTime="06:30 PM"
  theme="light"
/>
<TotalDistanceCard
  distance={totalDistanceInKm}
  date="27/10/2025"
  theme="light"
/>
<DateSelectorCard
  date={formatDate(currentDate)}
  isToday={new Date().toDateString() === currentDate.toDateString()}
  onPrev={() => setCurrentDate(new Date(currentDate.getTime() - 86400000))}
  onNext={() => setCurrentDate(new Date(currentDate.getTime() + 86400000))}
  theme="light"
/>

<LoginLogoutHistoryCard
  type="Login"
  time="09:15 AM"
  details={{
    coordinates: ['19.0760', '72.8777'],
    address: 'Mumbai, India',
  }}
/>

<LoginLogoutHistoryCard
  type="Logout"
  time="06:30 PM"
  details={{
    coordinates: ['19.0800', '72.8700'],
    address: 'Andheri East, Mumbai',
  }}
/>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    // margin:hp()
    padding:hp(1.5),
    
  },
  card: {
    // backgroundColor: '#fff',
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    marginBottom: 15,
    padding: 12,
    elevation: 3,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFD700',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#FFD700',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 6,
    marginBottom: 6,
    backgroundColor: '#e1e1e1',
  },
  link: {
    color: '#007bff',
    fontSize: 13,
    marginTop: 4,
  },
  timesDate: {
    color: '#ccc'
  },
  trackButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchRow: {
   
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    // paddingHorizontal: 8,
    // marginHorizontal: 6,
    width: '90%',
    // flex: 1,
    // maxWidth: 230,
    height: 38,
    alignSelf:'center',
    marginBottom:20
  },
  searchInput: {
    // flex: 1,
    color: '#fff',
    fontSize: 15,
    paddingVertical: 5,
    // paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#333',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  nameText: {
    color: '#FFD54F', // yellowish for name
    fontWeight: '600',
    fontSize: 15,
  },
  activeText: {
    color: '#81C784', // green for active
    fontSize: 13,
  },
  details: {
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  detailText: {
    color: '#ccc',
    marginLeft: 8,
    fontSize: 13,
  },

});
