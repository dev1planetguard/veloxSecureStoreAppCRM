import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  Modal,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
// import { Picker } from '@react-native-picker/picker';

// Import utilities and components
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import onCallApi from '../../api/Sales/onCallWorkflowApi';
import CustomerCard from '../../components/moduleBased/sales/CustomerCard';
import OtpModal from '../../components/moduleBased/sales/OtpModal';

 function OnCallWorkflow({ onComplete }) {
  // State variables
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [callOtpSent, setCallOtpSent] = useState(false);
  const [callOtpVerified, setCallOtpVerified] = useState(false);
  const [showCallOtpModal, setShowCallOtpModal] = useState(false);
  const [callOtp, setCallOtp] = useState('');
  const [verifyingCallOtp, setVerifyingCallOtp] = useState(false);
  const [showCallLogModal, setShowCallLogModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    address: '',
    companyName: '',
    contactPersonName: '',
    city: '',
    pin: '',
    emailIdContactPerson: '',
    gstin: '',
    mobileNo: '',
    salesEmailId: '',
    status: 'onboarded',
    district: '',
    productSuite: '',
    productName: '',
    saleStages: [],
    quantity: 1,
    remarks: '',
  });

  // Dropdown data
  const [suites, setSuites] = useState([]);
  const [products, setProducts] = useState([]);
  const [saleStagesOptions, setSaleStagesOptions] = useState([]);

  useEffect(() => {
    fetchCustomers();
    loadSaleStages();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await onCallApi.getOnCallCustomers();
      if (response.statusCode === 200) {
        setCustomers(
          response.data.map((c) => ({
            id: c.number,
            name: c.name,
            phone: c.number,
            status: c.status.toLowerCase(),
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (e) {
      setError(e.message);
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  const loadSaleStages = async () => {
    try {
      const response = await onCallApi.getSaleStages();
      if (response.statusCode === 200) {
        setSaleStagesOptions(response.data);
      }
    } catch (error) {
      console.error('Error loading sale stages:', error);
    }
  };

  const handleCallCustomer = async (customer) => {
    setSelectedCustomer(customer);
    setCallOtpSent(false);
    setCallOtpVerified(false);
    
    try {
      await onCallApi.initiateCall(customer.phone);
      setCallOtpSent(true);

      // Make phone call
      const phoneNumber = `tel:${customer.phone}`;
      const supported = await Linking.canOpenURL(phoneNumber);
      
      if (supported) {
        await Linking.openURL(phoneNumber);
      } else {
        Alert.alert('Error', 'Phone calls are not supported on this device');
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const verifyCallOtp = async () => {
    if (!/^\d{6}$/.test(callOtp.trim())) {
      return Alert.alert('Error', 'Enter valid 6-digit OTP');
    }
    
    setVerifyingCallOtp(true);
    try {
      const response = await onCallApi.verifyCallOtp(selectedCustomer.phone, callOtp);
      if (response.statusCode === 200) {
        setCallOtpVerified(true);
        setShowCallOtpModal(false);
        setCallOtp('');
        setShowForm(true);
        setFormData(prev => ({ ...prev, mobileNo: selectedCustomer.phone }));
      } else {
        throw new Error(response.message);
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setVerifyingCallOtp(false);
    }
  };

  const addCustomer = async () => {
    if (!newName || !newPhone) {
      return Alert.alert('Error', 'Enter name and phone number');
    }

    try {
      const response = await onCallApi.addOnCallCustomer({
        name: newName,
        phone: newPhone
      });
      
      if (response.statusCode === 200) {
        Alert.alert('Success', `Customer ${newPhone} added`);
        setShowAddModal(false);
        setNewName('');
        setNewPhone('');
        fetchCustomers();
      } else {
        throw new Error(response.message);
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const submitOnboarding = async () => {
    setSubmitting(true);
    try {
      const response = await onCallApi.submitWalkInCustomer(formData);
      if (response.statusCode === 200) {
        Alert.alert('Success', 'Customer Added successfully');
        setShowForm(false);
        onComplete?.();
      } else {
        throw new Error(response.message);
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Toolbar */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={fetchCustomers}>
          <Icon name="refresh-cw" size={wp(6)} color="#10b981" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowAddModal(true)} style={{ marginLeft: wp(4) }}>
          <Icon name="plus" size={wp(6)} color="#10b981" />
        </TouchableOpacity>
      </View>

      {/* Customer List */}
      {!showForm && (
        <ScrollView contentContainerStyle={styles.listContainer}>
          <Text style={styles.heading}>On-Call Workflow</Text>
          {customers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              isSelected={selectedCustomer?.id === customer.id}
              callOtpSent={callOtpSent}
              callOtpVerified={callOtpVerified}
              onCall={handleCallCustomer}
              onShowOtpModal={() => setShowCallOtpModal(true)}
              onShowLog={() => setShowCallLogModal(true)}
            />
          ))}
        </ScrollView>
      )}

      {/* Call OTP Modal */}
      <OtpModal
        visible={showCallOtpModal}
        title="Enter Call OTP"
        otp={callOtp}
        setOtp={setCallOtp}
        verifying={verifyingCallOtp}
        onCancel={() => {
          setShowCallOtpModal(false);
          setCallOtp('');
        }}
        onSubmit={verifyCallOtp}
      />

      {/* Add Customer Modal */}
      <Modal visible={showAddModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add On-Call Customer</Text>
            <TextInput
              style={styles.inputFull}
              placeholder="Name"
              placeholderTextColor="#94a3b8"
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              style={styles.inputFull}
              placeholder="Phone"
              placeholderTextColor="#94a3b8"
              keyboardType="phone-pad"
              value={newPhone}
              onChangeText={setNewPhone}
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={addCustomer}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Call Log Modal */}
      <Modal visible={showCallLogModal} transparent animationType="slide">
        <SafeAreaView style={styles.logContainer}>
          <Text style={styles.logTitle}>Call History</Text>
          <ScrollView>
            <View style={styles.logEntry}>
              <Text style={styles.logTime}>2025-06-20 10:00</Text>
              <Text style={styles.logText}>Called, OTP sent</Text>
            </View>
            <View style={styles.logEntry}>
              <Text style={styles.logTime}>2025-06-20 10:02</Text>
              <Text style={styles.logText}>OTP verified</Text>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.closeLog}
            onPress={() => setShowCallLogModal(false)}
          >
            <Text style={styles.buttonLabel}>Close</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      {/* Onboarding Form */}
      {showForm && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex}
        >
          <ScrollView contentContainerStyle={styles.formContainer}>
            <View style={styles.formCard}>
              <View style={styles.formHeader}>
                <Text style={styles.formTitle}>Onboard Customer</Text>
                <TouchableOpacity onPress={() => setShowForm(false)}>
                  <Text style={styles.formCancel}>Cancel</Text>
                </TouchableOpacity>
              </View>

              {Object.entries(formData).map(([key, value]) => (
                <TextInput
                  key={key}
                  style={styles.input}
                  placeholder={key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  placeholderTextColor="#94a3b8"
                  value={value}
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, [key]: text }))
                  }
                  keyboardType={
                    key === 'pin' || key === 'mobileNo' ? 'phone-pad' : 'default'
                  }
                />
              ))}

              <TouchableOpacity
                style={[styles.submitBtn, submitting && styles.submitDisabled]}
                onPress={submitOnboarding}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitText}>Submit</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

OnCallWorkflow.propTypes = {
  onComplete: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  flex: {
    flex: 1,
  },
  errorText: {
    color: '#f87171',
    fontSize: wp(4),
    textAlign: 'center',
    marginTop: hp(40),
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: wp(4),
  },
  heading: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: wp(4),
    marginBottom: hp(2),
  },
  listContainer: {
    paddingBottom: hp(2),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1e293b',
    padding: wp(5),
    borderRadius: wp(2),
    width: wp(80),
  },
  modalTitle: {
    color: '#fff',
    fontSize: wp(4.5),
    marginBottom: hp(2),
    fontWeight: '600',
  },
  inputFull: {
    backgroundColor: '#334155',
    color: '#fff',
    borderRadius: wp(2),
    padding: wp(3),
    marginBottom: hp(2),
    fontSize: wp(4),
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: hp(1),
  },
  cancelButton: {
    marginRight: wp(3),
    padding: wp(2),
  },
  submitButton: {
    backgroundColor: '#10b981',
    padding: wp(3),
    borderRadius: wp(2),
    minWidth: wp(20),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: wp(3.5),
  },
  formContainer: {
    padding: wp(4),
  },
  formCard: {
    backgroundColor: '#1e293b',
    borderRadius: wp(2),
    padding: wp(4),
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  formTitle: {
    color: '#fff',
    fontSize: wp(5),
    fontWeight: '600',
  },
  formCancel: {
    color: '#f87171',
    fontSize: wp(4),
  },
  input: {
    backgroundColor: '#334155',
    color: '#fff',
    borderRadius: wp(2),
    padding: wp(3),
    marginBottom: hp(1.5),
    fontSize: wp(4),
  },
  submitBtn: {
    backgroundColor: '#10b981',
    padding: wp(3.5),
    borderRadius: wp(2),
    alignItems: 'center',
    marginTop: hp(2),
  },
  submitDisabled: {
    backgroundColor: '#475569',
  },
  submitText: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: '600',
  },
  logContainer: {
    flex: 1,
    backgroundColor: '#1e293b',
    padding: wp(4),
  },
  logTitle: {
    color: '#fff',
    fontSize: wp(5),
    fontWeight: '600',
    marginBottom: hp(2),
  },
  logEntry: {
    borderBottomColor: '#334155',
    borderBottomWidth: 1,
    paddingVertical: hp(1),
  },
  logTime: {
    color: '#94a3b8',
    fontSize: wp(3.5),
  },
  logText: {
    color: '#fff',
    fontSize: wp(4),
  },
  closeLog: {
    alignSelf: 'center',
    marginTop: hp(2),
    backgroundColor: '#2563eb',
    padding: wp(3),
    borderRadius: wp(2),
  },
  buttonLabel: {
    color: '#fff',
    fontSize: wp(4),
  },
});

export default OnCallWorkflow