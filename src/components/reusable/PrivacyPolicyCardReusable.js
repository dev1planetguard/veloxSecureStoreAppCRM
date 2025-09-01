//reusable card for privacy policy & Terms-conditions 
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { wp, hp } from '../../utils/responsive'; // Make sure this exists

const PrivacyPolicyCardReusable = ({
  title = '',
  content = '',
  cardStyle = {},
  titleStyle = {},
  contentStyle = {},
}) => {
  return (
    <View style={[styles.card, cardStyle]}>
      <Text style={[styles.label, titleStyle]}>{title}</Text>
      <Text style={[styles.text, contentStyle]}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp(90),
    backgroundColor: '#1E1E1E',
    borderRadius: wp(3),
    padding: wp(4),
    marginVertical: hp(1),
    alignSelf: 'center',
  },
  label: {
    fontWeight: '700',
    fontSize: wp(4.5),
    marginBottom: hp(0.8),
    color: '#2979FF',
  },
  text: {
    fontSize: wp(3.8),
    lineHeight: hp(3.5),
    color: '#E0E0E0',
  },
});

export default PrivacyPolicyCardReusable;
