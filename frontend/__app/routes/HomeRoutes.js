import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import TodoScreen from '../screens/TodosScreen'
import ScreenProva from '../screens/ScreenProva'

/*
  Su TodoScreen?
    - get datas
      - user profile with groups
      - personal todos
*/

const Stack = createStackNavigator()

export default function HomeRoutes() {
  return (
      <Stack.Navigator 
      headerMode="float"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#BF360C',
        },
        headerTintColor: '#fff',
        headerTitleStyle :{
          fontWeight: 'bold',
        },
      }}
      >
        <Stack.Screen
          name="TodoScreen"
          component={TodoScreen}
          options={{ title: 'Todos', headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="ScreenProva"
          component={ScreenProva}
          options={{ title: 'Todos', headerTitleAlign: 'center' }}
        />
      </Stack.Navigator>
  )
}