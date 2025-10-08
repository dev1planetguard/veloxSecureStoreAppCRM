import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing
} from 'react-native';
import ActionTabs from './ActionTabs';
import { splitDateTime } from '../../utils/UtilityFunction';
import Feather from '@react-native-vector-icons/feather';
import { hp, responsiveFontSize, wp } from '../../utils/responsive';

const CardWithActions = ({ companyName, date, time, contactPerson, contactPersonmail,productInterested,address, handleClick }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current; // initial height is 0
console.log('data in card with actions',companyName, date, time, contactPerson);
const result = splitDateTime(date)


  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false, // height can't use native driver
    }).start();
    setExpanded(!expanded);
  };

  const handleAction = (action) => {
    switch (action) {
    case 'Payment link': return handleClick(action,companyName,contactPerson,address,productInterested);
    case 'Schedule Meet': return { backgroundColor: '#3b82f6', text: '#eff6ff' };
    case 'Send Proposal': return handleClick(action,companyName,contactPerson,address,productInterested);
    default: return { backgroundColor: '#475569', text: '#cbd5e1' };
  }
    // console.log(`${action} pressed for ${companyName}`);
  };

  // Interpolate height from 0 to max (e.g., 60)
  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60], // Adjust the max height as needed
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={toggleExpand}
      activeOpacity={0.8}
    >
        <Text style={styles.company}>{companyName}</Text>
      <Text style={styles.product}>{productInterested}</Text>

      {/* Visit Information */}
      <View style={{flexDirection:'row',gap:wp(2),marginTop:hp(1)}}>
      <View style={styles.row}>
        <Feather name="map-pin" size={14} 
        // color="#FFA500"
        color='#2563eb'
         />
        <Text style={[styles.info,{maxWidth:wp(25),}]}>{address}</Text>
      </View>
      <View style={styles.row}>
        <Feather name="calendar" size={14} color='#2563eb' />
        <Text style={styles.info}>{result.date || '-'}</Text>
      </View>
      <View style={styles.row}>
        <Feather name="clock" size={14} color='#2563eb' />
        <Text style={styles.info}>{result.time || '-'}</Text>
      </View>
      </View>

      {/* Contact Person */}
      <View style={styles.row}>
        <Feather name="user" size={14} color='#2563eb' />
        <Text style={styles.info}>{contactPerson}</Text>
      </View>
      <View style={styles.row}>
        <Feather name="mail" size={14} color='#2563eb'/>
        <Text style={styles.info}>{contactPersonmail}</Text>
      </View>
      <Animated.View style={[styles.animatedContainer, { height: animatedHeight }]}>
        <View style={{borderWidth:0.2,borderColor:'grey'}}></View>
        <ActionTabs
          actions={['Payment link', 'Send Proposal', 'Schedule Meet']}
          onActionPress={handleAction}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default CardWithActions;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    // backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: wp(4),
    marginVertical: hp(1.5),
    marginHorizontal: wp(1.5),
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    borderWidth:1,
    borderColor:'#1e293b',
    borderLeftWidth: 4,
    borderLeftColor: '#2979FF',
  },
   company: {
    color: '#fff',
    fontSize: responsiveFontSize(14),
    fontWeight: 'bold',
    marginBottom: hp(1),
  },
  product: {
    color: '#ccc',
    fontSize: responsiveFontSize(12),
    marginBottom: hp(1.5),
  },
  row: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: hp(1),
  },
  info: {
    color: '#ddd',
    fontSize: responsiveFontSize(9),
    marginLeft: wp(2),
    fontWeight: '600',
    
  },
  animatedContainer: {
    overflow: 'hidden',justifyContent:'center'
  },
});
