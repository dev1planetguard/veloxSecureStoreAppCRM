import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { wp, hp } from '../../utils/responsive'; // Assumes wp/hp return % of screen

const ButtonReusable = ({
  label = 'Button',
  onPress = () => {},
  disabled = false,
  containerStyle = {},
  textStyle = {},
  isloading
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled ? styles.disabled : {},
        containerStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >{isloading?<ActivityIndicator color="#fff" />:<Text style={[styles.buttonText, textStyle]}>
        {label}
      </Text>}
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',  
    height: hp(6), 
    backgroundColor: '#2979FF',
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp(2),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: wp(4),        // Responsive font size
    fontWeight: '600',
  },
  disabled: {
    backgroundColor: '#555',
  },
});

export default ButtonReusable;
