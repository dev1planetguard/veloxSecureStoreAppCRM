import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SearchButton({ title, onPress, type = 'primary' }) {
  return (
    <TouchableOpacity
      style={[styles.button, type === 'primary' ? styles.primary : styles.secondary]}
      onPress={onPress}
    >
      <Text style={type === 'primary' ? styles.primaryText : styles.secondaryText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#2563EB',
  },
  secondary: {
    borderWidth: 1,
    borderColor: '#334155',
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
});


