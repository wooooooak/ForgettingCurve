import React from 'react';
import styled from 'styled-components/native';
import { Animated, Text, View, TextInput, FlatList } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import {
	ScreenTitleWapper,
	ScreenTitle,
	ScreenPageWrapper
} from './ReviewListScreen';

import { Button } from 'antd-mobile-rn';
import TodayStudy from '../components/TodayStudy';
import Divider from '../components/Divider';

import API from '../API';

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
	width: 90%;
	margin: 0 auto;
	font-size: 20px;
	font-family: 'noto-sans-kr-bold';
`;

const AInputRange = Animated.createAnimatedComponent(InputRange);
const ASubmitButton = Animated.createAnimatedComponent(SubmitButton);

class TodayStudyScreen extends React.Component {
	static navigationOptions = {
		header: null
	};
	submitButton = null;
	state = {
		fadeAnimRange: new Animated.Value(0),
		fadeAnimButton: new Animated.Value(0),
		category: '',
		range: '',
		dataList: []
	};

	async componentDidMount() {
		try {
			const {
				data
			} = await API.get(
				`study/todayStudies?time0ffset=${moment().utcOffset()}`,
				{
					headers: {
						'auth-header': this.props.user.token
					}
				}
			);
			this.setState({
				...this.state,
				dataList: data
			});
		} catch (error) {
			console.log(error);
		}
	}

	_keyExtractor = (item, index) => item.id.toString();

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

	onClickSubmitButton = async () => {
		try {
			const { data } = await API.post(
				`study`,
				{
					title: this.state.category,
					content: this.state.range
				},
				{
					headers: {
						'auth-header': this.props.user.token
					}
				}
			);
			const newArr = this.state.dataList;
			newArr.push({
				title: data.title,
				content: data.content,
				id: data.id
			});
			this.setState({
				...this.state,
				category: '',
				range: '',
				dataList: newArr
			});
		} catch (error) {
			console.log(error);
		}
	};
	render() {
		const {
			fadeAnimRange,
			fadeAnimButton,
			category,
			range,
			dataList
		} = this.state;
		return (
			<ScreenPageWrapper>
				<ScreenTitleWapper>
					<ScreenTitle>오늘 한 공부</ScreenTitle>
				</ScreenTitleWapper>
				<InputCategory
					placeholder="어떤 과목을 공부하셨나요?"
					autoFocus={false}
					onChangeText={this.onChangeCategory}
					value={category}
				/>
				{category.length > 0 ? (
					<AInputRange
						style={{ opacity: fadeAnimRange }}
						onChangeText={this.onChangeRange}
						placeholder="어디서부터 어디까지 공부하셨죠?"
						multiline={true}
						value={range}
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
					enableEmptySections={true}
					style={{ marginTop: 0 }}
					data={dataList}
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

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps)(TodayStudyScreen);
