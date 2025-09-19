import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import { wp, hp } from '../../../utils/responsive';

const OtpModal = ({ visible, title, otp, setOtp, verifying, onCancel, onSubmit }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <TextInput
            style={styles.inputFull}
            placeholder="6-digit OTP"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            value={otp}
            onChangeText={setOtp}
            maxLength={6}
          />
          <View style={styles.modalButtonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
              disabled={verifying}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={onSubmit}
              disabled={verifying}
            >
              {verifying ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Verify OTP</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1e293b',
    padding: wp(5),
    borderRadius: wp(2),
    width: wp(80),
  },
  modalTitle: {
    color: '#fff',
    fontSize: wp(4.5),
    marginBottom: hp(2),
    fontWeight: '600',
  },
  inputFull: {
    backgroundColor: '#334155',
    color: '#fff',
    borderRadius: wp(2),
    padding: wp(3),
    marginBottom: hp(2),
    fontSize: wp(4),
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: hp(1),
  },
  cancelButton: {
    marginRight: wp(3),
    padding: wp(2),
  },
  submitButton: {
    backgroundColor: '#10b981',
    padding: wp(3),
    borderRadius: wp(2),
    minWidth: wp(20),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: wp(3.5),
  },
});

export default OtpModal;