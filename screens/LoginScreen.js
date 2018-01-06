import React from 'react';
import Expo from 'expo';
import { 
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    StatusBar,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

var clientId = "146220515786-1kv2u1ugl9cm5ciifoijegbl5e6k60gm.apps.googleusercontent.com";

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: false,
    };


    async signInWithGoogleAsync() {
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId: "146220515786-1kv2u1ugl9cm5ciifoijegbl5e6k60gm.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                return result.accessToken;
            } else {
                return {cancelled: true};
            }
        } catch(e) {
            return {error: true};
        }
    }

    render() {
        return (
            <ScrollView style={styles.page}>
                {/* <StatusBar
                    hidden={false} 
                    backgroundColor="#fff"
                    translucent={true} 
                /> */}
                <View style={styles.container}>
                    <Image
                        style={{width: 250, height: 250, marginBottom: 100}}
                        source={require('../assets/images/robot-dev.png')}
                    />
                    <View style={{width: 250, height: 100, flexDirection: 'column'}}>
                        <Text style={{fontSize:22}}>
                            {/*space symbols*/}
                            Please, login via &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; &#160;
                            <Ionicons
                                name={'logo-googleplus'}
                                size={33}
                                style={{ padding: 333 }}
                                color="#4680dd"
                            />
                        </Text>
                        <Button
                            title="Google Sign In"
                            onPress={this.signInWithGoogleAsync.bind(this)}
                            accessibilityLabel="some text"
                        />
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
  text: {
      color: 'blue'
  },
  buttonSign:{

  }
});
