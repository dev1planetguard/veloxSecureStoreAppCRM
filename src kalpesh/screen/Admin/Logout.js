// import { View, Button } from 'react-native'
// import React, { useContext } from 'react'
// // import { Button } from 'react-native-paper'
// import { AuthContext } from '../../navigation/RootNavigator';

// const Logout = () => {
//     const { logout } = useContext(AuthContext);
//   return (
//     <View>
     
//       <Button title='logout' onPress={logout}/>
//     </View>
//   )
// }

// export default Logout

import { View, Button } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../navigation/RootNavigator'
import { useNavigation } from '@react-navigation/native'

const Logout = () => {
  const { logout } = useContext(AuthContext)
  const navigation = useNavigation()

  const handleLogout = async () => {
    await logout()
    // Reset the whole navigation state to AuthStack after logout
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    })
  }

  return (
    <View>
      <Button title='Logout' onPress={handleLogout} />
    </View>
  )
}

export default Logout
