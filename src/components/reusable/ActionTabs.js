import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { hp, wp } from '../../utils/responsive';

const ActionTabs = ({ actions, onActionPress }) => {
  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tabItem}
          onPress={() => onActionPress(action)}
        >
          <Text style={styles.tabText}>{action}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ActionTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp(1.7),
    
  },
  tabItem: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    width:wp(27),
    alignItems:'center',
    
    
  },
  tabText: {
    color: '#ffff',
    fontSize: 12,
    fontWeight: '500',
  },
});
