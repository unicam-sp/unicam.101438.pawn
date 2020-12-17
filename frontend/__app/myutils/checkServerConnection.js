import {Alert, NativeModules} from 'react-native'
import * as Keychain from 'react-native-keychain'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import {gettodos} from './myreq'
import {LOG} from '../myutils/logger'

export function checkInternetConnection(isSignedIn, setSigned) {

    AsyncStorage.getItem('server')
    .then((string) => { return JSON.parse(string) } )
    .then( serverJson => {

        // Check internet connection
        NetInfo.fetch().then((state) => {
            if (state.isConnected !== true) return Alert.alert('You need to be connected to internet');
            LOG('INTERNET: ON')
        })

        // ping use ICMP it doen't check the port
        NativeModules.Ping.checkServerStatus(serverJson.serverIP)
        .then( msg => { LOG("PING: " + msg) })
        .catch( err => { LOG("PING: " + err) });
        
        checkPortAndValidateToken()
        .then( result => {
            if(result === 'invalid') {
                setSigned(false)
                Alert.alert('Invalid or expired token.\nLogin again')
            }
            else setSigned(true)
        })
        .catch( (msg) => {
            if(msg == null)  Alert.alert('Can\'t connect to the server')
            else Alert.alert(msg)
        })

    })
};

// does not abort the fetch request
function checkPortAndValidateToken() {
    return new Promise((resolve, reject) => {
        Keychain.getGenericPassword()
        .then( option => {
            if(!option) reject('Login please') // token not saved
            gettodos(option.password, option.username)
            .then( res => { return res.json() })
            .then( json => {
                if(json.message === 'invalid or expired token')
                    resolve('invalid')
                else resolve('valid')
            })
            .catch( fetchError => LOG(fetchError) )
        })

        setTimeout(reject, 3000) // after 3 secs reject
    })
}