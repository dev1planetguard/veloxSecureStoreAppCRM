//for get otp & verify button

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { wp, hp } from '../../utils/responsive'; // Assumes utils return % of screen

const GetOtpReusable = ({
  label = 'Get OTP',
  onPress = () => {},
  disabled = false,
  containerStyle = {},
  textStyle = {},
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.otpBtn,
          disabled && styles.disabled,
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={[styles.otpBtnText, textStyle]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: wp(2),
    marginTop: hp(1.5),
  },
  otpBtn: {
    minWidth: wp(20), // Responsive min width
    height: hp(6),     // Responsive height
    backgroundColor: '#2979FF',
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp(4),
  },
  otpBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: wp(3.8),
  },
  disabled: {
    backgroundColor: '#555',
  },
});

export default GetOtpReusable;
