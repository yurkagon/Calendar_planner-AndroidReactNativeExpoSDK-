import React from 'react';
import currentUser from '../../Planner';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
} from 'react-native';
import Colors from '../../constants/Colors';

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
                        renderItem={({item}) => <Event text={item.summary} start={item.start.dateTime} end={item.end.dateTime}/>}
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

class Event extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let start = formatDate(this.props.start);
        let end = formatDate(this.props.end);
        let text = formatText(this.props.text);
        return(
            <View style={styles.event}>
                <Text style={styles.eventText}>{text}</Text>
                <View>
                    <Text style={styles.eventTime}>{start}</Text>
                    <Text style={styles.eventTime}>{end}</Text>
                </View>
            </View>
        );

        function formatDate(str){
            try{
                if(!str){
                    return "No information";
                }
                else{
                    let date = str.split('T')[0].replace(/-/g, '/');
                    let time = str.split('T')[1].slice(0,5);
                    let result = date + ' in ' + time;
        
                    return result;
                }
            }
            catch(e){
                return "Cannot read";
            }
        }
        function formatText(str){
            let max = 23;
            
            if(!str){
                return "No information";
            }
            else{
                if(str.length > max) return str.substring(0,max-3) + "...";
                else return str;
            }
        }
    }
}


const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 5,
        paddingRight: 5,
    },
    event:{
        backgroundColor: Colors.tintColor,
        marginTop: 2,
        marginBottom: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 4,
        paddingRight: 4,
        borderRadius: 10,
        height: 50.
    },
    eventText:{
        color: 'white',
        fontSize: 15,
    },
    eventTime:{
        color: 'white'
    },
});
