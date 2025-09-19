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
import { wp } from '../../utils/responsive';

const CardWithActions = ({ companyName, date, time, contactPerson, contactPersonmail,productInterested,address }) => {
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
    console.log(`${action} pressed for ${companyName}`);
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
      <View style={styles.row}>
        <Feather name="map-pin" size={14} 
        // color="#FFA500"
        color='#2563eb'
         />
        <Text style={styles.info}>{address}</Text>
      </View>
      <View style={styles.row}>
        <Feather name="calendar" size={14} color='#2563eb' />
        <Text style={styles.info}>{result.date}</Text>
      </View>
      <View style={styles.row}>
        <Feather name="clock" size={14} color='#2563eb' />
        <Text style={styles.info}>{result.time}</Text>
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
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 14,
    marginVertical: 8,
    marginHorizontal: wp(1.5),
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
   company: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  product: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  info: {
    color: '#ddd',
    fontSize: 12,
    marginLeft: 6,
  },
  animatedContainer: {
    overflow: 'hidden',justifyContent:'center'
  },
});
