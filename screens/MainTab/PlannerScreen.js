import React from 'react';
import currentUser from '../../Planner';
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    DatePickerAndroid,
    TimePickerAndroid,
} from 'react-native';
import Colors from '../../constants/Colors';
import {MaterialIcons} from '@expo/vector-icons';

export default class EventsScreen extends React.Component {
    static navigationOptions = {
        title: "Planner"
    };
    constructor(props){
        super(props);

        let startTime = new Date();
        let endTime = new Date(startTime);
        endTime.setHours(endTime.getHours()+1);

        this.state={
            inputText:"",
            startTime,
            endTime,
        }
    }
    async setDateAsync(){
        let date;
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date(),
                 // May 25 2020. Month 0 is January.
                //date: new Date(2020, 4, 25)
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                date = new Date(year,month,day)
            }
            else{
                date = new Date();
            }
          } catch (e) {
                date = new Date();
          }
        return date;
    }
    async setTimeAsync(){
        let time = {};
        let now = new Date();
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
              hour: now.getHours(),
              minute: now.getMinutes(),
              is24Hour: true, 
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                time = {hour,minute};
            }else{
                time = {hour:0,minute:0}
            }
          } catch (e) {
            time = {hour:0,minute:0};
          }
        return time;
    }
    async setStartTimeAsync(){
        let date = await this.setDateAsync();
        let time = await this.setTimeAsync();
        date.setHours(time.hour);
        date.setMinutes(time.minute);
        date.setHours(date.getHours() - date.getTimezoneOffset() / 60);
        
        let startTime = new Date(date);
        this.setState({startTime});
    }
    async setEndTimeAsync(){
        let date = await this.setDateAsync();
        let time = await this.setTimeAsync();
        date.setHours(time.hour);
        date.setMinutes(time.minute);
        date.setHours(date.getHours() - date.getTimezoneOffset() / 60);
        
        let endTime = new Date(date);
        this.setState({endTime});
    }
    
    render() {
        return (
            <View style={styles.page}>
                <MaterialIcons
                    name="event"
                    size={70}
                    color="white"
                />
                <Field name="TITLE" >
                    <View style={[styles.inputField,{marginBottom:20}]}>
                        <TextInput
                            editable = {true}
                            maxLength = {40}
                            style={{color: Colors.nowColor,fontSize:20,}}
                            autoFocus={true}
                            placeholder="Enter a title of the event"
                            multiline={false}
                            autoCorrect={false}
                            underlineColorAndroid="white"
                            selectionColor={Colors.nowColor}
                            placeholderTextColor="rgba(81, 214, 74,0.7)"
                            onChangeText={(inputText) => this.setState({inputText})}
                            value={this.state.inputText}
                        />
                    </View>
                </Field>
                <Field name="START TIME">
                    <TouchableOpacity
                        style={styles.inputField}
                        activeOpacity={0.7}
                        onPress={this.setStartTimeAsync.bind(this)}
                    >
                        <Text style={styles.date}>
                            {currentUser.formatDateToDisplay(this.state.startTime.toJSON())}
                        </Text>
                    </TouchableOpacity>
                </Field>
                <Field name="END TIME">
                    <TouchableOpacity
                        style={styles.inputField}
                        activeOpacity={0.7}
                        onPress={this.setEndTimeAsync.bind(this)}
                    >
                        <Text style={styles.date}>
                            {currentUser.formatDateToDisplay(this.state.endTime.toJSON())}
                        </Text>
                    </TouchableOpacity>
                </Field>
                <TouchableOpacity
                        style={{marginTop:40}}
                        activeOpacity={0.7}
                        //onPress={()=> {}}
                >
                    <MaterialIcons
                        name="add-box"
                        size={100}
                        color="white"
                    />
                </TouchableOpacity>

            </View>
        );
    }
    setBaseDates(){
        let startTime = new Date();
        let endTime = new Date(startTime);
        endTime.setHours(endTime.getHours()+1);

        this.setState({
            startTime,
            endTime,
        });
    }
}

class Field extends React.Component {
    render() {
        return (
            <View style={styles.TitleInput}>
                <Text style={{color:'white',fontSize:20}}>{this.props.name}: </Text>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: Colors.nowColor,
        padding: 20,
        alignItems: 'center',
       // justifyContent: 'space-between',
    },
    TitleInput:{
        flexDirection: 'column',
        width: "100%",
        justifyContent:"center",
    },
    inputField:{
        backgroundColor: 'white',
        borderRadius: 12,
        height: 40,
        justifyContent: 'center',
        paddingLeft:5,
        paddingRight: 5,
    },
    button:{
        backgroundColor: 'white',
        borderRadius: 12,
        height: 50,
        width: 50,
        justifyContent: 'center',
        paddingRight: 5,
    },
    date:{
        color: Colors.nowColor,
        fontSize: 32,
        textAlign: "center",
    }

});
