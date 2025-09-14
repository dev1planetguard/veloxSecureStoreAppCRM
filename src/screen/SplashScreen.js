import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { hp, wp } from '../utils/responsive'; // optional
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();
  const handleSession = async () => {
    const userId = await AsyncStorage.getItem('userId')
    if (userId === '1') {
      navigation.replace('AdminDashboard')
    }
    else {
      if (userId) {
        navigation.replace('SalesDashboard');
      }
      else {
        navigation.replace('Login')
      }
    }
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSession()
    }, 2000)

    return () => clearTimeout(timeout);
  }, [])

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
