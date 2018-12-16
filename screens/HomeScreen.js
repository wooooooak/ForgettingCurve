import React from 'react';
import styled from 'styled-components/native';
import { Animated, Text, View, TextInput, FlatList } from 'react-native';
import {
	ScreenTitleWapper,
	ScreenTitle,
	ScreenPageWrapper,
	ScrollViewCustom
} from './ReviewListScreen';

import { Button } from 'antd-mobile-rn';
import TodayStudy from '../components/TodayStudy';
import Divider from '../components/Divider';

const InputCategory = styled(TextInput)`
	width: 90%;
	margin: 10px auto 0;
	height: 70px;
	padding: 20px;
	font-size: 20px;
	background-color: #D499B9;
`;

const InputRange = styled(TextInput)`
	width: 90%;
	margin: 0 auto;
	height: 70px;
	padding: 20px;
	background-color: #9055A2;
	font-size: 20px;
	opacity: 0;
`;

const SubmitButton = styled(Button)`
	opacity: 1;
	/* margin-top: 5px;
	margin: 5px auto 0px;
	width: 150px;
	height: 40px;
	font-size: 20px; */
`;

const AInputRange = Animated.createAnimatedComponent(InputRange);
const ASubmitButton = Animated.createAnimatedComponent(SubmitButton);

export default class HomeScreen extends React.Component {
	static navigationOptions = {
		header: null
	};
	submitButton = null;
	state = {
		fadeAnimRange: new Animated.Value(0),
		fadeAnimButton: new Animated.Value(0),
		category: '',
		range: '',
		dataList: [
			{ title: '영어', content: 'chatper 3~4', id: '2134123' },
			{ title: '수학', content: 'chatper 3~4', id: '2132124' }
		]
	};

	_keyExtractor = (item, index) => item.id;

	onChangeCategory = (text) => {
		Animated.timing(
			// Animate over time
			this.state.fadeAnimRange, // The animated value to drive
			{
				toValue: 1, // Animate to opacity: 1 (opaque)
				duration: 700 // Make it take a while
			}
		).start();
		this.setState({
			category: text
		});
	};

	onChangeRange = (text) => {
		Animated.timing(
			// Animate over time
			this.state.fadeAnimButton, // The animated value to drive
			{
				toValue: 1, // Animate to opacity: 1 (opaque)
				duration: 700 // Make it take a while
			}
		).start();
		this.setState({
			range: text
		});
	};

	onClickSubmitButton = () => {
		console.log(this.state);
		this.setState({
			...this.state,
			category: '',
			range: ''
		});
	};
	render() {
		const { fadeAnimRange, fadeAnimButton, category, range } = this.state;
		return (
			<ScreenPageWrapper style={{ width: '100%' }}>
				<ScreenTitleWapper>
					<ScreenTitle>오늘 한 공부</ScreenTitle>
				</ScreenTitleWapper>
				<InputCategory
					placeholder="어떤 과목을 공부하셨나요?"
					autoFocus={true}
					onChangeText={this.onChangeCategory}
				/>
				{category.length > 0 ? (
					<AInputRange
						style={{ opacity: fadeAnimRange }}
						onChangeText={this.onChangeRange}
						placeholder="어디서부터 어디까지 공부하셨죠?"
						multiline={true}
					/>
				) : null}
				{range.length > 0 ? (
					<ASubmitButton
						type={'default'}
						style={{ opacity: fadeAnimButton }}
						onClick={this.onClickSubmitButton}
					>
						확인
					</ASubmitButton>
				) : null}
				<Divider />
				<FlatList
					data={this.state.dataList}
					renderItem={({ item }) => (
						<TodayStudy title={item.title} content={item.content}>
							{item.id}
						</TodayStudy>
					)}
					keyExtractor={this._keyExtractor}
				/>
			</ScreenPageWrapper>
		);
	}
}
