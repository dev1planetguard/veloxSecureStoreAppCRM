import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SummaryCard from '../../components/moduleBased/admin/SummaryCard';
import SalesRepCard from '../../components/moduleBased/admin/SalesRepCard';

const salesRepsData = [
  {
    id: 'REP001',
    name: 'Alice Walker',
    email: 'alice.walker@company.com',
    region: 'North America',
    status: 'Active',
    performance: 'Excellent',
    dealsClosedThisMonth: 8,
    revenue: '$142,000',
    meetings: 24,
    conversionRate: '32%',
  },
  {
    id: 'REP002',
    name: 'Bob Martinez',
    email: 'bob.martinez@company.com',
    region: 'Europe',
    status: 'Active',
    performance: 'Good',
    dealsClosedThisMonth: 5,
    revenue: '$89,000',
    meetings: 18,
    conversionRate: '28%',
  },
  {
    id: 'REP003',
    name: 'Carol Davis',
    email: 'carol.davis@company.com',
    region: 'Asia Pacific',
    status: 'Training',
    performance: 'Average',
    dealsClosedThisMonth: 3,
    revenue: '$45,000',
    meetings: 12,
    conversionRate: '25%',
  },
];

const statusStyles = {
  Active: { text: '#34D399', bg: 'rgba(52,211,153,0.2)' },
  Training: { text: '#60A5FA', bg: 'rgba(96,165,250,0.2)' },
  Inactive: { text: '#94A3B8', bg: 'rgba(148,163,184,0.2)' },
  default: { text: '#94A3B8', bg: 'rgba(148,163,184,0.2)' },
};

const performanceStyles = {
  Excellent: { text: '#34D399', bg: 'rgba(52,211,153,0.2)' },
  Good: { text: '#60A5FA', bg: 'rgba(96,165,250,0.2)' },
  Average: { text: '#F59E0B', bg: 'rgba(245,158,11,0.2)' },
  Poor: { text: '#EF4444', bg: 'rgba(239,68,68,0.2)' },
  default: { text: '#94A3B8', bg: 'rgba(148,163,184,0.2)' },
};

export default function SalesRepsManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReps = salesRepsData.filter(
    (rep) =>
      rep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Icon name="users" size={wp('5%')} color="#60A5FA" />
            <Text style={styles.headerTitle}>Sales Representatives</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Icon
              name="search"
              size={wp('4%')}
              color="#94A3B8"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search sales reps..."
              placeholderTextColor="#94A3B8"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Search</Text>
          </TouchableOpacity>
        </View>

        {filteredReps.map((rep) => (
          <SalesRepCard
            key={rep.id}
            rep={rep}
            statusStyles={statusStyles}
            performanceStyles={performanceStyles}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  inner: { padding: wp('4%'), paddingBottom: hp('4%') },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: wp('4.5%'),
    fontWeight: '700',
    marginLeft: wp('2%'),
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('2%'),
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: wp('3.5%'),
    fontWeight: '600',
    marginLeft: wp('1.5%'),
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  searchContainer: { flexDirection: 'row', marginBottom: hp('2%') },
  searchBox: { flex: 1, position: 'relative', justifyContent: 'center' },
  searchIcon: { position: 'absolute', left: wp('3%'), zIndex: 1 },
  searchInput: {
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: wp('2%'),
    paddingLeft: wp('9%'),
    paddingRight: wp('3%'),
    height: hp('5%'),
    color: '#FFFFFF',
    fontSize: wp('3.5%'),
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: wp('2%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    marginLeft: wp('2%'),
  },
  filterText: { color: '#94A3B8', fontSize: wp('3.5%'), marginLeft: wp('1.5%') },
});


