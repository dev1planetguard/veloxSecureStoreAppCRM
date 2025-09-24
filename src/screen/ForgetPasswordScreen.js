import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../config/config';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const sendOtp = async () => {
    if (!email.trim()) return Alert.alert('Error', 'Please enter your email');
    try {
      const url = `${API_BASE_URL}/otp/getOtp?email=${encodeURIComponent(email)}`;
      console.log('[ForgotPassword] sendOtp →', url);
      const res = await fetch(url, { method: 'POST' });
      const text = await res.text();
      console.log('[ForgotPassword] sendOtp status:', res.status, 'body:', text);
      let data;
      try { data = JSON.parse(text); } catch { data = { statusCode: res.ok ? 200 : 500, message: text }; }
      if (res.ok || data.statusCode === 200) {
        setOtpSent(true);
        Alert.alert('OTP Sent', 'Check your email for the code');
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }
    } catch (err) {
      Alert.alert('Network Error', err.message);
    }
  };

  const verifyOtp = async () => {
    if (!otp.trim()) return Alert.alert('Error', 'Please enter the OTP');
    try {
      const url = `${API_BASE_URL}/otp/verifyEmail?mail=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`;
      console.log('[ForgotPassword] verifyOtp →', url);
      const res = await fetch(url, { method: 'POST' });
      const text = await res.text();
      console.log('[ForgotPassword] verifyOtp status:', res.status, 'body:', text);
      let data;
      try { data = JSON.parse(text); } catch { data = { statusCode: res.ok ? 200 : 500, message: text }; }
      if (res.ok || data.statusCode === 200) {
        setOtpVerified(true);
        Alert.alert('Verified', 'OTP verification successful');
      } else {
        Alert.alert('Error', data.message || 'Invalid OTP');
      }
    } catch (err) {
      Alert.alert('Network Error', err.message);
    }
  };

  const resetPassword = async () => {
    if (!newPassword || !confirmPassword) return Alert.alert('Error', 'Please fill in all fields');
    if (newPassword !== confirmPassword) return Alert.alert('Error', 'Passwords do not match');
    try {
      // Attempt 1: JSON body (email, otp, newPassword)
      const url = `${API_BASE_URL}/resetPassword`;
      console.log('[ForgotPassword] resetPassword →', url);
      let res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      let text = await res.text();
      console.log('[ForgotPassword] resetPassword status (json):', res.status, 'body:', text);
      let data; try { data = JSON.parse(text); } catch { data = { statusCode: res.ok ? 200 : 500, message: text }; }
      if (res.ok || data.statusCode === 200) {
        return Alert.alert('Success', 'Password reset successful', [{ text: 'OK', onPress: () => navigation.navigate('Login') }]);
      }

      // Attempt 2: Query params (mail, otp, password), POST without body
      const urlWithQuery = `${API_BASE_URL}/resetPassword?mail=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}&password=${encodeURIComponent(newPassword)}`;
      console.log('[ForgotPassword] resetPassword (query) →', urlWithQuery);
      res = await fetch(urlWithQuery, { method: 'POST' });
      text = await res.text();
      console.log('[ForgotPassword] resetPassword status (query):', res.status, 'body:', text);
      try { data = JSON.parse(text); } catch { data = { statusCode: res.ok ? 200 : 500, message: text }; }
      if (res.ok || data.statusCode === 200) {
        return Alert.alert('Success', 'Password reset successful', [{ text: 'OK', onPress: () => navigation.navigate('Login') }]);
      }

      Alert.alert('Error', data.message || 'Failed to reset password');
    } catch (err) {
      Alert.alert('Network Error', err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Reset Your Password</Text>
          <Text style={styles.subtitle}>Secure your account by resetting your password</Text>

          {/* Email Input */}
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          {!otpSent ? (
            <TouchableOpacity style={styles.primaryButton} onPress={sendOtp}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          ) : !otpVerified ? (
            <>
              <Text style={styles.label}>OTP</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={otp}
                onChangeText={setOtp}
              />

              <TouchableOpacity style={styles.primaryButton} onPress={verifyOtp}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.label}>New Password</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  style={styles.inputFlex}
                  placeholder="New Password"
                  placeholderTextColor="#999"
                  secureTextEntry={!showPwd}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TouchableOpacity onPress={() => setShowPwd(prev => !prev)}>
                  <Icon name={showPwd ? 'visibility' : 'visibility-off'} size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Confirm New Password</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  style={styles.inputFlex}
                  placeholder="Confirm Password"
                  placeholderTextColor="#999"
                  secureTextEntry={!showConfirm}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirm(prev => !prev)}>
                  <Icon name={showConfirm ? 'visibility' : 'visibility-off'} size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.primaryButton} onPress={resetPassword}>
                <Text style={styles.buttonText}>Reset Password</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121212' },
  container: { flex: 1, padding: 20 },
  scrollContent: { paddingVertical: 40 },

  title: { fontSize: 28, fontWeight: '700', color: '#fff', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#aaa', textAlign: 'center', marginBottom: 30 },

  label: { color: '#ccc', fontWeight: '600', marginBottom: 8, marginLeft: 4 },
  input: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 20,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  inputFlex: {
    flex: 1,
    color: '#fff',
    paddingVertical: 14,
    fontSize: 16,
  },

  primaryButton: {
    backgroundColor: '#2979FF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#2979FF',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
