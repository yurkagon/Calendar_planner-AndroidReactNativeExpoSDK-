import React from 'react';
import currentUser from '../../Planner';
import Colors from '../../constants/Colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {LoadingIndicator} from '../../YuragonComponents';
import {
    Text,
    View,
    StyleSheet,
    ViewPagerAndroid,
} from 'react-native';

export default class StatusScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            events: currentUser.arrayOfEvents,
            loading: true,
        }
    }

    componentDidMount(){
        this.timer = setInterval(()=>{
            this.setState({
                events: currentUser.arrayOfEvents,
                loading: false,
            })
        },1000);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }

    render() {
        //getting index of event that is now
        let nowArr = this.state.events.filter(ev=>{
            let startTime = new Date(ev.start.dateTime);
            let endTime = new Date(ev.end.dateTime)
            let nowDate = new Date();

            if(startTime.toString() == "Invalid Date" || endTime.toString() == "Invalid Date") return false;

            return nowDate >= startTime && nowDate <= endTime;
        });
        if(nowArr.length > 0){
            let nowEvents = nowArr.map((ev,key)=>{
                return (
                    <View style={styles.pageStyle} key={key}>
                        <NowEvent event={ev}/>
                    </View>
                );
            });
            return(
                <ViewPagerAndroid
                    style={[styles.page,{backgroundColor:Colors.nowColor}]}
                    initialPage={0}
                >
                    {nowEvents}
                </ViewPagerAndroid>
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
                 <LoadingIndicator enabled={this.state.loading} color={Colors.nowColor}/>
            </View>
        );
    }
    static navigationOptions = {
        header: null,
    };
}

class NowEvent extends React.Component{
    render(){
        return(
            <View>
                <Text style={[styles.eventText,{fontSize: 30}]}>Now is:</Text>
                <Text style={[styles.eventText,{fontSize: 60}]}>
                    {currentUser.formatTextToDisplayByLimit(this.props.event.summary.toUpperCase(),20)}
                </Text>
                <Text style={[styles.eventText,{fontSize: 15}]}>
                    {currentUser.formatTimeBetweenDates(new Date(),new Date(this.props.event.end.dateTime))}
                    to end of the event.
                </Text>
            </View>
        )
    }
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
    },
    viewPager: {
        flex: 1
      },
    pageStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});
