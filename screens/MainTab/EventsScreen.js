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
        let arr = this.state.events;
        arr.sort(howSoonSort);  
        if(this.state.events.length == 0){
            return (
                <View style={styles.page}>
                    <Text>No events yet...</Text>
                </View>
            )
        } else{
            return(
                <View style={styles.page}>
                    <FlatList
                        data={arr}
                        renderItem={({item}) => <Event text={item.summary} start={item.start.dateTime} end={item.end.dateTime}/>}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            );
        }
        /*sorting by how is soon will be future events (at the current moment)
         and past events in the bottom of list, 
         without info and with erros also in the bottom*/
         function howSoonSort(d1,d2){
            let a = new Date(d1.start.dateTime);
            let b = new Date(d2.start.dateTime);

            if(a.toString() == "Invalid Date" ) return 1;
            if(b.toString() == "Invalid Date" ) return -1;

            let now = new Date();
            if(a < now) return 1;
            if(b < now) return -1;
            return Math.abs(now - a) - Math.abs(now - b);
            
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
        //setting background if outdated
        let bg = ( new Date(this.props.end) < new Date() ) ? Colors.tintColor : "#51d64a";
        if(start == "No information" || end == "No information") bg = "#d15757";
        return(
            <View style={[styles.event,{backgroundColor: bg}]}>   
                    <Text style={styles.eventText}>{text.toUpperCase()}</Text>
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
                return "No information";
            }
        }
        function formatText(str){
            let max = 21;
            
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
