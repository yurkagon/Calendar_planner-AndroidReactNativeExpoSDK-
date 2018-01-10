import React from 'react';
import currentUser from '../../Planner';
import Colors from '../../constants/Colors';
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
                        {currentUser.formatTextToDisplayByLimit(event.summary.toUpperCase(),25)}
                    </Text>
                    <Text style={[styles.eventText,{fontSize: 15}]}>
                        {currentUser.formatTimeBetweenDates(new Date(),new Date(event.end.dateTime))}
                        to end of the event.
                    </Text>
                </View>
            );
        }
 /*       let arr = this.state.events.filter(ev=>{
            let startTime = new Date(ev.start.dateTime);
            let now = new Date();
            if(now.getFullYear() == startTime.getFullYear()
                && now.getMonth() == startTime.getMonth()
                && now.getDate() == startTime.getDate()
            ){
                return now <= startTime;
            }
            else return false;
        });
       for(let i = 0; i < arr.length; i++){
           console.log(arr[i].start.dateTime)
       }

        if(arr.length == 0){
            return (
                <View style={styles.page}>
                    <Text>No events today..</Text>
                </View>
            );
        } else return null;
        
findIndex loaded
*/
return null;

     
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
