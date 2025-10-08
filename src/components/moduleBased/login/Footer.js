import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { hp, wp } from '../../../utils/responsive';
 // Ensure wp/hp utils exist

const Footer = ({
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
         <Image
                             source={require('../../../../assets/images/footerveloxnewlatest.png')}
                             style={styles.footerImage}
                             resizeMode="contain"
                         />
                         <TouchableOpacity
                             style={styles.contactLink}
                            //  onPress={() => navigation.navigate('AboutUs')}
                         >
                             <Text style={styles.linkText}>Contact Us</Text>
                         </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: hp(1.5),
  },
  footer: {
         flexDirection: 'row',
         justifyContent: 'center',
         marginBottom: hp(2),
 
     },
     footerText: {
         color: '#777',
         fontSize: wp(3.5),
     },
     footerImage: {
         width: wp(80),
         height: hp(10),
         marginTop: hp(5),
         alignSelf:'center'
     },
     contactLink: {
         marginBottom: hp(4),
     },
     linkText: {
        color: '#2979FF',
        fontSize: wp(3.5),
        fontWeight: '600',
        alignSelf:'center'
    },
});

export default Footer;
