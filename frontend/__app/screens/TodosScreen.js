import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Modal,
    TextInput
} from 'react-native'
import { generalCSS, TodoScreenCSS } from '../styles/global'
import * as Keychain from 'react-native-keychain'
import { gettodos, addtodos, deletetodos } from '../myutils/myreq'
import { ScrollView } from 'react-native-gesture-handler'

export default function TodoScreen({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [reload, setReaload] = useState(false);
    const [todos, setTodos] = useState([]);
    const [toadd, setToAdd] = useState('');

    // Similar to componentDidMount and componentDidUpdate
    // update when component mounts
    useEffect(() => {
        setReaload(!reload)
    }, [])
    // update when "reload" changes
    useEffect(() => {
        getTodos()
        .then(json => setTodos(json) )
        .catch( e => console.log(e))
    }, [reload])

    function Cards({item}) {
        return (
            <View style={TodoScreenCSS.card_view} > 
                <Text style={TodoScreenCSS.card_text}>
                    {item.description}
                </Text>
                <TouchableOpacity
                style={TodoScreenCSS.card_button}
                onPress={() => deleteTodos(item._id) }>
                    <Text style={TodoScreenCSS.card_button_icon}>X</Text>
                </TouchableOpacity>
            </View>
        )
    }
    
    async function getTodos() {
        try {
            let user = await Keychain.getGenericPassword()
            let res = await gettodos(user.password, user.username)
            let json = await res.json() // return an array
            return json
        }
        catch (e) { console.log(e) }
    }
    
    async function addTodos() {
        try {
            let user = await Keychain.getGenericPassword()
            let res = await addtodos(user.password, user.username, toadd)
            if(res.status == 201) {
                setReaload(!reload)
                setModalVisible(false)
            }
        }
        catch (e) { console.log(e) }
    }
    
    async function deleteTodos(id) {
        try {
            let user = await Keychain.getGenericPassword()
            let res = await deletetodos(user.password, user.username, id)
            setReaload(!reload)
        }
        catch (e) { console.log(e) }
    }

    return (
        <View style={ TodoScreenCSS.body }>

            <Modal
                visible={modalVisible}
                transparent={true}
            >
                <View style={ TodoScreenCSS.modal_center_view }>
                    <View style={ TodoScreenCSS.modal_body }>
                        <TextInput
                        style={ TodoScreenCSS.modal_textinput }
                        onChangeText={(text) => setToAdd(text)}
                        multiline={true}
                        />
                        <View style={ TodoScreenCSS.modal_button_view }>
                            <TouchableOpacity
                                style={TodoScreenCSS.modal_button}
                                onPress={() => setModalVisible(false) }>
                                <Text style={generalCSS.text}>Nullify</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={TodoScreenCSS.modal_button}
                                onPress={() => addTodos() }>
                                <Text style={generalCSS.text}>Add Todo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <ScrollView style={TodoScreenCSS.ScrollView} contentContainerStyle={TodoScreenCSS.contentContainerStyle}>
                {
                    // https://stackoverflow.com/questions/52892304/style-vs-contentcontainerstyle-in-scrollview
                    todos.map( item => {
                        return <Cards item={item} key={item._id}/>
                    })
                }
            </ScrollView>

            <TouchableOpacity
                style={TodoScreenCSS.button}
                onPress={() => setModalVisible(true) }>
                <Text style={generalCSS.text}>Add personal todo</Text>
            </TouchableOpacity>

        </View>
    )
}