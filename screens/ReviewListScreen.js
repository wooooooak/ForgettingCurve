import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ScrollView, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Card } from 'antd-mobile-rn';
import Swipeout from 'react-native-swipeout';
import { Ionicons } from '@expo/vector-icons';

import API from '../API';
import FamousSaying from '../components/FamousSaying';

export const ScreenPageWrapper = styled(View)`
	flex: 1;
	padding-top: 35px;
	background-color: ${(props) =>
		props.backgroundColor ? props.backgroundColor : '#f0f5f9'};
`;

export const ScrollViewCustom = styled(ScrollView)`
	flex: 1;
	margin-top: 20;
	background-color: transparent;
	backface-visibility: hidden;
`;

export const ScreenTitleWapper = styled.View`
	padding: 10px 0;
	background-color: transparent;
	height: 62px;
	width: 100%;
`;

export const ScreenTitle = styled.Text`
	font-size: 25px;
	color: black;
	font-family: 'noto-sans-kr-bold';
	text-align: center;
`;

const EmptyNotice = styled.View`padding: 20px;`;

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
	margin-bottom: 15px;
`;

const TitleReview = styled.Text`
	color: #f5f6fa;
	/* text-align: center; */
	font-family: 'noto-sans-kr';
	font-size: 18px;
`;

const colorPicker = {
	0: '#A593E0',
	1: '#F16B6F',
	2: '#379392',
	3: '#FFBC42',
	4: '#EC7357'
};

class ReviewListScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	state = {
		dataList: [],
		activeRow: null
	};

	async componentDidMount() {
		try {
			const {
				data
			} = await API.get(
				`study/reviewStudies?timeoffset=${moment().utcOffset()}`,
				{
					headers: {
						'auth-header': this.props.user.token
					}
				}
			);
			this.setState({
				dataList: data
			});
		} catch (error) {
			console.log(error);
		}
	}

	onSwipeOpen = (rowId, sectionId) => {
		console.log('on swipe open');
		this.setState({
			activeRow: rowId
		});
	};
	onSwipeClose = (rowId, sectionId) => {
		console.log('on swipe close');
		this.setState({
			activeRow: null
		});
	};

	swipeBtns = (id) => [
		{
			text: 'Done',
			backgroundColor: 'transparent',
			underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
			onPress: () => {
				console.log('복습 하루 미루기!');
			},
			component: (
				<Ionicons name="md-checkmark-circle" size={32} color="green" />
			)
		},
		{
			text: 'Done',
			backgroundColor: 'transparent',
			underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
			onPress: () => {
				console.log('delete number is : ' + id);
			},
			component: (
				<View style={{ height: '100%' }}>
					<Text>done</Text>
				</View>
			)
		}
	];

	mapDataToState = (dataList) => {
		return dataList.map((el, index) => {
			const color = colorPicker[index % 5];

			return (
				<Swipeout
					key={index}
					style={{
						backgroundColor: 'transparent',
						width: '90%',
						marginLeft: 'auto',
						marginRight: 'auto'
					}}
					rowID={el.id}
					sectionId={el.id}
					// close={this.state.activeRow !== el.id}
					onOpen={(sectionId, rowID) =>
						this.onSwipeOpen(rowID, sectionId)}
					onClose={(sectionId, rowID) =>
						this.onSwipeClose(rowID, sectionId)}
					right={this.swipeBtns(el.id)}
					autoClose={true}
				>
					<ReviewCard backgroundColor={color}>
						<TitleReview>{el.title}</TitleReview>
					</ReviewCard>
				</Swipeout>
			);
		});
	};

	render() {
		console.log('render : ' + this.state.activeRow);
		return (
			<ScreenPageWrapper>
				<ScreenTitleWapper>
					<ScreenTitle>오늘의 복습</ScreenTitle>
				</ScreenTitleWapper>
				<ScrollViewCustom enableEmptySections={true}>
					{this.mapDataToState(this.state.dataList).length !== 0 ? (
						this.mapDataToState(this.state.dataList)
					) : (
						<EmptyNotice>
							<Text>복습할게 없군요?</Text>
							<FamousSaying />
						</EmptyNotice>
					)}
				</ScrollViewCustom>
			</ScreenPageWrapper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps)(ReviewListScreen);
