// import React, { createContext, useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);  // Holds full user object
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadSession = async () => {
//       try {
//         const token = await AsyncStorage.getItem('jwtToken');
//         const userId = await AsyncStorage.getItem('userId');
//         const email = await AsyncStorage.getItem('email');
//         const roleType = await AsyncStorage.getItem('roleType');
//         const username = await AsyncStorage.getItem('username');

//         if (token && roleType && userId) {
//           setUser({
//             token,
//             userId,
//             email,
//             roleType,
//             username,
//           });
//         }
//       } catch (e) {
//         console.error('Error restoring session:', e);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadSession();
//   }, []);

//   const login = async ({ token, userId, email, roleType, username }) => {
//     try {
//       await AsyncStorage.setItem('jwtToken', token);
//       await AsyncStorage.setItem('userId', String(userId));
//       await AsyncStorage.setItem('email', email);
//       await AsyncStorage.setItem('roleType', roleType);
//       await AsyncStorage.setItem('username', username);

//       setUser({ token, userId, email, roleType, username });
//     } catch (e) {
//       console.error('Login error:', e);
//     }
//   };

//   const logout = async () => {
//     try {
//       await AsyncStorage.multiRemove([
//         'jwtToken',
//         'userId',
//         'email',
//         'roleType',
//         'username',
//       ]);
//       setUser(null);
//     } catch (e) {
//       console.error('Logout error:', e);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, isLoading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
