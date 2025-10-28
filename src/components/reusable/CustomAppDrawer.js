import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Feather from '@react-native-vector-icons/feather';
import { hp } from '../../utils/responsive';
import { SafeAreaView } from 'react-native-safe-area-context';


const CustomDrawer = (props) => {
const {onpress,details} = props
console.log('detaild in custom',details);


  const handleLogout = () => {
    // Implement your logout logic here
    onpress()
    console.log("Logout pressed");
  };
  const PLACEHOLDER_AVATAR =
    'https://www.gravatar.com/avatar/?d=mp&s=200';

    const userImageUrl = ''
  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
           source={{ uri: userImageUrl || PLACEHOLDER_AVATAR }}// Replace with user's profile image
          style={styles.profileImage}
        />
        {/* <Text style={styles.profileName}>{details[0]?.firstName} {details?.lastName}</Text>
        <Text style={styles.profileEmail}>{details[0]?.email}</Text> */}
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
    </SafeAreaView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    // paddingVertical:hp(5)
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
