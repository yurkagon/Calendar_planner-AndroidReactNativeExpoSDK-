import React from 'react';
import Expo from 'expo';
import currentUser from '../Planner';
import GoogleAPI from '../constants/GoogleAPI';
import { 
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    ToastAndroid
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';



export default class CurrentEventScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: currentUser.formatTextToDisplayByLimit(navigation.state.params.obj.summary.toUpperCase(),20),
    });
    render() {
        let obj = this.props.navigation.state.params.obj;
        let objectType = setObjectType(obj);
        return (
            <View style={styles.page}>
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
                        <InfoField name="Creating date">{currentUser.formatDateToDisplay(obj.created)}</InfoField>
                        <InfoField name="Unique identificator">{obj.id}</InfoField>
                    </View>
                </View>
                <Hr/>
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
}

class InfoField extends React.Component {
    render() {
        return (
            <View style={ {flexDirection: 'column'}}>
                <Text style={{color:'grey'}}>{this.props.name}: </Text>
                <Text>{this.props.children}</Text>
            </View>
        );
    }
}
class Hr extends React.Component{
    render(){
        return (
            <View style={{
                    marginTop: 15,
                    marginBottom: 15,
                    marginLeft: 5,
                    marginRight: 5,
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                }
            }/>
        )
    }
}
const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 25,
    },
    container:{
        flexDirection: 'row',
    },
});
