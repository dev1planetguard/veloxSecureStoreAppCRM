import Feather from '@react-native-vector-icons/feather';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { hp, wp } from '../../utils/responsive';
// import { Ionicons } from '@expo/vector-icons'; // or use react-native-vector-icons/Ionicons

const Header = ({ title, onback ,onMenuPress,backgroundColor }) => {
  return (
    <View style={[styles.headerContainer,{backgroundColor:backgroundColor?backgroundColor:'#0F172A'}]}>
      <TouchableOpacity onPress={onMenuPress} style={styles.iconContainer}>
        <Feather name={onback?'arrow-left':"menu"} size={26} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 26 }} /> 
      {/* placeholder for spacing to balance layout */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#0F172A',
    // '#0B1B2B', // dark navy background
    paddingVertical: hp(1.3),
    paddingHorizontal: wp(2.5),
    borderBottomWidth: 0.5,
    borderBottomColor: '#003b9f',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  iconContainer: {
    padding: 4,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default Header;
