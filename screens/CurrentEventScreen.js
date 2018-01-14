import React from 'react';
import Expo from 'expo';
import currentUser from '../Planner';
import GoogleAPI from '../constants/GoogleAPI';
import {LoadingIndicator} from '../YuragonComponents';
import { 
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { MaterialIcons,Ionicons,Foundation } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default class CurrentEventScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: currentUser.formatTextToDisplayByLimit(navigation.state.params.obj.summary.toUpperCase(),20),
    });

    constructor(props){
        super(props);

        this.state={
            loading: false,
        }
    }

    async removeEventAsync(){
        const ID = this.props.navigation.state.params.obj.id;
        const TITLE = currentUser.formatTextToDisplayByLimit(this.props.navigation.state.params.obj.summary,15);
        let error = false;
        this.setState({loading:true});
        try{
            let response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events/' + ID,{
                method: 'DELETE',
                headers: { Authorization: `Bearer ${currentUser.accessToken}`},
            });
            if(response.ok != true){
                throw 'error';
            }
        }catch(e){
            error = true;
            ToastAndroid.show('Failed to remove the event', ToastAndroid.SHORT);
        }finally{
            if(!error){
                ToastAndroid.show(TITLE + " is removed", ToastAndroid.SHORT);
                await currentUser.Update();
                this.setState({loading:false});
                this.props.navigation.goBack();
            }
            else this.setState({loading:false});
        }
    }
    render() {
        let obj = this.props.navigation.state.params.obj;
        let objectType = setObjectType(obj);
        let createdTime = new Date(obj.created);
        createdTime.setHours(createdTime.getHours() - createdTime.getTimezoneOffset() / 60);
        return (
            <View style={styles.page}>
                <View style={styles.pageCont}>
                    <View style={styles.container}>
                        <MaterialIcons
                            name={objectType.iconName}
                            size={100}
                            color={objectType.color}
                        />
                        <View>
                            <InfoField name="Title">{obj.summary}</InfoField>
                            <InfoField name="Start time">{currentUser.formatDateToDisplay(obj.start.dateTime)}</InfoField>
                            <InfoField name="End time">{currentUser.formatDateToDisplay(obj.end.dateTime)}</InfoField>
                            <InfoField name="Creating date">{currentUser.formatDateToDisplay(createdTime.toISOString())}</InfoField>
                            <InfoField name="Unique identificator">{obj.id}</InfoField>
                            {objectType.text == "error" &&
                                <InfoField name="Status">No information</InfoField>
                            }
                            {objectType.text == "past" &&
                                <InfoField name="Status">
                                    This event has ended {currentUser.formatTimeBetweenDates(new Date(obj.end.dateTime),new Date())}ago
                                </InfoField>
                            }
                            {objectType.text == "now" &&
                                <InfoField name="Status">
                                    Is now. Ends in the next {currentUser.formatTimeBetweenDates(new Date(),new Date(obj.end.dateTime))}
                                </InfoField>
                            }
                            {objectType.text == "future" &&
                                <InfoField name="Status">
                                    It starts in the next {currentUser.formatTimeBetweenDates(new Date(),new Date(obj.start.dateTime))}
                                </InfoField>
                            }
                        </View>
                    </View>
                    <TouchableOpacity 
                        style={[styles.button,{backgroundColor: Colors.outdatedColor}]}
                        activeOpacity={0.7}
                        onPress={()=> Linking.openURL(obj.htmlLink)}
                    >   
                        <Text style={{color:'white',fontSize:20}}>Open in browser</Text>
                        <Ionicons
                            name="logo-chrome"
                            size={40}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button,{backgroundColor: Colors.nowColor}]}
                        activeOpacity={0.7}
                        onPress={this.getOnEditEventScreen.bind(this)}
                    >   
                        <Text style={{color:'white',fontSize:20}}>Edit the event &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</Text>
                        <Foundation
                            name="page-edit"
                            size={40}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button,{backgroundColor: Colors.errorColor}]}
                        activeOpacity={0.7}
                        onPress={this.removeEventAsync.bind(this)}
                    >   
                        <Text style={{color:'white',fontSize:20}}>Remove this event</Text>
                        <MaterialIcons
                            name="delete"
                            size={40}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
                <LoadingIndicator enabled={this.state.loading} color={Colors.nowColor}/>
            </View>
        );
        function setObjectType(ev){
            let startTime = new Date(ev.start.dateTime);
            let endTime = new Date(ev.end.dateTime)
            let nowDate = new Date();

            if(startTime.toString() == "Invalid Date" || endTime.toString() == "Invalid Date") {
                return {iconName:"event-busy",color: Colors.errorColor,text:"error"};
            }

            if(nowDate > endTime){
                return {iconName:"event-available",color: Colors.outdatedColor,text:"past"};
            }
            if(nowDate < startTime){
                return {iconName:"event-note",color: Colors.inFutureColor,text:"future"};
            }
            if(nowDate >= startTime && nowDate <= endTime){
                return {iconName:"event",color: Colors.nowColor,text:"now"};
            }
        }
    }

    getOnEditEventScreen(){
        this.props.navigation.navigate("EditEvent",{obj:this.props.navigation.state.params.obj});
    }
}

class InfoField extends React.Component {
    render() {
        return (
            <View style={ {flexDirection: 'column',width: 225}}>
                <Text style={{color:'grey',}}>{this.props.name}: </Text>
                <Text>{this.props.children}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
    },
    pageCont:{
        padding: 20,
        alignItems: 'center',
    },
    container:{
        flexDirection: 'row',
        marginBottom: 10,
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
