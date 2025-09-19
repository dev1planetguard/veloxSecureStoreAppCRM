// import React, { useEffect, useRef, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   FlatList,
//   Modal,
//   Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import PropTypes from 'prop-types';
// import CountryPicker from 'react-native-country-picker-modal';
// // import FeatherIcon from 'react-native-vector-icons/Feather';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// import Button from '../../components/moduleBased/sales/Button';
// import Input from '../../components/moduleBased/sales/Input';
// import  Dropdown  from '../../components/reusable/Dropdown';
// import { fetchAddressSuggestions } from '../../api/Sales/fetchAddressApi';

// const countries = [
//   { code: 'US', name: { common: 'United States' }, dialCode: '+1', flag: '🇺🇸' },
//   { code: 'IN', name: { common: 'India' }, dialCode: '+91', flag: '🇮🇳' },
//   { code: 'GB', name: { common: 'United Kingdom' }, dialCode: '+44', flag: '🇬🇧' },
//   { code: 'CA', name: { common: 'Canada' }, dialCode: '+1', flag: '🇨🇦' },
// ];

// const AddCustomerModal = ({ isOpen, onClose, onAddCustomer, editing, editData }) => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [selectedCountry, setSelectedCountry] = useState(countries[1]);
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [address, setAddress] = useState('');
//   const [addressSuggestions, setAddressSuggestions] = useState([]);
//   const [isFetchingAddress, setIsFetchingAddress] = useState(false);
//   const [isPhoneValid, setIsPhoneValid] = useState(true);
//   const [stateProv, setStateProv] = useState('');
//   const [city, setCity] = useState('');
//   const [countryName, setCountryName] = useState('India');
//   const [stateOptions, setStateOptions] = useState([]);
//   const [cityOptions, setCityOptions] = useState([]);
//   const [countryCode, setCountryCode] = useState('IN');
//   const debounceTimer = useRef(null);

//   // Load stored location / prefill edit data
//   useEffect(() => {
//     const fetchStoredLocation = async () => {
//       try {
//         const storedState = await AsyncStorage.getItem('selectedState');
//         const storedCity = await AsyncStorage.getItem('selectedCity');
//         const storedCountry = await AsyncStorage.getItem('selectedCountry');

//         if (editing && editData) {
//           setFirstName(editData.firstName || '');
//           setLastName(editData.lastName || '');
//           setAddress(editData.address || '');
//           setPhoneNumber(editData.phone ? editData.phone.replace(/^\+?\d{1,3}/, '') : '');
//           const foundCountry =
//             countries.find(
//               (c) =>
//                 c.dialCode.replace('+', '') === String(editData.countryCode) ||
//                 c.dialCode === `+${editData.countryCode}`
//             ) || countries[1];
//           setSelectedCountry(foundCountry);

//           if (storedState) setStateProv(storedState);
//           if (storedCity) setCity(storedCity);
//           if (storedCountry) setSelectedCountry(storedCountry);
//         } else {
//           setFirstName('');
//           setLastName('');
//           setAddress('');
//           setPhoneNumber('');
//           setSelectedCountry(countries[1]);
//           setStateProv('');
//           setCity('');
//         }

//         setAddressSuggestions([]);
//       } catch (error) {
//         console.error('Failed to fetch stored location:', error);
//       }
//     };

//     fetchStoredLocation();
//   }, [isOpen, editing, editData]);

//   // Debounced address API
//   useEffect(() => {
//     if (!isOpen) return;
//     if (debounceTimer.current) clearTimeout(debounceTimer.current);
//     if (address.length < 2) {
//       setAddressSuggestions([]);
//       setIsFetchingAddress(false);
//       return;
//     }
//     setIsFetchingAddress(true);
//     debounceTimer.current = setTimeout(async () => {
//       try {
//         const res = await fetchAddressSuggestions(address);
//         if (res.statusCode === 200 && Array.isArray(res.data)) {
//           setAddressSuggestions(res.data);
//         } else {
//           setAddressSuggestions([]);
//         }
//       } catch (err) {
//         setAddressSuggestions([]);
//       } finally {
//         setIsFetchingAddress(false);
//       }
//     }, 400);
//     return () => clearTimeout(debounceTimer.current);
//   }, [address, isOpen]);

