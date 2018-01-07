import React from 'react';
import { Platform } from 'react-native';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
 } from '@expo/vector-icons';



import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import StatusScreen from '../screens/MainTab/StatusScreen';
import PlannerScreen from '../screens/MainTab/PlannerScreen';
import EventsScreen from '../screens/MainTab/EventsScreen';
import UserScreen from '../screens/MainTab/UserScreen';

export default TabNavigator(
  {
    Status: {
      screen: StatusScreen,
    },
    Planner: {
      screen: PlannerScreen,
    },
    Events: {
      screen: EventsScreen,
    },
    User: {
      screen: UserScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        let iconType = 'MaterialIcons';
        switch (routeName) {
          case 'Status':
            iconName = 'today';
            iconType = 'MaterialIcons';
            break;
          case 'Planner':
            iconName = 'calendar-multiple';
            iconType = 'MaterialCommunityIcons';
            break;
          case 'Events':
            iconName = 'calendar-text';
            iconType = 'MaterialCommunityIcons';
            break;
          case 'User':
            iconName = 'user-circle';
            iconType = 'FontAwesome';
            break;   
        }
        if(iconType == 'MaterialIcons'){
          return (
            <MaterialIcons
              name={iconName}
              size={28}
              style={{ marginBottom: -3 }}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          );
        }
        if(iconType == 'MaterialCommunityIcons'){
          return (
            <MaterialCommunityIcons
              name={iconName}
              size={28}
              style={{ marginBottom: -3 }}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          );
        }
        if(iconType == 'FontAwesome'){
          return (
            <FontAwesome
              name={iconName}
              size={28}
              style={{ marginBottom: -3 }}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          );
        }
        
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
