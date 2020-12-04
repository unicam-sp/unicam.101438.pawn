import {Alert, NativeModules} from 'react-native'
import * as Keychain from 'react-native-keychain'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import {gettodos} from './myreq'

export function checkInternetConnection(isSignedIn, setSigned) {

    AsyncStorage.getItem('server')
    .then((string) => { return JSON.parse(string) } )
    .then( serverJson => {

        // Check internet connection
        NetInfo.fetch().then((state) => {
            if (state.isConnected !== true) 
                return Alert.alert('You need to be connected to internet');
            console.log("INTERNET: ON") 
        })

        // il ping è un ICMP non controlla la porta
        NativeModules.Ping.checkServerStatus(serverJson.serverIP)
        .then( msg => { console.log("PING: " + msg) })
        .catch( err => { console.log("PING ERROR: " + err) });
        
        checkPortAndValidateToken()
        .then( result => {
            if(result === 'invalid') {
                setSigned(false)
                Alert.alert('Invalid or expired token.\nLogin again')
            }
            else setSigned(true)
        })
        .catch( (msg) => Alert.alert(msg))
    })
};

// does not abort the fetch request
function checkPortAndValidateToken() {
    return new Promise((resolve, reject) => {
        Keychain.getGenericPassword()
        .then( option => {
            if(!option) reject('Login please')
            gettodos(option.password, option.username)
            .then( res => { return res.json() })
            .then( json => {
                if(json.message === 'invalid or expired token')
                    resolve('invalid')
                else resolve('valid')
            })
            .catch( (e) => { reject('Server not reachable') })
        })

        setTimeout(reject, 3000) // this check the server
    })
}