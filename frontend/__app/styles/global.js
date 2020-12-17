import React from 'react'
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

// ======================================
// Components

export const PasswordTextInput = (props) => {
  return (
    <TextInput
      placeholder='password'
      {...props} // Inherit any props passed e.g., multiline, numberOfLines below
      maxLength={30}
      secureTextEntry
    />
  )
}

// ======================================
// Styles

export const generalCSS = StyleSheet.create({
  button: {
    padding: 10,
    marginBottom: 15,
    width: '90%',
    flexGrow: 0.001,
    backgroundColor: '#BF360C',
    borderWidth: 2,
    borderColor: '#BF360C',
    borderRadius: 8,
  },
  text: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontSize: 18,
    color: 'white'
  }
})

export const AppCSS = StyleSheet.create({
  view: {
    flex: 1
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 40
  }
})

export const logScreenCSS = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
})

export const LogInCSS = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  textInput: {
    padding: 8,
    marginBottom: 15,
    fontSize: 18,
    width: '90%',
    textAlign: 'center', // placeholder alignment
    flexGrow: 0.001,
    color: 'black',
    borderWidth: 3,
    borderColor: '#BF360C',
    borderRadius: 16,
  }
})

export const TodoScreenCSS = StyleSheet.create({
  /* SCREEN */
  body: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#BF360C',
    borderColor: '#BF360C',
    borderWidth: 2,
    borderRadius: 8,
    margin: 10
  },
  /* CARDS */
  ScrollView: {
    width: '100%',
  },
  contentContainerStyle: {
    margin: 3,
  },
  card_view: {
    flexDirection: 'row',
    alignItems: 'center', /* y-axis alignment */
    margin: 1,
    borderRadius: 2,
    borderColor: 'black',
    borderWidth: 0.1,
  },
  card_text: {
    textAlign: 'left',
    flex: 5,
    fontFamily: 'Roboto',
    fontSize: 18,
    margin: 10,
  },
  card_button: {
    flex: 0.2,
    justifyContent: 'flex-end',
    padding: 10,
    margin: 5,
  },
  card_button_icon: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  /* MODAL */
  modal_center_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)'
  },
  modal_body: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  modal_textinput: {
    textAlign: 'center',
    margin: 10,
    borderWidth: 3,
    borderColor: '#BF360C',
    borderRadius: 16,
  },
  modal_button_view: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modal_button: {
    alignSelf: 'flex-end',
    padding: 10,
    margin: 10,
    width: '40%',
    flexGrow: 0.001,
    backgroundColor: '#BF360C',
    borderWidth: 2,
    borderColor: '#BF360C',
    borderRadius: 8,
  }
})

export const HeaderMenuCSS = StyleSheet.create({
  header_button: {
    marginRight: 10,
  },
  header_button_text: {
    fontSize: 36,
    color: 'white'
  },
  /* MENU MODAL */
  modal_background: {
    flex: 1,
    margin: 1
  },
  modal_menu: {
    width: '50%',
    padding: 5,
    marginTop: 57,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#000000',
    alignSelf: 'flex-end'
  },
  modal_menu_button: {
    padding: 3,
    margin: 1
  },
  modal_menu_text: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontSize: 18,
  },
  modal_menu_separator: {
    alignSelf: 'center',
    borderWidth: 0.2,
    width: '80%',
    margin: 1
  },
  log_button: {
    margin: 10,
    padding: 10,
    backgroundColor: 'black',
  },
 
})