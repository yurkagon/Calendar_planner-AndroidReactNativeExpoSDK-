import React from 'react';
import Expo from 'expo';
import currentUser from '../Planner';
import { 
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

var clientId = "146220515786-1kv2u1ugl9cm5ciifoijegbl5e6k60gm.apps.googleusercontent.com";

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    async signInWithGoogleAsync() {
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId: "146220515786-1kv2u1ugl9cm5ciifoijegbl5e6k60gm.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                currentUser.setUser(result);
                this.props.navigation.navigate("Main");//test
                //console.log(currentUser.text)
                return result.accessToken;
            } else {
                return {cancelled: true};
            }
        } catch(e) {
            console.log({error: true})
            return {error: true};
        }
    }

    render() {
        return (
            <ScrollView style={styles.page}>
                <View style={styles.container}>
                    <Image
                        style={styles.logoImage}
                        source={require('../assets/images/robot-dev.png')}
                    />
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>
                            {/*space symbols*/}
                            Please, login via &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; &#160;
                            <Ionicons
                                name={'logo-googleplus'}
                                size={33}
                                color="#4680dd"
                            />
                        </Text>
                        <View style={styles.loginButton}>
                            <Button
                                title="Google Sign In"
                                onPress={this.signInWithGoogleAsync.bind(this)}        
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }


}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    logoImage:{
        width: 250,
        height: 250,
    },
    loginContainer:{
        width: 250,
        height: 100,
        flexDirection: 'column',
        marginTop: 105,
    },
    loginText:{
        fontSize:22,
    },
    loginButton:{
        marginTop: 5,
    }
});
