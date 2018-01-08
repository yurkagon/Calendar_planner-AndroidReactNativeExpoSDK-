import React from 'react';
import currentUser from '../../Planner';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
} from 'react-native';

export default class EventsScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            events: [],
        };
    }

    componentDidMount() {
        this.getEventsList(currentUser.accessToken);

    }

    async getEventsList(accessToken) {
        let response = await fetch(' https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            headers: { Authorization: `Bearer ${accessToken}`},
        });
        let items = JSON.parse(response._bodyText).items;
        this.setState({
            events: items,
        })
       // console.log(items[0])
    }

    render() {
        if(this.state.events.length == 0){
            return (
                <View style={styles.page}>
                    <Text>No events yet...</Text>
                </View>
            )
        } else{
            console.log(this.state.events)
            return(
                <View style={styles.page}>
                    <FlatList
                        data={this.state.events}
                        renderItem={({item}) => <Text>{item.summary}</Text>}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            );
        }
        
    };
    static navigationOptions = {
        title: "Soon events"
    };
}

class Item extends React.Component{
    render(){
        return(
{}
        );
    }
}


const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 5,
        paddingRight: 5,
    },
});
