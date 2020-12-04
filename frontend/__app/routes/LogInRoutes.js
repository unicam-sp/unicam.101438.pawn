import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LogScreenMenu from '../screens/LogScreenMenu';
import SignUp from '../screens/SignUp';
import LogIn from '../screens/LogIn';

const Stack = createStackNavigator();

export default function LogInRoutes({isSignedIn, setSigned}) {
  return (
    <Stack.Navigator
      headerMode="float"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#BF360C',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {},
      }}>
      <>
        <Stack.Screen
          name="LogScreenMenu"
          component={LogScreenMenu}
          options={{title: 'Todos - Log Page', headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{title: 'Sign Up', headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name="LogIn"
          options={{title: 'Log In', headerTitleAlign: 'center'}}>
          {() => <LogIn isSignedIn={isSignedIn} setSigned={setSigned} />}
        </Stack.Screen>
      </>
    </Stack.Navigator>
  );
}
