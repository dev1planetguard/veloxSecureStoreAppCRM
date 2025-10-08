import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function OverviewCard({ icon, iconColor, label, value, meta, metaColor }) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}>
        <Icon name={icon} size={20} color={iconColor} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {meta ? <Text style={[styles.meta, { color: metaColor }]}>{meta}</Text> : null}
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
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    color: '#94A3B8',
    fontSize: 12,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  meta: {
    fontSize: 10,
  },
});


