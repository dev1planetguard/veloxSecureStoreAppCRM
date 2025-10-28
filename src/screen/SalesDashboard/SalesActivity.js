import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../config/config';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../components/reusable/Header';
import { hp } from '../../utils/responsive';

export default function SalesActivity() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const [token, userId] = await Promise.all([
          AsyncStorage.getItem('jwtToken'),
          AsyncStorage.getItem('userId'),
        ]);

        if (!userId) {
          setTransactions([]);
          setFilteredTransactions([]);
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/salesperson/getListOfClient/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        const result = await response.json();
        if (result.statusCode === 200 && Array.isArray(result.data)) {
          const formattedTransactions = result.data.map((item, index) => ({
            id: item.transactionId || `txn_${index}`,
            referenceNumber: item.referenceNumber || '',
            transactionId: item.transactionId || '',
            customerName: item.firstName || '',
            customerLocation: item.customerLocation || '',
            transactionDate: item.transactionDate || '',
            productName: item.productName || '',
            productQuantity: item.productQuantity || '',
          }));
          setTransactions(formattedTransactions);
          setFilteredTransactions(formattedTransactions);
        } else {
          setTransactions([]);
          setFilteredTransactions([]);
        }
      } catch (error) {
        setTransactions([]);
        setFilteredTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = transactions.filter((item) =>
      [item.customerName, item.productName, item.referenceNumber]
        .join(' ')
        .toLowerCase()
        .includes(text.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionCard}>
      <Text style={styles.transactionField}>
        <Text style={styles.fieldTitle}>Reference No: </Text>
        {item.referenceNumber}
      </Text>
      <Text style={styles.transactionField}>
        <Text style={styles.fieldTitle}>Transaction ID: </Text>
        {item.transactionId}
      </Text>
      <Text style={styles.transactionField}>
        <Text style={styles.fieldTitle}>Customer Name: </Text>
        {item.customerName}
      </Text>
      <Text style={styles.transactionField}>
        <Text style={styles.fieldTitle}>Customer Location: </Text>
        {item.customerLocation}
      </Text>
      <Text style={styles.transactionField}>
        <Text style={styles.fieldTitle}>Transaction Date: </Text>
        {item.transactionDate}
      </Text>
      <Text style={styles.transactionField}>
        <Text style={styles.fieldTitle}>Product Name: </Text>
        {item.productName}
      </Text>
      <Text style={styles.transactionField}>
        <Text style={styles.fieldTitle}>Product Quantity: </Text>
        {item.productQuantity}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* 🔹 Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={22} color="#60A5FA" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Activity</Text> */}

        {/* 🔹 Counter */}
        {/* <View style={styles.counterContainer}>
          <Text style={styles.counterText}>{filteredTransactions.length}</Text>
        </View>
      </View> */}
       <Header backgroundColor={'black'} title="My Activity" onMenuPress={() => navigation.openDrawer()} />

      {/* 🔹 Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={18} color="#999" style={{ marginRight: 6 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, product, or reference no..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredTransactions}
          keyExtractor={(_, index) => String(index)}
          renderItem={renderTransaction}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.noData}>No transactions found.</Text>}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 6,
    backgroundColor: '#000',
  },
  menuBtn: { marginRight: 8, padding: 4 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },

  // 🔹 Counter styles
  counterContainer: {
    backgroundColor: '#1E40AF',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // 🔹 Search bar styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 8,
    marginHorizontal: 12,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#222',
    marginTop:hp(3)
  },
  searchInput: { color: '#fff', flex: 1, fontSize: 14 },

  listContent: { padding: 12, paddingBottom: 70 },
  transactionCard: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  transactionField: { color: '#ccc', fontSize: 14, marginBottom: 4 },
  fieldTitle: { color: '#FFD700', fontWeight: '700' },
  noData: { color: 'yellow', fontSize: 18, textAlign: 'center', marginTop: 20 },
});
