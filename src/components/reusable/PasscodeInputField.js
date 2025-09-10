import { useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { hp, wp } from "../../utils/responsive"
import InputFieldReusable from "./InputFieldResuable"
import Feather from "@react-native-vector-icons/feather"

export const PassCodeInputField = ({placeholder,onChangePass}) => {
const[showPassword,setShowPassword]=useState(false)
const[password,setPassword]=useState('')

const onChange = (data) => {
setPassword(data)
onChangePass(data)

}
return (
     <View style={styles.passwordContainer}>
                            {/* <TextInput
                                style={styles.passwordInput}
                                placeholder="Password"
                                placeholderTextColor="#777"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                                allowFontScaling={false}
                            /> */}
                            <InputFieldReusable
                        placeholder={placeholder}
                        value={password}
                        onChangeText={onChange}
                        secureTextEntry={!showPassword}
                        
                        />
                            <TouchableOpacity style={{right:wp(10)}} onPress={() => setShowPassword(v => !v)}>
                               <Feather name={showPassword?"eye":"eye-off"} color="white" size={25} />
                            </TouchableOpacity>
                        </View>
)

}
const styles = StyleSheet.create({
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


})