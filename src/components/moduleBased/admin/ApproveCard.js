import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ApproveCard = ({ item, onApprove }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
      <Text style={styles.field}>Role: {item.role}</Text>
      <Text style={styles.field}>Address: {item.address || '—'}</Text>
      <TouchableOpacity style={styles.approveBtn} onPress={() => onApprove(item.id)}>
        <Text style={styles.approveTxt}>Approve</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: wp('2%'),
    padding: wp('4%'),
    marginBottom: hp('1.5%'),
    elevation: 2,
  },
  name: {
    color: '#FFD700',
    fontSize: wp('4.5%'),
    fontWeight: '700',
    marginBottom: hp('1%'),
  },
  field: {
    color: '#ccc',
    fontSize: wp('3.5%'),
    marginTop: hp('0.5%'),
  },
  approveBtn: {
    marginTop: hp('1.5%'),
    backgroundColor: '#2979FF',
    paddingVertical: hp('1%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
  },
  approveTxt: {
    color: '#fff',
    fontSize: wp('3.5%'),
    fontWeight: '600',
  },
});

export default ApproveCard;