//   const handleSubmit = () => {
//     if (!firstName || !lastName || !phoneNumber || !address || !city || !stateProv) {
//       Alert.alert('Validation Error', 'Please fill all required fields');
//       return;
//     }

//     if (firstName.trim().toLowerCase() === lastName.trim().toLowerCase()) {
//       Alert.alert('Validation Error', 'First and last name cannot be the same');
//       return;
//     }

//     if (!/^\d{10}$/.test(phoneNumber)) {
//       Alert.alert('Validation Error', 'Phone number must be exactly 10 digits');
//       return;
//     }

//     onAddCustomer({
//       firstName: firstName.trim(),
//       lastName: lastName.trim(),
//       phone: `${selectedCountry.dialCode}${phoneNumber}`,
//       address: address.trim(),
//       countryCode: selectedCountry.dialCode.replace('+', ''),
//       city,
//       state: stateProv,
//     });

//     if (!editing) {
//       setFirstName('');
//       setLastName('');
//       setPhoneNumber('');
//       setAddress('');
//       setSelectedCountry(countries[1]);
//       setAddressSuggestions([]);
//       setStateProv('');
//       setCity('');
//       setCountryName('');
//       onClose();
//     }
//   };

//   const handlePhoneInput = (val) => {
//     const clean = val.replace(/[^0-9]/g, '');
//     setPhoneNumber(clean);
//     setIsPhoneValid(clean.length === 10);
//   };

//   const handleStateSelect = (selectedState) => {
//     setStateProv(selectedState);
//     AsyncStorage.setItem('selectedState', selectedState);
//   };

//   const handleCitySelect = (selectedCity) => {
//     setCity(selectedCity);
//     AsyncStorage.setItem('selectedCity', selectedCity);
//   };

//   const handleCountryName = (val) => setCountryName(val);

//   return (
//     <Modal visible={isOpen} transparent animationType="slide">
//       <View style={styles.backdrop}>
//         <View style={styles.content}>
//           <Text style={styles.title}>{editing ? 'Edit Customer' : 'Add New Customer'}</Text>

//           <Input placeholder="First Name" value={firstName} onChangeText={setFirstName} />
//           <Input placeholder="Last Name" value={lastName} onChangeText={setLastName} />

//           <View style={styles.phoneRow}>
//             <CountryPicker
//               countryCode={selectedCountry.code}
//               withFilter
//               withFlag
//               withCallingCode
//               onSelect={(country) =>
//                 setSelectedCountry({
//                   code: country.cca2,
//                   name: typeof country.name === 'string' ? { common: country.name } : country.name,
//                   dialCode: `+${country.callingCode[0]}`,
//                   flag: country.flag || '',
//                 })
//               }
//             />
//             <Text style={styles.dialCode}>{selectedCountry.dialCode}</Text>
//             <Input
//               placeholder="Phone"
//               value={phoneNumber}
//               onChangeText={handlePhoneInput}
//               keyboardType="numeric"
//               maxLength={12}
//               style={{ flex: 1 }}
//             />
//           </View>

//           <Input placeholder="Address" value={address} onChangeText={setAddress} />
//           {isFetchingAddress && <ActivityIndicator size="small" color="#2563eb" />}
//           {addressSuggestions.length > 0 && (
//             <FlatList
//               data={addressSuggestions}
//               keyExtractor={(item) => item}
//               renderItem={({ item }) => (
//                 <TouchableOpacity onPress={() => setAddress(item)}>
//                   <Text style={{ padding: 6 }}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//               style={{ maxHeight: hp(20) }}
//             />
//           )}

//           <Dropdown
//             options={stateOptions}
//             selected={stateProv}
//             placeholder="Select State"
//             onSelect={handleStateSelect}
//           />

//           <Dropdown
//             options={cityOptions}
//             selected={city}
//             placeholder="Select City"
//             onSelect={handleCitySelect}
//           />

//           <Input placeholder="Country Name" value={countryName} onChangeText={handleCountryName} editable={false} />

