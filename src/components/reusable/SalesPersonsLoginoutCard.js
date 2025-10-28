import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Feather from '@react-native-vector-icons/feather';

const LoginLogoutCard = ({
  loginImage,
  logoutImage,
  loginTime,
  logoutTime,
  theme = 'dark',
}) => {
  const isDark = theme === 'light';

  return (
    <View style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}>
      <Feather
        name="calendar"
        size={22}
        color="#FFD54F"
        style={{ marginBottom: 8 }}
      />

      <View style={styles.row}>
        {/* Login Section */}
        <View style={styles.innerCard}>
          <Image
            source={
              loginImage
                ? { uri: 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80' }
              : {uri:'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80'}// fallback image
            }
            style={styles.image}
          />
          <Text style={styles.loginLabel}>Login</Text>
          <Text style={styles.timeText}>{loginTime || '--:--'}</Text>
        </View>

        {/* Logout Section */}
        <View style={styles.innerCard}>
          <Image
            source={
              logoutImage
                ? { uri: 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80' }
              : {uri:'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80'}// fallback image
            }
            style={styles.image}
          />
          <Text style={styles.logoutLabel}>Logout</Text>
          <Text style={styles.timeText}>{logoutTime || '--:--'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 14,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  darkCard: {
    backgroundColor: '#1E293B',
  },
  lightCard: {
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerCard: {
    flex: 1,
    // backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 4,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    width: '100%',
    height: 100,
  },
  loginLabel: {
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 6,
  },
  logoutLabel: {
    color: '#F57C00',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 6,
  },
  timeText: {
    color: '#999',
    fontSize: 13,
    marginBottom: 6,
  },
});

export default LoginLogoutCard;
