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
import OverviewCard from '../../components/moduleBased/admin/OverviewCard';
import PartnerCard from '../../components/moduleBased/admin/PartnerCard';

const partners = [
  {
    id: 'PART001',
    name: 'TechBridge Solutions',
    contactPerson: 'David Chen',
    email: 'david.chen@techbridge.com',
    type: 'Technology Partner',
    status: 'Active',
    joinDate: '2023-08-15',
    salesRepsAssigned: 12,
    revenue: '$89,000',
    commission: '12%',
    region: 'North America',
  },
  {
    id: 'PART002',
    name: 'Global Sales Network',
    contactPerson: 'Maria Rodriguez',
    email: 'maria@globalsales.com',
    type: 'Channel Partner',
    status: 'Active',
    joinDate: '2024-01-20',
    salesRepsAssigned: 8,
    revenue: '$156,000',
    commission: '15%',
    region: 'Latin America',
  },
  {
    id: 'PART003',
    name: 'Enterprise Connect',
    contactPerson: 'James Wilson',
    email: 'james@enterpriseconnect.com',
    type: 'Strategic Partner',
    status: 'Pending',
    joinDate: '2024-03-01',
    salesRepsAssigned: 0,
    revenue: '$0',
    commission: '10%',
    region: 'Europe',
  },
];

export default function PartnersManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = partners.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Icon name="users" size={20} color="#60A5FA" />
            <Text style={styles.headerTitle}>Partner Management</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Icon name="plus" size={16} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add Partner</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.overviewContainer}>
          <OverviewCard
            icon="briefcase"
            iconColor="#A78BFA"
            label="Total Partners"
            value="34"
            meta="2 new this month"
            metaColor="#A78BFA"
          />
          <OverviewCard
            icon="trending-up"
            iconColor="#34D399"
            label="Partner Revenue"
            value="$245K"
            meta="+18% growth"
            metaColor="#34D399"
          />
          <OverviewCard
            icon="users"
            iconColor="#60A5FA"
            label="Assigned Reps"
            value="20"
            meta="Across all partners"
            metaColor="#60A5FA"
          />
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Icon
              name="search"
              size={16}
              color="#94A3B8"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search partners..."
              placeholderTextColor="#94A3B8"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="filter" size={16} color="#94A3B8" />
            <Text style={styles.filterText}>Filter by Type</Text>
          </TouchableOpacity>
        </View>

        {filtered.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  inner: { padding: 16, paddingBottom: 32 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  overviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  searchContainer: { flexDirection: 'row', marginBottom: 16 },
  searchBox: { flex: 1, position: 'relative', justifyContent: 'center' },
  searchIcon: { position: 'absolute', left: 12, zIndex: 1 },
  searchInput: {
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 36,
    paddingRight: 12,
    height: 40,
    color: '#FFFFFF',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  filterText: { color: '#94A3B8', fontSize: 14, marginLeft: 6 },
});


