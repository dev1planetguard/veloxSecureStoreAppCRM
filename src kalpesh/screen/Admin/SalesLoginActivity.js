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

const IMAGE_BASE_URL = 'http://192.168.0.204:9191/';
// const IMAGE_BASE_URL =  'http://45.118.160.135:9192/';//public

export default function SalesLogsScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
const [search, setSearch] = useState('');
const [searchText, setSearchText] = useState('');
const [filteredData, setFilteredData] = useState([]); // Filtered data

//   const fetchLogs = async () => {
//     try {
//       const response = await fetchTodaysDailyReport()
//       const text = await response.text();
//       console.log('Response status:', response.status);
//       console.log('Response text:', text);

//       if (response.headers.get('content-type')?.includes('application/json')) {
//         const json = JSON.parse(text);
//         console.log(json, 'salesloginlogout')
//         setData(json.data || []);
//         setFilteredData(json.data)
//         await fetchAllAddresses(json);
//       } else {
//         console.warn('Expected JSON but got:', text);
//         setData([]);
//       }
//     } catch (err) {
//       console.error('Fetch error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

const fetchLogs = async () => {
  try {
    const responseData = await fetchTodaysDailyReport();
    console.log('Response data:', responseData);

    setData(responseData.data || []);
    setFilteredData(responseData.data || []);
    await fetchAllAddresses(responseData);
  } catch (err) {
    console.error('Fetch error:', err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchLogs();
  }, []);



  
// const getAddressFromCoords = async (latitude, longitude) => {
//   try {
//     console.log('coords',latitude,longitude);
    
//     const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
//     return address;
//   } catch (error) {
//     console.error('Reverse geocode error:', error);
//     return null;
//   }
// };

// const getAddressFromCoords = async (latitude, longitude) => {
//   try {
//     const coords = {
//       latitude: Number(latitude),
//       longitude: Number(longitude),
//     };

//     if (isNaN(coords.latitude) || isNaN(coords.longitude)) {
//       throw new Error('Invalid coordinates');
//     }

//     const [address] = await Location.reverseGeocodeAsync(coords);
//     return address;
//   } catch (error) {
//     console.error('Reverse geocode error:', error);
//     return null;
//   }
// };

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
// console.log('address map',addressMap);

// const fetchAllAddresses = async (logs) => {
//   console.log('loooogggs',logs);
  
//   const newMap = {};
//   for (let item of logs) {
//     console.log('itemmmmm',item);
    
//     const [lat, lng] = getCoordsFromString(item.liveLocation);
//     if (lat !== null && lng !== null) {
//       try {
//         const result = await getAddressFromCoords('19.0650613,72.995304');
//         newMap[item.id] = result?.name || 'Unknown';
//       } catch (e) {
//         newMap[item.id] = 'Failed to load';
//       }
//     } else {
//       newMap[item.id] = 'Invalid location';
//     }
//   }
//   console.log('new mappp',newMap);
  
//   setAddressMap(newMap);
// };


// 2. Fetch addresses after getting logs
// const fetchAllAddresses = async (logs) => {
//   const newMap = {};

//   for (let index = 0; index < logs.length; index++) {
//     const item = logs[index];

//     const [lat, lng] = getCoordsFromString(item.liveLocation);
//     const key = item.email + '_' + item.loginTime; // unique fallback ID

//     if (true) {
//       try {
//         const result = await getAddressFromCoords(lat,lng);
//         console.log('ressssssssssssss',result);
        
//         newMap[key] = result?.name || 'Unknown';
//       } catch (e) {
//         newMap[key] = 'Failed to load';
//       }
//     } else {
//     }
//   }

//   setAddressMap(newMap);
// };


const fetchAllAddresses = async (logs, concurrency = 5) => {
  const newMap = {};
  const limit = pLimit(concurrency);

  const promises = logs.map((item) =>
    limit(async () => {
      const [lat, lng] = getCoordsFromString(item.liveLocation);
      const key = `${item.email}_${item.loginTime}`;

      try {
        const result = await getAddressFromCoords(lat, lng);
        console.log('Address result:', result);
        newMap[key] = result || 'Unknown';
      } catch (e) {
        console.error('Error fetching address:', e);
        newMap[key] = 'Failed to load';
      }
    })
  );

  await Promise.all(promises);
  setAddressMap(newMap);
};



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
     

    return (
      <View style={styles.card}>
        {/* <Text style={styles.recordTitle}>Record #{index + 1}</Text> */}
        <Text style={styles.label}>Name: {item.firstname} {item.lastname}</Text>
        <Text style={styles.label}>Email: {item.email}</Text>
        <Text style={styles.label}>Mobile Number: {item.mobileNumber}</Text>
        <Text style={styles.label}>City Name: {item.cityname}</Text>
        <View style={styles.row}>
          {/* Login Info */}
          <View style={styles.column}>
            <Text style={styles.label}>Login</Text>

            {loginImg ? (
              <Image
                source={{ uri: loginImg }}
                style={styles.image}
                onError={() => console.warn('Failed to load login image:', loginImg)}
              />
            ) : (
              <Text>No Login Photo</Text>
            )}
            <Text style={styles.timesDate}>Time: {formatTime(item.loginTime)}</Text>
            {item.loginLocation && (
              <TouchableOpacity onPress={() => openMap(item.loginLocation)}>
                <Text style={styles.link}>Login Location</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Logout Info */}
          <View style={styles.column}>
            <Text style={styles.label}>Logout</Text>
            {logoutImg ? (
              <Image
                source={{ uri: logoutImg }}
                style={styles.image}
                onError={() => console.warn('Failed to load logout image:', logoutImg)}
              />
            ) : (
              <Text>No Logout Photo</Text>
            )}
            <Text style={styles.timesDate}>Time: {formatTime(item.logoutTime)}</Text>
            {item.logoutLocation && (
              <TouchableOpacity onPress={() => openMap(item.logoutLocation)}>
                <Text style={styles.link}>Logout Location</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* Track Button */}
        {/* {item.liveLocation && ( */}
        <AddressFetcher locationString={item.liveLocation} />
        <Text style={styles.timesDate}>{formatTime(item.liveLocationTime)}</Text>
        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => openMapWithCoords(item.liveLocation)}
        >
          <Text style={styles.trackButtonText}>Track Salesperson</Text>
        </TouchableOpacity>
        {/* // )} */}

      </View>
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

});
