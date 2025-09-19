import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CustomButton = ({ title, onPress, bgColor }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: bgColor }]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: wp('5%'),
    marginHorizontal: wp('5%'),
    paddingVertical: wp('3%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: '600',
  },
});

export default CustomButton;
