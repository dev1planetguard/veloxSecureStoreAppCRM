import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ActivityRow({ message, time, status }) {
  return (
    <View style={styles.activityRow}>
      <View
        style={[
          styles.activityDot,
          { backgroundColor: status === 'success' ? '#34D399' : '#60A5FA' },
        ]}
      />
      <View style={styles.activityText}>
        <Text style={styles.activityMessage}>{message}</Text>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(15,23,42,0.3)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  activityDot: { width: 8, height: 8, borderRadius: 4, marginTop: 6, marginRight: 12 },
  activityText: { flex: 1 },
  activityMessage: { color: '#E2E8F0', fontSize: 14, lineHeight: 20 },
  activityTime: { color: '#94A3B8', fontSize: 12, marginTop: 4 },
});