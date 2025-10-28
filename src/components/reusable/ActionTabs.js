import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { hp, responsiveFontSize, wp } from '../../utils/responsive';
import Feather from '@react-native-vector-icons/feather';

const ActionTabs = ({ actions, onActionPress }) => {
  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tabItem,{backgroundColor:action=='Payment'?'#2563EB':action=='Proposal'?'#16A34A':'#F59E0B'}]}
          onPress={() => onActionPress(action)}
        >
          <Feather color={'white'} name={action=='Payment'?'credit-card':action=='Proposal'?'send':'calendar'}/>
          <Text style={styles.tabText}>{action}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ActionTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp(1.7),
    
    
  },
  tabItem: {
    flexDirection:'row',
    backgroundColor: '#2563eb',
    paddingVertical: hp(1),
    // paddingHorizontal: 14,
    borderRadius: wp(20),
    width:wp(26),
    alignItems:'center', 
    justifyContent:'center',
    gap:wp(2)
   
  },
  tabText: {
    color: '#ffff',
    fontSize: responsiveFontSize(9),
    fontWeight: '500',
  },
});
