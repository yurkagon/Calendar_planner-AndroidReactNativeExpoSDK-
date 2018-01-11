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
    static navigationOptions = ({ navigation }) => ({
        title: currentUser.formatTextToDisplayByLimit(navigation.state.params.obj.summary.toUpperCase(),20),
    });
    render() {
        return (
            <Text>{this.props.navigation.state.params.obj.summary}</Text>
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
