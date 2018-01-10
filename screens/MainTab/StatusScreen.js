import React from 'react';
import currentUser from '../../Planner';
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
        },5000);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }

    render() {
        //getting events that start today => now
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
        backgroundColor: 'rgb(66, 134, 244)',
    },
});
