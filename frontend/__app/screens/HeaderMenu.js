import React, {useState} from 'react';
import {
  Button,
  View,
  Modal,
  TouchableOpacity,
  Text
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { generalCSS, HeaderMenuCSS } from '../styles/global'
import { ScrollView } from 'react-native-gesture-handler';

export default function HeaderMenu({isSignedIn, setSigned, navigation}) {

  const [menuModalVisible, setMenuModalVisible] = useState(false)
  const [logModalVisible, setLogModalVisible] = useState(false)
  const [logs, setLogs] = useState('empty log')

  return (
    {
      // Header Button
    },
    <View>
      <TouchableOpacity
      style={HeaderMenuCSS.header_button}
      onPress={() => setMenuModalVisible(true)}>
        <Text style={HeaderMenuCSS.header_button_text}>≡</Text>
      </TouchableOpacity>

      {
        // Menu Modal
      }
      <Modal
        visible={menuModalVisible}
        transparent={true}
      >
        <TouchableOpacity 
        style={ HeaderMenuCSS.modal_background }
        onPress={() => setMenuModalVisible(false) }>

          <View style={ HeaderMenuCSS.modal_menu }>

            <TouchableOpacity
            style={HeaderMenuCSS.modal_menu_button}
            onPress={() => {
              setMenuModalVisible(false)
              setLogModalVisible(true)
              getLogs(logs, setLogs)
            }}>
              <Text style={HeaderMenuCSS.modal_menu_text}>Logs</Text>
            </TouchableOpacity>

            <View style={HeaderMenuCSS.modal_menu_separator}></View>
            <TouchableOpacity
            style={HeaderMenuCSS.modal_menu_button}
            onPress={() => {}}>
              <Text style={HeaderMenuCSS.modal_menu_text}>About</Text>
            </TouchableOpacity>

          </View>

        </TouchableOpacity>
      </Modal>

      {
        // Log Modal
      }
      <Modal
        visible={logModalVisible}
      >
        
        <ScrollView>
          <Text>{logs}</Text>
        </ScrollView>
        <TouchableOpacity 
        style={ HeaderMenuCSS.log_button }
        onPress={() => {
          setLogModalVisible(false)
          setMenuModalVisible(true)
        }}>
          <Text style={{textAlign: 'center', color: 'white'}}>Close</Text>
        </TouchableOpacity>

      </Modal>

    </View>      
  )

}

function getLogs(logs, setLogs) {
  AsyncStorage.getItem('logs')
    .then((string) => { setLogs(string) } )
}