import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
// import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
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
import { useNavigation } from '@react-navigation/native';

const IMAGE_BASE_URL = 'http://192.168.0.204:9191/';
// const IMAGE_BASE_URL =  'http://45.118.160.135:9192/';//public

export default function SalesLogsScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
const [search, setSearch] = useState('');
const [searchText, setSearchText] = useState('');
const [filteredData, setFilteredData] = useState([]); // Filtered data


const fetchLogs = async () => {
  try {
    const responseData = await fetchTodaysDailyReport();
    console.log('Response data:', responseData);

    setData(responseData.data || []);
    setFilteredData(responseData.data || []);
    // await fetchAllAddresses(responseData);
  } catch (err) {
    console.error('Fetch error:', err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchLogs();
  });


const searchSalesExe = (text) => {
  setSearchText(text);

  if (text.trim() === '') {
    setFilteredData(data); // If empty search, show all
    return;
  }

  const lowercased = text.toLowerCase();

  const filtered = data.filter((item) => {
    const fullName = `${item.firstname} ${item.lastname}`.toLowerCase();
    return (
      item.firstname.toLowerCase().includes(lowercased) ||
      item.lastname.toLowerCase().includes(lowercased) ||
      fullName.includes(lowercased)
    );
  });

  setFilteredData(filtered);
};

 
const [addressMap, setAddressMap] = useState({});
const navigation = useNavigation()

// const fetchAllAddresses = async (logs, concurrency = 5) => {
//   const newMap = {};
//   const limit = pLimit(concurrency);

//   const promises = logs.map((item) =>
//     limit(async () => {
//       const [lat, lng] = getCoordsFromString(item.liveLocation);
//       const key = `${item.email}_${item.loginTime}`;

//       try {
//         const result = await getAddressFromCoords(lat, lng);
//         console.log('Address result:', result);
//         newMap[key] = result || 'Unknown';
//       } catch (e) {
//         console.error('Error fetching address:', e);
//         newMap[key] = 'Failed to load';
//       }
//     })
//   );

//   await Promise.all(promises);
//   setAddressMap(newMap);
// };



const AddressFetcher = ({ locationString }) => {
  const [address, setAddress] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    const fetchAddress = async () => {
      const [lat, lng] = getCoordsFromString(locationString);
      if (lat !== null && lng !== null) {
        const addr = await getAddressFromCoords(lat, lng);
        console.log(addr);
        
        if (isMounted) setAddress(addr);
      }
    };
    if (locationString) fetchAddress();

    return () => {
      isMounted = false; // clean up if component unmounts
    };
  }, [locationString]);

  return (
    <Text style={styles.timesDate}>Last location captured : {address ? address.district +' ' +address.formattedAddress || 'No Address' : 'Loading address...'}</Text>
  );
};


  const renderItem =  ({ item, index }) => {
    console.log('iteeemmmmm',item);
    
    // const loginImg = item.imagePath
    //   ? `${IMAGE_BASE_URL}${item.imagePath.replace(/\\/g, '/')}`
    //   : null;

    // const logoutImg = item.logOutImagePath
    //   ? `${IMAGE_BASE_URL}${item.logOutImagePath.replace(/\\/g, '/')}`
    //   : null;
 
    const loginImg = resolveImageUrl(item.imagePath);
    const logoutImg = resolveImageUrl(item.logOutImagePath);
// const locationString= item.liveLocation
    
//     const [lat, lng] =  getCoordsFromString(locationString
//       // '19.093873,73.005094'
//     );
// if (lat !== null && lng !== null) {
//       const address =  getAddressFromCoords(lat, lng);
//       console.log('Address:', address);
//     } else {
//       console.log('Skipping invalid coordinates:', item.liveLocation);
//     }

//     //  const address = await getAddressFromCoords(lat,lng)
//      console.log('addresss',address);
     
// const  = [
//   { latitude: 37.7749, longitude: -122.4194 }, // San Francisco
//   { latitude: 34.0522, longitude: -118.2437 }, // Los Angeles
//   { latitude: 40.7128, longitude: -74.0060 },  // New York
//   { latitude: 41.8781, longitude: -87.6298 },  // Chicago
// ];

const coordinatesArray = [
  { name: "Sahar Road Metro Station", latitude: 19.0967, longitude: 72.8681 },
  { name: "Marol Naka Metro Station", latitude: 19.1005, longitude: 72.8711 },
  { name: "Chakala Metro Station", latitude: 19.1119, longitude: 72.8678 },
  { name: "CSMIA Terminal 1 (Domestic)", latitude: 19.0967, longitude: 72.8681 },
  { name: "CSMIA Terminal 2 (International)", latitude: 19.0883, longitude: 72.8702 }
];

const totalDistanceInMeters = calculateTotalPathDistance(coordinatesArray);
  const totalDistanceInKm = (totalDistanceInMeters / 1000).toFixed(2);
    return (
      // <View style={styles.card}>
      //   {/* <Text style={styles.recordTitle}>Record #{index + 1}</Text> */}
      //   <Text style={styles.label}>Name: {item.firstname} {item.lastname}</Text>
      //   <Text style={styles.label}>Email: {item.email}</Text>
      //   <Text style={styles.label}>Mobile Number: {item.mobileNumber}</Text>
      //   <Text style={styles.label}>City Name: {item.cityname}</Text>
      //    <Text style={styles.label}>Distance Covered: {totalDistanceInKm} kms</Text>
      //   <View style={styles.row}>
      //     {/* Login Info */}
      //     <View style={styles.column}>
      //       <Text style={styles.label}>Login</Text>

      //       {loginImg ? (
      //         <Image
      //           source={{ uri: loginImg }}
      //           style={styles.image}
      //           onError={() => console.warn('Failed to load login image:', loginImg)}
      //         />
      //       ) : (
      //         <Text>No Login Photo</Text>
      //       )}
      //       <Text style={styles.timesDate}>Time: {formatTime(item.loginTime)}</Text>
      //       {/* {item.loginLocation && (
      //         <TouchableOpacity onPress={() => openMap(item.loginLocation)}>
      //           <Text style={styles.link}>Login Location</Text>
      //         </TouchableOpacity>
      //       )} */}
      //     </View>

      //     {/* Logout Info */}
      //     <View style={styles.column}>
      //       <Text style={styles.label}>Logout</Text>
      //       {logoutImg ? (
      //         <Image
      //           source={{ uri: logoutImg }}
      //           style={styles.image}
      //           onError={() => console.warn('Failed to load logout image:', logoutImg)}
      //         />
      //       ) : (
      //         <Text>No Logout Photo</Text>
      //       )}
      //       <Text style={styles.timesDate}>Time: {formatTime(item.logoutTime)}</Text>
      //       {/* {item.logoutLocation && (
      //         <TouchableOpacity onPress={() => openMap(item.logoutLocation)}>
      //           <Text style={styles.link}>Logout Location</Text>
      //         </TouchableOpacity>
      //       )} */}
      //     </View>
      //   </View>
      //   <Text style={styles.timesDate}>{formatTime(item.liveLocationTime)}</Text>
      //   <TouchableOpacity
      //     style={styles.trackButton}
      //     onPress={() => openMapWithCoords(item.liveLocation)}
      //   >
      //     <Text style={styles.trackButtonText}>Track Salesperson</Text>
      //   </TouchableOpacity>
      //   {/* // )} */}

      // </View>
       <TouchableOpacity onPress={()=>navigation.navigate('SalesLogsScreenDetail',item.id)} style={styles.card}>
      <View style={styles.header}>
        <Image
          source={
            loginImg
              ? { uri: loginImg }
              : null // fallback image
          }
          style={styles.avatar}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>
            {item.firstname} {item.lastname}
          </Text>
          <Text style={styles.activeText}>Active Today</Text>
        </View>
        <Feather name="chevron-right" size={20} color="#ccc" />
      </View>

      <View style={styles.details}>
        <View style={styles.row}>
          <Feather name="mail" size={16} color="#aaa" />
          <Text style={styles.detailText}>{item.email || 'Email'}</Text>
        </View>
        <View style={styles.row}>
          <Feather name="phone" size={14} color="#aaa" />
          <Text style={styles.detailText}>
            {item.mobileNumber || 'Mobile'}
          </Text>
        </View>
        <View style={styles.row}>
          <Feather name="map-pin" size={16} color="#aaa" />
          <Text style={styles.detailText}>{item.cityname || 'City'}</Text>
        </View>
      </View>
    </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 50 }} />
      ) : (<>
        <View style={styles.searchRow}>
          <FeatherIcon name="search" size={18} color="#94a3b8" style={{ marginRight: 4 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name"
            placeholderTextColor="#94a3b8"
            value={searchText}
            onChangeText={(item)=>searchSalesExe(item)}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <FeatherIcon name="x" size={18} color="#a3a3a3" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          )}
        </View>
        <FlatList
         data={filteredData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 10 }}
        />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
