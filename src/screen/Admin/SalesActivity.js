
import React, { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { API_BASE_URL } from '../../config/config';
import TabBar from '../../components/reusable/TabBar';
import { getWalkinHistory } from '../../api/apiFunctions/User_Sales_exe/SalesDetails';

const SalesActivity = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { salesPerson } = route.params;

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        const response = await fetch(
          `${API_BASE_URL}/salesperson/getListOfClient/${salesPerson.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token ? `Bearer ${token}` : '',
            },
          }
        );

        const result = await response.json();
        console.log(result,'rrrrrrrres')

        if (result.statusCode === 200 && Array.isArray(result.data)) {
          
          const formattedTransactions = result.data.map((item, index) => ({
            id: item.transactionId || `txn_${index}`, // fallback id
            referenceNumber: item.referenceNumber || '',
            transactionId: item.transactionId || '',
            customerName: item.firstName || '',
            customerLocation: item.customerLocation || '',
            transactionDate: item.transactionDate || '',
            productName: item.productName || '',
            productQuantity: item.productQuantity || '',
          }));
          setTransactions(formattedTransactions);
        } else {
          setTransactions([]);
        }
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [salesPerson.id]);

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionCard}>
      <Text style={styles.transactionField}>
        <Text style={styles.fieldTitle}>Reference No: </Text>{item.referenceNumber}
      </Text>
      <Text style={styles.transactionField}>
        <Text style={styles.fieldTitle}>Transaction ID: </Text>{item.transactionId}
      </Text>
      <Text style={styles.transactionField}>
        <Text style={styles.fieldTitle}>Customer Name: </Text>{item.customerName}
      </Text>
      <Text style={styles.transactionField}>
        <Text style={styles.fieldTitle}>Customer Location: </Text>{item.customerLocation}
      </Text>
      <Text style={styles.transactionField}>
        <Text style={styles.fieldTitle}>Transaction Date: </Text>{item.transactionDate}
      </Text>
      <Text style={styles.transactionField}>
        <Text style={styles.fieldTitle}>Product Name: </Text>{item.productName}
      </Text>
      <Text style={styles.transactionField}>
        <Text style={styles.fieldTitle}>Product Quantity: </Text>{item.productQuantity}
      </Text>
    </View>
  );

  const WalkinHistoryCards = () => {
    const [history, setHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(true);

    useEffect(() => {
      const fetchHistory = async () => {
        setLoadingHistory(true);
        try {
          const res = await getWalkinHistory(salesPerson.id);
          const data = Array.isArray(res?.data) ? res.data : [];
          setHistory(data);
        } catch (e) {
          setHistory([]);
        } finally {
          setLoadingHistory(false);
        }
      };
      fetchHistory();
    }, [salesPerson.id]);

    const renderHistoryCard = ({ item }) => (
      <View style={styles.historyCard}>
        <Text style={styles.historyTitle}>{item.companyName || 'Unknown Company'}</Text>
        <View style={styles.historyRow}>
          <Text style={styles.historyLabel}>Date</Text>
          <Text style={styles.historyValue}>{item.time ? new Date(item.time).toLocaleString() : '-'}</Text>
        </View>
        <View style={styles.historyRow}>
          <Text style={styles.historyLabel}>Contact</Text>
          <Text style={styles.historyValue}>{item.firstName || '-'}</Text>
        </View>
        <View style={styles.historyRow}>
          <Text style={styles.historyLabel}>Email</Text>
          <Text style={styles.historyValue}>{item.contactEmail || '-'}</Text>
        </View>
        <View style={styles.historyRow}>
          <Text style={styles.historyLabel}>Product</Text>
          <Text style={styles.historyValue}>{item.productName || '-'}</Text>
        </View>
        <View style={styles.historyRow}>
          <Text style={styles.historyLabel}>Address</Text>
          <Text style={styles.historyValue}>{item.address || '-'}</Text>
        </View>
      </View>
    );

    if (loadingHistory) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#60A5FA" />
        </View>
      );
    }

    return (
      <FlatList
        data={history}
        keyExtractor={(_, index) => String(index)}
        renderItem={renderHistoryCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.noData}>No walk-in history found.</Text>}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('SalesPersonDetails')}>
          <Feather name="arrow-left" size={24} color="#60A5FA" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sales Person Activity</Text>
      </View>

      <View style={{ paddingHorizontal: 12, paddingTop: 12 }}>
        <TabBar
          tabs={["Activity", "Walk-In History"]}
          activeIndex={activeTab}
          onTabPress={setActiveTab}
        />
      </View>

      {activeTab === 0 ? (
        loading ? (
          <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(_,index) => index}
            renderItem={renderTransaction}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={styles.noData}>No transactions found for this sales person.</Text>
            }
            showsVerticalScrollIndicator={false}
          />
        )
      ) : (
        <WalkinHistoryCards />
      )}
    </SafeAreaView>
  );
};

export default SalesActivity;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  backBtn: { marginRight: 12 },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  listContent: {
    padding: 12,
    paddingBottom: 70,
  },
  transactionCard: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  transactionField: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4,
  },
  fieldTitle: {
    color: '#FFD700',
    fontWeight: '700',
  },
  noData: {
    color: 'yellow',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  historyCard: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  historyTitle: {
    color: '#60A5FA',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  historyLabel: {
    color: '#aaa',
    fontSize: 13,
  },
  historyValue: {
    color: '#E2E8F0',
    fontSize: 13,
    flex: 1,
    textAlign: 'right',
    marginLeft: 8,
  },
});

