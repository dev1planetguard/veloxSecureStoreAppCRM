// CustomDrawerContent.js
import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomDrawerContent(props) {
  const { navigation } = props;

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            // Clear any auth tokens or user data
            // await AsyncStorage.removeItem('jwtToken');

            // Reset navigation and go to login
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        style={{ marginTop: 20 }}
      />
    </DrawerContentScrollView>
  );
}
