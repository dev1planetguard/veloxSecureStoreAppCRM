import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const QuantitySelector = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onChange(Math.max(1, value - 1))} style={styles.button}>
        <Text style={styles.btnText}>–</Text>
      </TouchableOpacity>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity onPress={() => onChange(value + 1)} style={styles.button}>
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', marginBottom: hp('2%') },
  button: { backgroundColor: '#334155', borderRadius: wp('1%'), padding: wp('3%') },
  btnText: { color: '#fff', fontSize: wp('4.5%') },
  value: { color: '#fff', fontSize: wp('4%'), marginHorizontal: wp('4%'), minWidth: wp('8%'), textAlign: 'center' },
});

export default QuantitySelector;
