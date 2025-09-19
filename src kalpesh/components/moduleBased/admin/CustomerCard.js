import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CustomerManagementCard({ customer, statusStyles, stageStyles }) {
  const status = statusStyles[customer.status] || statusStyles.default;
  const stage = stageStyles[customer.stage] || stageStyles.default;

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{customer.name}</Text>
          <Text style={styles.subText}>{customer.email}</Text>
          <Text style={styles.subText}>{customer.company}</Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Status:</Text>
          <View style={[styles.badge, { backgroundColor: status.bgColor }]}>
            <Text style={[styles.badgeText, { color: status.textColor }]}>{customer.status}</Text>
          </View>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Stage:</Text>
          <View style={[styles.badge, { backgroundColor: stage.bgColor }]}>
            <Text style={[styles.badgeText, { color: stage.textColor }]}>{customer.stage}</Text>
          </View>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Value:</Text>
          <Text style={styles.statValue}>{customer.totalValue}</Text>
        </View>
        {/*<View style={styles.statRow}>
          <Text style={styles.statLabel}>Last Activity:</Text>
          <Text style={styles.statValue}>{customer.lastActivity}</Text>
        </View>*/}
      </View>

      {/*<View style={styles.actions}>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
      </View>*/}
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
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(59,130,246,0.2)',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  subText: {
    color: '#94A3B8',
    fontSize: 12,
  },
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
  statLabel: {
    color: '#94A3B8',
    fontSize: 12,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  viewButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  viewText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
});
