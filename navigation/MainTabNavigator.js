import React from 'react';
import { Platform } from 'react-native';
import {
	createStackNavigator,
	createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import TodayStudyScreen from '../screens/TodayStudyScreen';
import ReviewListScreen from '../screens/ReviewListScreen';
import TimeLineScreen from '../screens/TimeLineScreen';

const HomeStack = createStackNavigator({
	TodayStudy: TodayStudyScreen,
	TimeLine: TimeLineScreen
});

HomeStack.navigationOptions = {
	tabBarLabel: '오늘의 공부',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios' ? (
					`ios-information-circle${focused ? '' : '-outline'}`
				) : (
					'md-information-circle'
				)
			}
		/>
	)
};

const ReviewListStack = createStackNavigator({
	ReviewList: ReviewListScreen
});

ReviewListStack.navigationOptions = {
	tabBarLabel: '복습리스트',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
		/>
	)
};

const TimeLineStack = createStackNavigator({
	TimeLine: TimeLineScreen
});

TimeLineStack.navigationOptions = {
	tabBarLabel: '타임라인',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
		/>
	)
};

export default createBottomTabNavigator({
	ReviewListStack,
	HomeStack,
	TimeLineStack
});
