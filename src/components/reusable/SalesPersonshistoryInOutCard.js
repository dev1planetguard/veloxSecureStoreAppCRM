import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Entypo } from '@expo/vector-icons';
import Feather from '@react-native-vector-icons/feather';

const LoginLogoutHistoryCard = ({ type, time, details }) => {
  const [expanded, setExpanded] = useState(false);

  const isLogin = type.toLowerCase() === 'login';
  const iconColor = isLogin ? '#4CAF50' : '#FFA726'; // green / orange
  const iconName = isLogin ? 'login' : 'log-out';
  const borderColor = isLogin ? '#4CAF50' : '#FFA726';
  const titleColor = isLogin ? '#81C784' : '#FFB74D';

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={[styles.card, { borderColor }]}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.8}
      >
        <View style={styles.row}>
          <View style={[styles.iconCircle, { borderColor: iconColor }]}>
            <Feather name={iconName} size={20} color={iconColor} />
          </View>
          <View style={styles.info}>
            <Text style={[styles.title, { color: titleColor }]}>
              {isLogin ? 'Login' : 'Logout'}
            </Text>
            <Text style={styles.timeText}>{time}</Text>
          </View>
          <Feather
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color="#ccc"
          />
        </View>

        {expanded && details && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Coordinates:</Text>
            <Text style={styles.coordText}>
              {details?.coordinates?.join(', ') || 'N/A'}
            </Text>

            <Text style={styles.detailText}>Address:</Text>
            <Text style={styles.coordText}>{details?.address || 'N/A'}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    marginVertical: 6,
    padding: 10,
  },
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontWeight: '600',
    fontSize: 15,
  },
  timeText: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 2,
  },
  detailsContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 8,
  },
  detailText: {
    color: '#bbb',
    fontWeight: '500',
    marginTop: 4,
  },
  coordText: {
    color: '#ddd',
    fontSize: 13,
    marginLeft: 4,
  },
});

export default LoginLogoutHistoryCard;
