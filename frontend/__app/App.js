import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {checkInternetConnection} from './myutils/checkServerConnection'
import LogInRoutes from './routes/LogInRoutes';
import HomeRoutes from './routes/HomeRoutes';

const serverIP = '10.0.2.2'
const port = 3000

let serverJson = {
  serverIP: serverIP,
  port: port,
  url: 'http://'+ serverIP + ':' + port,
}

function App() {
  const [isSignedIn, setSigned] = useState(false);
  AsyncStorage.setItem('server', JSON.stringify(serverJson))
  .then( () => {
    checkInternetConnection(isSignedIn, setSigned)
  })

  return (
    <NavigationContainer>
      {isSignedIn ? ( 
      <HomeRoutes />
      ) : (
        <LogInRoutes isSignedIn={isSignedIn} setSigned={setSigned} />
      )}
    </NavigationContainer>
  )
}

export default App;