import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Feather from '@react-native-vector-icons/feather';
import { hp } from '../../utils/responsive';


const CustomDrawer = (props) => {
const { onpress, details } = props;

  const handleLogout = () => {
    onpress();
  };
  const PLACEHOLDER_AVATAR =
    'https://www.gravatar.com/avatar/?d=mp&s=200';

    const userImageUrl = ''
    const isArray = Array.isArray(details);
    const firstName = isArray ? details?.[0]?.firstName : details?.firstName;
    const lastName = isArray ? details?.[0]?.lastName : details?.lastName;
    const email = isArray ? details?.[0]?.email : details?.email;
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
           source={{ uri: userImageUrl || PLACEHOLDER_AVATAR }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{firstName || 'User'} {lastName || ''}</Text>
        <Text style={styles.profileEmail}>{email || ''}</Text>
      </View>

      {/* Drawer List */}
      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Feather name="log-out" size={20} color="red" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    paddingVertical:hp(5)
  },
  profileSection: {
    backgroundColor: '#333',
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor:'black'
  },
  profileName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: '#ccc',
    fontSize: 14,
  },
  drawerContent: {
    paddingTop: 10,
    flexGrow: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },
});
