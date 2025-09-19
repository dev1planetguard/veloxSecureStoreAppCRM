import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function StatCard({ title, value, change, icon, iconColor, iconBg, borderColor }) {
  return (
    <View style={[styles.statCard, { borderLeftColor: borderColor }]}> 
      <View style={styles.statHeader}>
        <View style={[styles.iconWrapper, { backgroundColor: iconBg }]}> 
          <Icon name={icon} size={20} color={iconColor} />
        </View>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <View style={styles.statBody}>
        <Text style={styles.statValue}>{value}</Text>
        {typeof change === 'string' && change.length > 0 ? (
          <View style={styles.changeBadge}>
            <Text style={styles.changeText}>{change}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statCard: {
    width: '48%',
    backgroundColor: 'rgba(15,23,42,0.5)',
    borderLeftWidth: 4,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  statHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statTitle: { color: '#94A3B8', fontSize: 14, fontWeight: '500' },
  statBody: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statValue: { color: '#FFF', fontSize: 24, fontWeight: '700' },
  changeBadge: {
    backgroundColor: 'rgba(16,185,129,0.2)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  changeText: { fontSize: 12, fontWeight: '500', color: '#34D399' },
});


