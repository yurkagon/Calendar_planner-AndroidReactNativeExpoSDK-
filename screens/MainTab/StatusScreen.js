import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

export default class StatusScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

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