//           <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: hp(2) }}>
//             <Button variant="ghost" onPress={onClose} style={{ marginRight: wp(2) }}>
//               <Text style={{ color: '#fff' }}>Cancel</Text>
//             </Button>
//             <Button variant="default" onPress={handleSubmit}>
//               {editing ? 'Update' : 'Add'}
//             </Button>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// AddCustomerModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onAddCustomer: PropTypes.func.isRequired,
//   editing: PropTypes.bool,
//   editData: PropTypes.object,
// };

// const styles = StyleSheet.create({
//   backdrop: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   content: {
//     width: wp(90),
//     backgroundColor: '#1e293b',
//     borderRadius: 10,
//     padding: wp(4),
//   },
//   title: { color: '#fff', fontSize: hp(2.5), fontWeight: 'bold', marginBottom: hp(2), alignSelf: 'center' },
//   phoneRow: { flexDirection: 'row', alignItems: 'center', marginBottom: hp(1) },
//   dialCode: { marginHorizontal: wp(1), color: '#fff', fontWeight: 'bold', fontSize: hp(2) },
// });

// export default AddCustomerModal;

/////////////////

import AsyncStorage from '@react-native-async-storage/async-storage';
import { City, State } from 'country-state-city';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from '../../components/moduleBased/sales/Button';
import Input from '../../components/moduleBased/sales/Input';
import Dropdown from '../../components/reusable/Dropdown';
import Contacts from 'react-native-contacts';

// Import the API functions correctly
import { fetchAddressSuggestions as fetchAddressSuggestionsAPI } from '../../api/Sales/fetchAddressApi';

const countries = [
  { code: 'US', name: { common: 'United States' }, dialCode: '+1', flag: '🇺🇸' },
  { code: 'IN', name: { common: 'India' }, dialCode: '+91', flag: '🇮🇳' },
  { code: 'GB', name: { common: 'United Kingdom' }, dialCode: '+44', flag: '🇬🇧' },
  { code: 'CA', name: { common: 'Canada' }, dialCode: '+1', flag: '🇨🇦' },
];

const INPUT_HEIGHT = hp('5.9%');
const CARD_PADDING = wp('4%');

