import React from 'react';
import currentUser from '../../Planner';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    TouchableHighlight,
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
        let arr = currentUser.sortDatesToDisplay(this.state.events);
        
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
                        renderItem={({item}) => {
                            return(
                                <Event 
                                    obj={item}
                                    getOnCurrentEventScreen={this.getOnCurrentEventScreen.bind(this)}
                                />
                            );
                        }}
                        keyExtractor={(item, index) => index}
                    />
                    <RefreshButton press={()=>{
                        this.getEventsListAsync(currentUser.accessToken) 
                    }}/>
                </View>
            );
        }
    };
    static navigationOptions = {
        title: "Soon events"
    };

    getOnCurrentEventScreen(obj){
        this.props.navigation.navigate("CurrentEvent",{obj});
    }
}

class Event extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let start = currentUser.formatDateToDisplay(this.props.obj.start.dateTime);
        let end = currentUser.formatDateToDisplay(this.props.obj.end.dateTime);
        let text = currentUser.formatTextToDisplayByLimit(this.props.obj.summary);
        //setting background if outdated
        let bg = ( new Date(this.props.obj.end.dateTime) < new Date() ) ? Colors.outdatedColor : Colors.inFutureColor;
        //setting bg if event is now
        if ( new Date(this.props.obj.end.dateTime) > new Date() && new Date(this.props.obj.start.dateTime) < new Date()){
            bg = Colors.nowColor;
        }
        if(start == "No information" || end == "No information") bg = Colors.errorColor;

        return( 
            <TouchableOpacity 
                style={[styles.event,{backgroundColor: bg}]}
                activeOpacity={0.7}
                onPress={()=>{
                    this.props.getOnCurrentEventScreen(this.props.obj);
                }}
            >   
                <Text style={styles.eventText}>{text.toUpperCase()}</Text>
                <View>
                    <Text style={styles.eventTime}>{start}</Text>
                    <Text style={styles.eventTime}>{end}</Text>
                </View>
            </TouchableOpacity>
        );

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
