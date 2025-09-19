import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function SummaryCard({ icon, iconColor, bgColor, label, value, meta, metaColor }) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
        <Icon name={icon} size={20} color={iconColor} />
      </View>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
        <Text style={[styles.meta, { color: metaColor }]}>{meta}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  label: { color: '#94A3B8', fontSize: 12 },
  value: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  meta: { fontSize: 10 },
});
