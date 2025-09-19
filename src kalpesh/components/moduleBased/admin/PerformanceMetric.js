// components/reusable/PerformanceMetric.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PerformanceMetric({ label, value }) {
  const pct = parseFloat(value); // convert "92%" -> 92
  return (
    <View style={styles.metricRow}>
      <View style={styles.metricLabelRow}>
        <Text style={styles.metricLabel}>{label}</Text>
        <Text style={styles.metricValue}>{value}</Text>
      </View>
      <View style={styles.metricBarBg}>
        <View style={[styles.metricBarFill, { width: `${pct}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  metricRow: { marginBottom: 12 },
  metricLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  metricLabel: { color: '#94A3B8', fontSize: 14 },
  metricValue: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  metricBarBg: {
    height: 6,
    backgroundColor: 'rgba(15,23,42,0.7)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  metricBarFill: {
    height: 6,
    backgroundColor: '#3B82F6',
    borderRadius: 3,
  },
});
