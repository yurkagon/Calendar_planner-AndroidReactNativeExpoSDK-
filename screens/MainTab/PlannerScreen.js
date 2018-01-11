import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/Colors';
import {MaterialIcons} from '@expo/vector-icons';

export default class EventsScreen extends React.Component {
    static navigationOptions = {
        title: "Create an event"
    };

    render() {
        return (
            <View style={styles.page}>
                <MaterialIcons
                        name="event"
                        size={70}
                        color="white"
                />
                <Field name="TITLE">
                    <View style={styles.inputField}>
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
                        />
                    </View>
                </Field>
                <Field name="START TIME">
                    <TouchableOpacity
                        style={styles.inputField}
                        activeOpacity={0.7}
                        //onPress={()=> {}}
                    />
                </Field>
                <Field name="END TIME">
                    <TouchableOpacity
                        style={styles.inputField}
                        activeOpacity={0.7}
                        //onPress={()=> {}}
                    />
                </Field>

            </View>
        );
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
    container:{
        flexDirection: 'row',
        marginBottom: 30,
    },

});
