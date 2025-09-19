
import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { wp, hp } from '../../utils/responsive'; // assumes you have responsive utils

const HalfInputReusable = ({
  placeholder = '',
  value = '',
  onChangeText = () => {},
  keyboardType = 'default',
  secureTextEntry = false,
  multiline = false,
  inputStyle = {},
  containerStyle = {},
  placeholderTextColor = '#777',
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(44), 
    marginRight: wp(2),
  },
  input: {
    height: hp(6.5),
    borderRadius: wp(2),
    backgroundColor: '#1e1e1e',
    color: '#fff',
    paddingHorizontal: wp(4),
    fontSize: wp(4),
  },
});

export default HalfInputReusable;
