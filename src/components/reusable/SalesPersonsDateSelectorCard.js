import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Feather from '@react-native-vector-icons/feather';
import { wp } from '../../utils/responsive';

const DateSelectorCard = ({
  date = '27 Oct 2025',
  isToday = true,
  onPrev,
  onNext,
  theme = 'light',
}) => {
  const isDark = theme === 'light';

  return (
    <View style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}>
      {/* Top Icon */}
      <Feather name="clock" size={18} color="#FFD54F" style={{ marginBottom: 10 }} />

      {/* Main Date Selector */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.arrowButton} onPress={onPrev}>
          <Feather name="chevron-left" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.dateContainer}>
          <Feather name="calendar" size={16} color="#FBC02D" />
          <Text style={styles.dateText}>{date}</Text>
          {isToday && (
            <View style={styles.todayBadge}>
              <Text style={styles.todayText}>Today</Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.arrowButton} onPress={onNext}>
          <Feather name="chevron-right" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 14,
    // alignItems: 'center',
    marginVertical: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  lightCard: {
    backgroundColor: '#fff',
  },
  darkCard: {
    backgroundColor: '#1E293B',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  arrowButton: {
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
    padding: 6,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9C4',
    borderWidth: 1.2,
    borderColor: '#FFD54F',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    width:wp(70),
    alignContent:'center',
    justifyContent:'center'
  },
  dateText: {
    color: '#FBC02D',
    fontWeight: '600',
    fontSize: 14,
    marginHorizontal: 6,
  },
  todayBadge: {
    backgroundColor: '#FFD54F',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  todayText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 12,
  },
});

export default DateSelectorCard;
