
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { API_BASE_URL } from '../config/config';
import { wp, hp } from '../utils/responsive'; // Assuming you're using responsive util
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const onLogin = async () => {
        console.log('login clicked');

        if (!email.trim() || !password.trim()) {
            return Alert.alert('Error', 'Please enter both email and password');
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/login`,
                // '`${}`/api/v1/login',
                {
                    email: email.trim(),
                    password: password.trim(),
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    timeout: 5000,
                }
            );

            // Axios puts response data in response.data
            const json = response.data;

            if (response.status === 200) {
                console.log(json, 'loginapiiii');

                const token = json.data.jwtToken;
                const userId = json.data.userId;
                const roleType = json.data.roleType;
                const username = json.data.username;

                // await AsyncStorage.setItem('email', email.trim());
                // await AsyncStorage.setItem('userId', String(userId));
                // await AsyncStorage.setItem('jwtToken', token);
                // await AsyncStorage.setItem('roleType', roleType);
                // await AsyncStorage.setItem('username', username);


                if (roleType === 'Sales') {
                    try {
                        const todayRes = await fetch(
                            // `${API_BASE_URL}/meetings/todayMeetingDetails`,
                            'http://10.0.2.2:9191/api/v1/meetings/todayMeetingDetails',

                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        const todayJson = await todayRes.json();
                        if (
                            todayJson.statusCode === 200 &&
                            Array.isArray(todayJson.data) &&
                            todayJson.data.length
                        ) {
                            const msg = todayJson.data
                                .map((m) => {
                                    return `• ${m.scheduledTime}\n  Location: ${m.location}\n  Notes: ${m.notes}`;
                                })
                                .join('\n\n');
                            Alert.alert("Today's Meetings", msg);
                        } else {
                            Alert.alert("Today's Meetings", 'No meetings scheduled for today.');
                        }
                    } catch (error) {
                        Alert.alert('Error', 'Could not fetch today’s meetings.', error);
                    }
                    //     // navigation.replace('SalesrepDash');
                    // navigation.replace('SalesDrawer');
                     navigation.reset({
                    index: 0,
                    routes: [{ name: 'SalesDashboard' }],
                });
                }
                else if (roleType === 'Admin') {
                    // navigation.replace('AdminDrawer');
                     navigation.reset({
                    index: 0,
                    routes: [{ name: 'AdminDashboard' }],
                });
                }
                // else if (roleType === 'Partner') {
                //     navigation.replace('PartnerDrawer');
                // }

                else {
                    // navigation.replace('AppDrawer');
                     navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
                }

               

            } else {
                Alert.alert('Error', json.message || 'Login failed');
            }

        }
        catch (error) {
            // Axios errors have response property, useful for debugging
            if (error.response) {
                Alert.alert('Login Error', error.response.data.message || 'Login failed');
                console.log('API Error:', error.response.data);
            } else if (error.request) {
                Alert.alert('Network Error', 'Could not connect to the server');
                console.log('Network Error:', error.request);
            } else {
                Alert.alert('Error', error.message);
                console.log('Error:', error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/icons/veloxlogo-latest.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.title}>Login</Text>

                        {/* Email */}
                        <TextInput
                            style={styles.input}
                            placeholder="Email Address"
                            placeholderTextColor="#777"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                            allowFontScaling={false}
                        />

                        {/* Password */}
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Password"
                                placeholderTextColor="#777"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                                allowFontScaling={false}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(v => !v)}>
                                <Icon
                                    name={showPassword ? 'visibility' : 'visibility-off'}
                                    size={24}
                                    color="#888"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Forgot Password */}
                        <TouchableOpacity
                            style={styles.forgotPassword}
                            onPress={() => navigation.navigate('ForgotPasswordScreen')}
                        >
                            <Text style={styles.linkText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        {/* Login Button */}
                        <TouchableOpacity
                            style={[
                                styles.loginButton,
                                (!email || !password || isLoading) && styles.loginButtonDisabled
                            ]}
                            disabled={!email || !password || isLoading}
                            onPress={onLogin}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.loginButtonText}>Log In</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.linkText}> Create your account</Text>
                        </TouchableOpacity>
                    </View>

                    <Image
                        source={require('../../assets/images/footerveloxnewlatest.png')}
                        style={styles.footerImage}
                        resizeMode="contain"
                    />
                    <TouchableOpacity
                        style={styles.contactLink}
                        onPress={() => navigation.navigate('AboutUs')}
                    >
                        <Text style={styles.linkText}>Contact Us</Text>
                    </TouchableOpacity>
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
        paddingHorizontal: wp(4),
        marginBottom: hp(1),
    },
    passwordInput: {
        flex: 1,
        color: '#fff',
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
    footerImage: {
        width: wp(80),
        height: hp(10),
        marginTop: hp(5)
    },
    contactLink: {
        marginBottom: hp(4),
    },

});

export default LoginScreen