import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import OnCall from './salesrep/OnCall'
import WalkIn from './salesrep/WalkIn'

const SalesRepDashboard = () => {
  const [activeTab, setActiveTab] = useState('OnCall')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sales Rep Dashboard</Text>

      <View style={styles.tabHeaderContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'OnCall' && styles.tabButtonActive]}
          onPress={() => setActiveTab('OnCall')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'OnCall' && styles.tabButtonTextActive]}>On Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'WalkIn' && styles.tabButtonActive]}
          onPress={() => setActiveTab('WalkIn')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'WalkIn' && styles.tabButtonTextActive]}>Walk In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {activeTab === 'OnCall' ? <OnCall /> : <WalkIn />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#fff',
  },
  tabHeaderContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: '#334155',
    borderRadius: 10,
    padding: 4,
    marginBottom: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#16a34a',
  },
  tabButtonText: {
    color: '#cbd5e1',
    fontWeight: '600',
  },
  tabButtonTextActive: {
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
})

export default SalesRepDashboard


