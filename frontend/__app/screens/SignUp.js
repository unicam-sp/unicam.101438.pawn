import React, { useState } from 'react'
import {
    TouchableOpacity,
    Text,
    TextInput,
    View, Alert,
    PermissionsAndroid
} from 'react-native'
import {LogInCSS, PasswordTextInput, generalCSS} from '../styles/global'
import {checkPasswords} from '../myutils/checker'

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

// passwordprova

function sendSignUp(username, pass1, pass2, navigation) {
    let check = checkPasswords(pass1, pass2)
    if(check !== true) return Alert.alert(check)
    if(username === '') return Alert.alert('username can\t be empty')

    fetch('http://10.0.2.2:3000/user/signup', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: pass1
        })
    })
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

const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
            buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
      } else {
          console.log("Camera permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
}