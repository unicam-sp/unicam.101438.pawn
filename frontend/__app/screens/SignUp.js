import React, { useState } from 'react'
import {
    TouchableOpacity,
    Text,
    TextInput,
    View, Alert,
    PermissionsAndroid
} from 'react-native'
import {generalCSS, LogInCSS, PasswordTextInput} from '../styles/global'
import {checkPasswords} from '../myutils/checker'
import {signup} from '../myutils/myreq'

export default function SignUp({navigation}) {

    const [username, setUsername] = useState('');
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');

    return (
        <View style={LogInCSS.view}>
            <TextInput style={LogInCSS.textInput} 
            placeholder='username' 
            placeholderTextColor='#000'
            onChangeText={username => setUsername(username)}
            />
            <PasswordTextInput 
            style={LogInCSS.textInput}
            placeholderTextColor='#000'
            onChangeText={pass1 => setPass1(pass1)}
            />
            <PasswordTextInput
            placeholder='confirm password'
            style={LogInCSS.textInput}
            placeholderTextColor='#000'
            onChangeText={pass2 => setPass2(pass2)}
            />
            <TouchableOpacity 
            style={generalCSS.button}
            onPress={() => sendSignUp(username, pass1, pass2, navigation) } >
                <Text style={generalCSS.text}>Send</Text>
            </TouchableOpacity>
        </View>
    )
}

function sendSignUp(username, pass1, pass2, navigation) {
    let check = checkPasswords(pass1, pass2)
    if(check !== true) return Alert.alert(check)
    if(username === '') return Alert.alert('username can\t be empty')

    signup(pass1, username)
    .then((response) => {
        console.log(response.status)
        if(response.headers.get('content-type') === 'application/json; charset=utf-8')
            return response.json()
        else return response.text()
    })
    .then((json) => {
        if(json.error) {
            Alert.alert(json.error)
        }
        if(json.message) { 
            Alert.alert('User created!\nNow you can log in')
            navigation.popToTop()
            navigation.navigate('LogIn')
        }
        else Alert.alert(json.error)
    })
    .catch((error) => {
        console.error(error)
        Alert.alert('Can\'t connect to the server')
    })
}