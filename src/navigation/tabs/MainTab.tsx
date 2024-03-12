import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MatchesScreen from '../../screen/app/Matches';
import SearchScreen from '../../screen/app/Search';
import DiscoverScreen from '../../screen/app/Discover';
import {HomeStack} from './Home';
import {ChatStack} from './Chat';

export type TabBottomStackParamList = {
  Home: undefined;
  Search: undefined;
  Matches: undefined;
  Discover: undefined;
  Chat: undefined;
};
const Tab = createBottomTabNavigator<TabBottomStackParamList>();

const MainTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
