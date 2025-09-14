import Feather from '@react-native-vector-icons/feather';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { hp } from '../../utils/responsive';

const Dropdown = ({ txt, bg, options, selected, placeholder, onSelect }) => {
  console.log('dd colooooorrrr', bg);

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');

  const label = selected
    ? options.find(o => o.value === selected)?.label
    : placeholder;

  const filtered = options.filter(
    o => o.label.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <View style={[styles.dropdownContainer, open && styles.dropdownOpen]}>
      <TouchableOpacity
        style={[styles.dropdownHeader, { backgroundColor: bg ? bg : '#1e1e1e' }]}
        onPress={() => setOpen(v => !v)}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.dropdownHeaderText,
            !selected && styles.dropdownPlaceholder,
            { color: txt ? txt : '#fff' }
          ]}
        >
          {label}
        </Text>
        <Feather name={open ? 'chevron-up' : 'chevron-down'} size={24} color="#fff" />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdownListContainer}>
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#777" style={styles.searchIcon} />
            <TextInput
              style={styles.dropdownSearch}
              placeholder="Search..."
              placeholderTextColor="#777"
              value={filter}
              onChangeText={setFilter}
            />
          </View>

          <ScrollView
            style={styles.dropdownList}
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
          >
            {filtered.length > 0 ? (
              filtered.map(opt => (
                <TouchableOpacity
                  key={opt.value}
                  style={styles.dropdownItem}
                  onPress={() => {
                    onSelect(opt.value);
                    setOpen(false);
                    setFilter('');
                  }}
                >
                  <Text style={styles.dropdownItemText}>{opt.label}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.dropdownNoResults}>No results found</Text>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginVertical: 10,
    width: '100%',
  },
  dropdownOpen: {
    zIndex: 1000,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  dropdownHeaderText: {
    fontSize: 16,
  },
  dropdownPlaceholder: {
    color: '#aaa',
  },
  dropdownListContainer: {
    backgroundColor: '#333',
    borderRadius: 8,
    marginTop: hp(5),
    maxHeight: 200,
    position:'absolute',
    width:'100%'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  dropdownSearch: {
    flex: 1,
    color: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#444',
    borderRadius: 6,
  },
  dropdownList: {
    paddingHorizontal: 8,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
  dropdownItemText: {
    color: '#fff',
  },
  dropdownNoResults: {
    padding: 12,
    textAlign: 'center',
    color: '#777',
  },
});

export default Dropdown;
