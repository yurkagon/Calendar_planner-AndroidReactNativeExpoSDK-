import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import CurrentEventScreen from '../screens/CurrentEventScreen';
import EditEventScreen from '../screens/EditEventScreen';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';


const RootStackNavigator = StackNavigator(
  {
    Login:{
      screen: LoginScreen,
    },
    Main: {
      screen: MainTabNavigator,
    },
    CurrentEvent:{
      screen: CurrentEventScreen,
    },
    EditEvent:{
      screen: EditEventScreen,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
