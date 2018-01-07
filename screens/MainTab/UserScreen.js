import React from 'react';
import currentUser from '../../Planner';
import {
  Text,
} from 'react-native';


export default class UserScreen extends React.Component {
  static navigationOptions = {
    title: "User profile"
  };

  render() {
    return (
      <Text>{currentUser.name}</Text>
    );
  }
}