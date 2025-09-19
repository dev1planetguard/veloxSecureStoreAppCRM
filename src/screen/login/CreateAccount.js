import React, { useEffect, useState } from "react"
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { hp, wp } from "../../utils/responsive";
import InputFieldReusable from "../../components/reusable/InputFieldResuable";
import OtpSection from "../../components/reusable/OtpSection";
import { SafeAreaView } from "react-native-safe-area-context";
import { PassCodeInputField } from "../../components/reusable/PasscodeInputField";
import Feather from "@react-native-vector-icons/feather";
import Dropdown from "../../components/reusable/Dropdown";
import { City, Country, State } from 'country-state-city';
import { useNavigation } from "@react-navigation/native";
import ButtonReusable from "../../components/reusable/ButtonReusable";
import { sendOtp, verifyOtp } from "../../api/apiFunctions/Login/Otp_auth";
import { fetchUserRoles } from "../../api/apiFunctions/Login/Login_api_function";
import { isStrongPassword } from "../../utils/UtilityFunction";
import { createUser } from "../../api/apiFunctions/Login/Create_Account_api_function";
import { genderOptions } from "../../constants/Strings";

export const CreateAccount = () => {
    const navigation = useNavigation()
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [otpSentMail, setOtpSentMail] = useState(false)
    const [otpSentMobile, setOtpSentMobile] = useState(false)
    const [otpEmail, setOtpEmail] = useState('')
    const [otpMobile, setOtpMobile] = useState('')
    const [accountType, setAccountType] = useState('organization')
    const [selectedValue, setSelectedValue] = useState(null);
    const [orgName, setOrgName] = useState('')
    const [role, setRole] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [designation, setDesignation] = useState('');
    const [street, setStreet] = useState('');
    const [stateProv, setStateProv] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [roleOptions, setRoleOptions] = useState([]);
    const [orgRole, setOrgRole] = useState('');
    const [countryCode, setCountryCode] = useState('IN')
    const [termsChecked, setTermsChecked] = useState(false)
    const [hasVisitedTerms, setHasVisitedTerms] = useState(false)
    const [callingCode, setCallingCode] = useState('91'); // Example calling code
    const [emailVerified, setEmailVerified] = useState(false);
    const [mobileVerified, setMobileVerified] = useState(false);
    const [altMobile, setAltMobile] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        const states = State.getStatesOfCountry('IN');
        setStateOptions(states.map(s => ({ label: s.name, value: s.isoCode })));
        setStateProv('');
        setCityOptions([]);
        setCity('');
    }, [countryCode]);

    // Load cities when state changes
    useEffect(() => {
        if (countryCode && stateProv) {
            const cities = City.getCitiesOfState('IN', stateProv);
       setCityOptions(cities.map(c => ({ label: c.name, value: c.name })));
        } else {
            setCityOptions([]);
        }
        setCity('');
    }, [stateProv]);

    useEffect(() => {
        const getRoles = async () => {
            const options = await fetchUserRoles();
            setRoleOptions(options);
        };
        getRoles();
    }, []);

    const handleTermsNavigation = () => {
        navigation.navigate('TermsOfService');
        setHasVisitedTerms(true); // Mark that user has visited Terms of Service
    };

    const handleSendOtp = async (type) => {
        const res = await sendOtp(
            { type, email, mobile, callingCode },

            setOtpSentMail,
            setOtpSentMobile
        );
    };

    const handleVerifyOtp = async (type) => {
        await verifyOtp(
            {
                type, // or 'mobile'
                email,
                otpEmail,
                mobile,
                callingCode,
                otpMobile,
            },
            setEmailVerified,
            setMobileVerified
        );
    };



    const handleCheckboxPress = () => {
        if (!hasVisitedTerms) {
            if (Platform.OS === 'web') {
                window.alert('You must visit the Terms of Service page before agreeing.');
            } else {
                Alert.alert(
                    'Please read the Terms and Conditions first!',
                    'You must visit the Terms of Service page before agreeing.'
                );
            }
            return;
        }
        setTermsChecked(prevState => !prevState);
    };

    const validate = () => {
        const isEmpty = value => !value.trim();
        const isValidZip = zip => /^[a-zA-Z0-9\s-]{3,10}$/.test(zip.trim());
        const isValidMobile = mobile => /^\d{10}$/.test(mobile.trim());
        const isValidAge = age => /^\d+$/.test(age.trim()) && parseInt(age.trim()) > 0 && parseInt(age.trim()) <= 120;

        if (isEmpty(fname) || isEmpty(lname)) {
            return Alert.alert('Error', 'Enter first and last name');
        }

        if (!emailVerified || !mobileVerified) {
            return Alert.alert('Error', 'Verify email and mobile OTP');
        }

        if (altMobile.trim() && !isValidMobile(altMobile)) {
            return Alert.alert('Error', 'Alternate mobile must be 10 digits');
        }

        if (!isStrongPassword(password)) {
            return Alert.alert('Error', 'Password must be at least 8 chars, include uppercase, lowercase, number & special');
        }

        if (password !== confirmPassword) {
            return Alert.alert('Error', 'Passwords do not match');
        }

        if (isEmpty(street)) {
            return Alert.alert('Error', 'Enter street address for billing');
        }

        if (!stateProv || !city) {
            return Alert.alert('Error', 'Select state and city for billing address');
        }

        if (isEmpty(zipCode) || !isValidZip(zipCode)) {
            return Alert.alert('Error', 'Enter a valid zip code (3-10 characters, alphanumeric, space, hyphen)');
        }

        if (accountType === 'Individual') {
            if (isEmpty(age) || !isValidAge(age)) {
                return Alert.alert('Error', 'Enter a valid age');
            }
            if (!gender) {
                return Alert.alert('Error', 'Select gender');
            }
            // if (isEmpty(designation)) {
            //   return Alert.alert('Error', 'Enter your designation');
            // }
        } else {
            if (isEmpty(orgName) || !orgRole) {
                return Alert.alert('Error', 'Enter organization name & select role');
            }
        }

        if (!termsChecked) {
            return Alert.alert('Error', 'Accept Terms & Privacy');
        }

        return true; // All validations passed
    };


    const handleCreateAccount = async () => {
        validate()
        const payload = {
            firstName: fname.trim(),
            lastName: lname.trim(),
            email: email.trim(),
            mobile: {
                countryCode: `+${callingCode}`,
                number: mobile.trim(),
            },
            password,
            confirmPassword,
            accountType,
            billingAddress: {
                street: street.trim(),
                city,
                state: State.getStatesOfCountry(countryCode)?.find(s => s.isoCode === stateProv)?.name || stateProv,
                zipCode: zipCode.trim(),
                country: Country.getCountryByCode(countryCode)?.name,
            },
        };

        if (altMobile.trim()) {
            payload.mobile.alternate = altMobile.trim();
        }
        if (accountType === 'personal') {
            payload.personalDetails = {
                age: parseInt(age.trim()),
                gender,
                designation: designation.trim(),
            };
        } else {
            payload.organizationDetails = {
                name: orgName.trim(),
                role: orgRole,
            };
        }
        const res = await createUser(payload, navigation);
        console.log('res from create user', res);
    }

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
                            otpSent={otpSentMail}
                            value={email}
                            onChange={setEmail}
                            otp={otpEmail}
                            onOtpChange={setOtpEmail}
                            onSendOtp={() => handleSendOtp('email')}
                            onVerifyOtp={() => handleVerifyOtp('email')}
                            placeholder={'Email'}
                            verified={emailVerified}
                        />
                        <OtpSection
                            otpSent={otpSentMobile}
                            value={mobile}
                            onChange={setMobile}
                            otp={otpMobile}
                            onOtpChange={(txt) => (console.log('otttpppppp', txt), setOtpMobile(txt))}
                            onSendOtp={() => handleSendOtp('mobile')}
                            onVerifyOtp={() => handleVerifyOtp('mobile')}
                            placeholder={'Mobile number'}
                            verified={mobileVerified}
                        />
                        <InputFieldReusable
                            placeholder="Alt Mobile umber (optional)"
                            value={altMobile}
                            onChangeText={setAltMobile}
                        />
                        <PassCodeInputField onChangePass={setPassword} placeholder={'password'} />
                        <PassCodeInputField onChangePass={setConfirmPassword} placeholder={'Confirm password'} />

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
                        <View style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                            {/* <View style={{ width: '45%' }}> */}
                            <InputFieldReusable
                                placeholder={accountType == 'organization' ? "Organization Name" : 'Age'}
                                value={accountType == 'organization' ? orgName : age}
                                onChangeText={accountType == 'organization' ? setOrgName : setAge}
                            />
                            {/* </View> */}
                            {/* <View style={{ width: '45%' }}> */}
                            <Dropdown
                                txt="#fff"
                                // bg="#6200ee"
                                options={accountType == 'organization' ? roleOptions : genderOptions}
                                selected={accountType == 'organization' ? orgRole : gender}
                                placeholder={accountType == 'organization' ? "Select Role" : "Gender"}
                                onSelect={value => accountType == 'organization' ? setOrgRole(value) : setGender(value)}
                            />
                            {/* </View> */}
                        </View>

                        <Text style={styles.section}>Billing Address</Text>
                        <InputFieldReusable
                            placeholder={'Street Address'}
                            value={street}
                            onChangeText={setStreet}
                        />
                        <Dropdown
                            txt="#fff"
                            // bg="#6200ee"
                            options={stateOptions}
                            selected={stateProv}
                            placeholder={'Select State'}
                            onSelect={(value) => setStateProv(value)}
                        />
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ width: '45%' }}>
                                <Dropdown
                                    txt="#fff"
                                    // bg="#6200ee"
                                    options={cityOptions}
                                    selected={city}
                                    placeholder={stateProv ? 'City' : 'State first'}
                                    onSelect={value => setCity(value)}
                                />
                            </View>
                            <View style={{ width: '45%' }}>
                                <InputFieldReusable
                                    placeholder={'ZIP Code'}
                                    value={zipCode}
                                    onChangeText={setZipCode}
                                />
                            </View>
                        </View>

                        {/* Terms & Submit */}
                        <View style={styles.termsRow}>
                            <TouchableOpacity
                                style={[styles.checkbox, termsChecked && styles.checkedBox]}
                                onPress={handleCheckboxPress}
                            >
                                {termsChecked && <Feather name="check" size={16} color="#000" />}
                            </TouchableOpacity>
                            <Text style={styles.termsText}>
                                I agree to{' '}
                                <Text
                                    style={styles.link}
                                    onPress={handleTermsNavigation}
                                >
                                    Terms of Service
                                </Text>{' '}
                                &{' '}
                                <Text
                                    style={styles.link}
                                    onPress={() => navigation.navigate('PrivacyPolicy')}
                                >
                                    Privacy Policy
                                </Text>
                                {' '}
                            </Text>
                        </View>


                        <ButtonReusable
                            label='Create Account'
                            onPress={handleCreateAccount}
                            disabled={
                                !termsChecked ||
                                !emailVerified ||
                                !mobileVerified ||
                                !fname.trim() ||
                                !lname.trim() ||
                                // (accountType === 'personal' && (!age.trim() || !gender || !designation.trim())) ||
                                // (accountType === 'organization' && (!orgName.trim() || !orgRole)) ||
                                !street.trim() ||
                                !stateProv ||
                                !city ||
                                !zipCode.trim() ||
                                password !== confirmPassword ||
                                !isStrongPassword(password)
                            }
                        // isloading={isLoading}
                        />
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
        gap: wp(10)
    },
    termsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1.4,
        borderColor: '#777',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    checkedBox: { backgroundColor: '#2979FF', borderColor: '#2979FF' },
    termsText: { color: '#ccc', flex: 1, fontSize: 13 },
    link: { color: '#2979FF', fontWeight: '600' },
    submitBtn: {
        marginTop: 24,
        height: hp(10),
        backgroundColor: '#2979FF',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitDisabled: { backgroundColor: '#555' },
    submitText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
