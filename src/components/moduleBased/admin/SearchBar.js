import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

function SearchBarCustomerManagement({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.searchBox}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    flex: 1,
    justifyContent: 'center',
  },
  searchInput: {
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 12,
    height: 40,
    color: '#FFFFFF',
  },
});

export default SearchBarCustomerManagement


