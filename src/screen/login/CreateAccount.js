import React, { useState } from "react"
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { hp, wp } from "../../utils/responsive";
import InputFieldReusable from "../../components/reusable/InputFieldResuable";
import OtpSection from "../../components/reusable/OtpSection";
import { SafeAreaView } from "react-native-safe-area-context";
import { PassCodeInputField } from "../../components/reusable/PasscodeInputField";
import Feather from "@react-native-vector-icons/feather";

export const CreateAccount = () => {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState('')
    const [accountType,setAccountType] = useState('organization')


    return (
        <SafeAreaView style={styles.safe}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <View style={styles.card}>
                        <Text style={styles.title}>Create Your Account</Text>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <View style={{ width: '45%' }}>
                                <InputFieldReusable
                                    placeholder="First Name"
                                    value={fname}
                                    onChangeText={setFname}
                                />
                            </View>
                            <View style={{ width: '45%' }}>
                                <InputFieldReusable
                                    placeholder="Last Name"
                                    value={lname}
                                    onChangeText={setLname}
                                />
                            </View>
                        </View>
                        <OtpSection
                            otpSent={otpSent}
                            value={email}
                            onChange={setEmail}
                            otp={otp}
                            onOtpChange={setOtp}
                            onSendOtp={() => setOtpSent(true)}
                            //   onVerifyOtp={handleVerifyOtp}
                            placeholder={'Email'}
                        />
                        <OtpSection
                            otpSent={otpSent}
                            value={email}
                            onChange={setEmail}
                            otp={otp}
                            onOtpChange={setOtp}
                            onSendOtp={() => setOtpSent(true)}
                            //   onVerifyOtp={handleVerifyOtp}
                            placeholder={'Mobile number'}
                        />
                        <InputFieldReusable
                            placeholder="Alt Mobile umber (optional)"
                            value={lname}
                            onChangeText={setLname}
                        />
                        <PassCodeInputField placeholder={'password'} />
                        <PassCodeInputField placeholder={'Confirm password'} />

                        {/* Account Type  */}
                        <Text style={styles.section}>Account Type</Text>

                         <View style={styles.row}>
              {['organization', 'Individual'].map(type => (
                <TouchableOpacity
                  key={type}
                  style={styles.radioBtn}
                  onPress={() => setAccountType(type)}
                >
                  <Feather
                    name={accountType === type ? 'disc' : 'circle'}
                    size={25}
                    color="#2979FF"
                  />
                  <Text style={styles.radioText}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#000',
        width: wp('100')
    },
    flex: {
        flex: 1,
    },
    container: {
        padding: wp(5),
        paddingBottom: hp(10),
        alignItems: 'center',

    },
    logoContainer: {
        marginVertical: hp(5),
        alignItems: 'center',
    },
    logo: {
        width: wp(70),
        height: hp(15),
    },
    card: {
        width: '100%',
        backgroundColor: '#121212',
        borderRadius: 12,
        padding: wp(5),
        maxWidth: 420,
        alignItems: 'center',
        marginBottom: hp(1),
    },
    title: {
        color: '#fff',
        fontSize: wp(5),
        fontWeight: '700',
        marginBottom: hp(2),
    },
    input: {
        width: '100%',
        height: hp(6),
        backgroundColor: '#1e1e1e',
        borderRadius: 8,
        paddingHorizontal: wp(4),
        color: '#fff',
        marginBottom: hp(2),
    },
    passwordContainer: {
        width: '100%',
        height: hp(6),
        backgroundColor: '#1e1e1e',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        // paddingHorizontal: wp(4),
        marginBottom: hp(1),
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: hp(1),
        marginBottom: hp(2),
    },
    linkText: {
        color: '#2979FF',
        fontSize: wp(3.5),
        fontWeight: '600',
    },
    loginButton: {
        width: '100%',
        height: hp(6),
        backgroundColor: '#2979FF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(2),
    },
    loginButtonDisabled: {
        backgroundColor: '#555',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: wp(4),
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp(2),
    },
    footerText: {
        color: '#777',
        fontSize: wp(3.5),
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 20,
        alignSelf: 'center',
    },
      section: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  radioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
    marginTop: 12,
  },
  radioText: { color: '#fff', marginLeft: 6, fontSize: 15 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:wp(10)
  },


});
