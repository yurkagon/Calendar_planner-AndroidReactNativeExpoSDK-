import React from 'react';
import {
  Text,
} from 'react-native';

export default class StatusScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Text>Status</Text>
    );
  }
}