const AddCustomerModal = ({ isOpen, onClose, onAddCustomer, editing, editData }) => {
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countries[1]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [cityName, setCityName] = useState('');
  const [stateName, setStateName] = useState('');
  const [countryName, setCountryName] = useState('India');
  const [stateProv, setStateProv] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [countryCode, setCountryCode] = useState('IN');
  const [callingCode, setCallingCode] = useState('91');

  // Contact picker state
  const [contactModal, setContactModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contactsLoading, setContactsLoading] = useState(false);
  const [contactsLoadingMore, setContactsLoadingMore] = useState(false);
  const [contactSearch, setContactSearch] = useState('');
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState(undefined);

  // For debounce
  const debounceTimer = useRef(null);
  const isValid = phoneNumber.length === 10;

  // Load initial data
  useEffect(() => {
    const fetchStoredLocation = async () => {
      try {
        const storedState = await AsyncStorage.getItem('selectedState');
        const storedCity = await AsyncStorage.getItem('selectedCity');
        const storedCountry = await AsyncStorage.getItem('selectedCountry');

        if (editing && editData) {
          setFirstName(editData.firstName || ''); 
          setLastName(editData.lastName || '');
          setAddress(editData.address || '');
          setPhoneNumber(
            editData.phone
              ? editData.phone.replace(/^\+?\d{1,2}/, '')
              : ''
          );

          const foundCountry =
            countries.find(
              (c) =>
                c.dialCode.replace('+', '') === String(editData.countryCode) ||
                c.dialCode === `+${editData.countryCode}`
            ) || countries[1];
          setSelectedCountry(foundCountry);

          // Prefill state, city, country from AsyncStorage
          if (storedState) setStateProv(storedState);
          if (storedCity) setCity(storedCity);
          if (storedCountry) setSelectedCountry(storedCountry);
        } else {
          // Not editing, clear all
          setFirstName('');
          setLastName('');
          setAddress('');
          setPhoneNumber('');
          setSelectedCountry(countries[1]);
          setStateProv('');
          setCity('');
        }

        setAddressSuggestions([]);
      } catch (error) {
        console.error('Failed to fetch stored location:', error);
      }
    };

    fetchStoredLocation();
  }, [isOpen, editing, editData]);

  useEffect(() => {
    const states = State.getStatesOfCountry(countryCode);
    setStateOptions(states.map(s => ({ label: s.name, value: s.isoCode })));
    setStateProv('');
    setCityOptions([]);
    setCity('');
  }, [countryCode]);

  // Load cities when state changes
  useEffect(() => {
    if (countryCode && stateProv) {
      const cities = City.getCitiesOfState(countryCode, stateProv);
      setCityOptions(cities.map(c => ({ label: c.name, value: c.name })));
    } else {
      setCityOptions([]);
    }
    setCity('');
  }, [countryCode, stateProv]);

  // Debounced API call for address suggestions
  useEffect(() => {
    if (!isOpen) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (address.length < 2) {
      setAddressSuggestions([]);
      setIsFetchingAddress(false);
      return;
    }
    setIsFetchingAddress(true);
    debounceTimer.current = setTimeout(() => {
      fetchAddressSuggestions(address);
    }, 400); // Debounce delay (ms)
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [address, isOpen]);

  // Address suggestions API call - FIXED
  const fetchAddressSuggestions = async (input) => {
    try {
      console.log('Fetching address suggestions for:', input);
      const response = await fetchAddressSuggestionsAPI(input);
      
      if (response && response.statusCode === 200 && Array.isArray(response.data)) {
        console.log('Address suggestions received:', response.data.length);
        setAddressSuggestions(response.data);
      } else {
        console.log('No address suggestions found or invalid response format');
        setAddressSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
      setAddressSuggestions([]);
    } finally {
      setIsFetchingAddress(false);
    }
  };

  // Save to AsyncStorage after stateProv has updated
  useEffect(() => {
    if (stateProv) {
      AsyncStorage.setItem('selectedState', stateProv)
        .catch((error) => console.error('Failed to save selected state:', error));
    }
  }, [stateProv]);

  // Save to AsyncStorage after city has updated
  useEffect(() => {
    if (city) {
      AsyncStorage.setItem('selectedCity', city)
        .catch((error) => console.error('Failed to save selected city:', error));
    }
  }, [city]);

  // --- Name input handlers ---
  const handleFirstNameInput = (val) => {
    const clean = val.replace(/[^A-Za-z]/g, '');
    setFirstName(clean);
  };
  
  const handleLastNameInput = (val) => {
    const clean = val.replace(/[^A-Za-z]/g, '');
    setLastName(clean);
  };

  const handleStateSelect = (selectedState) => {
    setStateProv(selectedState);
  };

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
  };

  const handleCityName = (val) => {
    const clean = val.replace(/[^A-Za-z]/g, '');
    setCityName(clean);
  };
  
  const handleStateName = (val) => {
    const clean = val.replace(/[^A-Za-z]/g, '');
    setStateName(clean);
  };
  
  const handleCountryName = (val) => {
    const clean = val.replace(/[^A-Za-z]/g, '');
    setCountryName(clean);
  };

  // Phone input handler
  const handlePhoneInput = (val) => {
    let clean = val.replace(/[^0-9]/g, '');
    setPhoneNumber(clean);
    const isValid = clean.length === 10 && clean !== '0000000000';
    setIsPhoneValid(isValid);
  };

  // Address input handler
  const handleAddressInput = (val) => {
    setAddress(val.replace(/^\s+/, ''));
  };

  // Validation and submit
  const handleSubmit = () => {
    const nameRegex = /^[A-Za-z]{1,}$/;
    const cityRegex = /^[A-Za-z\s]+$/;
    const addressRegex = /[A-Za-z]/;

    if (!firstName) {
      Alert.alert('Validation Error', 'First name is required');
      return;
    }
    if (!nameRegex.test(firstName)) {
      Alert.alert('Validation Error', 'First name: Only English letters allowed, no spaces/numbers/special characters.');
      return;
    }
    if (!city) {
      Alert.alert('Validation Error', 'City Name is required');
      return;
    }
    if (!cityRegex.test(city)) {
      Alert.alert('Validation Error', 'City name: Only English letters allowed, no spaces/numbers/special characters.');
      return;
    }
    if (!stateProv) {
      Alert.alert('Validation Error', 'State Name is required');
      return;
    }
    if (!nameRegex.test(stateProv)) {
      Alert.alert('Validation Error', 'State name: Only English letters allowed, no spaces/numbers/special characters.');
      return;
    }
    if (!countryName) {
      Alert.alert('Validation Error', 'Country Name is required');
      return;
    }
    if (!nameRegex.test(countryName)) {
      Alert.alert('Validation Error', 'Country name: Only English letters allowed, no spaces/numbers/special characters.');
      return;
    }
    if (!lastName) {
      Alert.alert('Validation Error', 'Last name is required');
      return;
    }
    if (!nameRegex.test(lastName)) {
      Alert.alert('Validation Error', 'Last name: Only English letters allowed, no spaces/numbers/special characters.');
      return;
    }
    if (firstName.trim().toLowerCase() === lastName.trim().toLowerCase()) {
      Alert.alert('Validation Error', 'First and last name cannot be the same');
      return;
    }
    if (!phoneNumber) {
      Alert.alert('Validation Error', 'Phone number is required');
      return;
    }
    if (phoneNumber.length !== 10) {
      Alert.alert('Validation Error', 'Phone number must be exactly 10 digits');
      return;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      Alert.alert('Validation Error', 'Phone number: Only digits allowed');
      return;
    }
    if (!address || address.trim().length < 3) {
      Alert.alert('Validation Error', 'Address must be at least 3 characters');
      return;
    }
    if (!addressRegex.test(address)) {
      Alert.alert('Validation Error', 'Address must contain at least one letter');
      return;
    }
    
    // Add/Update logic
    onAddCustomer({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: `${selectedCountry.dialCode}${phoneNumber}`,
      address: address.trim(),
      countryCode: selectedCountry.dialCode.replace('+', ''),
      city: city,
      state: stateProv
    });
    
    if (!editing) {
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setAddress('');
      setSelectedCountry(countries[1]);
      setAddressSuggestions([]);
      setStateProv('');
      setCity('');
      onClose();
    }
  };

  // Contact List Picker with pagination
  const openContactPicker = async () => {
    setContactModal(true);
    setContacts([]);
    setContactsLoading(true);
    setContactSearch('');
    setHasNextPage(false);
    setEndCursor(undefined);
    
    try {
      // Request contacts permission for Android
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app needs access to your contacts to select phone numbers.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setContactModal(false);
          Alert.alert('Permission', 'Contacts permission is required.');
          return;
        }
      }
      
      // Load contacts
      Contacts.getAll((err, contacts) => {
        if (err) {
          Alert.alert('Error', 'Failed to load contacts');
          setContacts([]);
          setContactsLoading(false);
          return;
        }
        
        const filtered = contacts.filter(
          (c) => c.phoneNumbers && c.phoneNumbers.length > 0 && (c.givenName || c.familyName)
        );
        setContacts(filtered);
        setContactsLoading(false);
      });
    } catch (e) {
      Alert.alert('Error', 'Failed to load contacts');
      setContacts([]);
      setContactsLoading(false);
    }
  };

  // Search contacts
  const handleSearchContacts = (search) => {
    setContactSearch(search);
    Contacts.getContactsMatchingString(search, (err, contacts) => {
      if (err) {
        console.error('Error searching contacts:', err);
        return;
      }
      
      const filtered = contacts.filter(
        (c) => c.phoneNumbers && c.phoneNumbers.length > 0 && (c.givenName || c.familyName)
      );
      setContacts(filtered);
    });
  };

  // Pick a contact and autofill fields
  const handleContactSelect = (c) => {
    setContactModal(false);
    let fName = c.givenName || '';
    let lName = c.familyName || '';
    
    if ((!fName || !lName) && c.displayName) {
      const parts = c.displayName.split(' ');
      fName = parts[0] || '';
      lName = parts.slice(1).join(' ') || '';
    }
    
    setFirstName(fName);
    setLastName(lName);
    
    let num = c.phoneNumbers && c.phoneNumbers.length > 0 ? c.phoneNumbers[0].number : '';
    num = num.replace(/[^\d]/g, '');
    setPhoneNumber(num);
  };

  // Render contact item
  const renderContactItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleContactSelect(item)}
      style={modalStyles.contactRow}
    >
      <FeatherIcon name="user" size={20} color="#2563eb" style={{ marginRight: 10 }} />
      <Text style={{ flex: 1 }}>
        {(item.givenName || '') + ' ' + (item.familyName || '')}
      </Text>
      <Text style={{ color: '#475569', marginLeft: 8 }}>
        {item.phoneNumbers && item.phoneNumbers[0]
          ? item.phoneNumbers[0].number
          : ''}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={isOpen} transparent animationType="slide">
      <View style={modalStyles.backdrop}>
        <View style={modalStyles.content}>
          <Text style={modalStyles.title}>
            {editing ? 'Edit Customer' : 'Add New Customer'}
          </Text>
          <Input
            placeholder="First Name"
            value={firstName}
            onChangeText={handleFirstNameInput}
            style={modalStyles.input}
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChangeText={handleLastNameInput}
            style={modalStyles.input}
          />

          <View style={[{
            flexDirection: 'row', 
            alignItems: 'center', 
            marginBottom: hp('1.2%'), 
            borderBottomWidth: 1, 
            borderBottomColor: isPhoneValid ? '#ccc' : 'yellow',
            paddingBottom: hp('0.5%'),
          }]}>
            <CountryPicker
              countryCode={selectedCountry.code}
              withFilter
              withFlag
              withCallingCode
              onSelect={country =>
                setSelectedCountry({
                  code: country.cca2,
                  name: typeof country.name === 'string' ? { common: country.name } : country.name,
                  dialCode: `+${country.callingCode[0]}`,
                  flag: country.flag || '',
                })
              }
              containerButtonStyle={{ marginRight: wp('2%') }}
            />

            <Text style={{ marginRight: wp('1.5%'), color: '#fff', fontWeight: 'bold', fontSize: wp('4%') }}>
              {selectedCountry.dialCode}
            </Text>

            <Input
              placeholder="Phone"
              value={phoneNumber}
              onChangeText={handlePhoneInput}
              keyboardType="numeric"
              maxLength={12}
              style={{ flex: 1, ...modalStyles.input, marginBottom: 0 }}
            />
            <TouchableOpacity onPress={openContactPicker} style={modalStyles.phoneIconBtn}>
              <FeatherIcon name="book" size={wp('5%')} color="#2563eb" />
            </TouchableOpacity>
          </View>
          
          <View>
            {!isPhoneValid && (
              <Text style={modalStyles.errorText}>Mobile number should be 10 digits</Text>
            )}
          </View>

          <Input
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            style={modalStyles.input}
          />
          
          {isFetchingAddress && (
            <ActivityIndicator size="small" color="#2563eb" style={{ marginTop: hp('0.5%') }} />
          )}
          
          {addressSuggestions.length > 0 && (
            <View style={{ backgroundColor: '#f3f4f6', borderRadius: 6, marginTop: hp('0.5%'), maxHeight: hp('12%') }}>
              <FlatList
                data={addressSuggestions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ padding: wp('2.5%') }}
                    onPress={() => {
                      setAddress(item);
                      setAddressSuggestions([]);
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          
          <View>
            <Dropdown
              txt={'black'}
              bg={'white'}
              options={stateOptions}
              selected={stateProv}
              placeholder="Select State"
              value={stateProv}
              onSelect={handleStateSelect}
            />
          </View>
          
          <Dropdown
            txt={'black'}
            bg={'white'}
            options={cityOptions}
            selected={city}
            placeholder="Select City"
            value={city}
            onSelect={handleCitySelect}
          />

          <Input
            placeholder="Country Name"
            value={countryName}
            onChangeText={handleCountryName}
            editable={false}
            style={[modalStyles.input, { marginTop: hp('1.2%') }]}
          />

          <View style={{ flexDirection: 'row', marginTop: hp('2.2%'), justifyContent: 'flex-end' }}>
            <Button variant="ghost" onPress={onClose} style={{ marginRight: wp('2.5%') }}>
              <Text style={{ color: '#fff' }}>Cancel</Text>
            </Button>
            <Button variant="default" onPress={handleSubmit}>
              {editing ? 'Update' : 'Add'}
            </Button>
          </View>
        </View>
        
        {/* CONTACT PICKER MODAL */}
        <Modal visible={contactModal} transparent animationType="fade">
          <View style={modalStyles.pickerBackdrop}>
            <View style={modalStyles.contactPicker}>
              <Text style={{ fontWeight: 'bold', fontSize: wp('4.5%'), marginBottom: hp('1.2%') }}>
                Select Contact
              </Text>
              <TextInput
                placeholder="Search name or number"
                style={modalStyles.contactSearchInput}
                value={contactSearch}
                onChangeText={handleSearchContacts}
              />
              {contactsLoading ? (
                <ActivityIndicator size="large" color="#2563eb" />
              ) : (
                <FlatList
                  data={contacts}
                  keyExtractor={item => item.recordID || Math.random().toString()}
                  renderItem={renderContactItem}
                  ListEmptyComponent={
                    <Text style={{ textAlign: 'center', marginTop: hp('2.2%') }}>
                      No contacts found
                    </Text>
                  }
                  style={{ maxHeight: hp('42%'), minWidth: wp('62.5%'), width: wp('77.5%') }}
                  keyboardShouldPersistTaps="handled"
                />
              )}
              <Button
                variant="ghost"
                onPress={() => setContactModal(false)}
                style={{ marginTop: hp('1.2%') }}
              >
                <Text style={{ color: '#2563eb', textAlign: 'center' }}>Close</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </Modal>
  );
};

AddCustomerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddCustomer: PropTypes.func.isRequired,
  editing: PropTypes.bool,
  editData: PropTypes.object,
};

