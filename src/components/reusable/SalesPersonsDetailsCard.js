import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import Feather from '@react-native-vector-icons/feather';

const SalesPersonCard = ({
  name,
  email,
  phone,
  city,
  image,
  onPress,
  theme = 'dark', // supports 'dark' or 'light'
}) => {
  const isDark = theme === 'light';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Image
          source={
            image
              ? { uri: 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80' }
              : {uri:'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80'}// fallback image
          }
          style={styles.avatar}
        />

        <View style={styles.infoContainer}>
          <Text
            style={[styles.nameText, isDark ? styles.darkName : styles.lightName]}
          >
            {name}
          </Text>

          <View style={styles.row}>
            <Feather name="mail" size={15} color="#aaa" />
            <Text
              style={[styles.detailText, isDark ? styles.darkText : styles.lightText]}
            >
              {email || 'No Email'}
            </Text>
          </View>

          <View style={styles.row}>
            <Feather name="phone" size={13} color="#aaa" />
            <Text
              style={[styles.detailText, isDark ? styles.darkText : styles.lightText]}
            >
              {phone || 'No Phone'}
            </Text>
          </View>

          <View style={styles.row}>
            <Feather name="map-pin" size={15} color="#aaa" />
            <Text
              style={[styles.detailText, isDark ? styles.darkText : styles.lightText]}
            >
              {city || 'No City'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 14,
    marginVertical: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
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
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ccc',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  nameText: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 4,
  },
  lightName: {
    color: '#FDD835',
  },
  darkName: {
    color: '#FFD54F',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  detailText: {
    fontSize: 13,
    marginLeft: 6,
  },
  lightText: {
    color: '#666',
  },
  darkText: {
    color: '#ccc',
  },
});

export default SalesPersonCard;
