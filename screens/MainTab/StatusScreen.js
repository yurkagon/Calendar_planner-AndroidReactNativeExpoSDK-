import React from 'react';
import currentUser from '../../Planner';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

export default class StatusScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

/*    async componentDidMount() {
        let t = await this.getUserInfo(currentUser.accessToken);
        console.log(t);
       
    }

    async getUserInfo(accessToken) {
        let userInfoResponse = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary', {
          headers: { Authorization: `Bearer ${accessToken}`},
        });
      
        return userInfoResponse;
    }
*/
    render() {
        return (
            <View style={styles.page}>
                <Text>Status</Text>
            </View>
        );
    }
}


const styles  = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'rgb(66, 134, 244)',
    },

});
