// WalkInWorkflow.js (CLI version with selfie skipped)

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { API_BASE_URL } from '../../config/config';
import { launchCamera } from 'react-native-image-picker';

const STAGE_API = `${API_BASE_URL}/saleStage/getSaleStageListing`;
const STATIC_PRODUCTS = [
  { label: 'PlanetGuard UESM', value: 'PlanetGuard UESM' },

];

export default function WalkIn() {
  const [step, setStep] = useState('start');
  const [selfieUri, setSelfieUri] = useState(null);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [productNames, setProductNames] = useState([]);
  const [stageList, setStageList] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const [stageLoading, setStageLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const pickerRef = useRef();

  const initialData = {
    firstName: '', lastName: '', email: '', phone: '', telephone: '',
    address: '', company: '', designation: '', contactPerson: '',
    contactPhone: '', contactEmail: '', requirements: '',
    gstNumber: '', productName: '', stages: [],
  };
  const [data, setData] = useState(initialData);

  // Fetch product + stage list
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');

        // Set static products instead of fetching from API
        setProductLoading(true);
        setProductNames(STATIC_PRODUCTS);
        setProductLoading(false);

        // Fetch stages
        setStageLoading(true);
        try {
          const res = await fetch(STAGE_API, {
            method: 'GET',
            headers: { Authorization: token ? `Bearer ${token}` : '' },
          });
          const json = await res.json();
          setStageList(
            (json.data || []).map(s => ({ label: s, value: s }))
          );
        } catch {
          setStageList([]);
        }
        setStageLoading(false);
      } catch (err) {
        console.error('Unexpected error in useEffect', err);
      }
    })();
  }, []);

  const start = () => setStep('selfie');

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      return result === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const takeSelfie = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera permission is required to take a selfie.');
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'front',
        saveToPhotos: false,
        includeBase64: false,
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) {
          return;
        }
        if (response.errorCode) {
          Alert.alert('Camera Error', response.errorMessage || response.errorCode);
          return;
        }
        const uri = response?.assets?.[0]?.uri;
        if (uri) {
          setSelfieUri(uri);
          Alert.alert('Selfie Captured', 'Proceeding to onboarding form.');
          setStep('onboarding');
        } else {
          Alert.alert('Error', 'Could not capture image. Please try again.');
        }
      }
    );
  };

  const askLocation = async () => {
    if (Platform.OS === 'android') {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return status === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobile = (phone) => /^\d{10}$/.test(phone);

  const validateFields = () => {
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!data.firstName || !nameRegex.test(data.firstName)) {
      Alert.alert('Validation Error', 'First Name must be letters only.');
      return false;
    }
    if (!data.lastName || !nameRegex.test(data.lastName)) {
      Alert.alert('Validation Error', 'Last Name must be letters only.');
      return false;
    }
    if (!data.email || !emailRegex.test(data.email)) {
      Alert.alert('Validation Error', 'Please enter a valid Email.');
      return false;
    }
    if (!data.phone || !phoneRegex.test(data.phone)) {
      Alert.alert('Validation Error', 'Phone number must be 10 digits.');
      return false;
    }
    if (!data.productName) {
      Alert.alert('Validation Error', 'Please select a Product.');
      return false;
    }
    if (!Array.isArray(data.stages) || data.stages.length === 0) {
      Alert.alert('Validation Error', 'Please select at least one Stage.');
      return false;
    }
    if (!data.designation.trim()) {
      Alert.alert('Validation Error', 'Please enter Designation.');
      return false;
    }
    if (!data.contactPerson.trim()) {
      Alert.alert('Validation Error', 'Please enter Contact Person.');
      return false;
    }
    if (!data.contactPhone || !phoneRegex.test(data.contactPhone)) {
      Alert.alert('Validation Error', 'Contact Phone must be 10 digits.');
      return false;
    }
    if (!data.contactEmail || !emailRegex.test(data.contactEmail)) {
      Alert.alert('Validation Error', 'Please enter a valid Contact Email.');
      return false;
    }
    return true;
  };

  const handleSchedule = async () => {
    const errors = {};
    Object.keys(data).forEach((key) => {
      if (key !== 'company' && key !== 'gstNumber' && key !== 'telephone' && !data[key]) {
        errors[key] = 'Required';
      }
    });

    if (!validateEmail(data.email)) errors.email = 'Invalid email';
    if (!validateMobile(data.phone)) errors.phone = 'Phone must be 10 digits';
    if (!validateMobile(data.contactPhone)) errors.contactPhone = 'Contact phone must be 10 digits';
    if (!validateEmail(data.contactEmail)) errors.contactEmail = 'Invalid contact email';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const token = await AsyncStorage.getItem('jwtToken') || '';
    const userId = await AsyncStorage.getItem('userId') || '';

    if (!selfieUri) {
      Alert.alert('Validation Error', 'Please capture a selfie before scheduling');
      return;
    }
    if (!validateFields()) return;

    setScheduleLoading(true);

    if (!(await askLocation())) {
      Alert.alert('Permission Denied', 'Location is required');
      setScheduleLoading(false);
      return;
    }

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
      companyName: data.company,
      contactPerson: data.contactPerson,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      role: data.designation,
      productName: data.productName,
      requirement: data.requirements || '',
      meeting: 'yes',
      userID: Number(userId),
      stages: data.stages,
      telephone: data.telephone || '',
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(payload));
    formData.append('image', {
      uri: selfieUri,
      type: 'image/jpeg',
      name: 'selfie.jpg',
    });

    try {
      const res = await fetch(`${API_BASE_URL}/salesperson/walkInCustomer`, {
        method: 'POST',
        headers: { Authorization: token ? `Bearer ${token}` : '' },
        body: formData,
      });
      const json = await res.json();
      if (json.statusCode === 200) {
        Alert.alert('Success', 'Customer added successfully');
      } else {
        Alert.alert('Error', json.message || 'Failed to add customer');
      }
    } catch (e) {
      Alert.alert('Error', 'Network/API error: ' + (e.message || ''));
    } finally {
      setScheduleLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {step === 'start' && (
          <View style={styles.center}>
            <Text style={styles.bigTitle}>Walk-In Customer</Text>
            <Text style={styles.subtitle}>Welcome! Let's get started.</Text>
            <TouchableOpacity style={styles.primaryButton} onPress={start}>
              <Text style={styles.primaryBtnText}>Start Walk-In</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'selfie' && (
          <View style={styles.center}>
            <Text style={styles.bigTitle}>Take Selfie</Text>
            <Text style={styles.subtitle}>Use your front camera to capture a selfie</Text>
            <TouchableOpacity style={styles.primaryButton} onPress={takeSelfie}>
              <Text style={styles.primaryBtnText}>Capture Selfie</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'onboarding' && (
          <View style={styles.formSection}>
            <Text style={styles.bigTitle}>Onboarding Details</Text>

            <View style={styles.row}>
              <View style={styles.halfField}>
                <Text style={styles.label}>First Name*</Text>
                <TextInput
                  style={styles.input}
                  value={data.firstName}
                  onChangeText={t => setData({ ...data, firstName: t })}
                />
              </View>
              <View style={styles.halfField}>
                <Text style={styles.label}>Last Name*</Text>
                <TextInput
                  style={styles.input}
                  value={data.lastName}
                  onChangeText={t => setData({ ...data, lastName: t })}
                />
              </View>
            </View>

            <Text style={styles.label}>Email*</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              value={data.email}
              onChangeText={t => setData({ ...data, email: t })}
            />
            {validationErrors.email && <Text style={styles.errorText}>{validationErrors.email}</Text>}

            <Text style={styles.label}>Phone*</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              value={data.phone}
              onChangeText={t => setData({ ...data, phone: t })}
              maxLength={10}
            />

            <Text style={styles.label}>Address*</Text>
            <TextInput
              style={styles.input}
              value={data.address}
              onChangeText={t => setData({ ...data, address: t })}
            />

            <Text style={styles.label}>Product Name*</Text>
            {productLoading ? (
              <ActivityIndicator color="#a78bfa" />
            ) : (
              <View style={{ marginBottom: 4 }}>
                <RNPickerSelect
                  onValueChange={v => {
                    setData({ ...data, productName: v });
                    setValidationErrors(prev => ({ ...prev, productName: '' }));
                  }}
                  items={productNames.length > 0 ? productNames : STATIC_PRODUCTS}
                  placeholder={{ label: 'Select Product', value: '' }}
                  style={pickerStyles}
                  useNativeAndroidPickerStyle={false}
                  value={data.productName}
                />
                {validationErrors.productName && (
                  <Text style={styles.errorText}>{validationErrors.productName}</Text>
                )}
              </View>
            )}

            <Text style={styles.label}>Stages*</Text>
            {stageLoading ? (
              <ActivityIndicator color="#a78bfa" />
            ) : (
              <View>
                {stageList.map(stage => (
                  <TouchableOpacity
                    key={stage.value}
                    style={styles.checkboxItem}
                    onPress={() => {
                      const stages = [...data.stages];
                      const idx = stages.indexOf(stage.value);
                      if (idx > -1) stages.splice(idx, 1);
                      else stages.push(stage.value);
                      setData({ ...data, stages });
                    }}
                  >
                    <Text style={{ color: '#fff' }}>
                      {data.stages.includes(stage.value) ? '✅' : '⬜️'} {stage.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.label}>Designation*</Text>
            <TextInput
              style={styles.input}
              value={data.designation}
              onChangeText={t => setData({ ...data, designation: t })}
            />

            <Text style={styles.label}>Company</Text>
            <TextInput
              style={styles.input}
              value={data.company}
              onChangeText={t => setData({ ...data, company: t })}
            />

            <Text style={styles.label}>Telephone</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              value={data.telephone}
              onChangeText={t => setData({ ...data, telephone: t })}
              placeholder="022-25881795"
              placeholderTextColor="#ffffff83"
            />

            <View style={styles.row}>
              <View style={styles.halfField}>
                <Text style={styles.label}>Contact Person*</Text>
                <TextInput
                  style={styles.input}
                  value={data.contactPerson}
                  onChangeText={t => setData({ ...data, contactPerson: t })}
                />
              </View>
              <View style={styles.halfField}>
                <Text style={styles.label}>Contact Phone*</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="phone-pad"
                  value={data.contactPhone}
                  onChangeText={t => setData({ ...data, contactPhone: t })}
                  maxLength={10}
                />
              </View>
            </View>

            <Text style={styles.label}>Contact Email*</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              value={data.contactEmail}
              onChangeText={t => setData({ ...data, contactEmail: t })}
            />
            {validationErrors.contactEmail && <Text style={styles.errorText}>{validationErrors.contactEmail}</Text>}

            <Text style={styles.label}>Requirements</Text>
            <TextInput
              style={styles.input}
              value={data.requirements}
              onChangeText={t => setData({ ...data, requirements: t })}
              multiline
              numberOfLines={3}
            />

            <Text style={styles.label}>GST Number</Text>
            <TextInput
              style={styles.input}
              value={data.gstNumber}
              onChangeText={t => setData({ ...data, gstNumber: t })}
            />

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSchedule}
              disabled={scheduleLoading}
            >
              {scheduleLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.primaryBtnText}>Schedule Next Meeting</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  scrollContent: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  formSection: { paddingBottom: 32 },
  bigTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { color: '#94a3b8', textAlign: 'center', marginBottom: 16, fontSize: 15 },
  primaryButton: { backgroundColor: '#16a34a', padding: 16, borderRadius: 8, marginTop: 20 },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  label: { color: '#cbd5e1', marginTop: 12, marginBottom: 4, fontWeight: 'bold' },
  input: { backgroundColor: '#334155', color: '#fff', borderRadius: 10, padding: 12 },
  checkboxItem: { paddingVertical: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfField: { flex: 1, marginHorizontal: 4 },
  errorText: { color: 'red', fontSize: 12, marginTop: 4 },
});

const pickerStyles = {
  inputIOS: {
    color: 'white', backgroundColor: '#334155', padding: 12, borderRadius: 10, marginBottom: 12,
  },
  inputAndroid: {
    color: 'white', backgroundColor: '#334155', padding: 12, borderRadius: 10, marginBottom: 12,
  },
};


