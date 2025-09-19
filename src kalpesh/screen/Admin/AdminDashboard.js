// AdminDashboard.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


import Icon from 'react-native-vector-icons/Feather';

// Screens
import CustomersManagement from './CustomersManagement';
import PartnersManagement from './PartnersManagement';
import SalesRepsManagement from './SalesRepsManagement';
import AdminOverview from './AdminOverview';

const tabs = [
  { id: 'overview', label: 'Overview', icon: 'trending-up' },
  { id: 'customers', label: 'Customers', icon: 'user-minus' },
  { id: 'sales-reps', label: 'Sales Reps', icon: 'user-check' },
  { id: 'partners', label: 'Partners', icon: 'user-minus' },
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview />;
      case 'customers':
        return <CustomersManagement />;
      case 'sales-reps':
        return <SalesRepsManagement />;
      case 'partners':
        return <PartnersManagement />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="trending-up" size={22} color="#60A5FA" />
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
        </View>
        <View style={styles.liveBadge}>
          <Text style={styles.liveBadgeText}>Live System</Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabBarContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBar}
        >
          {tabs.map(({ id, label, icon }) => {
            const isActive = activeTab === id;
            return (
              <TouchableOpacity
                key={id}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                onPress={() => setActiveTab(id)}
              >
                <Icon
                  name={icon}
                  size={16}
                  color={isActive ? '#FFFFFF' : '#94A3B8'}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    isActive ? styles.tabLabelActive : styles.tabLabelInactive,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Content */}
      <View style={styles.content}>{renderContent()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: {
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 8,
  },
  liveBadge: {
    backgroundColor: 'rgba(52,211,153,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(52,211,153,0.3)',
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  liveBadgeText: { color: '#34D399', fontSize: 12, fontWeight: '500' },
  tabBarContainer: {
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  tabBar: { paddingHorizontal: 8 },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  tabButtonActive: { backgroundColor: '#2563EB' },
  tabLabel: { fontSize: 14, fontWeight: '500', marginLeft: 6 },
  tabLabelActive: { color: '#FFFFFF' },
  tabLabelInactive: { color: '#94A3B8' },
  content: { flex: 1 },
});

export default AdminDashboard