import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import SearchBarCustomerManagement from '../../components/moduleBased/admin/SearchBar';
import CustomButton from '../../components/moduleBased/admin/SearchButton';
import CustomerManagementCard from '../../components/moduleBased/admin/CustomerCard';


const customers = [
  {
    id: 'CUST001',
    name: 'John Smith',
    email: 'john.smith@company.com',
    company: 'Tech Solutions Inc',
    status: 'Active',
    totalValue: '$45,000',
    joinDate: '2024-01-15',
    lastActivity: '2 hours ago',
    stage: 'Negotiation',
  },
  {
    id: 'CUST002',
    name: 'Sarah Johnson',
    email: 'sarah.j@startup.io',
    company: 'StartupCorp',
    status: 'Prospect',
    totalValue: '$12,000',
    joinDate: '2024-02-20',
    lastActivity: '1 day ago',
    stage: 'Discovery',
  },
  {
    id: 'CUST003',
    name: 'Michael Brown',
    email: 'michael@enterprise.com',
    company: 'Enterprise Ltd',
    status: 'Active',
    totalValue: '$78,000',
    joinDate: '2023-11-10',
    lastActivity: '30 minutes ago',
    stage: 'Closed Won',
  },
];

const statusStyles = {
  Active: { textColor: '#34D399', bgColor: 'rgba(52,211,153,0.2)' },
  Prospect: { textColor: '#60A5FA', bgColor: 'rgba(96,165,250,0.2)' },
  Inactive: { textColor: '#94A3B8', bgColor: 'rgba(148,163,184,0.2)' },
  default: { textColor: '#94A3B8', bgColor: 'rgba(148,163,184,0.2)' },
};

const stageStyles = {
  Discovery: { textColor: '#60A5FA', bgColor: 'rgba(96,165,250,0.2)' },
  Negotiation: { textColor: '#F59E0B', bgColor: 'rgba(245,158,11,0.2)' },
  'Closed Won': { textColor: '#34D399', bgColor: 'rgba(52,211,153,0.2)' },
  'Closed Lost': { textColor: '#EF4444', bgColor: 'rgba(239,68,68,0.2)' },
  default: { textColor: '#94A3B8', bgColor: 'rgba(148,163,184,0.2)' },
};

function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Customer Management</Text>
        </View>

        {/* Search + Filter */}
        <View style={styles.searchContainer}>
          <SearchBarCustomerManagement
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Search customers..."
          />
          <CustomButton title="Search" type="secondary" onPress={() => {}} />
        </View>

        {/* Customer Cards */}
        {filtered.map(customer => (
          <CustomerManagementCard
            key={customer.id}
            customer={customer}
            statusStyles={statusStyles}
            stageStyles={stageStyles}
          />
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
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  searchContainer: { flexDirection: 'row', marginBottom: 16, gap: 8 },
});

export default CustomerManagement