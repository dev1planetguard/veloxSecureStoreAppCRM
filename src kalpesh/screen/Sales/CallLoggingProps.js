import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import Toast from 'react-native-toast-message'
import Icon from 'react-native-vector-icons/Feather'
import PropTypes from 'prop-types'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const CallLoggingProps = ({
  customer = { id: '', name: '', phone: '', email: '' },
  onCallLogged = () => {},
}) => {
  const [selectedPurposes, setSelectedPurposes] = useState([])
  const [purposeOpen, setPurposeOpen] = useState(false)
  const [notes, setNotes] = useState('')
  const [duration, setDuration] = useState('')
  const [loading, setLoading] = useState(false)

  const callPurposes = [
    'Initial Contact',
    'Follow-up Call',
    'Product Inquiry',
    'Demo Request',
    'Price Discussion',
    'Objection Handling',
    'Closing Call',
    'Post-sale Support',
  ]

  const togglePurpose = p => {
    setSelectedPurposes(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    )
  }

  const handleSubmit = () => {
    if (selectedPurposes.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Missing Information',
        text2: 'Please select at least one call purpose',
      })
      return
    }
    setLoading(true)
    setTimeout(() => {
      const callLog = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        purposes: selectedPurposes,
        notes,
        duration: duration ? parseInt(duration, 10) : undefined,
      }
      setLoading(false)
      Toast.show({
        type: 'success',
        text1: 'Call Logged',
        text2: 'Call details have been recorded successfully',
      })
      onCallLogged(callLog)
    }, 1500)
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          {/* Header */}
          <TouchableOpacity style={styles.header}>
            <Icon name="file-text" size={wp('6%')} color="#60a5fa" />
            <Text style={styles.title}>Call Logging</Text>
          </TouchableOpacity>

          {/* Customer Info */}
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>{customer.name}</Text>
            <Text style={styles.customerDetail}>{customer.phone}</Text>
            {customer.email && (
              <Text style={styles.customerDetail}>{customer.email}</Text>
            )}
          </View>

          {/* Multi-select Call Purpose */}
          <View style={styles.field}>
            <View style={styles.labelRow}>
              <Icon name="target" size={wp('4%')} color="#cbd5e1" />
              <Text style={styles.label}>Call Purpose</Text>
            </View>
            <View style={styles.dropdownWrapper}>
              <TouchableOpacity
                style={styles.dropdownHeader}
                onPress={() => setPurposeOpen(v => !v)}
              >
                <Text
                  style={[
                    styles.fieldText,
                    selectedPurposes.length === 0 && styles.placeholder,
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {selectedPurposes.length > 0
                    ? selectedPurposes.join(', ')
                    : 'Select one or more...'}
                </Text>
                <Icon
                  name={purposeOpen ? 'chevron-up' : 'chevron-down'}
                  size={wp('5%')}
                  color="#fff"
                />
              </TouchableOpacity>
              {purposeOpen && (
                <View style={styles.dropdownListContainer}>
                  <ScrollView nestedScrollEnabled style={styles.dropdownScroll}>
                    {callPurposes.map(p => (
                      <TouchableOpacity
                        key={p}
                        style={styles.dropdownItem}
                        onPress={() => togglePurpose(p)}
                      >
                        <CheckBox
                          value={selectedPurposes.includes(p)}
                          onValueChange={() => togglePurpose(p)}
                          tintColors={{ true: '#10b981', false: '#94a3b8' }}
                          style={styles.checkbox}
                        />
                        <Text style={styles.dropdownItemText}>{p}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          </View>

          {/* Duration */}
          <View style={styles.field}>
            <View style={styles.labelRow}>
              <Icon name="clock" size={wp('4%')} color="#cbd5e1" />
              <Text style={styles.label}>Duration (min)</Text>
            </View>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="e.g., 15"
              placeholderTextColor="#94a3b8"
              value={duration}
              onChangeText={setDuration}
            />
          </View>

          {/* Notes */}
          <View style={styles.field}>
            <View style={styles.labelRow}>
              <Icon name="message-circle" size={wp('4%')} color="#cbd5e1" />
              <Text style={styles.label}>Notes & Observations</Text>
            </View>
            <TextInput
              style={[styles.input, styles.textarea]}
              multiline
              placeholder="Record key discussion points…"
              placeholderTextColor="#94a3b8"
              value={notes}
              onChangeText={setNotes}
            />
          </View>

          {/* Button */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Log Call & Continue</Text>
            )}
          </TouchableOpacity>
        </View>

        <Toast />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

CallLoggingProps.propTypes = {
  customer: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
  onCallLogged: PropTypes.func,
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#0f172a' },
  scrollContent: { padding: wp('4%'), alignItems: 'center' },

  card: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: wp('5%'),
    width: wp('90%'),
    overflow: 'visible',
    paddingBottom: hp('5%'),
  },

  header: { flexDirection: 'row', alignItems: 'center', marginBottom: hp('2%') },
  title: { marginLeft: wp('2%'), fontSize: wp('5%'), color: '#fff', fontWeight: '600' },

  customerInfo: {
    backgroundColor: '#0f172a',
    padding: wp('3%'),
    borderRadius: 6,
    marginBottom: hp('3%'),
  },
  customerName: { color: '#fff', fontSize: wp('4.5%'), fontWeight: '500' },
  customerDetail: { color: '#94a3b8', fontSize: wp('3.5%') },

  field: { marginBottom: hp('2.5%') },

  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: hp('0.7%') },
  label: { marginLeft: wp('1.5%'), color: '#cbd5e1', fontSize: wp('3.5%') },

  dropdownWrapper: { position: 'relative', zIndex: 2 },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#334155',
    borderRadius: 6,
    paddingHorizontal: wp('3%'),
    height: hp('6%'),
  },
  fieldText: { color: '#fff', fontSize: wp('3.5%'), flex: 1 },
  placeholder: { color: '#94a3b8' },

  dropdownListContainer: {
    position: 'absolute',
    top: hp('6.5%'),
    width: '100%',
    backgroundColor: '#334155',
    borderRadius: 6,
    maxHeight: hp('25%'),
  },
  dropdownScroll: { paddingVertical: hp('0.5%') },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
  },
  checkbox: { marginRight: wp('3%') },
  dropdownItemText: { color: '#fff', fontSize: wp('3.5%') },

  input: {
    backgroundColor: '#334155',
    borderRadius: 6,
    paddingHorizontal: wp('3%'),
    height: hp('6%'),
    color: '#fff',
  },
  textarea: { minHeight: hp('12%'), textAlignVertical: 'top' },

  button: {
    backgroundColor: '#10b981',
    paddingVertical: hp('1.5%'),
    borderRadius: 6,
    alignSelf: 'center',
    width: wp('60%'),
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  buttonDisabled: { backgroundColor: '#047857' },
  buttonText: { color: '#fff', fontSize: wp('4%'), fontWeight: '600' },
})

export default CallLoggingProps
