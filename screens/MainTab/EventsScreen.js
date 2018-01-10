import React from 'react';
import currentUser from '../../Planner';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import Colors from '../../constants/Colors';
import { MaterialIcons, MaterialCommunityIcons,Ionicons} from '@expo/vector-icons';

export default class EventsScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            events: [],
            inputText: ''
        };
    }


    componentDidMount(){
        this.getEventsListAsync(currentUser.accessToken);
        this.timer = setInterval(()=>{
            this.getEventsListAsync(currentUser.accessToken);
        },currentUser.autoUpdateTime);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }

    async getEventsListAsync(accessToken) {
        let response = {};
        let error = false;
        let items = [];
        try{
            response = await fetch(' https://www.googleapis.com/calendar/v3/calendars/primary/events', {
                headers: { Authorization: `Bearer ${accessToken}`},
            });
            items = JSON.parse(response._bodyText).items;
            if(!Array.isArray(items)) throw "error";
            //if no summury
            items = items.map((item)=>{
                if(typeof item.summary == "undefined"){
                    item.summary = "No information";
                    return item;
                }
                return item;
            })
        }catch(e){
            error = true;
        }finally {
            if(!error){
                currentUser.arrayOfEvents = items;
                //ToastAndroid.show('WORKS!', ToastAndroid.SHORT)
                this.setState({
                    events: items,
                });
            }
        }
    }

    render() {
        let arr = this.state.events;
        arr.sort(howSoonSort);
        //filter by searching
        let filteredArr = arr.filter( obj => {
            return obj.summary.toUpperCase().includes(this.state.inputText.toUpperCase());
        })
        if(this.state.events.length == 0){
            return (
                <View style={styles.page}>
                    <Text style={styles.noEventsText}>No events yet...</Text>
                    <MaterialCommunityIcons
                        name={'numeric-0-box-multiple-outline'}
                        size={200}
                        color={Colors.outdatedColor}
                        style={styles.noEventsImage}
                    />
                    <RefreshButton press={()=>{
                        this.getEventsListAsync(currentUser.accessToken) 
                    }}/>
                </View>
            )
        } else{
            return(
                <View style={styles.page}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.TextInput}
                            onChangeText={(inputText) => this.setState({inputText})}
                            value={this.state.inputText}
                            maxLength = {40}
                            multiline={false}
                            autoCorrect={false}
                            placeholder="Search..."
                            selectionColor="#4680dd"
                            underlineColorAndroid="#4680dd"
                        />
                        <MaterialIcons
                            name={'search'}
                            size={40}
                            color="#4680dd"
                        />
                    </View>
                    <FlatList
                        data={filteredArr}
                        renderItem={({item}) => <Event text={item.summary} start={item.start.dateTime} end={item.end.dateTime}/>}
                        keyExtractor={(item, index) => index}
                    />
                    <RefreshButton press={()=>{
                        this.getEventsListAsync(currentUser.accessToken) 
                    }}/>
                </View>
            );
        }
        /*sorting by how is soon will be future events (at the current moment)
         and past events in the bottom of list, 
         without info and with erros also in the bottom*/
         function howSoonSort(d1,d2){
            let a = new Date(d1.end.dateTime);
            let b = new Date(d2.end.dateTime);
            let now = new Date();

            //events are now on the top of list
            if ( new Date(d1.end.dateTime) > now && new Date(d1.start.dateTime) < now){
                return -1;
            }
            if ( new Date(d2.end.dateTime) > now && new Date(d2.start.dateTime) < now){
                return 1;
            }

            //bad date in the bottom
            if(a.toString() == "Invalid Date" ) return 1;
            if(b.toString() == "Invalid Date" ) return -1;

            //outdated in the bottom
            if(a < now) return 1;
            if(b < now) return -1;
            
            //how much closer to now
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
        let bg = ( new Date(this.props.end) < new Date() ) ? Colors.outdatedColor : Colors.inFutureColor;
        //setting bg if event is now
        if ( new Date(this.props.end) > new Date() && new Date(this.props.start) < new Date()){
            bg = Colors.nowColor;
        }
        if(start == "No information" || end == "No information") bg = Colors.errorColor;

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

class RefreshButton extends React.Component{
    render(){
        return(
            <TouchableOpacity
                style={styles.refreshButton}
                onPress={()=>{this.props.press()}}
                activeOpacity={0.5}
            >
                <Ionicons
                    name={'md-refresh'}
                    size={40}
                    color="white"
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 5,
        paddingRight: 5,
    },
    inputContainer:{
        height: 40,
        marginTop: 10,
        marginBottom: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    TextInput:{
        width: 310,
        padding: 2,
        color: "#4680dd"
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
    noEventsText:{
        textAlign: 'center',
        fontSize: 50,
        marginTop: 35,
        color: Colors.outdatedColor,
    },
    noEventsImage:{
        alignSelf: 'center',
        marginTop: 70,
    },
    refreshButton:{
        width: 60,
        height: 60,
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: Colors.outdatedColor,
        borderRadius: 50,
        borderColor: "white",
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 6,
    }
});
