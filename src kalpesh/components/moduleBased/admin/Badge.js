import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Badge({ text, style = {} }) {
  return (
    <View style={[styles.badge, { backgroundColor: style.bg || '#334155' }]}>
      <Text style={[styles.badgeText, { color: style.text || '#94A3B8' }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: wp('1.5%'),
    paddingVertical: hp('0.3%'),
    borderRadius: wp('3%'),
  },
  badgeText: {
    fontSize: wp('2.5%'),
    fontWeight: '600',
  },
});

