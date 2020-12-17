import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {checkInternetConnection} from './myutils/checkServerConnection'
import LogInRoutes from './routes/LogInRoutes';
import HomeRoutes from './routes/HomeRoutes';
import {LOG} from './myutils/logger'

/*
const serverIP = 'jakkins.xyz'
const port = 7777

let serverJson = {
  serverIP: serverIP,
  port: port,
  url: 'https://'+ serverIP + ':' + port,
}
*/

// IP for emulator
const serverIP = '10.0.2.2'
const port = 3000

let serverJson = {
  serverIP: serverIP,
  port: port,
  url: 'http://'+ serverIP + ':' + port,
}

AsyncStorage.setItem('server', JSON.stringify(serverJson))
LOG(' === start logs ===\n' + serverJson.serverIP + '\n' + serverJson.port + '\n' + serverJson.url)

function App() {
  const [isSignedIn, setSigned] = useState(false)
  checkInternetConnection(isSignedIn, setSigned)
  
  return (
    <NavigationContainer>
    {isSignedIn ? <HomeRoutes /> : (
      <LogInRoutes isSignedIn={isSignedIn} setSigned={setSigned} />
      )}
    </NavigationContainer>
  )
}

export default App;