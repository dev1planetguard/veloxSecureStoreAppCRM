import React from 'react';
import { View, Text, StyleSheet, LinearGradient } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import Feather from '@react-native-vector-icons/feather';

const TotalDistanceCard = ({ distance = 0, date = '27/10/2025', theme = 'light' }) => {
  const isDark = theme === 'light';

  return (
    <View style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}>
      <View
        // colors={isDark ? ['#2a2a2a', '#1e1e1e'] : ['#f7f7f7', '#e9e9e9']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <Feather name="activity" size={18} color="#FFD54F" />
          <Text style={styles.headerText}>Total Distance Covered</Text>
        </View>

        {/* Distance Section */}
        <View style={styles.centerSection}>
          <Text style={styles.distanceText}>{distance}</Text>
          <Text style={styles.unitText}>kilometers</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Feather name="calendar" size={14} color="#ccc" />
          <Text style={styles.footerText}>Today - {date}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  gradient: {
    padding: 18,
  },
  darkCard: {
    backgroundColor: '#1E293B',
  },
  lightCard: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    color: '#FFD54F',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
  centerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  distanceText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFD54F',
  },
  unitText: {
    fontSize: 15,
    color: '#888',
  },
  footer: {
    backgroundColor: '#dcdcdc40',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    marginTop: 10,
  },
  footerText: {
    color: '#ccc',
    fontSize: 13,
    marginLeft: 6,
  },
});

export default TotalDistanceCard;
