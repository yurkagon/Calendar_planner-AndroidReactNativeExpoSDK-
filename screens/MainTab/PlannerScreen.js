import React from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';

export default class EventsScreen extends React.Component {
static navigationOptions = {
    title: "Calendar planner"
};

    render() {
        return (
            <Text>Planner</Text>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
       // justifyContent: 'space-between',
    },
    container:{
        flexDirection: 'row',
        marginBottom: 30,
    },
    button:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        width: 250,
        borderRadius: 15,
        height: 50,
    },
});
