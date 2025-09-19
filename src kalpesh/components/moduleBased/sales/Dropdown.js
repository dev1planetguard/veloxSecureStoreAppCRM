import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Dropdown = ({ label, options, value, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity style={styles.header} onPress={() => setOpen(!open)}>
        <Text style={[styles.text, !value && styles.placeholder]}>
          {value || 'Select option...'}
        </Text>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={20} color="#fff" />
      </TouchableOpacity>
      {open && (
        <ScrollView style={styles.list} nestedScrollEnabled>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={styles.item}
              onPress={() => {
                onSelect(opt);
                setOpen(false);
              }}
            >
              <Text style={styles.itemText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: hp('2%') },
  label: { color: '#cbd5e1', marginBottom: hp('0.8%'), fontSize: wp('3.5%') },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#334155',
    borderRadius: wp('1.5%'),
    paddingHorizontal: wp('3%'),
    height: hp('6%'),
    alignItems: 'center',
  },
  text: { color: '#fff', fontSize: wp('3.5%') },
  placeholder: { color: '#94a3b8' },
  list: {
    backgroundColor: '#334155',
    borderRadius: wp('1.5%'),
    maxHeight: hp('20%'),
    marginTop: hp('1%'),
  },
  item: { paddingVertical: hp('1.2%'), paddingHorizontal: wp('3%') },
  itemText: { color: '#fff', fontSize: wp('3.5%') },
});

export default Dropdown;
