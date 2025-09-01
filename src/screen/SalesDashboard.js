import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SalesDashboard = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Text>Sales Dashboard</Text>
      
    </View>
  )
}

const styles = StyleSheet.create({
     logoutButton: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: '#E63946',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default SalesDashboard