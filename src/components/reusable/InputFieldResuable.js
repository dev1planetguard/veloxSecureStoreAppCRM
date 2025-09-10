import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { wp, hp } from '../../utils/responsive'; // Ensure wp/hp utils exist

const InputFieldReusable = ({
  placeholder = '',
  value = '',
  onChangeText = () => {},
  keyboardType = 'default',
  secureTextEntry = false,
  multiline = false,
  containerStyle = {},
  inputStyle = {},
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
    width: '100%',
    alignSelf: 'center',
    marginVertical: hp(1.5),
  },
  input: {
    height: hp(6),
    backgroundColor: '#1e1e1e',
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
    color: '#fff',
    fontSize: wp(4),
  },
});

export default InputFieldReusable;
