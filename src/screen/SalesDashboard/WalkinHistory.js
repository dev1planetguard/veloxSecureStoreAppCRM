import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, FlatList } from 'react-native';
import CardWithActions from '../../components/reusable/CardWithActions';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWalkinHistory } from '../../api/apiFunctions/User_Sales_exe/SalesDetails';



const WalkinHistory = () => {
    const[history,setHistory]= useState([])


useEffect(()=>
    {
const getHistory = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
const res = await getWalkinHistory(id)
    console.log('historyyyyy',res);
    setHistory(res.data)
    
    } catch (e) {
      console.log('Error reading AsyncStorage:', e);
    }
  };

  getHistory()
},[])



  return (
    <View style={styles.screen}>
      {/* <CardWithActions
        companyName="ABC Corp" 
        date="2025-09-15" 
        time="10:00 AM" 
        contactPerson="John Doe" 
      />
      <CardWithActions 
        companyName="XYZ Ltd." 
        date="2025-09-16" 
        time="2:30 PM" 
        contactPerson="Jane Smith" 
      /> */}

     <FlatList
  data={history}
  keyExtractor={(_, index) => index.toString()}
  contentContainerStyle={{ padding: 10 }}
  renderItem={({ item }) => {
    return (
      <CardWithActions 
        companyName={item.companyName} 
        date={item.time}
        contactPerson={item.firstName}
        contactPersonmail={item.contactEmail}
        productInterested={item.productName}
        address={item.address}
      />
    );
  }}
/>
    </View>
  );
};

export default WalkinHistory;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#121212',
  },
});
