
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    ScrollView,
    Alert,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { wp, hp } from '../../utils/responsive';
import { useNavigation } from '@react-navigation/native';
import InputFieldReusable from '../../components/reusable/InputFieldResuable';
import ButtonReusable from '../../components/reusable/ButtonReusable';
import Footer from '../../components/moduleBased/login/Footer';
import { getTodayMeetings, loginUser } from '../../api/apiFunctions/Login/Login_api_function';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DailyCheckIn from '../../components/moduleBased/login/DailyCheckin';
import Feather from '@react-native-vector-icons/feather';
import { PassCodeInputField } from '../../components/reusable/PasscodeInputField';
import { showToast } from '../../components/reusable/Toast';




function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onLogin = async () => {
        console.log("login clicked");

        if (!email.trim() || !password.trim()) {
            return showToast("Please enter both email and password",3000)
            // Alert.alert("Error", "Please enter both email and password");
        }
        setIsLoading(true);
        try {
            const json = await loginUser(email, password);

            if (json.statusCode === 200) {
                console.log(json, "login response");
                const token = json.data.jwtToken;
                const userId = json.data.userId;
                const roleType = json.data.roleType;
                const username = json.data.username;
                console.log('-------------', roleType);

                await AsyncStorage.setItem('email', email.trim());
                await AsyncStorage.setItem('userId', String(userId));
                await AsyncStorage.setItem('jwtToken', token);
                await AsyncStorage.setItem('roleType', roleType);
                await AsyncStorage.setItem('username', username);

                if (roleType === "Sales") {
                    try {
                        const todayJson = await getTodayMeetings(token);
                        if (
                            todayJson.statusCode === 200 && Array.isArray(todayJson.data) && todayJson.data.length
                        ) {
                            const msg = todayJson.data
                                .map((m) => `• ${m.scheduledTime}\n  Location: ${m.location}\n  Notes: ${m.notes}`)
                                .join("\n\n");
                            Alert.alert("Today's Meetings", msg);
                        } else {
                            Alert.alert("Today's Meetings", "No meetings scheduled for today.");
                        }
                    } catch (error) {
                        Alert.alert("Error", "Could not fetch today’s meetings.");
                    }
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "SalesDashboard" }],
                    });
                } else if (roleType === "Admin") {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "AdminDashboard" }],
                    });
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                    });
                }
            } else {
                Alert.alert("Error", json.message || "Login failed");
            }
        } catch (error) {
            if (error.response) {
                // Alert.alert("Login Error", error.response.data.message || "Login failed");
                console.log("API Error:", error.response.data);
                showToast(`${error.response.data.errorMessage}`,3000)
            } else if (error.request) {
                showToast(`Could not connect to the server`,3000)
                // Alert.alert("Network Error", "Could not connect to the server");
                console.log("Network Error:", error.request);
            } else {
                Alert.alert("Error", error.message);
                console.log("Error:", error.message);
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
                {/* <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled"> */}
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../../assets/icons/veloxlogo-latest.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.title}>Login</Text>

                        {/* Email */}
                        <InputFieldReusable
                            placeholder="Email Address"
                            value={email}
                            onChangeText={setEmail}
                        />

                        {/* Password */}
                        <PassCodeInputField onChangePass={setPassword} placeholder={'password'} />

                        {/* Forgot Password */}
                        <TouchableOpacity
                            style={styles.forgotPassword}
                            onPress={() => navigation.navigate('ForgotPasswordScreen')}
                        >
                            <Text style={styles.linkText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        {/* Login Button */}
                        <ButtonReusable
                            label='Log In'
                            onPress={onLogin}
                            disabled={!email || !password || isLoading}
                            isloading={isLoading}
                        />
                    </View>
                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.linkText}> Create your account</Text>
                        </TouchableOpacity>
                    </View>
                    <Footer />
                    </View>
                {/* </ScrollView> */}
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

});

export default LoginScreen