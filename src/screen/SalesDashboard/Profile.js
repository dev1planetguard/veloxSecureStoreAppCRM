import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@react-native-vector-icons/feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../../components/moduleBased/sales/InputField';
import CustomButton from '../../components/moduleBased/sales/CustomButton';
// import { getUserDetails, updateUserDetails } from '../../api/Sales/profileApi';
// import { AuthContext } from '../../navigation/RootNavigator';
import { getUserDetails, updateUserDetails } from '../../api/apiFunctions/User_Sales_exe/UserDetails';
import { hp, wp } from '../../utils/responsive';

export default function Profile({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // State variables
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateRegion, setStateRegion] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');

  const PLACEHOLDER_AVATAR = 'https://www.gravatar.com/avatar/?d=mp&s=200';

// const { logout } = useContext(AuthContext);

const handleLogout = async () => {
    // await logout()
   
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    })
  }

useEffect(() => {
  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'SplashScreen' }],
        });
        return;
      }

      const data = await getUserDetails();
      if (data.statusCode === 200 && Array.isArray(data.data)) {
        const details = data.data[0];
        setUser(details);

        setFirstName(details.firstName || '');
        setLastName(details.lastName || '');
        setEmail(details.email || '');
        setMobile(
          details.mobile
            ? `${details.mobile.countryCode}${details.mobile.number}`
            : '',
        );
        setOrganization(details.organizationDetails?.name || '');
        setRole(details.organizationDetails?.role || '');
        setStreet(details.billingAddress?.street || '');
        setCity(details.billingAddress?.city || '');
        setStateRegion(details.billingAddress?.state || '');
        setZipCode(details.billingAddress?.zipCode || '');
        setCountry(details.billingAddress?.country || '');
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        await AsyncStorage.multiRemove(['jwtToken', 'roleType', 'userId']);
        navigation.reset({
          index: 0,
          routes: [{ name: 'SplashScreen' }],
        });
      }
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [navigation]);

  const onSave = async () => {
    try {
      await updateUserDetails({ firstName, lastName, email, mobile, organization, street, city, stateRegion, zipCode, country });
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#38B000" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={wp('6%')} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity onPress={() => setEditMode(!editMode)}>
          <Feather name={editMode ? 'x' : 'edit-2'} size={wp('6%')} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user?.avatarUrl || PLACEHOLDER_AVATAR }} style={styles.avatar} />
      </View>

      {/* User Info */}
      <View style={styles.infoContainer}>
        {editMode ? (
          <>
            <InputField value={firstName} onChangeText={setFirstName} placeholder="First Name" />
            <InputField value={lastName} onChangeText={setLastName} placeholder="Last Name" />
            <InputField value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
          </>
        ) : (
          <>
            <Text style={styles.nameText}>{firstName} {lastName}</Text>
            <Text style={styles.emailText}>{email}</Text>
          </>
        )}
      </View>

      {/* Organization & Mobile */}
      <View style={styles.cardsContainer}>
        <View style={[styles.card, { backgroundColor: '#2D6A4F' }]}>
          <Text style={styles.cardLabel}>Organization</Text>
          {editMode ? <InputField value={organization} onChangeText={setOrganization} placeholder="Organization" /> : <Text style={styles.cardValue}>{organization}</Text>}
        </View>
        <View style={[styles.card, { backgroundColor: '#D99D2D' }]}>
          <Text style={styles.cardLabel}>Mobile</Text>
          {editMode ? <InputField value={mobile} onChangeText={setMobile} keyboardType="phone-pad" placeholder="Mobile" /> : <Text style={styles.cardValue}>{mobile}</Text>}
        </View>
      </View>

      {/* Billing Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Billing Address</Text>
        {editMode ? (
          <>
            <InputField value={street} onChangeText={setStreet} placeholder="Street" />
            <InputField value={city} onChangeText={setCity} placeholder="City" />
            <InputField value={stateRegion} onChangeText={setStateRegion} placeholder="State" />
            <InputField value={zipCode} onChangeText={setZipCode} placeholder="Zip Code" keyboardType="numeric" />
            <InputField value={country} onChangeText={setCountry} placeholder="Country" />
          </>
        ) : (
          <>
            <Text style={styles.addressText}>{street}</Text>
            <Text style={styles.addressText}>{city}, {stateRegion}</Text>
            <Text style={styles.addressText}>{zipCode}, {country}</Text>
          </>
        )}
      </View>

      {/* Buttons */}
      {editMode ? (
        <CustomButton title="Save Changes" onPress={onSave} bgColor="#38B000" />
      ) : (
        
<CustomButton
  title="Logout"
  bgColor="#E63946"
    onPress={handleLogout}
/>
      )}

      <View style={{ height: hp('5%') }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e1e1e' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e1e' },
  header: {
    paddingTop: hp('6%'),
    paddingHorizontal: wp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: hp('1.5%'),
  },
  headerTitle: { fontSize: wp('5%'), fontWeight: 'bold', color: '#fff' },
  avatarContainer: { marginTop: hp('3%'), alignItems: 'center' },
  avatar: { width: wp('25%'), height: wp('25%'), borderRadius: wp('12.5%'), borderWidth: 2, borderColor: '#fff' },
  infoContainer: { marginTop: hp('2%'), alignItems: 'center', paddingHorizontal: wp('5%') },
  nameText: { fontSize: wp('6%'), fontWeight: '600', color: '#fff' },
  emailText: { fontSize: wp('4%'), color: '#ccc', marginTop: hp('0.5%') },
  cardsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: hp('2%') },
  card: { width: '45%', borderRadius: wp('2%'), padding: wp('3%') },
  cardLabel: { fontSize: wp('4%'), color: '#fff', marginBottom: wp('1%') },
  cardValue: { fontSize: wp('4%'), color: '#fff', fontWeight: '500' },
  section: { marginTop: hp('3%'), paddingHorizontal: wp('5%') },
  sectionTitle: { fontSize: wp('5%'), fontWeight: '600', marginBottom: wp('2%'), color: '#fff' },
  addressText: { fontSize: wp('4%'), color: '#ccc', marginBottom: wp('1%') },
});
