import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Input = ({ style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="#94a3b8"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#334155',
    borderRadius: wp('1.5%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    color: '#fff',
    fontSize: wp('3.8%'),
  },
});

export default Input;
