import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { hp, wp } from '../utils/responsive'; // optional

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Login'); 
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
  
    <View style={styles.container}>

<Image
source={require('../../assets/images/splash.png')} // your splash logo path
style={styles.logo}
resizeMode="contain"
/>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  logo: {
width: 300,
height: 300,
},
  title: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: '#2979FF',
    marginBottom: hp(2),
  },
});

export default SplashScreen;
