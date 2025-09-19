import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const TabBar = ({ tabs, activeIndex, onTabPress }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tabItem, activeIndex === index && styles.activeTab]}
            onPress={() => onTabPress(index)}
          >
            <Text style={[styles.tabText, activeIndex === index && styles.activeText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // backgroundColor: '#1E1E1E',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tabItem: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#2A2A2A',
  },
  activeTab: {
    backgroundColor: '#2563eb',
  },
  tabText: {
    fontSize: 14,
    color: '#aaa',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
});
