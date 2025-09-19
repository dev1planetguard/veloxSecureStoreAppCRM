import React from 'react';
import { TextInput as RNTextInput, StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TextInput = ({ 
  style, 
  placeholder, 
  value, 
  onChangeText, 
  keyboardType, 
  autoCapitalize, 
  multiline, 
  placeholderTextColor = '#999',
  ...props 
}) => {
  return (
    <RNTextInput
      style={[
        styles.input,
        multiline && { minHeight: hp('7%'), textAlignVertical: 'top' },
        style
      ]}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize || 'none'}
      multiline={multiline}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#32324e',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: Platform.OS === 'ios' ? hp('1.5%') : hp('1%'),
    backgroundColor: '#1a1a2c',
    color: '#fff',
    fontSize: wp('4%'),
  },
});

export default TextInput;