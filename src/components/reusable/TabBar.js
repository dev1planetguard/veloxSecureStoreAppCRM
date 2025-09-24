import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { hp, responsiveFontSize, wp } from '../../utils/responsive';

const TabBar = ({ tabs, activeIndex, onTabPress }) => {
  return (
    <View style={styles.container}>
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tabItem, activeIndex === index && styles.activeTab]}
            onPress={() => onTabPress(index)}
          >
            <Text style={[styles.tabText, activeIndex === index && styles.activeText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      {/* </ScrollView> */}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // backgroundColor: '#1E1E1E',
    // paddingVertical: hp(1),
    // paddingHorizontal: wp(4),
    // bottom:hp(0.5),
  justifyContent:'space-evenly'

    

  },
  tabItem: {
    paddingVertical: hp(0.9),
    // paddingHorizontal: wp(2),
    borderRadius: 20,
    // marginRight: 10,
    backgroundColor: '#4C4C4C',
    width:wp(45),
    alignItems:'center',
    justifyContent:'center'
  },
  activeTab: {
    backgroundColor: '#2563eb',
  },
  tabText: {
    fontSize: responsiveFontSize(11),
    color: '#fff',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
});
