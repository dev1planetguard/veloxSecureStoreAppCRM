import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import ApproveCard from '../../components/moduleBased/admin/ApproveCard';
import { getPendingRequests, approveUserRequest } from '../../api/Admin/approveRequestApi';

export default function ApproveRequest() {
  const navigation = useNavigation();
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const data = await getPendingRequests();
      if (data.statusCode === 200) {
        setPending(data.data || []);
      } else {
        Alert.alert('Error', data.message || 'Failed to load pending users');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error fetching pending users');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      const data = await approveUserRequest(userId, 'approved');
      if (data.statusCode === 200) {
        Alert.alert('Success', data.message);
        setPending((prev) => prev.filter((u) => u.id !== userId));
      } else {
        Alert.alert('Error', data.message || 'Approval failed');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error during approval');
    }
  };

  if (loading) {
    return (
      <SafeAreaView edges={['top']} style={styles.center}>
        <ActivityIndicator size="large" color="#2979FF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={wp('6%')} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Approve Request</Text>
      </View>

      <FlatList
        data={pending}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ApproveCard item={item} onApprove={handleApprove} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No pending approvals</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
  },
  backBtn: { marginRight: wp('3%') },
  headerTitle: { color: '#fff', fontSize: wp('5%'), fontWeight: '700' },
  list: { padding: wp('4%'), paddingBottom: hp('3%') },
  emptyText: { color: '#777', textAlign: 'center', marginTop: hp('2%'), fontSize: wp('4%') },
});

