import React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import {generalCSS, logScreenCSS} from '../styles/global'

function LogScreenMenu({navigation}) {
        return (
        <View style={logScreenCSS.view}>
            <TouchableOpacity
            style={generalCSS.button}
            onPress={() => navigation.navigate('SignUp')} >
                <Text style={generalCSS.text}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={generalCSS.button}
            onPress={() => navigation.navigate('LogIn')} >
                <Text style={generalCSS.text}>Log In</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LogScreenMenu
