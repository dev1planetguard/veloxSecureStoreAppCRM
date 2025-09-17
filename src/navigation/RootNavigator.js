import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import SalesDrawer from './drawers/SalesDrawer';
import AdminDrawer from './drawers/AdminDrawer';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screen/SplashScreen';
const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [roleType, setRoleType] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('jwtToken');
            const role = await AsyncStorage.getItem('roleType');

            if (token && role) {
                setRoleType(role);
            }

            setIsLoading(false);
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Login" component={AuthStack} />
                <Stack.Screen name="AdminDrawer" component={AdminDrawer} />
                <Stack.Screen name="SalesDashboard" component={SalesDrawer} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator