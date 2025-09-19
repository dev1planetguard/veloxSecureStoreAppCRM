import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Badge from './Badge';

export default function SalesRepCard({ rep, statusStyles, performanceStyles }) {
  const s = statusStyles[rep.status] || statusStyles.default;
  const p = performanceStyles[rep.performance] || performanceStyles.default;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: 'rgba(96,165,250,0.2)' }]}>
          <Icon name="user" size={20} color="#60A5FA" />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{rep.name}</Text>
          <Text style={styles.subText}>{rep.email}</Text>
          <Text style={styles.subText}>{rep.region}</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Status:</Text>
          <Badge text={rep.status} colors={s} />
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Performance:</Text>
          <Badge text={rep.performance} colors={p} />
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Deals Closed:</Text>
          <Text style={styles.statValue}>{rep.dealsClosedThisMonth}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Revenue:</Text>
          <Text style={styles.statValue}>{rep.revenue}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Conversion:</Text>
          <Text style={styles.statValue}>{rep.conversionRate}</Text>
        </View>
      </View>

      {/* Actions */}
      {/* <View style={styles.actions}>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewText}>Assign Task</Text>
        </TouchableOpacity>
      </View> */}
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
    padding: 16,
    marginBottom: 16,
  },
  header: { flexDirection: 'row', marginBottom: 12 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: { flex: 1 },
  name: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  subText: { color: '#94A3B8', fontSize: 12 },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statRow: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: { color: '#94A3B8', fontSize: 12 },
  statValue: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  actions: { flexDirection: 'row', justifyContent: 'flex-end' },
  viewButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    marginLeft: 8,
  },
  viewText: { color: '#94A3B8', fontSize: 14, fontWeight: '600' },
});
