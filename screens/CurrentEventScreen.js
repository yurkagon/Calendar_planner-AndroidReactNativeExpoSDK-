import React from 'react';
import Expo from 'expo';
import currentUser from '../Planner';
import GoogleAPI from '../constants/GoogleAPI';
import { 
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    ToastAndroid
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';



export default class CurrentEventScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };


   

    render() {
        return (
            <Text>WORKS!</Text>
        );
    }


}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
});
