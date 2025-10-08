import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const CustomerCard = ({ customer, isSelected, callOtpSent, callOtpVerified, onCall, onShowOtpModal, onShowLog }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Icon name="phone" size={wp(5)} color="#fff" />
        <View style={{ marginLeft: wp(3) }}>
          <Text style={styles.name}>{customer.name}</Text>
          <Text style={styles.phone}>{customer.phone}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.callButton} onPress={() => onCall(customer)}>
          <Icon name="phone" size={wp(4)} color="#fff" />
          <Text style={styles.buttonLabel}>
            {callOtpSent && isSelected ? 'Call Again' : 'Call'}
          </Text>
        </TouchableOpacity>
        
        {callOtpSent && isSelected && !callOtpVerified && (
          <TouchableOpacity style={styles.otpButton} onPress={onShowOtpModal}>
            <Text style={styles.buttonLabel}>Send OTP</Text>
          </TouchableOpacity>
        )}
        
        {callOtpVerified && isSelected && (
          <Icon name="check-circle" size={wp(5)} color="#10b981" />
        )}
        
        <TouchableOpacity style={styles.logButton} onPress={onShowLog}>
          <Text style={styles.buttonLabel}>Log</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    borderRadius: wp(2),
    padding: wp(3),
    marginHorizontal: wp(4),
    marginBottom: hp(1.5),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: '600',
  },
  phone: {
    color: '#94a3b8',
    fontSize: wp(3.5),
  },
  actions: {
    flexDirection: 'row',
    marginTop: hp(1),
    alignItems: 'center',
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: '#2563eb',
    padding: wp(2),
    borderRadius: wp(2),
    alignItems: 'center',
    marginRight: wp(2),
  },
  otpButton: {
    backgroundColor: '#10b981',
    padding: wp(2),
    borderRadius: wp(2),
    marginRight: wp(2),
  },
  logButton: {
    backgroundColor: '#475569',
    padding: wp(2),
    borderRadius: wp(2),
    marginLeft: wp(2),
  },
  buttonLabel: {
    color: '#fff',
    fontSize: wp(3.5),
    marginLeft: wp(1),
  },
});

export default CustomerCard;