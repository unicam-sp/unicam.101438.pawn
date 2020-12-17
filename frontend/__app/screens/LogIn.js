import React, {useState} from 'react';
import {TouchableOpacity, Text, TextInput, View, Alert} from 'react-native';
import {generalCSS, LogInCSS, PasswordTextInput} from '../styles/global';
import * as Keychain from 'react-native-keychain';
import {login} from '../myutils/myreq'
import {LOG} from '../myutils/logger'

export default function LogIn({isSignedIn, setSigned, navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPass] = useState('');
  return (
    <View style={LogInCSS.view}>
      <TextInput
        style={LogInCSS.textInput}
        placeholder="username"
        placeholderTextColor="#000"
        onChangeText={(username) => setUsername(username)}
      />
      <PasswordTextInput
        style={LogInCSS.textInput}
        placeholderTextColor="#000"
        onChangeText={(password) => setPass(password)}
      />
      <TouchableOpacity
        style={generalCSS.button}
        onPress={() =>
          sendLogInAsync(isSignedIn, setSigned, username, password)
        }>
        <Text style={generalCSS.text}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

// isSignedIn, setSigned = setSigned(true) = works
async function sendLogInAsync(isSignedIn, setSigned, username, password) {
  if (username === '') return Alert.alert('username can\t be empty');
  if (password === '') return Alert.alert('password can\t be empty');
  try {
    let str = await login(password, username)
    let json = await str.json()
    if (json.message === 'logged') {
      await Keychain.setGenericPassword(
        username,
        json.token,
      ).then( () => {
        LOG('Credentials saved successfully!');
        setSigned(true)
      })
    }
  }
  catch (e) { LOG(e) }
}