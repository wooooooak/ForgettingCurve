import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Card } from 'antd-mobile-rn';
import Swipeout from 'react-native-swipeout';
import { Ionicons } from '@expo/vector-icons';

const ScreenPageWrapper = styled(View)`
	flex: 1;
	padding-top: 35px;
	background-color: white;
`;

const ScrollViewCustom = styled(ScrollView)`
	flex: 1;
	padding-top: 35px;

	background-color: white;
	backface-visibility: hidden;
`;

const ScreenTitleWapper = styled.View`
	padding: 10px 0;
	background-color: white;
	height: 62px;
	width: 100%;
`;

const ScreenTitle = styled.Text`
	font-size: 25px;
	color: black;
	font-family: 'noto-sans-kr-bold';
	text-align: center;
`;

const ReviewCard = styled(Card)`
	width: 95%;
	height: 95px;
	background-color: ${(props) => props.backgroundColor};
	shadow-offset: 2px;
	elevation: 2px;
	margin: 0 auto;
	padding-left: 20px;
	padding-top: 5px;
	border-radius: 10px;
	border-color: transparent;
	margin-bottom: 20px;
`;

const TitleReview = styled.Text`
	color: #f5f6fa;
	/* text-align: center; */
	font-family: 'noto-sans-kr';
	font-size: 18px;
`;

const swipeBtns = [
	{
		text: 'Done',
		backgroundColor: 'transparent',
		underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
		onPress: () => {
			this.deleteNote(rowData);
		},
		component: <Ionicons name="md-checkmark-circle" size={32} color="green" />
	}
];

export default class ReviewListScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	render() {
		return (
			<ScreenPageWrapper>
				<ScreenTitleWapper>
					<ScreenTitle>오늘의 복습</ScreenTitle>
				</ScreenTitleWapper>
				<ScrollViewCustom>
					<Swipeout
						style={{
							backgroundColor: 'white',
							width: '90%',
							marginLeft: 'auto',
							marginRight: 'auto'
						}}
						right={swipeBtns}
						autoClose={true}
					>
						<ReviewCard backgroundColor="#A593E0">
							<TitleReview>Hello!</TitleReview>
						</ReviewCard>
					</Swipeout>
					<Swipeout
						style={{
							backgroundColor: 'white',
							width: '90%',
							marginLeft: 'auto',
							marginRight: 'auto'
						}}
						right={swipeBtns}
						autoClose={true}
					>
						<ReviewCard backgroundColor="#F16B6F">
							<TitleReview>Hello!</TitleReview>
						</ReviewCard>
					</Swipeout>
					<Swipeout
						style={{
							backgroundColor: 'white',
							width: '90%',
							marginLeft: 'auto',
							marginRight: 'auto'
						}}
						right={swipeBtns}
						autoClose={true}
					>
						<ReviewCard backgroundColor="#379392">
							<TitleReview>Hello!</TitleReview>
						</ReviewCard>
					</Swipeout>
					<Swipeout
						style={{
							backgroundColor: 'white',
							width: '90%',
							marginLeft: 'auto',
							marginRight: 'auto'
						}}
						right={swipeBtns}
						autoClose={true}
					>
						<ReviewCard backgroundColor="#FFBC42">
							<TitleReview>Hello!</TitleReview>
						</ReviewCard>
					</Swipeout>
					<Swipeout
						style={{
							backgroundColor: 'white',
							width: '90%',
							marginLeft: 'auto',
							marginRight: 'auto'
						}}
						right={swipeBtns}
						autoClose={true}
					>
						<ReviewCard backgroundColor="#EC7357">
							<TitleReview>Hello!</TitleReview>
						</ReviewCard>
					</Swipeout>
				</ScrollViewCustom>
			</ScreenPageWrapper>
		);
	}
}
