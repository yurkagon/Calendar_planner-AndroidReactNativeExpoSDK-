import React from 'react';
import currentUser from '../../Planner';
import { NavigationActions } from 'react-navigation';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Button,
} from 'react-native';


export default class UserScreen extends React.Component {
    static navigationOptions = {
        title: "User profile"
    };
    

    render() {
        return (
            <View style={styles.page}>
                <View style={styles.container}>
                    <Image
                        style={styles.avatar}
                        source={{uri: currentUser.avatar}}
                    />
                    <View style={styles.infoContainer}>
                        <InfoField name="Name">{currentUser.name}</InfoField>
                        <InfoField name="Email">{currentUser.mail}</InfoField>
                    </View>
                </View>
                <Hr/>
                <Button
                    title="Log out"
                    onPress={this.logOut.bind(this)}
                />
            </View>
        );
    }
    logOut(){
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' }),
            ],
            key: null
        }));
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


const $avatarSize = 150;
const styles  = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15
    },
    container:{
        flexDirection: 'row',
        //justifyContent: 'space-between',
    },
    avatar:{
        width: $avatarSize,
        height: $avatarSize,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: 'rgba(66, 134, 244,0.5)',
    },
    infoContainer:{
        flex: 1,
        paddingLeft: 6,
        paddingTop:30,
    },
});
