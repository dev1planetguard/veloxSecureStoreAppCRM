import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const InputField = ({ value, onChangeText, placeholder, keyboardType = 'default' }) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#aaa"
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: wp('12%'),
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    marginVertical: wp('2%'),
    paddingHorizontal: wp('2%'),
    fontSize: wp('4%'),
    color: '#fff',
  },
});

export default InputField;
