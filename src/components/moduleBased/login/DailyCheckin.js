import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import ImagePicker from "react-native-image-crop-picker";
import Geolocation from 'react-native-geolocation-service';
import { getFormattedDateTime } from '../../../utils/UtilityFunction';
import { submitDailyCheckInOut, submitDailyLogin } from '../../../api/apiFunctions/Login/Login_api_function';
import axios from 'axios';
import Feather from '@react-native-vector-icons/feather';
import { hp, wp } from '../../../utils/responsive';

export default function DailyCheckIn({ header, header2, button, onComplete }) {
  const navigation = useNavigation();
  const [selfieUri, setSelfieUri] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      console.error('Location permission error', err);
      return false;
    }
  };

  const pickImageAndSubmit = async (formattedDateTime, geoloc, id, img, header) => {
    try {
      const res = await submitDailyLogin(formattedDateTime, geoloc, id, img, header)
      console.log('Daily Login Response:', res);
      return res; // Axios already returns parsed JSON in res

    } catch (error) {
      console.log('Error submitting image + geo:', error);
    }
  };

  const captureSelfie = async () => {
    setIsProcessing(true);

    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        useFrontCamera: true, // ✅ ensures front camera on iOS
        mediaType: 'photo',
        compressImageQuality: 0.8,
      });
      console.log('Captured image:', image);

      // On both iOS & Android, use `image.path` for URI
      if (image?.path) {
        console.log('img pathhhh', image.path);

        setSelfieUri(image.path);
        // Location after selfie
        const hasLocation = await requestLocationPermission();
        if (!hasLocation) {
          // Alert.alert('Permission denied', 'Location access is required.');
          setIsProcessing(false);
          return;
        }
        captureLocation(image.path)
      }
    } catch (err) {
      console.log('Camera failed:', err);
      Alert.alert('Camera error', 'Unable to open camera. Please check permissions.');
    }
    setIsProcessing(false);
  };

  const captureLocation = async (img) => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      console.log('❌ Permission denied');
      return;
    }
    Geolocation.getCurrentPosition(
      async (position) => {
        console.log('📍 Location:', position.coords);
        const formattedDateTime = getFormattedDateTime()
        const geoloc = `${position.coords.latitude},${position.coords.longitude}`;
        const id = await AsyncStorage.getItem('userId');
        const res = await pickImageAndSubmit(formattedDateTime, geoloc, id, img, header);
        if (res?.statusCode === 200) {
          setLocationData({ lat: position.coords.latitude, lng: position.coords.longitude });
        } else {
          Alert.alert('Check-In/Out failed');
        }
      },
      (error) => {
        console.log('Location error:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleComplete = async () => {
    if (selfieUri && locationData) {
      if (header === 'Daily Check-Out') {
        await AsyncStorage.setItem('IS_DAILY_CHECKIN', 'false');
        await AsyncStorage.removeItem('jwtToken');
        onComplete()
        // navigation.replace('Login');
      } else {
        await AsyncStorage.setItem('IS_DAILY_CHECKIN', 'true');
        onComplete()
        // navigation.replace('SalesDrawer');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <View style={styles.card}>
          <View style={styles.header}>
             <View style={styles.iconBg}>
              <Feather name={'camera'} color="white" size={25} />
            </View>
            <Text style={styles.title}>{header}</Text>
            <Text style={styles.subtitle}>{header2}</Text>
          </View>

          {/* Selfie Section */}
          <View style={styles.section}>
             <View style={styles.sectionHeader}>
 <Feather name={'camera'} color="white" size={25} />
              <Text style={styles.sectionTitle}> Take Selfie</Text>
            </View>
            {selfieUri ? (
              <View style={styles.statusRow}>
                <Feather name={"check-circle"} color="#34D399" size={20} />
                <Text style={styles.statusText}>
                  {header === 'Daily Check-Out'
                    ? 'Still fresh as the morning!'
                    : 'I am looking great today!'}
                </Text>
                <Image source={{ uri: selfieUri }} style={styles.previewImage} />
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.button, isProcessing && styles.buttonDisabled]}
                onPress={captureSelfie}
                disabled={isProcessing}>
                {isProcessing ? (
                  <ActivityIndicator color="#fff" />
                ) : (<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:wp(3)}}>
                  <Feather name={'camera'} color="white" size={25} />
                  <Text style={styles.buttonText}>Take Selfie</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          </View>

          {/* Location Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
 <Feather name={'map-pin'} color="white" size={25} />
              <Text style={styles.sectionTitle}> Capture Location</Text>
            </View>
            {locationData ? (
              <View style={styles.statusRow}>
                <Feather name={"check-circle"} color="#34D399" size={20} />
                <Text style={styles.statusText}>
                  Location: {locationData.lat.toFixed(4)}, {locationData.lng.toFixed(4)}
                </Text>
              </View>
            ) : (
              <Text style={styles.infoText}>Location will be captured after taking selfie.</Text>
            )}
          </View>

          {/* Complete Button */}
          <TouchableOpacity
            style={[
              styles.button,
              selfieUri && locationData ? styles.buttonEnabled : styles.buttonDisabledComplete,
            ]}
            onPress={handleComplete}>
            <Text style={styles.buttonText}>{button || 'Complete Check-In'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  inner: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 360, backgroundColor: '#1e293b', borderRadius: 12, padding: wp(6), borderWidth: 1, borderColor: '#334155' },
  header: { alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  subtitle: { color: '#94a3b8', textAlign: 'center' },
  section: { marginBottom: 24 },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4,gap:wp(2) },
  statusText: { color: '#34D399', marginLeft: 4 },
  infoText: { color: '#94a3b8', fontStyle: 'italic' },
  previewImage: { width: 48, height: 48, borderRadius: 8, marginLeft: 8 },
  button: { backgroundColor: '#2563eb', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#1e293b' },
  buttonDisabledComplete: { backgroundColor: '#374151' },
  buttonEnabled: { backgroundColor: '#10b981' },
  buttonText: { color: '#fff', fontWeight: '600' },
  iconBg: { backgroundColor: '#2563eb', borderRadius: hp(25), width: wp(24), height: hp(11), alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { color: '#fff', fontWeight: '600', marginLeft: 4 },
});
