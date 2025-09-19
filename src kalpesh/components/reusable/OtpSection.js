import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import GetOtpReusable from './GetOtpReusable'; // Your existing component
import { wp, hp } from '../../utils/responsive';
import InputFieldReusable from './InputFieldResuable';

const OtpSection = ({
  verified,
  otpSent,
  value,
  onChange,
  otp,
  onOtpChange,
  onSendOtp,
  onVerifyOtp,
  placeholder,
  
}) => {
  return (
    <View style={styles.container}>
      {!otpSent ? (
        <View style={styles.row}>
            <View style={{width:'70%'}}>
          <InputFieldReusable
                        placeholder={placeholder}
                         value={value}
                         onChangeText={onChange}
                        
                        />
                        </View>
                        <View style={{width:'30%'}}>
          <GetOtpReusable
            label="Get OTP"
            onPress={onSendOtp}
          />
          </View>
        </View>
      ) : (<View style={{width:'100%'}}>
        <View>
          <InputFieldReusable
                        placeholder={placeholder}
                         value={value}
                        //  onChangeText={onChange}
                            />
                        </View>
                        {!verified && <View style={styles.row}>
          
            <View style={{width:'70%'}}>

          <InputFieldReusable
                        placeholder="Email OTP (6 digits)"
                         value={otp}
                         onChangeText={(txt)=>onOtpChange(txt)}
                        
                        />
          </View>
          <View style={{width:'30%'}}>
          <GetOtpReusable
            label="Verify"
            onPress={onVerifyOtp}
          />
          </View>
        </View>}
        <View style={{width:'100%'}}><Text></Text></View>
       
        </View>
      )}
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    width:'100%'
    // marginTop: hp(2),
  },
  row: {
    flexDirection: 'row',
    // alignItems: 'center',
    width:'100%',

  },
  input: {
    flex: 1,
    height: hp(6),
    backgroundColor: '#222',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    color: '#fff',
    fontSize: wp(3.8),
  },
});

export default OtpSection;
