import React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
} from 'react-native';

export class LoadingIndicator extends React.Component{
    constructor(props){
        super(props);

        this.li = StyleSheet.create({
            bg: {
                flex: 1,
                height:'100%',
                width:'100%',
                backgroundColor: "rgba(237, 247, 241,0.4)",
                alignItems: 'center',
                justifyContent: 'center',
                position: "absolute",
            },
            indBg:{
                height: 50,
                width: 50,
                backgroundColor: 'white',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOpacity: 0.8,
                shadowRadius: 5,
                elevation: 6,
            },
        });
    }

    render(){
        if(this.props.enabled){
            return (
                <View style={this.li.bg}>
                    <View style={this.li.indBg}>
                        <ActivityIndicator 
                            size="large" color={this.props.color?this.props.color:"blue"} 
                            animating={(!!this.props.enabled)?this.props.enabled:true} 
                        />
                    </View>
                </View>
            )
        }
        else return null;
    }
}
