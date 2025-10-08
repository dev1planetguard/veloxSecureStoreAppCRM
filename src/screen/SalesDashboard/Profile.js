import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { Feather } from '@react-native-vector-icons/feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../../components/moduleBased/sales/InputField';
import CustomButton from '../../components/moduleBased/sales/CustomButton';
// import { getUserDetails, updateUserDetails } from '../../api/Sales/profileApi';
// import { AuthContext } from '../../navigation/RootNavigator';
import { getUserDetails, updateUserDetails } from '../../api/apiFunctions/User_Sales_exe/UserDetails';
import { hp, wp } from '../../utils/responsive';
import { SafeAreaView } from 'react-native-safe-area-context';

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

    const onPrimaryPress = () => {
    if (editMode) {
      // Simulate save action
      setEditMode(false);
      // you can show a toast/snack or run validation here
    } else {
      setEditMode(true);
    }
  };

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
    <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack?.()}>
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>My Profile</Text>

          {/* top-right edit removed; placeholder keeps header balanced */}
          <View style={{ width: 28 }} />
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={{ uri: PLACEHOLDER_AVATAR }} style={styles.avatar} />
          {editMode ? (
            <>
              <TextInput
                style={[styles.inputInline, { fontSize: 20, fontWeight: '700', textAlign: 'center' }]}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First Name"
                placeholderTextColor="#6b7280"
              />
              <TextInput
                style={[styles.inputInline, { fontSize: 20, fontWeight: '700', textAlign: 'center', marginTop: 6 }]}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last Name"
                placeholderTextColor="#6b7280"
              />
            </>
          ) : (
            <>
              <Text style={styles.nameText}>{firstName} {lastName}</Text>
            </>
          )}

          {editMode ? (
            <TextInput
              style={[styles.inputInline, { marginTop: 8, fontSize: 14, textAlign: 'center' }]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="you@example.com"
              placeholderTextColor="#6b7280"
            />
          ) : (
            <Text style={styles.emailText}>{email}</Text>
          )}
        </View>

        {/* General Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Info</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Organization</Text>
            {editMode ? (
              <TextInput style={styles.input} value={organization} onChangeText={setOrganization} placeholder="Organization" placeholderTextColor="#6b7280" />
            ) : (
              <Text style={styles.value}>{organization}</Text>
            )}
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Mobile</Text>
            {editMode ? (
              <TextInput style={styles.input} value={mobile} onChangeText={setMobile} placeholder="Mobile" placeholderTextColor="#6b7280" keyboardType="phone-pad" />
            ) : (
              <Text style={styles.value}>{mobile}</Text>
            )}
          </View>
        </View>

        {/* Billing Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Billing Address</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Street</Text>
            {editMode ? (
              <TextInput style={styles.input} value={street} onChangeText={setStreet} placeholder="Street" placeholderTextColor="#6b7280" />
            ) : (
              <Text style={styles.value}>{street}</Text>
            )}
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>City</Text>
            {editMode ? (
              <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="City" placeholderTextColor="#6b7280" />
            ) : (
              <Text style={styles.value}>{city}</Text>
            )}
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>State</Text>
            {editMode ? (
              <TextInput style={styles.input} value={stateRegion} onChangeText={setStateRegion} placeholder="State" placeholderTextColor="#6b7280" />
            ) : (
              <Text style={styles.value}>{stateRegion}</Text>
            )}
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Zip Code</Text>
            {editMode ? (
              <TextInput style={styles.input} value={zipCode} onChangeText={setZipCode} placeholder="Zip Code" placeholderTextColor="#6b7280" keyboardType="numeric" />
            ) : (
              <Text style={styles.value}>{zipCode}</Text>
            )}
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Country</Text>
            {editMode ? (
              <TextInput style={styles.input} value={country} onChangeText={setCountry} placeholder="Country" placeholderTextColor="#6b7280" />
            ) : (
              <Text style={styles.value}>{country}</Text>
            )}
          </View>
        </View>

        {/* Primary Button: Edit / Save */}
        <TouchableOpacity style={styles.primaryButton} onPress={onPrimaryPress}>
          <Text style={styles.primaryButtonText}>{editMode ? 'Save Changes' : 'Edit Profile'}</Text>
        </TouchableOpacity>

        {/* Spacer */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B1220' }, // deep black-blue
  header: {
    paddingTop: hp(2.5),
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#E6F0FF' },

  profileCard: {
    marginTop: 18,
    marginHorizontal: 20,
    backgroundColor: '#0F2138', // darker navy
    borderRadius: 14,
    paddingVertical: 22,
    paddingHorizontal: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 8,
  },
  avatar: { width: 110, height: 110, borderRadius: 60, borderWidth: 3, borderColor: '#1E90FF', marginBottom: 12 },
  nameText: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', marginTop: 6 },
  emailText: { fontSize: 13, color: '#9CA3AF', marginTop: 6 },

  section: {
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: '#0F2138',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#63A4FF', marginBottom: 8 },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: { color: '#9CA3AF', fontSize: 13, maxWidth: '45%' },
  value: { color: '#fff', fontSize: 14, fontWeight: '600', textAlign: 'right', maxWidth: '55%' },

  input: {
    minWidth: 140,
    maxWidth: '55%',
    backgroundColor: '#071126',
    color: '#E6F0FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#17324D',
    textAlign: 'right',
  },

  inputInline: {
    width: '85%',
    backgroundColor: 'transparent',
    color: '#E6F0FF',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  primaryButton: {
    marginTop: 22,
    marginHorizontal: 20,
    backgroundColor: '#1E90FF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#1E90FF',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonText: { color: '#041226', fontWeight: '700', fontSize: 16 },
});