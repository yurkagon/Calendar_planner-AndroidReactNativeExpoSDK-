import React from 'react';
import currentUser from '../../Planner';
import {
    Text,
    View,
    StyleSheet,
    Image,
} from 'react-native';


export default class UserScreen extends React.Component {
    static navigationOptions = {
        title: "User profile"
    };

    render() {
        console.log(currentUser.avatar)
        return (
            <View style={styles.page}>
                <View style={styles.container}>
                    <Text>{currentUser.name}</Text>
                    <Image
                        style={styles.avatar}
                        source={{uri: currentUser.avatar}}
                    />
                </View>
            </View>
        );
    }
}

const $avatarSize = 150;
const styles  = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15
    },
    container:{

    },
    avatar:{
        width: $avatarSize,
        height: $avatarSize,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: 'rgba(66, 134, 244,0.5)',
    }
});
