// Button.js
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const variants = {
  default: {
    button: {
      backgroundColor: '#2563eb',
    },
    text: { color: '#fff' },
  },
  outline: {
    button: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#2563eb',
    },
    text: { color: '#2563eb' },
  },
  ghost: {
    button: {
      backgroundColor: 'transparent',
    },
    text: { color: '#2563eb' },
  },
};

const Button = ({
  children,
  variant = 'default',
  style,
  textStyle,
  loading,
  ...props
}) => {
  const v = variants[variant] || variants.default;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        v.button,
        style,
        loading && styles.disabled,
      ]}
      activeOpacity={0.7}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={v.text.color || '#fff'}
        />
      ) : (
        <Text style={[styles.text, v.text, textStyle]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: wp('2%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: hp('4%'),
  },
  text: {
    fontSize: wp('4%'),
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Button;