const modalStyles = StyleSheet.create({
  backdrop: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.4)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  content: { 
    width: wp('90%'), 
    backgroundColor: '#1e293b', 
    borderRadius: wp('2.5%'), 
    padding: wp('4%') 
  },
  title: { 
    color: '#fff', 
    fontSize: wp('5%'), 
    fontWeight: 'bold', 
    marginBottom: hp('2%'), 
    alignSelf: 'center' 
  },
  input: { 
    backgroundColor: '#fff', 
    color: '#000', 
    borderRadius: wp('1.5%'), 
    marginBottom: hp('1.2%'), 
    paddingHorizontal: wp('2.5%'),
    height: hp('5.9%'),
  },
  phoneIconBtn: {
    marginLeft: wp('2%'),
    padding: wp('1.7%'),
    borderRadius: wp('2%'),
    backgroundColor: '#e0e7ef',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('4.7%'),
    width: wp('9.4%'),
  },
  pickerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactPicker: {
    width: wp('85%'),
    backgroundColor: '#fff',
    borderRadius: wp('2.5%'),
    padding: wp('3.5%'),
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 10,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.2%'),
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
    paddingHorizontal: wp('1.5%'),
    width: wp('75%'),
  },
  errorText: {
    color: 'yellow',
    fontSize: wp('3%'),
    marginTop: hp('0.5%'),
    marginLeft: wp('1%'),
  },
  contactSearchInput: {
    backgroundColor: '#f1f5f9',
    borderRadius: wp('2%'),
    paddingVertical: Platform.OS === 'ios' ? hp('1%') : hp('0.5%'),
    paddingHorizontal: wp('3%'),
    marginBottom: hp('1.2%'),
    width: '100%',
  },
  dropdownWrapperHalf: {
    flex: 1,
    marginTop: hp('1.5%'),
    marginRight: wp('2%'),
  },
  dropdownPlaceholder: { 
    color: '#777' 
  },
  inputLikeDisabled: {
    height: hp('5.9%'),
    borderRadius: wp('2%'),
    backgroundColor: 'white',
    paddingHorizontal: wp('3%'),
    justifyContent: 'center',
  },
  halfInput: {
    flex: 1,
    height: hp('5.9%'),
    borderRadius: wp('2%'),
    backgroundColor: 'white',
    color: '#fff',
    paddingHorizontal: wp('3%'),
    marginTop: hp('1.5%'),
    marginRight: wp('2%'),
  },
});

export default AddCustomerModal;