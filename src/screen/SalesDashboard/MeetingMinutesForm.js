import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal
} from 'react-native';
// import { RadioButton } from 'react-native-paper';
// import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextInput from '../../components/moduleBased/sales/TextInput';
// import {
//   getProducts,
//   getCityState,
//   calculateCartTotals,
//   sendPaymentLink,
//   saveMeetingMinutes,
//   generateProposalPDF
// } from '../../api/Sales/momApi';
import { getProducts,
    getCityState,
  calculateCartTotals,
  sendPaymentLink,
  saveMeetingMinutes,
  generateProposalPDF } from '../../api/apiFunctions/User_Sales_exe/momApi';
import { hp, wp } from '../../utils/responsive';
import Feather from '@react-native-vector-icons/feather';
import Dropdown from '../../components/reusable/Dropdown';

const pickerStyle = {
  inputIOS: {
    color: 'white',
    backgroundColor: '#1a1a2c',
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('3.5%'),
    borderRadius: wp('2%'),
    borderWidth: 1,
    borderColor: '#32324e',
    marginTop: hp('0.6%'),
    fontSize: wp('4%'),
    justifyContent: 'center',
  },
  inputAndroid: {
    color: 'white',
    backgroundColor: '#1a1a2c',
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('3.5%'),
    borderRadius: wp('2%'),
    borderWidth: 1,
    borderColor: '#32324e',
    marginTop: hp('0.6%'),
    fontSize: wp('4%'),
    justifyContent: 'center',
  },
  placeholder: {
    color: '#aaa',
    fontSize: wp('4%'),
  },
  modalViewMiddle: {
    backgroundColor: '#23234b',
  },
  modalViewBottom: {
    backgroundColor: '#23234b',
  },
  headlessAndroidContainer: {
    backgroundColor: '#23234b',
  },
};

 function MeetingMinutesForm({ navigation: navProp, route,onClose }) {
  const navigation = useNavigation();
  const customer = route?.params?.customer || {};
  const purchasePickerRef = useRef();
  const clientTypePickerRef = useRef();

  // Product and license type states
  const [products, setProducts] = useState([]);
  const [licenseTypes, setLicenseTypes] = useState([
    { label: '1 Year', value: 'Personal' },
    { label: '2 Years', value: 'SME' },
    { label: '3 Years', value: 'Enterprise' },
  ]);
  const [loadingProducts, setLoadingProducts] = useState(false);
const [customerInterest,setCustomerInterest] = useState('Interested')
  // Dropdown/form state
  const [customerInterested, setCustomerInterested] = useState('');
  const [purchaseType, setPurchaseType] = useState('');
  const [clientType, setClientType] = useState('');
  const [isSendingPaymentLoader, setIsSendingPaymentLoader] = useState(false);
  const [isSendingProposalLoader, setIsSendingProposalLoader] = useState(false);
  const [form, setForm] = useState({
    firstName: customer.firstName || '',
    lastName: customer.lastName || '',
    address: customer.address || '',
    city: '',
    state: '',
    pincode: '',
    email: customer.email || '',
    productName: '',
    licenseType: '',
    quantity: '1',
    timeRange: '',
    range: '',
    budget: '',
    companyName: '',
    contactFirstName: '',
    contactLastName: '',
    contactEmail: '',
    gstNo: '',
    purpose: '',
    notes: '',
    purchaseType: '',
    clientType: '',
    discount: '0'
  });

  // Get selected state name
  // useEffect(() => {
  //   const loadState = async () => {
  //     try {
  //       const savedState = await AsyncStorage.getItem('selectedState');
  //       if (savedState) {
  //         setForm(prevForm => ({
  //           ...prevForm,
  //           state: savedState,
  //         }));
  //       }
  //     } catch (error) {
  //       console.error('Failed to load state from storage:', error);
  //     }
  //   };

  //   loadState();
  // }, []);

  // Get selected city name
  // useEffect(() => {
  //   const loadCity = async () => {
  //     try {
  //       const savedCity = await AsyncStorage.getItem('selectedCity');
  //       if (savedCity) {
  //         setForm(prevForm => ({
  //           ...prevForm,
  //           city: savedCity,
  //         }));
  //       }
  //     } catch (error) {
  //       console.error('Failed to load city from storage:', error);
  //     }
  //   };

  //   loadCity();
  // }, []);

  // Fetch product list from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const response = await getProducts();
        if (response.statusCode === 200 && response.data) {
          setProducts(response.data.slice().reverse().map(p => ({ label: p, value: p })));
        } else {
          setProducts([]);
        }
      } catch (e) {
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // Handler for form input changes
  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));

    // If pincode is changed and is 6 digits, fetch city/state
    if (field === 'pincode' && value.length === 6 && /^\d{6}$/.test(value)) {
      fetchCityState(value);
    } else if (field === 'productName') {
      if(value === 'PlanetGuard Personal'){
        
        setForm(prev => ({ ...prev, ['licenseType']: 'Personal' }));
      }else{
setForm(prev => ({ ...prev, ['licenseType']: 'Free Trial' }));
      }

      // if (value === 'Personal') {
      //   setForm(prev => ({ ...prev, ['quantity']: '1' }));
      // } else if (value === 'SME') {
      //   setForm(prev => ({ ...prev, ['quantity']: '5' }));
      // } else {
      //   setForm(prev => ({ ...prev, ['quantity']: '1' }));
      // }
    } else if (field === 'discount') {
      const discountValue = parseInt(value);
      const limit = clientType === 'company' ? 40 : 30;

      if (!isNaN(discountValue) && discountValue <= limit) {
        setForm(prev => ({ ...prev, discount: value }));
      } else {
        console.log(`Discount too high for client type ${clientType}`);
        setForm(prev => ({ ...prev, discount: '' }));
      }
    }
  };

  // Fetch city/state on pincode
  // const fetchCityState = async (pincode) => {
  //   try {
  //     const response = await getCityState(pincode);
  //     if (response.statusCode === 200 && response.data) {
  //       setForm(prev => ({
  //         ...prev,
  //         city: response.data.city || prev.city,
  //         state: response.data.state || prev.state,
  //       }));
  //     }
  //   } catch (error) {
  //     console.error('Error fetching city/state:', error);
  //   }
  // };

  const fetchCityState = async (pincode) => {
  try {
    const data = await getCityState(pincode); // this is already response.data
    // if your backend sends {statusCode: 200, data:{city:'x', state:'y'}}
    if (data.statusCode === 200 && data.data) {
      setForm(prev => ({
        ...prev,
        city: data.data.city || prev.city,
        state: data.data.state || prev.state,
      }));
    }
    // if your backend sends {city:'x', state:'y'} directly:
    else if (data.city || data.state) {
      setForm(prev => ({
        ...prev,
        city: data.city || prev.city,
        state: data.state || prev.state,
      }));
    }
  } catch (error) {
    console.error('Error fetching city/state:', error);
  }
};


  // Quantity +/-
  const handleQuantity = type => {
    setForm(prev => {
      const q = Number(prev.quantity) || 1;
      return {
        ...prev,
        quantity: String(type === '+' ? q + 1 : q > 1 ? q - 1 : 1),
      };
    });
  };

  // Picker dropdown icon
  const dropdownIcon = (isFrom) =>
    <View style={[styles.iconContainer, { marginTop: isFrom ? hp('1.9%') : hp('1.2%') }]}>
      <Icon name="chevron-down" size={wp('5%')} color="#fff" />
    </View>

  // Navigation handlers
  const goToSalesrepDash = () => {
    // navigation.navigate('SalesRepDash');
    onClose()
  };

 

  // Validate form
  function validateForm(form, customerInterested, purchaseType, clientType) {
    // List of required fields depending on selection
    const requiredFields = [
      { key: 'firstName', label: 'First Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'address', label: 'Address' },
      { key: 'city', label: 'City' },
      { key: 'state', label: 'State' },
      { key: 'pincode', label: 'Pincode' },
      { key: 'email', label: 'Email' },
    ];

    // Add dynamic fields
    if (customerInterested === 'Interested') {
      requiredFields.push(
        { key: 'productName', label: 'Product Name' },
        { key: 'licenseType', label: 'License Type' },
        { key: 'quantity', label: 'Quantity' },
      );
    }
    if (purchaseType) {
      if (purchaseType === 'probably') {
        requiredFields.push(
          { key: 'timeRange', label: 'Time Range' },
          { key: 'range', label: 'Range' },
          { key: 'budget', label: 'Budget' }
        );
      } else if (purchaseType === 'Immediately') {
        requiredFields.push(
          { key: 'purchaseType', label: 'Purchase Type' },
          { key: 'clientType', label: 'Client Type' },
        );
      }
    }
    if (clientType === 'company') {
      requiredFields.push(
        { key: 'companyName', label: 'Company Name' },
        { key: 'contactFirstName', label: 'Contact Person First Name' },
        { key: 'contactLastName', label: 'Contact Person Last Name' },
        { key: 'contactEmail', label: 'Contact Email' },
        { key: 'gstNo', label: 'GST No' },
      );
    }

    // Validate required fields are filled
    for (const field of requiredFields) {
      if (!form[field.key] || form[field.key].trim() === '') {
        Alert.alert('Validation', `${field.label} is required.`);
        return false;
      }
    }

    // Email format
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      Alert.alert('Validation', `Email is not valid.`);
      return false;
    }
    if (form.contactEmail && form.contactEmail !== '' && !/^\S+@\S+\.\S+$/.test(form.contactEmail)) {
      Alert.alert('Validation', `Contact Email is not valid.`);
      return false;
    }

    // Pincode validation
    if (form.pincode && !/^\d{6}$/.test(form.pincode)) {
      Alert.alert('Validation', 'Pincode must be 6 digits.');
      return false;
    }

    // Quantity validation
    if (form.quantity && (!/^\d+$/.test(form.quantity) || Number(form.quantity) < 1)) {
      Alert.alert('Validation', 'Quantity must be a positive number.');
      return false;
    }

    // Budget/range validation (if present)
    if (form.budget && form.budget !== '' && isNaN(Number(form.budget))) {
      Alert.alert('Validation', 'Budget must be a number.');
      return false;
    }
    if (form.range && form.range !== '' && isNaN(Number(form.range))) {
      Alert.alert('Validation', 'Range must be a number.');
      return false;
    }

    // GST No validation (basic)
    if (form.gstNo && form.gstNo.length > 0 && form.gstNo.length < 15) {
      Alert.alert('Validation', 'GST No should be 15 characters.');
      return false;
    }

    // All validations passed!
    return true;
  }

  // Payment link handler
  const handlePaymentLink = async () => {
    if (!validateForm(form, customerInterested, purchaseType, clientType)) {
      return;
    }

    if (purchaseType === '' || clientType === '') {
      Alert.alert('Validation', 'Purchase and Client type is required.');
      return;
    }

    try {
      // Get cart totals
      const response = await calculateCartTotals(
        form.productName,
        form.licenseType,
        form.quantity
      );

      if (response.statusCode !== 200 || !response.data) {
        throw new Error(response.message || 'Failed to calculate totals');
      }

      const { subtotal, gst, grandTotal } = response.data;

      // Build the payload for sending the payment link
      const userId = await AsyncStorage.getItem('userId');
      setIsSendingPaymentLoader(true);

      const body = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        address: form.address,
        state: form.state,
        city: form.city,
        pincode: form.pincode,
        purchaseType: form.licenseType,
        contactName: clientType === 'company'
          ? `${form.contactFirstName} ${form.contactLastName}`.trim()
          : '',
        contactEmail: form.contactEmail,
        gstNos: form.gstNo,
        purpose: form.purpose,
        productName: form.productName,
        quantity: form.quantity,
        companyName: form.companyName,
        type: purchaseType,
        notes: form.notes,
        time: form.timeRange,
        budget: form.budget,
        licenseType: form.licenseType,
        userId,
        subtotal,
        gstAmount: gst,
        grandTotal,
        mobileNumber: customer.phone,
        discount: form.discount,
        clientType: clientType
      };

      // Call the payment link API
      console.log('body from send payment',body);
      
      const paymentResponse = await sendPaymentLink(body);
      if (paymentResponse.statusCode === 200) {
        Alert.alert(
          'Mail Sent',
          'Payment link sent successfully!',
          [{ text: 'OK', onPress: goToSalesrepDash }]
        );
      } else {
        throw new Error(paymentResponse.message || 'Failed to send payment link');
      }
    } catch (e) {
      console.warn(e);
      Alert.alert('Error', e.message || 'Network error');
    } finally {
      setIsSendingPaymentLoader(false);
    }
  };

  // Save handler
  const handleSave = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!validateForm(form, customerInterested, purchaseType, clientType)) {
      return;
    }
    
    const body = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      address: form.address,
      state: form.state,
      city: form.city,
      pincode: form.pincode,
      companyName: form.companyName,
      purpose: form.purpose,
      productName: form.productName,
      quantity: form.quantity,
      notes: form.notes,
      type: purchaseType,
      time: form.timeRange,
      budget: form.budget,
      purchaseType: form.licenseType,
      contactName: clientType === 'company'
        ? `${form.contactFirstName} ${form.contactLastName}`.trim()
        : '',
      contactEmail: form.contactEmail,
      gstNos: form.gstNo,
      userId: userId,
      discount: form.discount,
      clientType: clientType
    };
    
    try {
      const response = await saveMeetingMinutes(body);
      if (response.statusCode === 200) {
        Alert.alert(
          'Success',
          response.message,
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('SalesRepDash')
            }
          ]
        );
      } else {
        Alert.alert('Error', response.message || 'Could not save MOM');
      }
    } catch (e) {
      Alert.alert('Error', 'Network error');
    }
  };

  // Proposal handler
  const handleSendProposal = async () => {
    if (!validateForm(form, customerInterested, purchaseType, clientType)) {
      return;
    }

    if (purchaseType === '' || clientType === '') {
      Alert.alert('Validation', 'Purchase and Client type is required.');
      return;
    }

    const userId = await AsyncStorage.getItem('userId');
    const body = {
      userId: userId,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      address: form.address,
      state: form.state,
      city: form.city,
      pincode: form.pincode,
      companyName: form.companyName,
      purpose: form.purpose,
      productName: form.productName,
      quantity: form.quantity,
      notes: form.notes,
      type: purchaseType,
      time: form.timeRange,
      budget: form.budget,
      purchaseType: form.licenseType,
      contactName: clientType === 'company'
        ? `${form.contactFirstName} ${form.contactLastName}`.trim()
        : '',
      contactEmail: form.contactEmail,
      gstNos: form.gstNo,
      discount: form.discount,
      clientType: clientType,
      mobileNumber: customer.phone
    };
    
    try {
      setIsSendingProposalLoader(true);
      const response = await generateProposalPDF(body);
      if (response.statusCode === 200) {
        Alert.alert(
          'Success',
          response.message,
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('SalesRepDash')
            }
          ]
        );
      } else {
        Alert.alert('Error', response.message || 'Could not save MOM');
      }
    } catch (e) {
      Alert.alert('Error', 'Network error');
    } finally {
      setIsSendingProposalLoader(false);
    }
  };

  return (
    <Modal animationType='slide'>
    <View style={{ flex: 1, backgroundColor: '#13132a' }}>
      {/* Header Row: Only cross (close) and back button */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={goToSalesrepDash} style={styles.iconBtn}>
          <Icon name="arrow-left" size={wp('6%')} color="#fff" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={goToSalesrepDash} style={styles.iconBtn}>
          <Icon name="x-circle" size={wp('7%')} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          {/* Name Row */}
          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                placeholder="Enter first name"
                value={form.firstName}
                onChangeText={t => handleChange('firstName', t)}
              />
            </View>
            <View style={styles.half}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                placeholder="Enter last name"
                value={form.lastName}
                onChangeText={t => handleChange('lastName', t)}
              />
            </View>
          </View>
          
          {/* Address Row */}
          <Text style={styles.label}>Address</Text>
          <TextInput
            placeholder="Enter address"
            value={form.address}
            onChangeText={t => handleChange('address', t)}
          />
          
          {/* Email Row */}
          <Text style={styles.label}>Email ID</Text>
          <TextInput
            placeholder="Enter email"
            value={customer.email ? customer.email : form.email}
            onChangeText={t => handleChange('email', t)}
            keyboardType="email-address"
          />

          {/* City, State, Pincode */}
          <View style={styles.row}>
            <View style={styles.third}>
              <Text style={styles.label}>City</Text>
              <TextInput
                placeholder="Enter city"
                value={form.city}
                onChangeText={t => handleChange('city', t)}
              />
            </View>
            <View style={styles.third}>
              <Text style={styles.label}>State</Text>
              <TextInput
                placeholder="Enter state"
                value={form.state}
                onChangeText={t => handleChange('state', t)}
              />
            </View>
            <View style={styles.third}>
              <Text style={styles.label}>Pincode</Text>
              <TextInput
                placeholder="Enter pincode"
                value={form.pincode}
                keyboardType="number-pad"
                onChangeText={t => handleChange('pincode', t)}
              />
            </View>
          </View>

          {/* Customer Interest */}
          <Text style={styles.sectionTitle}>Customer Interest</Text>
          <View style={styles.radioRow}>
        <View style={styles.row}>
                                    {['Interested', 'Not Interested'].map(type => (
                                        <TouchableOpacity
                                            key={type}
                                            style={styles.radioBtn}
                                            onPress={() => setCustomerInterested(type)}
                                        >
                                            <Feather
                                                name={customerInterested === type ? 'disc' : 'circle'}
                                                size={25}
                                                color="#2979FF"
                                            />
                                            <Text style={styles.radioText}>
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
          </View>

          {/* Product details, if interested */}
          {customerInterested === "Interested" && (
            <View style={{ marginTop: hp('1%'), backgroundColor: '#151538', padding: wp('3%'), borderRadius: wp('2.5%') }}>
              {/* Product Dropdown */}
              <Text style={styles.label}>Product Name</Text>
              {/* <View style={{ width: '45%' }}> */}
                                              <Dropdown
                                                  txt="#fff"
                                                  // bg="#6200ee"
                                                  options={products}
                                                  selected={form.productName}
                                                  placeholder={'Select product'}
                                                  onSelect={v => handleChange('productName', v)}
                                              />
                                          {/* </View> */}
              {/* <RNPickerSelect
                onValueChange={v => handleChange('productName', v)}
                items={products}
                value={form.productName}
                disabled={loadingProducts}
                placeholder={{ label: loadingProducts ? 'Loading...' : 'Select product', value: '' }}
                style={pickerStyle}
                Icon={() => dropdownIcon(true)}
                useNativeAndroidPickerStyle={false}
              /> */}

              {/* License Type Dropdown */}
              {form.productName == 'PlanetGuard Personal' ? <>
               <Text style={[styles.label, { marginTop: hp('1.5%') }]}>Subscription Type</Text>
              <Dropdown
                                                  txt="#fff"
                                                  // bg="#6200ee"
                                                  options={licenseTypes}
                                                  selected={form.licenseType}
                                                  placeholder={'Select Subscription type'}
                                                  onSelect={v => handleChange('licenseType', v)}
                                              />
                                               {/* Quantity +/- */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('2.2%') }}>
                <Text style={styles.label}>Quantity</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: wp('4%') }}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    disabled={form.licenseType === 'SME' ? form.quantity === '5' ? true : form.quantity === '1' ? true : false : false}
                    onPress={() => handleQuantity('-')}
                  >
                    <Icon name="minus" size={wp('5.5%')} color="#fff" />
                  </TouchableOpacity>
                  <TextInput
                    style={[styles.qtyValue, { minWidth: wp('10%'), textAlign: 'center', color: '#fff' }]}
                    keyboardType="numeric"
                    value={String(form.quantity)}
                    onChangeText={text => {
                      const numericValue = text.replace(/[^0-9]/g, '');
                      handleChange('quantity', numericValue);
                    }}
                    maxLength={10}
                  />
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    disabled={form.licenseType === 'SME' && form.quantity === 50}
                    onPress={() => handleQuantity('+')}
                  >
                    <Icon name="plus" size={wp('5.5%')} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
              </>:null
              }
             
              {/* <RNPickerSelect
                onValueChange={v => handleChange('licenseType', v)}
                items={licenseTypes}
                value={form.licenseType}
                placeholder={{ label: 'Select license type', value: '' }}
                style={pickerStyle}
                Icon={() => dropdownIcon(true)}
                useNativeAndroidPickerStyle={false}
              /> */}
              
             
            </View>
          )}

          {/* Purchase Type */}
          <Text style={styles.sectionTitle}>Purchase Type</Text>
          {/* <TouchableOpacity
            activeOpacity={0.7}
            style={pickerStyle.inputAndroid}
            onPress={() => purchasePickerRef.current.togglePicker()}
          > */}
             <Dropdown
                                                  txt="#fff"
                                                  // bg="#6200ee"
                                                  options={[
                { label: 'Probably', value: 'probably' },
                { label: 'Immediately', value: 'immediately' },
              ]}
                                                  selected={purchaseType}
                                                  placeholder={'Select Subscription type'}
                                                  onSelect={v => setPurchaseType(v)}
                                              />
            {/* <RNPickerSelect
              ref={purchasePickerRef}
              onValueChange={v => setPurchaseType(v)}
              items={[
                { label: 'Probably', value: 'probably' },
                { label: 'Immediately', value: 'immediately' },
              ]}
              style={{ ...pickerStyle, inputAndroid: { color: purchaseType ? "#fff" : "#aaa" } }}
              value={purchaseType}
              placeholder={{ label: 'Select purchase type', value: '' }}
              Icon={dropdownIcon}
              useNativeAndroidPickerStyle={false}
              pointerEvents="none"
            /> */}
          {/* </TouchableOpacity> */}

          {/* Timeline details, if probably */}
          {purchaseType === "probably" && (
            <View style={[styles.row, { marginTop: hp('0.7%'), backgroundColor: '#403d29', padding: wp('2.5%'), borderRadius: wp('3%') }]}>
              <View style={styles.third}>
                <Text style={styles.label}>Time Range</Text>
                <TextInput
                  placeholder="e.g., 2-3 months"
                  placeholderTextColor="#aaa"
                  value={form.timeRange}
                  onChangeText={t => handleChange('timeRange', t)}
                />
              </View>
              <View style={styles.third}>
                <Text style={styles.label}>Range</Text>
                <TextInput
                  placeholder="Enter range"
                  placeholderTextColor="#aaa"
                  value={form.range}
                  onChangeText={t => handleChange('range', t)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.third}>
                <Text style={styles.label}>Budget</Text>
                <TextInput
                  placeholder="Enter budget"
                  placeholderTextColor="#aaa"
                  value={form.budget}
                  onChangeText={t => handleChange('budget', t)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          )}

          {/* Client Type */}
          <Text style={styles.sectionTitle}>Client Type</Text>
                       <Dropdown
                                                  txt="#fff"
                                                  // bg="#6200ee"
                                                  options={[
                { label: 'Personal', value: 'personal' },
                { label: 'Company', value: 'company' },
              ]}
                                                  selected={clientType}
                                                  placeholder={'Select Subscription type'}
                                                  onSelect={v => {
                setClientType(v);
                setForm(prev => ({ ...prev, clientType: v }));
              }}
                                              />
            {/* <RNPickerSelect
              ref={clientTypePickerRef}
              onValueChange={v => {
                setClientType(v);
                setForm(prev => ({ ...prev, clientType: v }));
              }}
              items={[
                { label: 'Personal', value: 'personal' },
                { label: 'Company', value: 'company' },
              ]}
              style={{ ...pickerStyle, inputAndroid: { color: clientType ? "#fff" : "#aaa" } }}
              value={clientType}
              placeholder={{ label: 'Select client type', value: '' }}
              Icon={dropdownIcon}
              useNativeAndroidPickerStyle={false}
              pointerEvents="none"
            /> */}
          

          {/* Company details, if company */}
          {clientType === "company" && (
            <View style={{ marginTop: hp('1.2%'), backgroundColor: '#124e32', borderRadius: wp('3%'), padding: wp('3%') }}>
              <Text style={styles.label}>Company Name</Text>
              <TextInput
                placeholder="Enter company name"
                placeholderTextColor="#aaa"
                value={form.companyName}
                onChangeText={t => handleChange('companyName', t)}
              />
              <View style={styles.row}>
                <View style={styles.half}>
                  <Text style={styles.label}>Contact Person First Name</Text>
                  <TextInput
                    placeholder="First Name"
                    placeholderTextColor="#aaa"
                    value={form.contactFirstName}
                    onChangeText={t => handleChange('contactFirstName', t)}
                  />
                </View>
                <View style={styles.half}>
                  <Text style={styles.label}>Contact Person Last Name</Text>
                  <TextInput
                    placeholder="Last Name"
                    placeholderTextColor="#aaa"
                    value={form.contactLastName}
                    onChangeText={t => handleChange('contactLastName', t)}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.half}>
                  <Text style={styles.label}>Contact Email ID</Text>
                  <TextInput
                    placeholder="Enter contact email"
                    placeholderTextColor="#aaa"
                    value={form.contactEmail}
                    onChangeText={t => handleChange('contactEmail', t)}
                    keyboardType="email-address"
                  />
                </View>
                <View style={styles.half}>
                  <Text style={styles.label}>GST No</Text>
                  <TextInput
                    placeholder="Enter GST number"
                    placeholderTextColor="#aaa"
                    value={form.gstNo}
                    onChangeText={t => handleChange('gstNo', t)}
                  />
                </View>
              </View>
            </View>
          )}

          {/* Purpose */}
          <Text style={styles.label}>Purpose</Text>
          <TextInput
            placeholder="Enter the purpose of the meeting"
            placeholderTextColor="#999"
            value={form.purpose}
            onChangeText={t => handleChange('purpose', t)}
            multiline
          />
          
          {/* Notes */}
          <Text style={styles.label}>Notes</Text>
          <TextInput
            placeholder="Enter any additional notes"
            placeholderTextColor="#999"
            value={form.notes}
            onChangeText={t => handleChange('notes', t)}
            multiline
          />

          {/* Discount */}
          <Text style={styles.label}>Discount in Percent</Text>
          <TextInput
            placeholder="+ Discount"
            placeholderTextColor="#999"
            value={form.discount}
            onChangeText={t => handleChange('discount', t)}
          />

          {/* Action Buttons: Show as per Customer Interest */}
          <View style={styles.actions}>
            {customerInterested === "Interested" ? (
              <>
              {purchaseType=='Probably'? 
               <TouchableOpacity 
                  style={[styles.actionBtn, { backgroundColor: '#16a34a' }]}
                  disabled={isSendingProposalLoader}
                  onPress={handleSendProposal}
                >
                  {isSendingProposalLoader ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      <Icon name="send" size={wp('5%')} color="#fff" style={{ marginRight: wp('1.5%') }} />
                      <Text style={styles.actionText}>Send Proposal</Text>
                    </>
                  )}
                </TouchableOpacity>
                :
<TouchableOpacity 
                  style={[styles.actionBtn, { backgroundColor: '#9333ea' }]}
                  disabled={isSendingPaymentLoader}
                  onPress={handlePaymentLink}
                >
                  {isSendingPaymentLoader ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      <Icon name="credit-card" size={wp('5%')} color="#fff" style={{ marginRight: wp('1.5%') }} />
                      <Text style={styles.actionText}>Send Payment Link</Text>
                    </>
                  )}
                </TouchableOpacity>
              }
               

                
              </>
            ) : (
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#2563eb' }]} onPress={handleSave}>
                <Icon name="download" size={wp('5%')} color="#fff" style={{ marginRight: wp('1.5%') }} />
                <Text style={styles.actionText}>Save</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: '#191932',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#23234b',
    justifyContent: 'space-between',
  },
  iconBtn: { padding: wp('1%') },
  container: { padding: wp('4%'), paddingBottom: hp('5%') },
  card: {
    borderRadius: wp('4%'),
    backgroundColor: '#23234b',
    marginBottom: hp('5%'),
    paddingVertical: hp('2.7%'),
    paddingHorizontal: wp('3.5%'),
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: wp('3%'),
    elevation: 4,
  },
  label: {
    color: '#cbd5e1',
    fontWeight: '500',
    marginTop: hp('1.5%'),
    marginBottom: hp('0.5%'),
    fontSize: wp('3.8%'),
  },
  sectionTitle: {
    color: '#3b82f6',
    fontWeight: '600',
    marginTop: hp('2.2%'),
    marginBottom: hp('1%'),
    fontSize: wp('3.8%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp('3%'),
  },
  half: { flex: 1, minWidth: '47%' },
  third: { width: '32%' },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2.5%'),
    marginTop: hp('1%'),
    marginBottom: hp('0.5%'),
  },
  radioText: {
    color: '#cbd5e1',
    fontSize: wp('3.8%'),
    marginRight: wp('5%'),
  },
  qtyBtn: {
    backgroundColor: '#353558',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.7%'),
    borderRadius: wp('1.5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyValue: {
    color: '#fff',
    fontSize: wp('4.2%'),
    marginHorizontal: wp('4.5%'),
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'column',
    gap: hp('1.7%'),
    marginTop: hp('3.7%'),
    marginBottom: hp('1.2%'),
  },
  actionBtn: {
    paddingVertical: hp('1.6%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: wp('0.5%'),
    elevation: 1,
  },
  actionText: {
    color: '#fff',
    fontSize: wp('4.2%'),
    fontWeight: 'bold',
  },
  iconContainer: {
    position: 'absolute',
    top: '50%',
    right: wp('3%'),
    pointerEvents: 'none',
  },
   radioBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24,
        marginTop: 12,
    },
    radioText: { color: '#fff', marginLeft: 6, fontSize: 15 },
});

export default MeetingMinutesForm;