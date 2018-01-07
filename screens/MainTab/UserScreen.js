import React from 'react';
import {
  Text,
} from 'react-native';

export default class UserScreen extends React.Component {
  static navigationOptions = {
    title: "User profile"
  };

  render() {
    return (
      <Text>User's Profile</Text>
    );
  }
}