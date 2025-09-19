// src/screens/OnCallWorkflowProps.js
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import CallLogging from './CallLoggingProps';
import CallVerification from './CallVerificationProps';
import CustomerList from './CustomerListProps';
import ProposalForm from './ProposalFormProps';

const OnCallWorkflowProps = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentStep, setCurrentStep] = useState('list');

  const handleCallCustomer = (customer) => {
    setSelectedCustomer(customer);
    setCurrentStep('call-verify');
    Toast.show({
      type: 'success',
      text1: 'Call Initiated',
      text2: `Calling ${customer.name} at ${customer.phone}`,
    });
  };

  const handleCallVerified = () => setCurrentStep('email-verify');

  const handleEmailVerified = (email) => {
    setSelectedCustomer((prev) => ({ ...prev, email, status: 'verified' }));
    setCurrentStep('call-log');
  };

  const handleCallLogged = (callLog) => {
    setSelectedCustomer((prev) => ({
      ...prev,
      callHistory: [...(prev.callHistory || []), callLog],
      status: 'onboarded',
    }));
    setCurrentStep('proposal');
  };

  const handleProposalComplete = () => {
    Toast.show({
      type: 'success',
      text1: 'Proposal Generated',
      text2: 'Customer proposal has been successfully created',
    });
    setCurrentStep('list');
    setSelectedCustomer(null);
  };

  const handleBackToList = () => {
    setCurrentStep('list');
    setSelectedCustomer(null);
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: 'call-verify', icon: 'phone' },
      { key: 'call-log', icon: 'file-text' },
      { key: 'proposal', icon: 'target' },
    ];
    const activeIndex = steps.findIndex((s) => s.key === currentStep);
    return (
      <View style={styles.stepContainer}>
        {steps.map((step, idx) => {
          const isActive = idx === activeIndex;
          const isCompleted = idx < activeIndex;
          return (
            <View key={step.key} style={styles.stepItem}>
              <View
                style={[
                  styles.stepCircle,
                  isActive
                    ? styles.stepActive
                    : isCompleted
                    ? styles.stepCompleted
                    : styles.stepInactive,
                ]}>
                <Icon
                  name={step.icon}
                  size={wp('4%')}
                  color={isActive || isCompleted ? '#fff' : '#94a3b8'}
                />
              </View>
              {idx < steps.length - 1 && (
                <View
                  style={[
                    styles.stepLine,
                    isCompleted
                      ? styles.stepLineCompleted
                      : styles.stepLineInactive,
                  ]}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const renderStepContent = () => {
    if (currentStep === 'list') {
      return (
        <CustomerList
          customers={customers}
          setCustomers={setCustomers}
          onCallCustomer={handleCallCustomer}
        />
      );
    }

    return (
      <ScrollView
        style={styles.stepScroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>On-Call Workflow</Text>
          <TouchableOpacity onPress={handleBackToList} style={styles.backButton}>
            <Icon name="refresh-cw" size={wp('5%')} color="#94a3b8" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.customerName}>{selectedCustomer?.name}</Text>
              <Text style={styles.customerPhone}>{selectedCustomer?.phone}</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>
                {selectedCustomer?.status}
              </Text>
            </View>
          </View>

          {renderStepIndicator()}

          {currentStep === 'call-verify' && (
            <CallVerification
              customer={selectedCustomer}
              onVerified={handleCallVerified}
            />
          )}
          {currentStep === 'call-log' && (
            <CallLogging
              customer={selectedCustomer}
              onCallLogged={handleCallLogged}
            />
          )}
          {currentStep === 'proposal' && (
            <ProposalForm
              customer={selectedCustomer}
              onComplete={handleProposalComplete}
            />
          )}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {renderStepContent()}
        <Toast />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  stepScroll: { flex: 1, backgroundColor: '#0f172a' },
  scrollContent: { padding: wp('4%'), paddingBottom: hp('5%') },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  title: { color: '#fff', fontSize: wp('5.5%'), fontWeight: '700' },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: wp('2%'),
    borderRadius: wp('2%'),
  },
  backButtonText: { color: '#94a3b8', marginLeft: wp('1.5%'), fontSize: wp('3.5%') },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: wp('3%'),
    padding: wp('4%'),
    marginBottom: hp('2.5%'),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1.5%'),
  },
  customerName: { color: '#fff', fontSize: wp('4%'), fontWeight: '600' },
  customerPhone: { color: '#94a3b8', fontSize: wp('3%'), marginTop: hp('0.5%') },
  statusBadge: {
    backgroundColor: '#2563eb',
    borderRadius: wp('5%'),
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.5%'),
  },
  statusBadgeText: { color: '#fff', fontSize: wp('3%') },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp('2%'),
  },
  stepItem: { flexDirection: 'row', alignItems: 'center' },
  stepCircle: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp('1%'),
  },
  stepActive: { backgroundColor: '#2563eb' },
  stepCompleted: { backgroundColor: '#10b981' },
  stepInactive: { backgroundColor: '#475569' },
  stepLine: { height: hp('0.3%'), width: wp('6%'), marginHorizontal: wp('1%') },
  stepLineCompleted: { backgroundColor: '#10b981' },
  stepLineInactive: { backgroundColor: '#475569' },
});

export default OnCallWorkflowProps;
