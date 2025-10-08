import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Switch,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../config/config';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const API_URL = 'http://192.168.0.204:9191/api/v1/salesperson/currentSalesPersonList';
const AUTH_TOKEN =
  'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwb2MiLCJpYXQiOjE3NTk4MzY3MTksImV4cCI6MTc2MzQzNjcxOX0.TdJoP89rurTbvOsKgy9P5EzrbtkrAcJBVUIaVU-xFoopkkC1-DvRyYbdUFD7kfhWQSLv3kmpvKv2P_WqT4ZQuw';

const UserListScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('jwtToken');
      const response = await fetch(`${API_BASE_URL}/salesperson/currentSalesPersonList`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      const result = await response.json();
      if (result.statusCode === 200 && result.data) {
        const formattedUsers = result.data.map((user, index) => ({
          id: index.toString(),
          username: `${user.firstName} ${user.lastName}`,
          contactNum: user.number || 'N/A',
          disabled: user.enabled === false,
        }));
        setUsers(formattedUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      Alert.alert('Error', 'Failed to fetch user list. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

 
  const confirmDisableUser = (id) => {
    const selectedUser = users.find((user) => user.id === id);

    Alert.alert(
      'Confirm Action',
      `Are you sure to remove ${selectedUser.username}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => disableUser(id),
        },
      ]
    );
  };

 
  const disableUser = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, disabled: true } : user
    );
    setUsers(updatedUsers);
  };

  
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const renderItem = ({ item }) => (
    <View
      style={[
        styles.userContainer,
        item.disabled && styles.disabledContainer,
      ]}
    >
      <View style={styles.userInfo}>
        <View style={styles.avatarContainer}>
          <Feather name="user" size={20} color={item.disabled ? "#94A3B8" : "#60A5FA"} />
        </View>
        <View style={styles.userDetails}>
          <Text
            style={[
              styles.username,
              item.disabled && styles.disabledText,
            ]}
          >
            {item.username}
          </Text>
          <View style={styles.contactRow}>
            <Feather name="phone" size={14} color={item.disabled ? "#94A3B8" : "#94A3B8"} />
            <Text
              style={[
                styles.number,
                item.disabled && styles.disabledText,
              ]}
            >
              {item.contactNum}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.actionContainer}>
        <Switch
          value={!item.disabled}
          onValueChange={() => confirmDisableUser(item.id)}
          trackColor={{ false: '#334155', true: '#60A5FA' }}
          thumbColor={item.disabled ? '#94A3B8' : '#FFFFFF'}
          disabled={item.disabled}
        />
        {item.disabled && (
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Disabled</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={26} color="#60A5FA" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Salesperson Management</Text>
          <Text style={styles.headerSubtitle}>Manage active sales representatives</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Feather name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search salesperson..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#64748B"
          />
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{users.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{users.filter(u => !u.disabled).length}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{users.filter(u => u.disabled).length}</Text>
          <Text style={styles.statLabel}>Disabled</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#60A5FA" />
          <Text style={styles.loadingText}>Loading salespersons...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Feather name="users" size={48} color="#64748B" />
              <Text style={styles.emptyTitle}>No salespersons found</Text>
              <Text style={styles.emptySubtitle}>
                {searchQuery ? 'Try adjusting your search terms' : 'No salespersons are currently registered'}
              </Text>
            </View>
          }
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  menuBtn: {
    marginRight: wp('3%'),
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: wp('5.5%'),
    fontWeight: '700',
    marginBottom: hp('0.5%'),
  },
  headerSubtitle: {
    color: '#94A3B8',
    fontSize: wp('3.8%'),
  },
  searchContainer: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    backgroundColor: '#0F172A',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: wp('2.5%'),
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: wp('3%'),
  },
  searchIcon: {
    marginRight: wp('2%'),
  },
  searchInput: {
    flex: 1,
    height: hp('6%'),
    fontSize: wp('4%'),
    color: '#E2E8F0',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    backgroundColor: '#1E293B',
    marginHorizontal: wp('4%'),
    borderRadius: wp('2.5%'),
    marginBottom: hp('1%'),
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: '#60A5FA',
    fontSize: wp('5%'),
    fontWeight: '700',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: wp('3.2%'),
    marginTop: hp('0.5%'),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#94A3B8',
    fontSize: wp('4%'),
    marginTop: hp('2%'),
  },
  listContainer: {
    paddingHorizontal: wp('4%'),
    paddingBottom: hp('5%'),
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: wp('2.5%'),
    padding: wp('4%'),
    marginBottom: hp('1.2%'),
    borderWidth: 1,
    borderColor: '#334155',
  },
  disabledContainer: {
    opacity: 0.6,
    backgroundColor: '#0B1220',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },
  userDetails: {
    flex: 1,
  },
  username: {
    color: '#60A5FA',
    fontSize: wp('4.3%'),
    fontWeight: '700',
    marginBottom: hp('0.5%'),
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    color: '#94A3B8',
    fontSize: wp('3.5%'),
    marginLeft: wp('2%'),
  },
  actionContainer: {
    alignItems: 'center',
  },
  statusBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('1%'),
    marginTop: hp('1%'),
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: wp('2.8%'),
    fontWeight: '600',
  },
  disabledText: {
    color: '#64748B',
    textDecorationLine: 'line-through',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: hp('8%'),
  },
  emptyTitle: {
    color: '#94A3B8',
    fontSize: wp('4.5%'),
    fontWeight: '600',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },
  emptySubtitle: {
    color: '#64748B',
    fontSize: wp('3.8%'),
    textAlign: 'center',
    paddingHorizontal: wp('8%'),
  },
});

export default UserListScreen;