// AdminOverview.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { getAdminOverview, getRecentActivity } from '../../api/Admin/adminOverviewApi';

// Reusable components
import StatCard from '../../components/moduleBased/admin/StatCard';
import ActivityRow from '../../components/moduleBased/admin/ActivityRow';
import PerformanceMetric from '../../components/moduleBased/admin/PerformanceMetric';

export default function AdminOverview() {
  const navigation = useNavigation();
  const [dashboard, setDashboard] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ovRes, raRes] = await Promise.all([
          getAdminOverview(),
          getRecentActivity(),
        ]);

        if (ovRes?.statusCode === 200) setDashboard(ovRes.data);
        if (raRes?.statusCode === 200 && Array.isArray(raRes.data)) {
          setRecentActivity(
            raRes.data.map((item) => ({
              message: item.message,
              time: item.timeAgo,
              status: item.status?.toLowerCase(),
            }))
          );
        }
      } catch (err) {
        console.error('API load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#60A5FA" />
      </View>
    );
  }

  const d = dashboard || {};
  const stats = [
    { title: 'Total Customers', value: `${d.totalCustomers ?? 0}`, change: d.customerGrowthRate ?? '0%', icon: 'users', iconColor: '#60A5FA', iconBg: 'rgba(59,130,246,0.2)', borderColor: '#3B82F6' },
    { title: 'Active Sales Reps', value: `${d.totalSales ?? 0}`, change: d.salesActivityRate ?? '0%', icon: 'user-check', iconColor: '#34D399', iconBg: 'rgba(34,197,94,0.2)', borderColor: '#10B981' },
    { title: 'Partners', value: `${d.totalPartners ?? 0}`, change: d.partnerGrowthRate ?? '0%', icon: 'users', iconColor: '#A78BFA', iconBg: 'rgba(139,92,246,0.2)', borderColor: '#8B5CF6' },
    { title: 'Monthly Revenue', value: d.totalRevenue != null ? `$${d.totalRevenue}` : '-', change: d.revenueGrowthRate ?? '-', icon: 'dollar-sign', iconColor: '#FBBF24', iconBg: 'rgba(251,191,36,0.2)', borderColor: '#F59E0B' },
    { title: 'Scheduled Meetings', value: `${d.totalMeetings ?? 0}`, change: d.meetingRate ?? '0%', icon: 'calendar', iconColor: '#06B6D4', iconBg: 'rgba(6,182,212,0.2)', borderColor: '#0891B2' },
    { title: 'Deals Closed', value: d.totalDealsClosed != null ? `${d.totalDealsClosed}` : '-', change: d.dealClosureRate ?? '-', icon: 'target', iconColor: '#22C55E', iconBg: 'rgba(34,197,94,0.2)', borderColor: '#16A34A' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </View>

      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Icon name="clock" size={18} color="#60A5FA" />
          <Text style={styles.sectionTitle}>Recent Activity</Text>
        </View>
        {recentActivity.map((act, i) => (
          <ActivityRow key={i} {...act} />
        ))}
      </View>

      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Icon name="trending-up" size={18} color="#60A5FA" />
          <Text style={styles.sectionTitle}>Performance Metrics</Text>
        </View>
        {performanceMetrics.map((met, i) => (
          <PerformanceMetric key={i} {...met} />
        ))}
      </View>
    </ScrollView>
  );
}

const performanceMetrics = [
  { label: 'Conversion Rate', value: '23.5%' },
  { label: 'Active Deals', value: '78%' },
  { label: 'Customer Satisfaction', value: '92%' },
];

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', backgroundColor: '#0F172A' },
  container: { paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 16 : 32, paddingHorizontal: 16, backgroundColor: '#0F172A' },
  // header removed; parent AdminDashboard provides the header
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  sectionCard: { backgroundColor: 'rgba(15,23,42,0.5)', borderRadius: 12, padding: 16, marginBottom: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '600', marginLeft: 8 },
  metricRow: { marginBottom: 12 },
  metricLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  metricLabel: { color: '#94A3B8', fontSize: 14 },
  metricValue: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  metricBarBg: { height: 6, backgroundColor: 'rgba(15,23,42,0.7)', borderRadius: 3, overflow: 'hidden' },
  metricBarFill: { height: 6, backgroundColor: '#3B82F6', borderRadius: 3 },
});


