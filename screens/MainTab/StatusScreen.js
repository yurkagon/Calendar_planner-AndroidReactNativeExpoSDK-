import React from 'react';
import currentUser from '../../Planner';
import Colors from '../../constants/Colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

export default class StatusScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            events: currentUser.arrayOfEvents,
        }
    }

    componentDidMount(){
        this.timer = setInterval(()=>{
            this.setState({
                events: currentUser.arrayOfEvents,
            })
        },1000);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }

    render() {
        //getting index of event that is now
        let nowIndex = this.state.events.findIndex(ev=>{
            let startTime = new Date(ev.start.dateTime);
            let endTime = new Date(ev.end.dateTime)
            let nowDate = new Date();

            if(startTime.toString() == "Invalid Date" || endTime.toString() == "Invalid Date") return false;

            return nowDate >= startTime && nowDate <= endTime;
        });
        if(nowIndex != -1){
            let event = this.state.events[nowIndex];
            return(
                <View style={[styles.page,{backgroundColor:Colors.nowColor}]}>
                    <Text style={[styles.eventText,{fontSize: 30}]}>Now is:</Text>
                    <Text style={[styles.eventText,{fontSize: 60}]}>
                        {currentUser.formatTextToDisplayByLimit(event.summary.toUpperCase(),20)}
                    </Text>
                    <Text style={[styles.eventText,{fontSize: 15}]}>
                        {currentUser.formatTimeBetweenDates(new Date(),new Date(event.end.dateTime))}
                        to end of the event.
                    </Text>
                </View>
            );
        }
        //if no events now
        let nextEventIndex = this.state.events.findIndex(ev=>{
            let startTime = new Date(ev.start.dateTime);
            let nowDate = new Date();

            if(startTime.toString() == "Invalid Date") return false;            

            return nowDate < startTime;
        });
        let event = (nextEventIndex != -1) ? this.state.events[nextEventIndex] : null;
        return(
            <View style={[styles.page,{backgroundColor:Colors.outdatedColor}]}>
                <Text style={[styles.eventText,{fontSize: 30}]}>No events {nextEventIndex!=-1?"now..":null}</Text>
                <MaterialCommunityIcons
                    name={nextEventIndex != -1?"calendar-clock":"calendar-remove"}
                    size={100}
                    color="white"
                />
                {nextEventIndex != -1 &&
                    <View>
                        <Text style={[styles.eventText,{fontSize: 30}]}>
                            The next event is {currentUser.formatTextToDisplayByLimit(event.summary.toUpperCase(),20)}.
                        </Text>
                        <Text style={[styles.eventText,{fontSize: 30}]}>
                            It starts in the next 
                        </Text>
                        <Text style={[styles.eventText,{fontSize: 30}]}>
                            {currentUser.formatTimeBetweenDates(new Date(),new Date(event.start.dateTime))}
                        </Text>
                    </View>   
                }
                
            </View>
        );

       // <Text style={[styles.eventText,{fontSize: 60}]}>
        //{currentUser.formatTextToDisplayByLimit(event.summary.toUpperCase(),25)}
        //     </Text>
        //<Text style={[styles.eventText,{fontSize: 15}]}>
        //            {currentUser.formatTimeBetweenDates(new Date(),new Date(event.end.dateTime))}
        //            to end of the event.
        //        </Text>
    }
    static navigationOptions = {
        header: null,
    };
}


const styles  = StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    eventText:{
        color: 'white',
        textAlign: 'center',
    }
});
