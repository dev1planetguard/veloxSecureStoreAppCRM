// components/CustomerListProps.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Button from '../../components/moduleBased/sales/Button';
import { Card, CardContent, CardHeader } from '../../components/reusable/card';

import AddCustomerModal from './AddCustomerModal';

// API helpers
import {
  getOnCallCustomerList,
  addOnCallCustomer,
  updateOnCallCustomer,
  deleteOnCallCustomer
} from '../../api/Sales/customerListApi';

const getStatusColor = status => {
  switch (status) {
    case 'pending': return { backgroundColor: '#fbbf24', text: '#92400e' };
    case 'called': return { backgroundColor: '#3b82f6', text: '#eff6ff' };
    case 'verified': return { backgroundColor: '#a855f7', text: '#f5f3ff' };
    default: return { backgroundColor: '#475569', text: '#cbd5e1' };
  }
};

export default function CustomerListProps({ customers, setCustomers, onCallCustomer }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Search
  const [search, setSearch] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredCustomers(customers);
    } else {
      const searchText = search.trim().toLowerCase();
      setFilteredCustomers(
        customers.filter(
          c =>
            (c.firstName && c.firstName.toLowerCase().includes(searchText)) ||
            (c.lastName && c.lastName.toLowerCase().includes(searchText))
        )
      );
    }
  }, [customers, search]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      // Use centralized API function
      const j = await getOnCallCustomerList();
      if (j.statusCode === 200 && Array.isArray(j.data)) {
        const mapped = j.data.map(c => {
          let firstName = c.name || '';
          let lastName = c.lastName || '';
          if (!lastName && c.fullName) {
            const parts = c.fullName.trim().split(' ');
            if (parts.length > 1) lastName = parts.slice(1).join(' ');
            else lastName = '';
          }
          let safeId = Number(c.id);
          if (isNaN(safeId) || !safeId) safeId = `temp_${c.number || Math.random()}`;
          return {
            id: safeId,
            firstName: firstName,
            lastName: lastName,
            phone: c.number,
            address: c.address || '',
            countryCode: c.countryCode || '91',
            status: c.status ? c.status.toLowerCase() : '',
            callHistory: c.callHistory || [],
          };
        });
        setCustomers(mapped);
      } else {
        Alert.alert('Error', j.message || 'Failed to fetch customers');
      }
    } catch (e) {
      Alert.alert('Error', e.message || 'Failed to fetch customer list');
    }
  };

  const handleSaveCustomer = async (customerData, mode = 'add', customerId = null) => {
    try {
      let j;
      if (mode === 'edit' && customerId) {
        const body = {
          id: customerId,
          name: customerData.firstName,
          lastName: customerData.lastName,
          phone: customerData.phone,
          address: customerData.address,
          countryCode: customerData.countryCode,
        };
        j = await updateOnCallCustomer(customerId, body);
      } else {
        const body = {
          name: customerData.firstName,
          lastName: customerData.lastName,
          phone: customerData.phone,
          address: customerData.address,
          countryCode: customerData.countryCode,
        };
        j = await addOnCallCustomer(body);
      }

      if (j.statusCode === 200) {
        Alert.alert('Success', j.message || 'Saved');
        setIsModalOpen(false);
        setIsEditing(false);
        setEditingCustomer(null);
        fetchCustomers();
      } else {
        throw new Error(j.message || 'Save failed');
      }
    } catch (e) {
      Alert.alert('Error', e.message || 'Failed to save customer');
    }
  };

  const openAdd = () => {
    setIsEditing(false);
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const openEdit = (customer) => {
    setIsEditing(true);
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDelete = (customer) => {
    Alert.alert('Remove Customer?', `Delete ${customer.firstName} ${customer.lastName}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const j = await deleteOnCallCustomer(customer.id);
            if (j.statusCode === 200) {
              Alert.alert('Deleted', j.message || 'Deleted');
              fetchCustomers();
            } else {
              throw new Error(j.message || 'Delete failed');
            }
          } catch (e) {
            Alert.alert('Error', e.message || 'Failed to delete');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => {
    const colors = getStatusColor(item.status);
    const callsCount = item.callHistory?.length || 0;
    return (
      <View style={styles.cardWrapper}>
        <Card style={styles.card}>
          <CardHeader style={styles.cardHeader}>
            <View style={styles.headerLeft}>
              <FeatherIcon name="user" size={wp('4%')} color="#cbd5e1" />
              <View style={{ marginLeft: wp('2%') }}>
                <Text style={styles.name}>
                  {item.firstName} {item.lastName}
                </Text>
                <Text style={styles.phone}>{item.phone}</Text>
              </View>
            </View>
          </CardHeader>
          <CardContent style={styles.cardContent}>
            {callsCount > 0 && <Text style={styles.callCount}>{callsCount} calls</Text>}
            <View style={styles.actionRow}>
              <TouchableOpacity onPress={() => onCallCustomer(item)} style={styles.iconBtn}>
                <FeatherIcon name="phone" size={wp('3.5%')} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openEdit(item)} style={[styles.iconBtn, { backgroundColor: '#d97706' }]}>
                <FeatherIcon name="edit-2" size={wp('3.5%')} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item)} style={[styles.iconBtn, { backgroundColor: '#dc2626' }]}>
                <FeatherIcon name="trash-2" size={wp('3.5%')} color="#fff" />
              </TouchableOpacity>
            </View>
          </CardContent>
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Button variant="outline" size="sm" onPress={fetchCustomers} style={{ marginRight: wp('2%') }}>
          <FeatherIcon name="refresh-cw" size={wp('3.5%')} color="#cbd5e1" />
          <Text style={styles.toolbarText}>Refresh</Text>
        </Button>

        <View style={styles.searchRow}>
          <FeatherIcon name="search" size={wp('4%')} color="#94a3b8" style={{ marginRight: wp('1%') }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name"
            placeholderTextColor="#94a3b8"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <FeatherIcon name="x" size={wp('4%')} color="#a3a3a3" style={{ marginLeft: wp('1%') }} />
            </TouchableOpacity>
          )}
        </View>

        <Button variant="default" size="sm" onPress={openAdd} style={{ marginLeft: wp('2%') }}>
          <FeatherIcon name="plus" size={wp('3.5%')} color="#fff" />
          <Text style={styles.toolbarText}>Add</Text>
        </Button>
      </View>

      <FlatList
        data={filteredCustomers}
        keyExtractor={c => String(c.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
      />

      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setIsEditing(false); setEditingCustomer(null); }}
        onAddCustomer={(customerData) =>
          handleSaveCustomer(
            customerData,
            isEditing ? 'edit' : 'add',
            isEditing && editingCustomer ? editingCustomer.id : null
          )
        }
        editing={isEditing}
        editData={editingCustomer}
      />
    </View>
  );
}

CustomerListProps.propTypes = {
  customers: PropTypes.array.isRequired,
  setCustomers: PropTypes.func.isRequired,
  onCallCustomer: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: { flex: 1,  backgroundColor: '#0f172a', width: '100%' },
  toolbar: {
    flexDirection: 'row',
    marginBottom: hp('1%'),
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: hp('1%')
  },
  toolbarText: { color: '#fff', fontSize: wp('3%'), marginLeft: wp('1%') },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: wp('2%'),
    minWidth: wp('40%'),
    height: hp('5%'),
    paddingHorizontal: wp('2%'),
    marginHorizontal: wp('2%')
  },
  searchInput: {
    color: '#fff',
    fontSize: wp('3.5%'),
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 0
  },
  flatListContent: { paddingBottom: hp('2%'), width: '100%' },
  cardWrapper: { marginBottom: hp('1.5%'), width: wp('90%'), alignSelf: 'center' },
  card: { backgroundColor: '#1e293b', padding: wp('3%') },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  name: { color: '#fff', fontSize: wp('4%'), fontWeight: '600' },
  phone: { color: '#94a3b8', fontSize: wp('3%') },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: hp('1%') },
  callCount: { color: '#94a3b8', fontSize: wp('3%') },
  actionRow: { flexDirection: 'row' },
  iconBtn: { marginLeft: wp('3%'), backgroundColor: '#2563eb', padding: wp('2%'), borderRadius: wp('2%') },
});
