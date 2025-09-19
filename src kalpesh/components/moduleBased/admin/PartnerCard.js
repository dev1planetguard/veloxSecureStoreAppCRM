import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Badge from './Badge';

const statusStyles = {
  Active: { text: '#34D399', bg: 'rgba(52,211,153,0.2)' },
  Pending: { text: '#F59E0B', bg: 'rgba(245,158,11,0.2)' },
  Inactive: { text: '#94A3B8', bg: 'rgba(148,163,184,0.2)' },
  default: { text: '#94A3B8', bg: 'rgba(148,163,184,0.2)' },
};

const typeStyles = {
  'Technology Partner': { text: '#60A5FA', bg: 'rgba(96,165,250,0.2)' },
  'Channel Partner': { text: '#A78BFA', bg: 'rgba(167,139,250,0.2)' },
  'Strategic Partner': { text: '#34D399', bg: 'rgba(52,211,153,0.2)' },
  default: { text: '#94A3B8', bg: 'rgba(148,163,184,0.2)' },
};

export default function PartnerCard({ partner }) {
  const s = statusStyles[partner.status] || statusStyles.default;
  const t = typeStyles[partner.type] || typeStyles.default;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Icon name="building" size={20} color="#A78BFA" />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{partner.name}</Text>
          <Text style={styles.subText}>{partner.contactPerson}</Text>
          <Text style={styles.subText}>{partner.email}</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Type:</Text>
          <Badge text={partner.type} style={t} />
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Status:</Text>
          <Badge text={partner.status} style={s} />
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Region:</Text>
          <Text style={styles.statValue}>{partner.region}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Sales Reps:</Text>
          <Text style={styles.statValue}>{partner.salesRepsAssigned}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Revenue:</Text>
          <Text style={styles.statValue}>{partner.revenue}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Commission:</Text>
          <Text style={styles.statValue}>{partner.commission}</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewText}>Assign Rep</Text>
        </TouchableOpacity>
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
    backgroundColor: 'rgba(167,139,250,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginLeft: 8,
  },
  viewText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
});
