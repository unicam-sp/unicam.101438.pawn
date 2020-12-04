import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Keychain from 'react-native-keychain'

function getUrl() {
    return AsyncStorage.getItem('server')
    .then( string => { return JSON.parse(string) })
    .then( json => { return json.url })
}

export async function login(password, username) {
    return fetch(await getUrl() + '/user/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
    })
}

export async function gettodos(token, username) {
    return fetch(await getUrl() + '/todos',  {
        method: 'GET',
        headers: {
            'token': token,
            'username': username
        }
    })
}

export async function addtodos(token, username, description) {
    return fetch(await getUrl() + '/todos', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'token': token,
            'username': username
        },
        body: JSON.stringify({
          description: description
        }),
    })
}

export async function deletetodos(token, username, id) {
    return fetch(await getUrl() + '/todos/' + id, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'token': token,
            'username': username
        }
    })
}



