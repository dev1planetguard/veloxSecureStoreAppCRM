// screens/ProposalFormProps.js
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';
import PropTypes from 'prop-types';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Input from '../../components/moduleBased/sales/Input';
import Dropdown from '../../components/moduleBased/sales/Dropdown';
import QuantitySelector from '../../components/moduleBased/sales/QuantitySelector';
import { hp, wp } from '../../utils/responsive';

const ProposalFormProps = ({ customer, onComplete }) => {
  const [formData, setFormData] = useState({
    productSuite: '',
    productName: '',
    quantity: 1,
    companyName: '',
    contactPersonName: customer.name,
    address: '',
    city: '',
    district: '',
    pin: '',
    gstin: '',
    requirements: '',
    timeline: '',
    budget: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  const productSuites = ['Enterprise Suite', 'Business Suite', 'Professional Suite', 'Starter Suite', 'Custom Suite'];

  const productNames = {
    'Enterprise Suite': ['Advanced CRM', 'Enterprise Analytics', 'Full Integration'],
    'Business Suite': ['Business CRM', 'Standard Analytics', 'API Access'],
    'Professional Suite': ['Pro CRM', 'Basic Analytics', 'Limited Integration'],
    'Starter Suite': ['Basic CRM', 'Simple Reports', 'Standard Features'],
    'Custom Suite': ['Custom Solution', 'Tailored Features', 'Bespoke Integration'],
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'productSuite' ? { productName: '' } : {}),
    }));
  };

  const handleSubmit = () => {
    if (!formData.productSuite || !formData.productName || !formData.companyName) {
      Toast.show({ type: 'error', text1: 'Missing Information', text2: 'Please fill in all required fields' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Toast.show({ type: 'success', text1: 'Proposal Generated', text2: `Proposal created for ${formData.companyName}` });
      onComplete();
    }, 2000);
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Customer Summary */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Customer Summary</Text>
        <Text style={styles.summaryText}>Name: {customer.name}</Text>
        <Text style={styles.summaryText}>Phone: {customer.phone}</Text>
        {customer.email ? <Text style={styles.summaryText}>Email: {customer.email}</Text> : null}
      </View>

      {/* Product Details */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="package" size={20} color="#34d399" />
          <Text style={styles.cardHeaderText}>Product Details</Text>
        </View>

        <Dropdown
          label="Product Suite *"
          options={productSuites}
          value={formData.productSuite}
          onSelect={(val) => handleInputChange('productSuite', val)}
        />

        {formData.productSuite && (
          <Dropdown
            label="Product Name *"
            options={productNames[formData.productSuite]}
            value={formData.productName}
            onSelect={(val) => handleInputChange('productName', val)}
          />
        )}

        <Text style={styles.label}>Quantity</Text>
        <QuantitySelector value={formData.quantity} onChange={(val) => handleInputChange('quantity', val)} />

        <Text style={styles.label}>Specific Requirements</Text>
        <Input
          style={styles.textarea}
          placeholder="Any specific features or customizations needed..."
          multiline
          value={formData.requirements}
          onChangeText={(t) => handleInputChange('requirements', t)}
        />
      </View>

      {/* Company Details */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="user" size={20} color="#60a5fa" />
          <Text style={styles.cardHeaderText}>Company Details</Text>
        </View>
        <Input placeholder="Enter company name" value={formData.companyName} onChangeText={(t) => handleInputChange('companyName', t)} />
        <Input value={formData.contactPersonName} onChangeText={(t) => handleInputChange('contactPersonName', t)} />
        <Input placeholder="Enter GSTIN number" value={formData.gstin} onChangeText={(t) => handleInputChange('gstin', t)} />
      </View>

      {/* Address Details */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="map-pin" size={20} color="#c084fc" />
          <Text style={styles.cardHeaderText}>Address Details</Text>
        </View>
        <Input placeholder="Enter complete address" style={styles.textarea} multiline value={formData.address} onChangeText={(t) => handleInputChange('address', t)} />

        <View style={styles.row}>
          <View style={styles.half}>
            <Input placeholder="City" value={formData.city} onChangeText={(t) => handleInputChange('city', t)} />
          </View>
          <View style={styles.half}>
            <Input placeholder="District" value={formData.district} onChangeText={(t) => handleInputChange('district', t)} />
          </View>
        </View>

        <Input placeholder="PIN Code" value={formData.pin} onChangeText={(t) => handleInputChange('pin', t)} />
      </View>

      {/* Additional Info */}
      <View style={styles.row}>
        <View style={styles.half}>
          <Input placeholder="Expected Timeline (e.g., 2-3 months)" value={formData.timeline} onChangeText={(t) => handleInputChange('timeline', t)} />
        </View>
        <View style={styles.half}>
          <Input placeholder="Budget Range (e.g., $10k - $50k)" value={formData.budget} onChangeText={(t) => handleInputChange('budget', t)} />
        </View>
      </View>

      {/* Notes */}
      <Input placeholder="Any additional information..." style={styles.textarea} multiline value={formData.notes} onChangeText={(t) => handleInputChange('notes', t)} />

      {/* Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.outlineButton}>
          <Text style={styles.outlineButtonText}>Save Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Generate Proposal</Text>}
        </TouchableOpacity>
      </View>

      <Toast />
    </ScrollView>
  );
};

ProposalFormProps.propTypes = {
  customer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string,
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default ProposalFormProps;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: wp('4%') },
  card: { backgroundColor: '#1e293b', borderRadius: wp('2%'), padding: wp('3%'), marginBottom: hp('2%') },
  cardTitle: { color: '#fff', fontSize: wp('4.5%'), fontWeight: '600', marginBottom: hp('1%') },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: hp('1%') },
  cardHeaderText: { color: '#fff', fontSize: wp('4%'), marginLeft: wp('2%'), fontWeight: '500' },
  summaryText: { color: '#cbd5e1', fontSize: wp('3.5%'), marginVertical: hp('0.5%') },
  label: { color: '#cbd5e1', marginVertical: hp('1%'), fontSize: wp('3.5%') },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  half: { flex: 1, marginRight: wp('2%') },
  textarea: { minHeight: hp('12%'), textAlignVertical: 'top' },
  actionsRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: hp('3%') },
  outlineButton: { borderWidth: 1, borderColor: '#475569', borderRadius: wp('2%'), paddingVertical: hp('1.5%'), paddingHorizontal: wp('4%') },
  outlineButtonText: { color: '#cbd5e1', fontSize: wp('3.8%') },
  button: { backgroundColor: '#10b981', paddingVertical: hp('1.5%'), paddingHorizontal: wp('5%'), borderRadius: wp('2%'), marginLeft: wp('3%') },
  buttonDisabled: { backgroundColor: '#047857' },
  buttonText: { color: '#fff', fontSize: wp('4%'), fontWeight: '600' },
});
